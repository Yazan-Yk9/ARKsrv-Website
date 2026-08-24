# ARKsrv - Infrastructure Automation & Full-Stack Web Management

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## Project Overview

**ARKsrv** is a comprehensive portfolio project designed to showcase my expertise in **Linux System Administration, Infrastructure as Code (IaC), and Full-Stack Web Development.**

It represents a complete, production-ready ecosystem where I designed, automated, and deployed a dynamic web application from the ground up. The project demonstrates my ability to bridge the gap between traditional system operations and modern DevOps practices.

---

## Core Skills Demonstrated

| Domain | Technologies & Tools |
| :--- | :--- |
| **Automation & Orchestration** | Ansible (Roles, Playbooks, Variables, Handlers) |
| **Containerization** | Docker & Docker Compose (Multi-container orchestration) |
| **Web Server & Proxy** | Nginx & Nginx Proxy Manager (Reverse proxy, SSL/TLS management) |
| **Backend Development** | PHP 8.2 (Custom admin panel & dynamic content management) |
| **Frontend Development** | HTML5, CSS3, JavaScript, Bootstrap 5 (RTL), Font Awesome |
| **Linux Administration** | Ubuntu Server, Systemd, User management, Firewall (UFW) |
| **Security** | Let's Encrypt (SSL), Basic Authentication, Secure backup strategies |

---

## Architecture & Problem Solving

### 1. Infrastructure as Code (IaC)
Instead of manually configuring servers, I built a complete **Ansible automation suite** that provisions a fresh Ubuntu server into a fully functional web host with a single command. This includes:
- **Role-based design:** Separate Ansible roles for `docker` installation and `deploy` logic.
- **Idempotent operations:** Ensures the system can be run multiple times without breaking.
- **GitOps workflow:** The application code is pulled directly from a public GitHub repository, ensuring version control and easy updates.

### 2. Zero-Downtime Data Migration & Disaster Recovery
One of the project's critical challenges was migrating an existing live website (including its SSL certificates and Nginx Proxy Manager configurations) to a new server. I solved this by:
- Creating a **secure backup** (`npm_backup.tar.gz`) of sensitive operational data (`npm-data`, `npm-letsencrypt`).
- Automating the **restoration** process within the Ansible Playbook.
- Implementing a **post-deployment cleanup** that automatically removes `.git` history and documentation files from the production server, minimizing the attack surface.

### 3. Secure & Dynamic Web Application
The front-facing website is not a static page; it's a fully functional platform with:
- **Dynamic Portfolio:** Projects are managed via a `projects.json` file, making content updates easy.
- **Custom Admin Panel:** A secure PHP backend (`admin9x.php`) protected by Nginx Proxy Manager's Basic Authentication.
- **RTL Support:** Fully supports Arabic content, demonstrating attention to localization and responsive design (Bootstrap 5).

---

## Project Structure

```text
ARKsrv-Website/                     # Infrastructure Automation Layer
├── ansible.cfg
├── group_vars/                     # Centralized variables (paths, repo URLs)
├── inventories/                    # Target server inventory
├── playbooks/
│   └── site.yml                    # Main entry point
└── roles/
    ├── docker/                     # Official Docker installation
    └── deploy/                     # Git clone, data restore, container deployment

arksrv/                              # Application Source Code Layer
├── html/
│   ├── admin9x.php                 # Admin panel backend
│   ├── projects.json               # Project database
│   └── assets/                     # Local Bootstrap, Fonts, Font-Awesome
└── nginx-conf/
    └── default.conf                # Nginx site configuration
```
---

## Deployment Pipeline (CI/CD Workflow)

The entire system is designed to be deployed with a **single command**, reflecting my understanding of continuous integration and delivery concepts:

1.  **Provision:** Ansible connects to the target VPS via SSH.
2.  **Setup:** The `docker` role installs Docker CE from the official repository.
3.  **Fetch:** The `deploy` role clones the latest source code from GitHub.
4.  **Restore:** The backup containing SSL certificates and NPM configurations is uploaded and extracted.
5.  **Launch:** `docker-compose up -d` spins up the Nginx Proxy Manager, Web Server, and PHP-FPM containers.
6.  **Harden:** `.git/` and documentation files are removed automatically from the production server.

---

## Quick Setup (Portfolio Reference)

**Prerequisites:** Ubuntu Server (20.04/22.04), SSH access, Ansible installed locally.

```bash
# Clone the automation repository
git clone https://github.com/Yazan-Yk9/ARKsrv-website.git
cd ARKsrv-Website

# Configure target server IP and variables
nano ansible/inventories/lab/hosts.yml
nano ansible/group_vars/all.yml

# Deploy the entire ecosystem
ansible-playbook -i inventories/lab/hosts.yml playbooks/site.yml --ask-become-pass
```
