# Canva MCP Server Setup

Always load this reference. Required before any Canva design operation.

## Three Integration Paths

Canva offers three distinct integration paths. Choose based on your use case:

| Integration | Purpose | Auth Required | Best For |
|-------------|---------|---------------|----------|
| **AI Connector** | Create, search, edit, export designs via AI | OAuth (browser flow) | Power users automating design work |
| **Dev MCP Server** | Documentation lookup, app scaffolding, code generation | None | Developers building Canva apps/integrations |
| **Claude Built-In Connector** | First-party Claude ↔ Canva integration | OAuth (in-app) | Claude.ai and Claude Desktop users |

## Path A: Canva AI Connector (Design Operations)

The AI Connector lets AI assistants create, search, export, and manage Canva designs.

### Setup for Claude (Built-In — Recommended)

1. Open Claude (web or desktop)
2. Go to **Settings** → **Connectors**
3. Find **Canva** and select it
4. Follow the OAuth prompts to connect your Canva account
5. In a new chat, click the settings icon → toggle **Canva** on in Connectors

No JSON configuration needed — this is a first-party integration.

### Setup via mcp-remote (Alternative for Claude Desktop / Cursor)

```json
{
  "mcpServers": {
    "canva": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@latest",
        "https://mcp.canva.com/mcp"
      ]
    }
  }
}
```

### Available AI Connector Tools

| Action | Description | Plan |
|--------|-------------|------|
| **Search designs** | Find docs, presentations, videos, whiteboards by title/content | All |
| **Generate design** | Create new designs from AI prompts | All |
| **Get design details** | Retrieve metadata, owner, URLs, thumbnails | All |
| **Get design pages** | List pages with thumbnails | All |
| **Export design** | Export as PDF, PNG, JPG, GIF, PPTX, MP4 | All |
| **Import file** | Import external files into Canva | All |
| **Create/manage folders** | Organize projects | All |
| **Resize design** | Create resized copies for different platforms | **Paid only** |
| **Autofill template** | Populate brand templates with data | **Enterprise only** |
| **Access brand templates** | List and browse brand templates | **Enterprise only** |

### Managing Permissions

**User-level:**
1. Go to Canva **Settings** → **Integrations**
2. Find **Canva MCP integration** → **Tools and settings**
3. Toggle individual tools on/off
4. Toggle **Disable all tools** to stop all MCP access

**Organization-level (Teams/Enterprise):**
1. **Admin Dashboard** → **Controls and Permissions**
2. **Third-party integrations** → toggle **Canva AI Connector**

### Disconnecting

- **From Claude**: Settings → Connectors → Canva → ... (More) → Disconnect
- **From Canva**: Settings → Your Profile → Integrations → Disconnect "Canva AI Connector"

## Path B: Canva Dev MCP Server (Developer Tools)

For building Canva apps and integrations. Provides documentation lookup and code generation — does NOT create actual designs.

**Prerequisite**: Node.js 22.16+

### Claude Code

```bash
claude mcp add canva-dev -- npx -y @canva/cli@latest mcp
```

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "canva-dev": {
      "command": "npx",
      "args": ["-y", "@canva/cli@latest", "mcp"]
    }
  }
}
```

### Cursor

`.cursor/mcp.json` in project directory:

```json
{
  "mcpServers": {
    "canva-dev": {
      "command": "npx",
      "args": ["-y", "@canva/cli@latest", "mcp"]
    }
  }
}
```

### VS Code

`.vscode/mcp.json` in workspace:

```json
{
  "servers": {
    "canva-dev": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@canva/cli@latest", "mcp"]
    }
  }
}
```

### Dev MCP Tools

| Tool | Description |
|------|-------------|
| `canva_generate_app` | Scaffold a new Canva app with best practices |
| `canva_adopt_ui_kit` | Migrate UI to Canva's App UI Kit components |
| `canva_localize_app` | Add i18n support with translator notes |
| `canva_design_review` | Run design review with must/should/could recommendations |
| `canva_connect_api` | Generate Connect API client code |
| Documentation queries | Query Apps SDK, Connect APIs, App UI Kit docs |

**Key characteristics:**
- Runs locally (stdio transport) — no data sent externally
- Zero authentication required
- Cannot create actual designs
- npm package: `@canva/cli`

## Path C: Claude Skills (Pre-Built Workflows)

Three ready-to-use skills from [canva-sdks/canva-claude-skills](https://github.com/canva-sdks/canva-claude-skills):

| Skill | Description |
|-------|-------------|
| **Branded Presentation** | Converts outlines into slide decks with Canva brand kits |
| **Design Translation** | Translates all text elements preserving layout |
| **Social Media Resize** | Creates 5 platform-optimized versions, exports as PNGs |

## Verification Test

After setup, verify with a simple operation:

**AI Connector**: "Search my Canva designs" — should return a list of recent designs.

**Dev MCP**: "What APIs does Canva Connect offer?" — should return documentation summary.

If either fails, check:
1. Node.js version ≥ 22.16
2. JSON config syntax is valid
3. Client has been fully restarted after config change
4. For AI Connector: Canva account is connected and toggled on
