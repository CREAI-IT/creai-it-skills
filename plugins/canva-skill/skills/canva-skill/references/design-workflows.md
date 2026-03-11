# Design Workflows

Load when user wants to create, edit, or export Canva designs.

## Workflow Overview

All design operations follow one of these patterns:

```
A) AI Prompt → Generate → Export
B) Template → Autofill → Export
C) Import File → Edit → Export
D) Create Empty → Customize → Export
```

## Pattern A: AI Prompt → Generate Design (MCP)

The fastest path. Requires Canva AI Connector.

**Via Claude (with Canva connector enabled):**
```
"Create a social media post for a tech startup launch announcement.
 Use modern, minimal design with dark background.
 Include the text: 'Launching Q2 2026'"
```

The AI Connector's `generate-design` tool creates 8-12 design candidates. You then:
1. Review candidates (thumbnails provided)
2. Select preferred design
3. Create editable version via `create-from-candidate`
4. Export in desired format

**Key AI Connector tools for this flow:**

| Tool | Purpose |
|------|---------|
| `generate-design` | Create designs from text prompt |
| `create-from-candidate` | Convert candidate to editable design |
| `get-design-pages` | Preview pages with thumbnails |
| `perform-operations` | Update text, replace images |
| Export tools | Export to PDF/PNG/JPG/etc. |

## Pattern B: Template → Autofill (Enterprise)

For consistent brand assets at scale. Requires Canva Enterprise.

**Step 1: Browse templates**
```
"List my brand templates that have autofill datasets"
```
Uses `GET /v1/brand-templates?dataset=non_empty`

**Step 2: Check template fields**
```
"What fields does template {id} have?"
```
Uses `GET /v1/brand-templates/{id}/dataset` → returns field names and types (`text`, `image`, `chart`)

**Step 3: Autofill**
```json
POST /v1/autofills
{
  "brand_template_id": "template-id",
  "title": "SF Office Flyer",
  "data": {
    "HEADLINE": { "type": "text", "text": "Grand Opening" },
    "LOCATION": { "type": "text", "text": "San Francisco" },
    "HERO_IMAGE": { "type": "image", "asset_id": "canva-asset-id" }
  }
}
```

**Image fields require Canva asset IDs.** Upload images first:
```json
POST /v1/asset-uploads
Content-Type: application/octet-stream
Asset-Upload-Metadata: {"name_base64": "aGVyby1pbWFnZQ=="}

<binary image data>
```

Then poll `GET /v1/asset-uploads/{jobId}` until `status: "success"` → use returned `asset.id`.

## Pattern C: Import External File

Import existing designs from other tools into Canva.

**Supported formats (19):** .ai, .psd, .key, .ppt, .pptx, .doc, .docx, .pdf, .xls, .xlsx, .pages, .numbers, .af, .afdesign, .afphoto, .afpub, .odg, .odp, .ods, .odt

**Direct import:**
```typescript
const response = await fetch('https://api.canva.com/rest/v1/imports', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/octet-stream',
    'Import-Metadata': JSON.stringify({
      title_base64: Buffer.from('My Presentation').toString('base64'),
      mime_type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    }),
  },
  body: fileBuffer,
});
```

**URL import:**
```json
POST /v1/url-imports
{
  "title": "Imported Design",
  "url": "https://example.com/presentation.pptx"
}
```

Poll `GET /v1/imports/{jobId}` → result includes new design ID and edit URL.

**Note:** Large imports may split into multiple designs. Always handle arrays in the response.

## Pattern D: Create Empty → Customize

Create a blank design with specific dimensions, then customize via API or Canva editor.

```json
POST /v1/designs
{
  "design_type": { "type": "preset", "name": "InstagramPost" },
  "title": "My Instagram Post"
}
```

Response includes `urls.edit_url` (expires 30 days) — open in browser to edit in Canva.

## Exporting Designs

All exports are async. Create job → poll → download.

### Single Design Export

```typescript
// Create export job
const exportJob = await fetch('https://api.canva.com/rest/v1/exports', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    design_id: designId,
    format: {
      type: 'png',
      transparent_background: false,
      lossless: true,
      pages: [1],
    },
  }),
});

const { job } = await exportJob.json();

// Poll with exponential backoff
let delay = 1000;
while (true) {
  const poll = await fetch(`https://api.canva.com/rest/v1/exports/${job.id}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });
  const result = await poll.json();

  if (result.job.status === 'success') {
    // Download URLs — expire in 24 hours
    const urls = result.job.result.urls;
    console.log('Download:', urls);
    break;
  }
  if (result.job.status === 'failed') {
    throw new Error(result.job.error.message);
  }

  await new Promise(r => setTimeout(r, delay + Math.random() * 500));
  delay = Math.min(delay * 2, 30000);
}
```

### Export Format Options

**PDF:**
```json
{ "type": "pdf", "export_quality": "pro", "size": "a4", "pages": [1, 2, 3] }
```

**PNG (transparent):**
```json
{ "type": "png", "transparent_background": true, "lossless": true }
```
Transparent background requires paid plan.

**JPG (optimized):**
```json
{ "type": "jpg", "quality": 85, "width": 1200, "height": 630 }
```

**MP4 (video):**
```json
{ "type": "mp4", "quality": "horizontal_1080p" }
```
Quality options: `horizontal_480p`, `horizontal_720p`, `horizontal_1080p`, `horizontal_4k`, `vertical_480p`, `vertical_720p`, `vertical_1080p`, `vertical_4k`

### Multi-Format Export

Export the same design in multiple formats for different platforms:

```typescript
const formats = [
  { type: 'png', width: 1080, height: 1080 },   // Instagram
  { type: 'png', width: 1200, height: 630 },     // OG Image
  { type: 'pdf', export_quality: 'pro' },         // Print
  { type: 'jpg', quality: 80 },                   // Web
];

const jobs = await Promise.all(
  formats.map(format =>
    createExportJob(designId, format)
  )
);

// Poll all jobs concurrently
const results = await Promise.all(
  jobs.map(job => pollJob(job.id))
);
```

**Watch rate limits:** 75 exports/5min per user, 500/24hr per user.

## Design Resize

Create resized copies for multiple platforms (requires Pro/Teams/Enterprise):

```json
POST /v1/resizes
{
  "design_id": "original-design-id",
  "design_type": { "type": "preset", "name": "InstagramStory" }
}
```

Or custom dimensions:
```json
{
  "design_id": "original-design-id",
  "design_type": { "type": "custom", "width": 1080, "height": 1920 }
}
```

Constraints: 40-8000px per dimension, max 25M total square pixels.

Cannot resize Canva Docs or Code designs.

## Search Designs

```
GET /v1/designs?query=product+launch&sort_by=modified_descending&limit=25
```

Via MCP: "Search my Canva designs for 'product launch'"

## Folder Organization

```json
// Create project folder
POST /v1/folders
{ "name": "Q2 Launch Assets", "parent_folder_id": "root" }

// Move design to folder
POST /v1/folders/move
{ "item_id": "design-id", "to_folder_id": "folder-id" }
```

## Content-to-Design Pipeline

For automated content-to-visual workflows:

1. **Content input** → blog post, product data, event details
2. **Template selection** → match content type to brand template
3. **Data mapping** → map content fields to template dataset
4. **Asset preparation** → upload images via Assets API
5. **Autofill** → generate design from template + data
6. **Export** → download in required formats
7. **Deliver** → store in CDN, attach to CMS, post to social

This pipeline can be fully automated for recurring content (e.g., weekly social posts, product listings).
