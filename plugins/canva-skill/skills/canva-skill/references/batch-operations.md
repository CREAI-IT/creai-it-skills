# Batch Operations

Load when user needs template autofill at scale, bulk export, multi-platform resize, or queue management.

## Brand Template Autofill (Enterprise)

The most powerful batch capability. Generate hundreds of design variants from a single template.

### Step 1: List Templates with Datasets

```typescript
const response = await fetch(
  'https://api.canva.com/rest/v1/brand-templates?dataset=non_empty&limit=50',
  { headers: { Authorization: `Bearer ${token}` } }
);
const { items } = await response.json();
// Each item: { id, title, thumbnail, created_at, updated_at }
```

### Step 2: Inspect Template Dataset

```typescript
const response = await fetch(
  `https://api.canva.com/rest/v1/brand-templates/${templateId}/dataset`,
  { headers: { Authorization: `Bearer ${token}` } }
);
const { dataset } = await response.json();
// Example: { "CITY": { "type": "text" }, "PHOTO": { "type": "image" }, "CHART": { "type": "chart" } }
```

Field types:
- `text` — plain text string
- `image` — requires Canva asset ID (upload first)
- `chart` — tabular data (max 100 rows × 20 columns)

### Step 3: Prepare Assets (for Image Fields)

Upload all required images first:

```typescript
async function uploadAsset(imageBuffer: Buffer, name: string): Promise<string> {
  const response = await fetch('https://api.canva.com/rest/v1/asset-uploads', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
      'Asset-Upload-Metadata': JSON.stringify({
        name_base64: Buffer.from(name).toString('base64'),
      }),
    },
    body: imageBuffer,
  });
  const { job } = await response.json();

  // Poll until complete
  return pollJob(job.id, 'asset-uploads');
}
```

Rate limit: 30 uploads/min. For large batches, queue uploads with delays.

### Step 4: Batch Autofill

```typescript
interface AutofillItem {
  title: string;
  data: Record<string, { type: string; text?: string; asset_id?: string }>;
}

async function batchAutofill(
  templateId: string,
  items: AutofillItem[],
  concurrency = 5
): Promise<string[]> {
  const designIds: string[] = [];

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);

    const jobs = await Promise.all(
      batch.map(item =>
        fetch('https://api.canva.com/rest/v1/autofills', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brand_template_id: templateId,
            title: item.title,
            data: item.data,
          }),
        }).then(r => r.json())
      )
    );

    // Poll all jobs
    const results = await Promise.all(
      jobs.map(({ job }) => pollJob(job.id, 'autofills'))
    );

    designIds.push(...results.map(r => r.design.id));

    // Respect rate limits: 60/min
    if (i + concurrency < items.length) {
      await delay(1000);
    }
  }

  return designIds;
}
```

### Chart Data Format

```json
{
  "SALES_CHART": {
    "type": "chart",
    "chart_data": {
      "rows": [
        {
          "cells": [
            { "type": "string", "value": "Q1" },
            { "type": "number", "value": 42500 },
            { "type": "boolean", "value": true },
            { "type": "date", "value": 1721944387 }
          ]
        }
      ]
    }
  }
}
```

Constraints: max 100 rows, 20 columns. All rows must have equal cell count.

## Bulk Export

Export multiple designs to multiple formats.

### Export Queue with Rate Limit Management

```typescript
interface ExportRequest {
  designId: string;
  format: Record<string, unknown>;
}

async function bulkExport(
  requests: ExportRequest[],
  maxConcurrent = 5
): Promise<Map<string, string[]>> {
  const results = new Map<string, string[]>();
  let activeJobs = 0;
  let completed = 0;

  for (const req of requests) {
    // Respect rate limits: 20/min per user, 75/5min per user
    while (activeJobs >= maxConcurrent) {
      await delay(500);
    }

    activeJobs++;
    createExportJob(req.designId, req.format)
      .then(job => pollJob(job.id, 'exports'))
      .then(result => {
        results.set(req.designId, result.urls);
        activeJobs--;
        completed++;
        console.log(`Exported ${completed}/${requests.length}`);
      })
      .catch(err => {
        console.error(`Failed ${req.designId}:`, err.message);
        activeJobs--;
        completed++;
      });

    // Stagger requests
    await delay(200);
  }

  // Wait for all to complete
  while (completed < requests.length) {
    await delay(1000);
  }

  return results;
}
```

### Rate Limit Summary for Bulk Operations

| Operation | Limit | Strategy |
|-----------|-------|----------|
| Export (create) | 20/min/user, 750/5min/integration | Max 5 concurrent, 200ms stagger |
| Export (daily) | 500/24hr/user, 5000/24hr/integration | Track daily count, pause if near limit |
| Autofill | 60/min/user | Max 5 concurrent, 1s batch pause |
| Asset upload | 30/min/user | Max 3 concurrent, 500ms stagger |
| Resize | 20/min/user | Max 3 concurrent, 500ms stagger |
| Design create | 20/min/user | Max 3 concurrent, 500ms stagger |

## Multi-Platform Resize

Create resized variants for multiple social platforms from one design.

```typescript
const platforms = [
  { name: 'InstagramPost', preset: 'InstagramPost' },      // 1080×1080
  { name: 'InstagramStory', preset: 'InstagramStory' },    // 1080×1920
  { name: 'FacebookPost', preset: 'FacebookPost' },        // 940×788
  { name: 'TwitterPost', preset: 'TwitterPost' },          // 1042×512
  { name: 'LinkedInBanner', preset: 'LinkedInBanner' },    // 1400×425
  { name: 'YouTubeThumbnail', preset: 'YouTubeThumbnail' }, // 1280×720
];

async function resizeForPlatforms(designId: string) {
  const resizedDesigns = [];

  for (const platform of platforms) {
    const response = await fetch('https://api.canva.com/rest/v1/resizes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        design_id: designId,
        design_type: { type: 'preset', name: platform.preset },
      }),
    });

    const { job } = await response.json();
    const result = await pollJob(job.id, 'resizes');
    resizedDesigns.push({ platform: platform.name, design: result.design });

    await delay(3000); // 20/min rate limit
  }

  return resizedDesigns;
}
```

**Requires Pro/Teams/Enterprise.** Free users get limited trial uses.

## Folder Organization for Batch Output

Keep batch outputs organized:

```typescript
async function organizedBatchOutput(
  projectName: string,
  designs: Array<{ id: string; platform: string }>
) {
  // Create project folder
  const folder = await createFolder(projectName, 'root');

  // Create sub-folders per platform
  for (const platform of ['Instagram', 'Facebook', 'Twitter', 'LinkedIn']) {
    const subFolder = await createFolder(platform, folder.id);

    const platformDesigns = designs.filter(d =>
      d.platform.startsWith(platform)
    );

    for (const design of platformDesigns) {
      await moveToFolder(design.id, subFolder.id);
      await delay(200); // 100/min rate limit on move
    }
  }
}
```

## Exponential Backoff Utility

Reusable polling function for all async jobs:

```typescript
async function pollJob(
  jobId: string,
  resource: string,
  maxAttempts = 20
): Promise<any> {
  let delay = 1000;

  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(
      `https://api.canva.com/rest/v1/${resource}/${jobId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { job } = await response.json();

    if (job.status === 'success') return job.result;
    if (job.status === 'failed') {
      throw new Error(`${resource} job failed: ${job.error?.code} — ${job.error?.message}`);
    }

    await new Promise(r => setTimeout(r, delay + Math.random() * 500));
    delay = Math.min(delay * 2, 30000);
  }

  throw new Error(`${resource} job ${jobId} timed out after ${maxAttempts} attempts`);
}

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}
```

## Pre-Flight Capability Check

Before running batch operations, verify the user's plan supports required features:

```typescript
const response = await fetch('https://api.canva.com/rest/v1/users/me/capabilities', {
  headers: { Authorization: `Bearer ${token}` },
});
const { capabilities } = await response.json();

const hasAutofill = capabilities.includes('autofill');
const hasResize = capabilities.includes('resize');
const hasBrandTemplates = capabilities.includes('brand_template');

if (!hasAutofill) {
  console.warn('Autofill requires Canva Enterprise. Skipping template autofill.');
}
```
