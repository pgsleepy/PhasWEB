# PhasWEB

> A lightweight Next.js app for a shared evidence journal with optional "0 Sanity / 0 Evidence" helper features and real-time sync.

PhasWEB was originally created to let people keep a shared journal with attached evidence and extra "ghost" metadata that can be useful for low- or zero-evidence/zero-sanity workflows. The project has since been discontinued and the evidence data included here is no longer up-to-date — the repository is public so others can fork, iterate, or use it locally.

Tech stack

- Next.js (React)
- Tailwind CSS
- DaisyUI
- socket.io for real-time synchronization

Key features

- Shared Evidence Journal — keep notes and attach evidence files that can be viewed by collaborators in real time.
- Real-time updates — entries and evidence sync across clients using socket.io.
- Ghost / extra metadata — store optional "ghost" information alongside entries to support 0-evidence / 0-sanity modes.
- Designed to be forked and extended — minimal opinionated architecture so contributors can add features.

Status

This project is discontinued. The included evidence content is out-of-date. The code can still be used as a starting point or run locally for experimentation.

Getting it up and running (local development)

Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Git

Local steps

1. Clone the repo

   git clone https://github.com/pgsleepy/PhasWEB.git
   cd PhasWEB

2. Install dependencies

   npm install
   # or
   yarn install

3. Environment

   - If there is an `.env.example` file, copy it to `.env` and adjust variables.
   - Recommended environment variables (adjust to your code):
     - NEXT_PUBLIC_SOCKET_URL — URL clients use to reach the socket server (e.g. `http://localhost:3001` for local testing)
     - SOCKET_SERVER_PORT — port where the socket server runs (default suggestion: 3001)
     - NODE_ENV — `development` or `production`
     - SSL_CERT_PATH / SSL_KEY_PATH — (optional) paths to SSL cert/key if running socket server over HTTPS

4. Run the app in development

   npm run dev
   # or
   yarn dev

   By default Next.js dev runs on http://localhost:3000. If you run a separate socket server for real-time features, run it locally (for example on port 3001) and set NEXT_PUBLIC_SOCKET_URL accordingly.

Production / Deployment notes

- socket.io server: For production you should host the socket server on a VPS (or a cloud VM) and expose it at a domain name. Many deployments put a reverse proxy (nginx, Caddy) in front of the socket process.
- SSL / HTTPS: If you expose the app or the socket server on the public web, you must configure valid TLS certificates. Two common approaches:
  - Let's Encrypt (recommended for production): use certbot or an automated reverse proxy (Caddy) to obtain and renew certificates.
  - Self-signed certificates (for testing only):

    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/CN=localhost"

  If you use a reverse proxy (nginx), configure the proxy to terminate TLS and forward WebSocket connections to the socket server.

Example nginx snippet (basic idea):

  server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
  }

  server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location /socket.io/ {
      proxy_pass http://127.0.0.1:3001;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header Host $host;
    }

    location / {
      proxy_pass http://127.0.0.1:3000; # Next.js server
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }

Running the socket server on a VPS

1. Provision a VPS with Node.js installed (or use your cloud provider's VM).
2. Clone or copy the socket server portion of the repository to the VPS.
3. Install dependencies and run the socket server with a process manager such as pm2 or systemd:

   pm2 start socket-server.js --name phasweb-socket

4. Configure DNS for the domain that will serve the site, obtain TLS certs, and configure a reverse proxy as above.
5. Update the client app environment (NEXT_PUBLIC_SOCKET_URL) to point to the public socket URL (e.g. `https://socket.example.com` or `https://example.com/socket.io`).

Security & certificates

- For public deployments, always use certificates issued by a trusted CA (e.g. Let's Encrypt). Self-signed certificates will cause browser warnings and are only for testing.
- If you terminate TLS at a reverse proxy, keep internal traffic on a private network or localhost; do not expose internal ports.

Contributing

PhasWEB is public so others can fork and extend it. If you make improvements, please open a pull request or create an issue describing the change.

License

- The original repository does not specify a license. If you plan to reuse this code, consider adding a LICENSE file and pick an open-source license.

Notes from the original author

- This project has been discontinued and the evidence data is out-of-date.
- The repository is published so others can iterate, copy, or use it locally for experimentation.

If you'd like, I can fine-tune this README with exact environment variables, scripts, or certificate paths once you tell me where the socket server code lives (file path) or what the preferred ports and env names are.
