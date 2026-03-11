# Troubleshooting

Load when user encounters errors, rate limits, or unexpected behavior with Canva API or MCP.

## Error Response Format

All Canva API errors return:
```json
{
  "code": "error_code_string",
  "message": "Human-readable description"
}
```

## HTTP Status Code Reference

### 400 — Bad Request

| Error Code | Cause | Fix |
|------------|-------|-----|
| `bad_request_body` | Malformed JSON | Validate JSON before sending |
| `bad_request_params` | Invalid path parameters | Check IDs are valid UUIDs |
| `invalid_field` | Field validation failed | Check allowed values in API docs |
| `missing_field` | Required field not provided | Add required fields per endpoint |
| `unsupported_content_type` | Wrong Content-Type header | Use `application/json` or `application/octet-stream` |
| `request_too_large` | Payload too big | Images < 50MB, videos < 500MB |
| `invalid_file_format` | Unsupported file type | Check supported formats per endpoint |
| `autofill_data_invalid` | Data doesn't match template fields | Check `GET /brand-templates/{id}/dataset` for field types |
| `design_not_fillable` | Template has no autofill fields | Use a template with configured datasets |
| `input_unsafe` | Content flagged by safety filter | Modify content |

### 401 — Unauthorized

| Error Code | Cause | Fix |
|------------|-------|-----|
| `invalid_access_token` | Token malformed or invalid | Re-authenticate |
| `revoked_access_token` | Token was revoked | Re-authenticate from scratch |
| `invalid_grant` | Auth/refresh token expired or reused | See "Refresh Token Reuse" below |
| `invalid_client` | Wrong client ID or secret | Check credentials |
| `missing_scope` | Token lacks required scope | Re-authorize with correct scopes |
| `invalid_scope` | Scope not configured in Developer Portal | Add scope in portal first |

### 403 — Forbidden

| Error Code | Cause | Fix |
|------------|-------|-----|
| `permission_denied` | User doesn't have access | Check design ownership/sharing |
| `feature_not_available` | Requires higher plan (Enterprise) | Check `GET /users/me/capabilities` |
| `quota_exceeded` | Trial quota exhausted (lifetime limit) | Upgrade plan |

### 404 — Not Found

| Error Code | Cause | Fix |
|------------|-------|-----|
| `design_not_found` | Design ID doesn't exist | Verify ID, check if deleted |
| `folder_not_found` | Folder ID doesn't exist | Use `root` or `uploads` for special folders |
| `asset_not_found` | Asset deleted or wrong ID | Re-upload asset |
| `endpoint_not_found` | Wrong API path | Check API reference |

### 429 — Too Many Requests

| Error Code | Cause | Fix |
|------------|-------|-----|
| `too_many_requests` | Rate limit exceeded | Implement exponential backoff |

### 500 — Internal Error

| Error Code | Cause | Fix |
|------------|-------|-----|
| `internal_error` | Canva server issue | Retry with backoff; report if persistent |

## Critical Issue: Refresh Token Reuse

**Exact error:**
```
error: "invalid_grant"
error_description: "Refresh token used twice. All access tokens granted from this flow are now revoked."
```

**What happened:** Two concurrent requests both tried to use the same refresh token. The second attempt triggered a security revocation of ALL tokens.

**Fix:** Implement a mutex around token refresh:

```typescript
let refreshPromise: Promise<TokenPair> | null = null;

async function getValidToken(): Promise<string> {
  if (isTokenExpired(currentToken)) {
    if (!refreshPromise) {
      refreshPromise = refreshTokens().finally(() => {
        refreshPromise = null;
      });
    }
    const tokens = await refreshPromise;
    currentToken = tokens.accessToken;
    currentRefreshToken = tokens.refreshToken; // MUST store new refresh token
  }
  return currentToken;
}
```

**Recovery:** User must re-authorize from scratch (full OAuth flow again).

## Async Job Failures

### Export Failures

| Error Code | Cause | Fix |
|------------|-------|-----|
| `license_required` | Design uses premium content user hasn't purchased | Purchase content or remove premium elements |
| `approval_required` | Enterprise approval workflow blocking | Get design approved first |
| `internal_failure` | Server error during export | Retry; if persistent, try different format |

### Import Failures

| Error Code | Cause | Fix |
|------------|-------|-----|
| `invalid_file` | Corrupted or unsupported format | Check the 19 supported import formats |
| `duplicate_import` | Same file already imported | Use existing design |
| `fetch_failed` | URL unreachable | Ensure URL is public and accessible |
| `design_creation_throttled` | Rate limited | Wait and retry |

### Autofill Failures

| Error Code | Cause | Fix |
|------------|-------|-----|
| `autofill_error` | Data type mismatch | Match field types from dataset endpoint |
| `create_design_error` | Design creation failed | Retry; check template is valid |

### Asset Upload Failures

| Error Code | Cause | Fix |
|------------|-------|-----|
| `file_too_big` | Exceeds size limit | Images < 50MB, videos < 500MB |
| `import_failed` | Processing error | Re-upload; check file integrity |
| `fetch_failed` | URL not accessible | Use public URL, not localhost |

### Resize Failures

| Error Code | Cause | Fix |
|------------|-------|-----|
| `trial_quota_exceeded` | Free plan resize limit hit | Upgrade to Pro |
| `design_resize_error` | Cannot resize this design type | Cannot resize Docs or Code designs |

## MCP Connection Issues

### Canva Dev MCP (`@canva/cli`)

| Problem | Cause | Fix |
|---------|-------|-----|
| Tools not showing | Config not saved or client not restarted | Save config file, fully restart IDE/app |
| `npx` fails | Node.js too old | Install Node.js 22.16+ |
| Wrong/stale responses | Stale conversation context | Start a new chat session |
| Agent mode required | MCP tools only work in agent mode | Switch to Agent mode (Cursor/VS Code) |

### Canva AI Connector

| Problem | Cause | Fix |
|---------|-------|-----|
| "Canva not connected" | OAuth flow not completed | Settings → Connectors → Canva → Connect |
| Connector disabled in chat | Not toggled on for this chat | Chat settings → Connectors → toggle Canva on |
| "Permission denied" | Org admin disabled connector | Ask admin to enable in Admin Dashboard |
| Actions failing silently | Specific tools disabled | Canva Settings → Integrations → check tool toggles |

## Enterprise Feature Gates

If you hit `feature_not_available` (403), check capabilities:

```typescript
const { capabilities } = await fetch('/v1/users/me/capabilities', {
  headers: { Authorization: `Bearer ${token}` },
}).then(r => r.json());

console.log('Available:', capabilities);
// Free: []
// Pro: ["resize"]
// Enterprise: ["autofill", "brand_template", "resize", "team_restricted_app"]
```

| Feature | Required Plan | Error if Missing |
|---------|--------------|------------------|
| Resize | Pro / Teams / Enterprise | `trial_quota_exceeded` or `feature_not_available` |
| Autofill | Enterprise | `feature_not_available` |
| Brand Templates | Enterprise | `feature_not_available` |
| Transparent PNG | Pro+ | Export may silently use white background |
| Pro export quality | Pro+ | Falls back to regular quality |

## CORS Issues

**Symptom:** `TypeError: Failed to fetch` or CORS error in browser console.

**Cause:** Canva blocks browser requests to token endpoints.

**Fix:** All OAuth token operations (exchange, refresh, revoke, introspect) MUST be server-side.

```
❌ Browser → api.canva.com/rest/v1/oauth/token  (CORS blocked)
✅ Browser → Your Backend → api.canva.com/rest/v1/oauth/token  (Works)
```

## Webhook Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| No events received | Missing `collaboration:event` scope | Re-authorize with correct scopes |
| Signature mismatch | Body parsed and re-stringified | Verify against raw request body, not parsed JSON |
| Sporadic missed events | Endpoint returning non-200 | Always return HTTP 200 to acknowledge |
| Replay attacks | No timestamp validation | Verify payload timestamp is recent (< 5 min) |

**Webhook signature verification:**
```typescript
import crypto from 'crypto';

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
```

## URL Expiration Quick Reference

| URL Type | Expires | Action |
|----------|---------|--------|
| Export download | 24 hours | Download and store immediately |
| Design edit/view | 30 days | Safe for short-term sharing |
| Thumbnail | 15 minutes | Cache locally or re-fetch |
| Asset upload URL | Varies | Use promptly after creation |

## Known Limitations

1. No real-time design element editing via REST API (Connect API creates/exports, doesn't edit elements)
2. Resize always creates a new design — no in-place resize
3. No bulk operations — most endpoints operate on one resource at a time
4. No webhook for job completion — must poll
5. Video assets not returned from folder listing
6. Large imports may split into multiple designs
7. Animated GIFs/WebP rejected — only single-frame accepted
8. Free plan upscaling limited to 1.125× multiplication factor
9. Preview APIs (Comments, Webhooks, Resize) may have breaking changes
10. Scopes are not hierarchical — `write` never implies `read`
