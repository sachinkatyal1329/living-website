# Living Website Setup

## Prerequisites

- GitHub account
- Twilio account (free tier works)
- Cloudflare account (free tier works)
- Anthropic API key

## Step 1: Create GitHub Repository

1. Create a new GitHub repository
2. Push this code to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main`, folder: `/ (root)`
   - Save

4. Create the `edit-request` label:
   - Go to Issues → Labels → New label
   - Name: `edit-request`
   - Create label

## Step 2: Add GitHub Secrets

Go to Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

| Secret | Value |
|--------|-------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `TWILIO_ACCOUNT_SID` | From Twilio Console |
| `TWILIO_AUTH_TOKEN` | From Twilio Console |
| `TWILIO_PHONE_NUMBER` | Your Twilio phone number (e.g., `+15551234567`) |
| `WEBSITE_URL` | Your GitHub Pages URL (e.g., `https://username.github.io/repo`) |

## Step 3: Set Up Twilio

1. Sign up at [twilio.com](https://www.twilio.com)
2. Get a phone number (Messaging → Try it out → Get a phone number)
3. Note your Account SID and Auth Token from the Console Dashboard

## Step 4: Deploy Cloudflare Worker

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Navigate to the worker directory:
   ```bash
   cd cloudflare-worker
   ```

4. Add secrets:
   ```bash
   wrangler secret put GITHUB_TOKEN
   # Paste a GitHub Personal Access Token with `repo` scope

   wrangler secret put GITHUB_OWNER
   # Your GitHub username

   wrangler secret put GITHUB_REPO
   # Your repository name
   ```

5. Deploy:
   ```bash
   wrangler deploy
   ```

6. Note the worker URL (e.g., `https://living-website-sms.YOUR_SUBDOMAIN.workers.dev`)

## Step 5: Connect Twilio to Cloudflare Worker

1. In Twilio Console, go to Phone Numbers → Manage → Active numbers
2. Click your phone number
3. Under "Messaging Configuration":
   - Set "A message comes in" webhook to your Cloudflare Worker URL
   - Method: HTTP POST
4. Save

## Step 6: Update the Phone Number

Edit `index.html` and replace the placeholder phone number with your actual Twilio number:

```html
<div id="phone-display">
    +1 (555) 123-4567  <!-- Replace with your Twilio number -->
    <small>text to edit this website</small>
</div>
```

Commit and push.

## Testing

1. Text your Twilio number with something like "make the background blue"
2. You should get an immediate response: "Got it! Your edit is being processed..."
3. Check GitHub Issues - a new issue should appear
4. Watch the Actions tab - Claude should process the edit
5. After ~30-60 seconds, you'll get a confirmation SMS
6. Visit your GitHub Pages URL to see the change

## Troubleshooting

**Issue not being created:**
- Check Cloudflare Worker logs: `wrangler tail`
- Verify GITHUB_TOKEN has `repo` scope

**Claude not running:**
- Check the Actions tab for errors
- Verify ANTHROPIC_API_KEY is set correctly
- Make sure the issue has the `edit-request` label

**No confirmation SMS:**
- Check Twilio logs in the Console
- Verify all Twilio secrets are correct

## Cost Estimates

- **Cloudflare Worker**: Free tier (100k requests/day)
- **Twilio**: ~$1/month for phone number + $0.0079/SMS
- **GitHub Actions**: Free for public repos, 2000 min/month for private
- **Anthropic API**: ~$0.01-0.05 per edit (depending on complexity)
