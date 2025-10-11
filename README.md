# Node.js CI/CD Deployment to AWS EC2 Using GitHub Actions

This repository demonstrates an easy way to automate the deployment of a Node.js application to an AWS EC2 instance using GitHub Actions. This setup helps you test and deploy your app automatically on every push to the main branch.

---

## What You Will Learn

- How to configure GitHub Actions workflow to run tests and deploy your Node.js app.
- How to connect GitHub Actions with your EC2 instance via SSH.
- Basics of PM2 process manager and Nginx setup for Node.js apps.
- Steps to keep your app up-to-date using CI/CD.

---

## Prerequisites

Before you start, you need:

- An AWS EC2 instance running Ubuntu or a similar Linux OS.
- Node.js installed on your EC2 (version 18.x).
- PM2 installed globally on EC2 for managing your app process.
- Nginx installed and configured as a reverse proxy on EC2.
- SSH key pair set up and associated with your EC2 instance.
- Your Node.js app checked into a GitHub repository.
- Basic understanding of Git, SSH, and Node.js.

---

## Quick Setup Guide

### 1. Clone Your Project on EC2

SSH into your EC2 server and clone your project:

```

git clone https://github.com/Abhishek78394/nodejs-cicd.git /var/www/nodejs-app
cd /var/www/nodejs-app
npm install

```

### 2. Install PM2 and Start Your App

```

sudo npm install -g pm2
pm2 start app.js --name nodejs-cicd
pm2 save

```

Make sure to replace `app.js` with your main server file.

### 3. Configure Nginx (Basic Example)

Edit your Nginx config to proxy requests to your Node.js app:

```

server {
listen 80;
server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    }

```

Reload Nginx:

```

sudo systemctl reload nginx

```

### 4. Add Your SSH Key Secrets in GitHub

Go to GitHub repository Settings > Secrets > Actions and add:

- `EC2_HOST` (your EC2 IP address)
- `EC2_USER` (SSH username, e.g., `ubuntu`)
- `EC2_SSH_KEY` (private SSH key content)
- `EC2_PORT` (usually `22`)

### 5. Understand the GitHub Actions Workflow

The GitHub Actions workflow does the following on every push to `main`:

- Checks out your code.
- Installs Node.js and dependencies.
- Runs tests (if any).
- SSH into EC2 and:
  - Pulls latest code.
  - Installs production dependencies.
  - Restarts the app process via PM2.
  - Reloads Nginx.

You can find the workflow in `.github/workflows/deploy-nodejs-ec2.yml`.

### 6. Push your changes to trigger deployment

Once set up, committing changes and pushing to `main` branch will automatically deploy your app to EC2.

---

## Tips for Success

- Ensure your EC2 security group allows SSH access.
- PM2 process name in your workflow matches the saved process (`nodejs-cicd`).
- Use environment variables for sensitive data.
- Keep your SSH key secure and never expose it publicly.

---

## Useful Commands for EC2

- View PM2 process logs:

```

pm2 logs nodejs-cicd

```

- Restart PM2 process manually:

```

pm2 restart nodejs-cicd

```

- Check Nginx status and logs:

```

sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

```

---

## Learn More

For a detailed walkthrough on automating Node.js deployments with GitHub Actions and AWS EC2, check out this blog post by Abhishek Joshi:

[Automating Node.js Deployments with GitHub Actions and AWS](https://abhishekjoshi-dev.medium.com/automating-node-js-deployments-with-github-actions-and-aws-c3ee731a4d09)

---

Feel free to open issues or contribute!

#### Happy Deploying! 🚀