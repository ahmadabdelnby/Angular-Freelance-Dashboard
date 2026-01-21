<div align="center">

# 🎛️ FreelanceHub Admin Dashboard

### Angular-based Admin Panel for FreelanceHub Platform

[![Angular](https://img.shields.io/badge/Angular-20.3-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

*🎓 ITI Intensive Code Camp Graduation Project - MERN Stack Track*

[Live Demo](#) • [Main Platform](../React-Freelance) • [Backend API](../Freelancing-node)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## 🎯 About The Project

The **FreelanceHub Admin Dashboard** is a powerful administrative panel built with Angular for managing the FreelanceHub freelancing platform. This dashboard provides administrators with comprehensive tools to manage users, jobs, contracts, payments, and platform settings.

Built as part of the **ITI (Information Technology Institute) Intensive Code Camp** - 4 Months MERN Stack Track graduation project.

---

## ✨ Key Features

### 📊 Dashboard Analytics
- 📈 Real-time Statistics & Metrics
- 📉 Interactive Charts (Chart.js)
- 📋 Overview of Platform Activity
- 🔔 Recent Notifications

### 👥 User Management
- 👤 View All Users (Clients & Freelancers)
- ✅ User Verification Management
- 🚫 Ban/Unban Users
- 📧 User Activity Tracking

### 💼 Job Management
- 📝 View & Moderate Jobs
- 🏷️ Manage Categories & Subcategories
- 🔧 Manage Skills & Specialties
- ❌ Remove Inappropriate Listings

### 📄 Contract & Proposal Management
- 📊 Monitor Active Contracts
- 💰 Track Contract Values
- 📋 Review Proposals
- ⚖️ Handle Disputes

### 💳 Payment Management
- 💵 Transaction Overview
- 💸 Withdrawal Requests
- 📈 Revenue Reports
- 🏦 Payment History

### ⚙️ Platform Settings
- 🎨 Platform Configuration
- 📊 Fee Management
- 🔐 Security Settings
- 📧 Email Templates

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Angular 20 | Frontend Framework |
| TypeScript | Programming Language |
| RxJS | Reactive Programming |
| Bootstrap 5 | UI Framework |
| Bootstrap Icons | Icon Library |
| Chart.js | Data Visualization |
| JWT Decode | Token Management |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmadabdelnby/Angular-Freelance-Dashboard.git
   cd Angular-Freelance-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000'
   };
   ```

4. **Run the development server**
   ```bash
   ng serve
   ```

5. **Open your browser**
   ```
   http://localhost:4200
   ```

### Building for Production

```bash
ng build --configuration production
```

---

## 📁 Project Structure

```
src/app/
├── core/                    # Core module (guards, interceptors)
├── guards/                  # Route guards
├── pages/                   # Feature pages
│   ├── dashboard-home/      # Main dashboard
│   ├── users/               # User management
│   ├── jobs/                # Job management
│   ├── categories/          # Category management
│   ├── skills/              # Skills management
│   ├── specialties/         # Specialties management
│   ├── contracts/           # Contract management
│   ├── proposals/           # Proposal management
│   ├── portfolio/           # Portfolio management
│   ├── platform-settings/   # Platform configuration
│   └── collection-page/     # Data collections
├── pipes/                   # Custom pipes
├── services2/               # API services
└── configs/                 # App configurations
```

---

## 📸 Screenshots

<div align="center">

| Dashboard Overview | User Management |
|:------------------:|:---------------:|
| ![Dashboard](screenshots/dashboard.png) | ![Users](screenshots/users.png) |

| Jobs Management | Categories |
|:---------------:|:----------:|
| ![Jobs](screenshots/jobs.png) | ![Categories](screenshots/categories.png) |

</div>

---

## 🔗 Related Repositories

- **Main Platform (React)**: [new-react-freelance](https://github.com/ahmadabdelnby/new-react-freelance)
- **Backend API (Node.js)**: [new-node-freelance](https://github.com/ahmadabdelnby/new-node-freelance)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by ITI MERN Stack Team

</div>
