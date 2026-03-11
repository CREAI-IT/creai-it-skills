# Canva Connect API Reference

Load when user asks about API endpoints, building integrations, or needs developer-level API details.

**Base URL**: `https://api.canva.com/rest`
**API Version**: `2024-06-18`
**OpenAPI Spec**: `https://www.canva.dev/sources/connect/api/latest/api.yml`

## Endpoint Catalog

### Designs

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `POST /v1/designs` | Create design | 20/min | `design:content:write` |
| `GET /v1/designs` | List designs | 100/min | `design:meta:read` |
| `GET /v1/designs/{id}` | Get design | 100/min | `design:meta:read` |
| `GET /v1/designs/{id}/pages` | Get pages | 100/min | `design:content:read` |
| `GET /v1/designs/{id}/export-formats` | Available export formats | 100/min | `design:content:read` |

**Create design request:**
```json
{
  "design_type": {
    "type": "preset",
    "name": "InstagramPost"
  },
  "title": "My Design",
  "asset_id": "optional-image-to-insert"
}
```

Or custom dimensions (40–8000px):
```json
{
  "design_type": { "type": "custom", "width": 1080, "height": 1080 },
  "title": "Custom Design"
}
```

**Common preset types:**

| Preset | Dimensions |
|--------|------------|
| `presentation` | 1920×1080 |
| `InstagramPost` | 1080×1080 |
| `InstagramStory` | 1080×1920 |
| `FacebookPost` | 940×788 |
| `TwitterPost` | 1042×512 |
| `LinkedInBanner` | 1400×425 |
| `YouTubeThumbnail` | 1280×720 |
| `Poster` | 42cm × 59.4cm |
| `Logo` | 500×500 |
| `A4Document` | 21cm × 27cm |
| `PodcastCover` | 3000×3000 |

89 total presets available. See [Design Types reference](https://www.canva.dev/docs/button/reference/design-types/).

### Exports (Async)

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `POST /v1/exports` | Create export job | 20/min + layered limits | `design:content:read` |
| `GET /v1/exports/{id}` | Poll export job | 120/min | `design:content:read` |

**Layered export rate limits:**
- 750/5min per integration
- 5,000/24hr per integration
- 75/5min per document
- 75/5min per user, 500/24hr per user

**Export formats:**

| Format | Key Options |
|--------|-------------|
| **PDF** | `export_quality`: regular/pro, `size`: a4/a3/letter/legal, `pages` |
| **JPG** | `quality`: 1-100, `width`/`height`: 40-25000, `pages` |
| **PNG** | `lossless`, `transparent_background` (paid), `as_single_image`, `pages` |
| **GIF** | `width`/`height`: 40-25000, `pages` |
| **PPTX** | `pages` |
| **MP4** | `quality`: horizontal/vertical × 480p/720p/1080p/4k, `pages` |

**Download URLs expire in 24 hours.** Download immediately.

### Assets (Async upload)

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `POST /v1/asset-uploads` | Upload file | 30/min | `asset:write` |
| `GET /v1/asset-uploads/{id}` | Poll upload | 180/min | `asset:read` |
| `POST /v1/url-asset-uploads` | Upload from URL | 30/min | `asset:write` |
| `GET /v1/url-asset-uploads/{id}` | Poll URL upload | 180/min | `asset:read` |
| `GET /v1/assets/{id}` | Get asset | 100/min | `asset:read` |
| `PATCH /v1/assets/{id}` | Update name/tags | 30/min | `asset:write` |
| `DELETE /v1/assets/{id}` | Delete (trash) | 30/min | `asset:write` |

**Supported types:**
- Images: JPEG, PNG, HEIC, single-frame GIF, TIFF, single-frame WebP (max 50MB)
- Videos: M4V, MKV, MP4, MPEG, MOV, WebM (max 500MB direct, 100MB via URL)

**Direct upload** uses `Content-Type: application/octet-stream` with `Asset-Upload-Metadata` header containing base64-encoded name.

### Design Imports (Async)

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `POST /v1/imports` | Import file | 20/min | `design:content:write` |
| `GET /v1/imports/{id}` | Poll import | 120/min | `design:content:write` |
| `POST /v1/url-imports` | Import from URL | 20/min | `design:content:write` |
| `GET /v1/url-imports/{id}` | Poll URL import | 120/min | `design:content:write` |

**Supported import formats (19):** .ai, .psd, .af, .afdesign, .afphoto, .afpub, .key, .numbers, .pages, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .odg, .odp, .ods, .odt, .pdf

### Design Resize (Async)

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `POST /v1/resizes` | Create resize job | 20/min | `design:content:read` + `design:content:write` |
| `GET /v1/resizes/{id}` | Poll resize | 120/min | same |

**Requires Pro/Teams/Enterprise.** Custom dimensions: 40-8000px, max area 25M sq pixels.

### Brand Templates (Enterprise)

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `GET /v1/brand-templates` | List templates | 100/min | `brandtemplate:meta:read` |
| `GET /v1/brand-templates/{id}` | Get template | 100/min | `brandtemplate:meta:read` |
| `GET /v1/brand-templates/{id}/dataset` | Get autofill fields | 100/min | `brandtemplate:content:read` |

Dataset response shows field names and types (`text`, `image`, `chart`).

### Autofill (Async, Enterprise)

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `POST /v1/autofills` | Create autofill job | 60/min | `design:content:write` + `design:meta:read` |
| `GET /v1/autofills/{id}` | Poll autofill | 60/min | same |

```json
{
  "brand_template_id": "template-id",
  "title": "Generated Flyer",
  "data": {
    "CITY": { "type": "text", "text": "San Francisco" },
    "PHOTO": { "type": "image", "asset_id": "uploaded-asset-id" }
  }
}
```

Image fields require Canva asset IDs — upload via Assets API first.

### Folders

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `POST /v1/folders` | Create folder | 20/min | `folder:write` |
| `GET /v1/folders/{id}` | Get folder | 100/min | `folder:read` |
| `PATCH /v1/folders/{id}` | Update name | 20/min | `folder:write` |
| `DELETE /v1/folders/{id}` | Delete folder | 20/min | `folder:write` |
| `GET /v1/folders/{id}/items` | List contents | 100/min | `folder:read` |
| `POST /v1/folders/move` | Move item | 100/min | `folder:write` |

Special folder IDs: `root` (top-level Projects), `uploads` (Uploads folder).

### Comments (Preview)

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `POST /v1/designs/{id}/comments` | Create thread | 100/min | `comment:write` |
| `GET /v1/designs/{id}/comments/{threadId}` | Get thread | 100/min | `comment:read` |
| `POST /v1/designs/{id}/comments/{threadId}/replies` | Reply | 20/min | `comment:write` |
| `GET /v1/designs/{id}/comments/{threadId}/replies` | List replies | 100/min | `comment:read` |

Max 1000 comments per design, 100 replies per thread.

### Users

| Method | Path | Rate Limit | Scopes |
|--------|------|------------|--------|
| `GET /v1/users/me` | Current user | 10/min | (none) |
| `GET /v1/users/me/profile` | User profile | 10/min | `profile:read` |
| `GET /v1/users/me/capabilities` | Available features | 10/min | `profile:read` |

Capabilities response: `["autofill", "brand_template", "resize", "team_restricted_app"]`

### Webhooks (Preview)

**11 event types:** `comment`, `design_access_requested`, `design_approval_requested`, `design_approval_response`, `design_approval_reviewer_invalidated`, `design_mention`, `folder_access_requested`, `share_design`, `share_folder`, `suggestion`, `team_invite`

Requires `collaboration:event` scope plus resource-specific read scopes.

Signature verification: `x-canva-signature` header, HMAC-SHA256, verify against raw request body.

## Async Job Pattern

All async operations (export, import, upload, autofill, resize) follow the same pattern:

```
POST /v1/{resource}  →  { "job": { "id": "...", "status": "in_progress" } }
GET  /v1/{resource}/{id}  →  { "job": { "id": "...", "status": "success", "result": {...} } }
                          →  { "job": { "id": "...", "status": "failed", "error": {...} } }
```

**Status values:** `in_progress` → `success` | `failed`

**Polling**: Use exponential backoff. Start at 1s, double each retry, cap at 30s. Add random jitter.

```typescript
async function pollJob<T>(
  pollFn: () => Promise<{ status: string; result?: T; error?: any }>,
  maxAttempts = 15
): Promise<T> {
  let delay = 1000;
  for (let i = 0; i < maxAttempts; i++) {
    const job = await pollFn();
    if (job.status === 'success') return job.result!;
    if (job.status === 'failed') throw new Error(job.error?.message || 'Job failed');
    await new Promise(r => setTimeout(r, delay + Math.random() * 500));
    delay = Math.min(delay * 2, 30000);
  }
  throw new Error('Job timed out');
}
```

## Complete OAuth Scopes

| Scope | Description |
|-------|-------------|
| `asset:read` | View asset metadata |
| `asset:write` | Upload, update, delete assets |
| `brandtemplate:content:read` | Read brand template content/dataset |
| `brandtemplate:meta:read` | View brand template metadata |
| `collaboration:event` | Receive webhook notifications |
| `comment:read` | View design comments |
| `comment:write` | Create comments and replies |
| `design:content:read` | View design contents |
| `design:content:write` | Create designs |
| `design:meta:read` | View design metadata |
| `design:permission:read` | View design permissions |
| `design:permission:write` | Modify design permissions |
| `folder:read` | View folders and contents |
| `folder:write` | Create, move, delete folders |
| `folder:permission:read` | View folder permissions |
| `folder:permission:write` | Modify folder permissions |
| `profile:read` | Read user profile |
| `openid` | OIDC authentication |
| `profile` | OIDC profile info |
| `email` | OIDC email access |

**Critical**: Scopes are NOT hierarchical. `write` does NOT grant `read`. Request both.

## URL Expiration

| Resource | Expires |
|----------|---------|
| Export download URL | 24 hours |
| Design edit/view URL | 30 days |
| Thumbnail URL | 15 minutes |

## Pagination

All list endpoints use cursor-based pagination:
```
GET /v1/{resource}?continuation={token}&limit=25
→ { "items": [...], "continuation": "next-page-token" }
```

`continuation` is `null` or absent when no more pages exist.

## Response Headers

All API responses include:
- Rate limit headers (when approaching limits)
- `Content-Type: application/json`
- Standard HTTP status codes

All requests require:
- `Authorization: Bearer {access_token}`
- TLS/SSL (HTTPS only)
- Idempotency keys supported via request headers for reliability
