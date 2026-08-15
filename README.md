# 📘 ARKsrv - Linux Server Management Solution

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SSL](https://img.shields.io/badge/SSL-5C5C5C?style=for-the-badge&logo=ssl&logoColor=white)
![Certbot](https://img.shields.io/badge/Certbot-3C8C3C?style=for-the-badge&logo=certbot&logoColor=white)




## 🚀 Project Overview
ARKsrv is an integrated system for managing technical projects on Linux servers, designed to display your services and technical solutions professionally. The site includes:

- A landing homepage.
- A detailed services page.
- A dynamic project portfolio.
- An admin panel to manage projects via `projects.json`.

## ✨ Key Features
- **Dynamic project display:** Project cards are read from a `projects.json` file.
- **Easy-to-use admin panel:** Add, edit, and delete projects with fields (icon, description, tags, Markdown content).
- **Responsive (RTL) design:** Fully supports Arabic with Bootstrap 5.
- **Performance optimized:** Uses local fonts, Gzip compression, and static file caching.
- **Custom 404 page:** An attractive error page with quick navigation links.
- **Security:** Admin panel is protected via Nginx Proxy Manager (Basic Auth).

## 🗂️ File Structure
```
arksrv/
├── html/
│   ├── index.html
│   ├── services.html
│   ├── portfolio.html
│   ├── project.html
│   ├── 404.html
│   ├── admin9x.php          # Admin panel
│   ├── projects.json        # Database
│   ├── styel.css
│   ├── admin.css
│   ├── script.js
│   ├── portfolio.js
│   ├── admin.js
│   └── assets/
│       ├── fonts/           # Local Cairo fonts
│       ├── font-awesome/    # Font Awesome (css, js, webfonts folders)
│       └── bootstrap/       # Local Bootstrap
└── nginx-conf/
    └── default.conf         # Nginx configuration for the site
```

## ⚙️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| HTML5, CSS3, JavaScript | Site structure and interactivity |
| Bootstrap 5 (RTL) | Responsive and ready-to-use design |
| Font Awesome 6 | Professional icons |
| PHP 8.2 | Admin panel backend |
| Markdown | Project content writing |
| Docker | Isolated runtime environment (Nginx + PHP-FPM) |
| Nginx Proxy Manager | Main gateway and SSL management |

## 🛠️ How to Run the Project?

### Prerequisites
- Docker and Docker Compose.
- A VPS server or a local environment with `docker-compose` support.

### Setup Steps
```bash
# 1. Clone the repository
git clone https://github.com/your-username/arksrv.git
cd arksrv

# 2. Create the required directories
mkdir -p arksrv/html arksrv/nginx-conf npm-data

# 3. Copy your site files into arksrv/html

# 4. Start the containers
docker-compose up -d
```

### Setting up Nginx Proxy Manager
1. Open `http://YOUR_IP:81` (default credentials: `admin@example.com` / `changeme`).
2. Add a new Proxy Host:
   - **Domain:** `example.com`
   - **Forward Hostname:** `arksrv_website`
   - **Forward Port:** `80`
3. Enable SSL via Let's Encrypt.
4. In the **Advanced** tab, add the following code to protect `admin9x.php`:
```nginx
location ~ /admin9x\.php$ {
    auth_basic "ARKsrv Admin - Restricted";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://arksrv_website:80;
}
```

## 🚀 Future Expansion
- Support for multiple sites via separate containers.
- Monitoring system for server status.
- Remote API for content management.
