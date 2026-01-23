/**
 * Cloudflare Worker: Twilio SMS → GitHub Issue
 *
 * Receives incoming SMS from Twilio webhook and creates a GitHub Issue
 * to trigger the Claude Code Action.
 */

export default {
  async fetch(request, env) {
    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Parse Twilio's form-encoded webhook payload
      const formData = await request.formData();
      const from = formData.get('From');       // Sender's phone number
      const body = formData.get('Body');       // SMS message content

      if (!from || !body) {
        return new Response('Missing required fields', { status: 400 });
      }

      // Create GitHub Issue
      const issueResponse = await fetch(
        `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/issues`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'User-Agent': 'living-website-worker',
            'X-GitHub-Api-Version': '2022-11-28'
          },
          body: JSON.stringify({
            title: `Edit request: ${body.substring(0, 50)}${body.length > 50 ? '...' : ''}`,
            body: `## Edit Request\n\n${body}\n\n---\n**From:** \`${from}\`\n**Received:** ${new Date().toISOString()}`,
            labels: ['edit-request']
          })
        }
      );

      if (!issueResponse.ok) {
        const error = await issueResponse.text();
        console.error('GitHub API error:', error);
        return twimlResponse('Sorry, something went wrong. Please try again.');
      }

      // Return TwiML response to acknowledge receipt
      return twimlResponse('Got it! Your edit is being processed. You\'ll get a confirmation when it\'s live.');

    } catch (error) {
      console.error('Worker error:', error);
      return twimlResponse('Sorry, something went wrong. Please try again.');
    }
  }
};

// Helper to generate TwiML response
function twimlResponse(message) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(message)}</Message>
</Response>`;

  return new Response(twiml, {
    headers: { 'Content-Type': 'text/xml' }
  });
}

// Escape special XML characters
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
