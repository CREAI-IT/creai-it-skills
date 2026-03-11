# Canva OAuth 2.0 Authentication

Load when user needs to set up OAuth for direct API integration, debug auth issues, or manage tokens.

## OAuth 2.0 + PKCE Flow

Canva uses **Authorization Code flow with PKCE (SHA-256)**. No other flow is supported.

```
1. Generate PKCE (code_verifier + code_challenge) + state
2. Redirect user → Canva authorization URL
3. Receive authorization code at redirect_uri
4. Exchange code for tokens (server-side only)
5. Use access_token for API calls
6. Refresh with refresh_token when expired
```

## Step 1: Generate PKCE Artifacts

```typescript
import crypto from 'crypto';

// Code verifier: 43-128 chars, [A-Za-z0-9-._~]
const codeVerifier = crypto.randomBytes(96).toString('base64url');

// Code challenge: SHA-256 hash, base64url-encoded
const codeChallenge = crypto
  .createHash('sha256')
  .update(codeVerifier)
  .digest('base64url');

// State: CSRF protection
const state = crypto.randomBytes(96).toString('base64url');

// Store codeVerifier + state server-side (session or DB)
```

## Step 2: Authorization URL

```
https://www.canva.com/api/oauth/authorize
  ?code_challenge={codeChallenge}
  &code_challenge_method=s256
  &scope={space-separated scopes}
  &response_type=code
  &client_id={CANVA_CLIENT_ID}
  &state={state}
  &redirect_uri={your_redirect_uri}
```

| Parameter | Required | Notes |
|-----------|----------|-------|
| `code_challenge` | Yes | SHA-256 of code_verifier, base64url |
| `code_challenge_method` | Yes | `s256` |
| `scope` | Yes | Space-separated, URL-encoded as `%20` |
| `response_type` | Yes | `code` |
| `client_id` | Yes | From Developer Portal |
| `state` | Recommended | CSRF protection |
| `redirect_uri` | Conditional | Required if >1 redirect URL registered |

User authorizes → Canva redirects to: `{redirect_uri}?code={auth_code}&state={state}`

## Step 3: Token Exchange (Server-Side Only)

```typescript
const response = await fetch('https://api.canva.com/rest/v1/oauth/token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    code_verifier: storedCodeVerifier,
    redirect_uri: redirectUri,
  }),
});

const { access_token, refresh_token, expires_in, scope } = await response.json();
// expires_in = 14400 (4 hours)
```

**CORS blocks this from browsers.** Must be server-side.

## Step 4: Refresh Tokens

Same endpoint, different grant_type:

```typescript
const response = await fetch('https://api.canva.com/rest/v1/oauth/token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: storedRefreshToken,
  }),
});

const { access_token, refresh_token: newRefreshToken, expires_in } = await response.json();
// CRITICAL: Store newRefreshToken — old one is now invalid
```

**Refresh tokens are single-use.** Each refresh returns a NEW refresh token. Reusing an old refresh token triggers **full revocation of all tokens in that flow**.

## Token Revocation

```typescript
await fetch('https://api.canva.com/rest/v1/oauth/revoke', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({ token: refreshToken }),
});
```

Revoking a refresh token also revokes all access tokens from that flow AND revokes the user's consent (they must re-authorize).

## Token Introspection

```typescript
const response = await fetch('https://api.canva.com/rest/v1/oauth/introspect', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({ token: accessToken }),
});

const { active, scope, exp, sub } = await response.json();
// active: boolean, exp: unix timestamp, sub: obfuscated Canva user ID
```

## Creating an Integration

1. Go to [canva.com/developers](https://www.canva.com/developers/) → "Your integrations"
2. Click **"Create an integration"**
3. Choose: **Public** (all users, requires review) or **Private** (your team, Enterprise only)
4. Accept Developer Terms
5. Copy **Client ID** from Credentials
6. Click **"Generate secret"** → store **Client Secret** immediately (shown once, prefix: `cnvca`)
7. **Scopes** menu: select only what you need
8. **Authentication** menu: add redirect URLs (1-10)

**MFA required** on your Canva account.

## Redirect URI Rules

| Environment | Format | Protocol |
|-------------|--------|----------|
| Development | `http://127.0.0.1:<port>/path` | HTTP allowed |
| Production | `https://yourdomain.com/path` | HTTPS required |

**Use `127.0.0.1`, NOT `localhost`** — Canva rejects `localhost`.

Remove all development URIs before submitting a public integration.

## Recommended Scope Sets

**Read-only:**
```
design:meta:read design:content:read asset:read folder:read profile:read
```

**Design creation:**
```
design:meta:read design:content:read design:content:write asset:read asset:write folder:read profile:read
```

**Brand template autofill (Enterprise):**
```
brandtemplate:meta:read brandtemplate:content:read design:content:write asset:read asset:write profile:read
```

**Full access:**
```
asset:read asset:write brandtemplate:content:read brandtemplate:meta:read comment:read comment:write design:content:read design:content:write design:meta:read design:permission:read design:permission:write folder:read folder:write folder:permission:read folder:permission:write profile:read
```

## Environment Variables

```bash
CANVA_CLIENT_ID=your_client_id
CANVA_CLIENT_SECRET=your_client_secret
BASE_CANVA_CONNECT_API_URL=https://api.canva.com/rest
BASE_CANVA_CONNECT_AUTH_URL=https://www.canva.com/api
```

**China region:**
```bash
BASE_CANVA_CONNECT_API_URL=https://api.canva.cn/rest
BASE_CANVA_CONNECT_AUTH_URL=https://www.canva.cn/api
```

## Token Storage Best Practices

1. Store client secret in a vault (AWS Secrets Manager, HashiCorp Vault) or encrypted env vars
2. Encrypt access and refresh tokens at rest, store separately
3. Link tokens to Canva user ID and team ID
4. Never log tokens
5. Delete tokens when user revokes consent or deletes account
6. Use HTTP-only secure cookies or server-side sessions
7. Implement rate-limiting on token refresh to prevent concurrent refresh race conditions

## Concurrent Refresh Protection

Multiple simultaneous requests can trigger refresh token reuse. Implement a mutex:

```typescript
let refreshPromise: Promise<string> | null = null;

async function getValidToken(): Promise<string> {
  if (isTokenValid(currentAccessToken)) return currentAccessToken;

  // Deduplicate concurrent refresh attempts
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}
```

This prevents the "Refresh token used twice" error that revokes all tokens.
