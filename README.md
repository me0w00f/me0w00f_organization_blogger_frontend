# Me0w00f Organization Blog WebUI

![](./src/assets/icons/logo-color.png)

## Introduction
Welcome to the official WebUI repository for Me0w00f Organization's blog. This frontend solution is built using Vue3, and in this guide, we will walk you through the steps to get it up and running as well as how to deploy it effectively.

### Technology Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Getting Started 
Before you begin, make sure you have `yarn` installed on your system. If not, you can find instructions [here](https://classic.yarnpkg.com/en/docs/install/).

### Installation
First, clone the repository to your local machine:

```bash
git clone https://github.com/me0w00f/me0w00f_organization_blogger_frontend.git frontend
```
Next, navigate to the `frontend` directory:
```bash
cd frontend
```
Install the necessary dependencies:
```bash
yarn 
```
To start the development server:
```bash
yarn dev
```
Now you can access the application at `http://localhost:5173`.

## Deployment
Our webUI can be deployed using various web servers, but we officially recommend using `nginx`.

### Setting Up nginx

#### Installation
Install `nginx` on your operating system:
- For Arch-based systems:
```bash
sudo pacman -S nginx
```
- For Debian/Ubuntu systems:
```bash
sudo apt install -y nginx
```
- For CentOS/RedHat systems:

```bash
sudo yum install -y nginx
```
#### Configuration
Create a directory to serve the webUI from:
```bash
mkdir -p /var/www/me0w00f_blog_frontend
```
Navigate to the directory:
```bash
cd /var/www/me0w00f_blog_frontend
```
Download the latest static files from the [releases](https://github.com/me0w00f/me0w00f_organization_blogger_frontend/releases):
```bash
curl -o index.tar.gz https://github.com/me0w00f/me0w00f_organization_blogger_frontend/releases/download/%7B%7B version }}/index.tar.gz
```
**Note: Be sure to replace `{{ version }}` with the actual version number you wish to deploy.**

Extract the the contents of `index.tar.gz`:
```bash
tar xzvf index.tar.gz
```
Next, configure nginx to point to your new directory. 

Edit the nginx configuration file, which is typically located at `/etc/nginx/nginx.conf` or `/etc/nginx/sites-available/default`, or create a new one under `/etc/nginx/conf.d/` if you prefer. 

You can use the following example as a template, adjusting paths and settings as needed:

```conf
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/me0w00f_blog_frontend;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

If you're looking to set up a reverse proxy for the location `/api` to the backend at `http://127.0.0.1:8000/api`, you should consider adding the following configuration to your nginx configuration file:

```conf
location /api {
    proxy_pass http://127.0.0.1:8000/api;
    # include other necessary directives for proxying
    ...
}
```

This will forward all requests from `/api` to your backend service. Make sure to reload nginx after updating the config to apply the changes. 

Click [here]() to read the documentation about the backend.

After saving the configuration, test it to ensure there are no syntax errors:
```bash
sudo nginx -t
```
If the test is successful, restart nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

Your Vue.js application should now be served by nginx and accessible via the domain you configured.

#### Conclusion

That's it! You've successfully set up and deployed the Me0w00f Organization Blog WebUI using nginx. 

Please replace `"yourdomain.com"` with your actual domain name before applying the nginx configuration. This guide assumes a certain level of familiarity with server management and command-line operations. 

