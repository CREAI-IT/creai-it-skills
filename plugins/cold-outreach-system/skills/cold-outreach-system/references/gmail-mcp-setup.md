# Gmail MCP Setup Guide

This guide walks you through setting up Gmail integration so the Cold Outreach System can create drafts and send emails directly from Claude Code.

**Time required**: ~10 minutes
**What you'll get**: Claude Code can create Gmail drafts, send emails, search your inbox, and read replies — all from within the conversation.

## Choose Your Setup Option

### Option A: Gmail-Only MCP (Recommended — Simplest)

**Package**: `@gongrzhe/server-gmail-autoauth-mcp`

This is the simplest Gmail MCP server. 17 tools including send, draft, search, and label management.

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click the project dropdown at the top → "New Project"
3. Name it something like "Claude Gmail MCP"
4. Click "Create"

#### Step 2: Enable Gmail API

1. In your new project, go to **APIs & Services → Library**
2. Search for "Gmail API"
3. Click on it → Click "Enable"

#### Step 3: Set Up OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. Select "External" → Click "Create"
3. Fill in:
   - App name: "Claude Gmail MCP"
   - User support email: your email
   - Developer contact: your email
4. Click "Save and Continue"
5. On the Scopes page, click "Add or remove scopes"
6. Add these scopes:
   - `https://www.googleapis.com/auth/gmail.modify`
   - `https://www.googleapis.com/auth/gmail.send`
   - `https://www.googleapis.com/auth/gmail.readonly`
7. Click "Save and Continue"
8. On Test Users page, click "Add Users" → add your Gmail address
9. Click "Save and Continue" → "Back to Dashboard"

#### Step 4: Create OAuth Credentials

1. Go to **APIs & Services → Credentials**
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: **Desktop app**
4. Name: "Claude Gmail MCP"
5. Click "Create"
6. Click "Download JSON" — save the file

#### Step 5: Install and Configure

Run these commands in your terminal:

```bash
# Create the config directory
mkdir -p ~/.gmail-mcp

# Move your downloaded credentials file
mv ~/Downloads/client_secret_*.json ~/.gmail-mcp/gcp-oauth.keys.json

# Authenticate (opens browser)
npx @gongrzhe/server-gmail-autoauth-mcp auth
```

A browser window will open — sign in with your Google account and authorize access.

#### Step 6: Add to Claude Code

Add the MCP server to your Claude Code settings. Run:

```bash
claude mcp add gmail -- npx @gongrzhe/server-gmail-autoauth-mcp
```

Or manually add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["@gongrzhe/server-gmail-autoauth-mcp"]
    }
  }
}
```

#### Step 7: Verify

Restart Claude Code and ask: "Search my Gmail for recent emails." If it works, you're set up.

**Available tools after setup:**
- `send_email` — Send emails
- `draft_email` — Create drafts
- `read_email` — Read email content
- `search_emails` — Search with Gmail query syntax
- `modify_email` — Add/remove labels
- `list_email_labels` — List all labels
- And 11 more (label management, filters, batch operations)

---

### Option B: Google Workspace CLI (Official Google — More Powerful)

**Package**: `@googleworkspace/cli`

Official Google tool. Covers Gmail + Calendar + Drive + Docs + Sheets. More powerful but slightly more complex setup.

#### Step 1: Install

```bash
npm install -g @googleworkspace/cli
```

#### Step 2: Set Up Auth

```bash
# Interactive setup — creates GCP project and enables APIs automatically
gws auth setup

# Login
gws auth login
```

This opens a browser for Google authentication.

#### Step 3: Add to Claude Code

```bash
claude mcp add google-workspace -- gws mcp -s gmail
```

Or manually add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "gws",
      "args": ["mcp", "-s", "gmail"]
    }
  }
}
```

To include Calendar and Drive too:
```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "gws",
      "args": ["mcp", "-s", "gmail,calendar,drive"]
    }
  }
}
```

#### Step 4: Verify

Restart Claude Code and test.

---

### Option C: Full Workspace MCP (Python — Most Tools)

**Package**: `workspace-mcp` (PyPI)

100+ tools across 11 Google services. Best if you want full Google Workspace integration.

```bash
pip install workspace-mcp
```

See [workspace-mcp documentation](https://github.com/taylorwilsdon/google_workspace_mcp) for full setup.

---

## Troubleshooting

### "OAuth consent screen not configured"
→ Go back to Step 3 of Option A. Make sure you added your email as a test user.

### "Access denied" or "403 Forbidden"
→ Make sure the Gmail API is enabled (Step 2). Check that the correct scopes are added to the OAuth consent screen.

### "Token expired"
→ Re-run the auth command:
```bash
npx @gongrzhe/server-gmail-autoauth-mcp auth
```

### "MCP server not found" in Claude Code
→ Make sure the command works in your terminal first:
```bash
npx @gongrzhe/server-gmail-autoauth-mcp
```
If it errors, try: `npm install -g @gongrzhe/server-gmail-autoauth-mcp`

### "Permission denied" on first use
→ Google's OAuth consent screen is in "Testing" mode. Make sure your email is listed as a test user. For production use, you'd need to verify the app, but for personal use "Testing" mode works fine.

## Security Notes

- Your OAuth credentials are stored locally in `~/.gmail-mcp/`
- Tokens are not shared with anyone — they stay on your machine
- You can revoke access anytime at [Google Account Permissions](https://myaccount.google.com/permissions)
- The MCP server only has access to the scopes you granted
- We recommend using a secondary domain for cold outreach (not your main Gmail)

## Using Gmail MCP with the Cold Outreach System

Once set up, the Cold Outreach System will:

1. **Create drafts** — All outreach emails appear as drafts in your Gmail. Review before sending.
2. **Send emails** — When you approve, sends directly from your Gmail.
3. **Search replies** — Finds responses to your outreach emails.
4. **Categorize replies** — Identifies interested prospects, objections, and unsubscribes.
5. **Generate follow-ups** — Creates follow-up drafts based on reply type.

**Default behavior**: Draft mode (creates drafts, you send manually). You can switch to direct send by telling the skill "send this directly."
