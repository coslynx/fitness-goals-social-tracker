<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
fitness-goals-social-tracker
</h1>
<h4 align="center">A web application to help users track their fitness goals and connect with others.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework used">
  <img src="https://img.shields.io/badge/Frontend-React-red" alt="Frontend technologies">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend technologies">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-black" alt="Database used">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-goals-social-tracker?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-goals-social-tracker?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-goals-social-tracker?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "fitness-goals-social-tracker" that provides a comprehensive solution for fitness enthusiasts to track their progress, set goals, and connect with others. It leverages the power of React, Node.js, PostgreSQL, and other technologies to offer a user-friendly and engaging experience.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase follows a modular architectural pattern with separate directories for different functionalities, ensuring easier maintenance and scalability.             |
| 📄 | **Documentation**  | The repository includes a README file that provides a detailed overview of the MVP, its dependencies, and usage instructions.|
| 🔗 | **Dependencies**   | The codebase relies on various external libraries and packages such as React, Next.js, Tailwind CSS, Prisma, and Zustand, which are essential for building and styling the UI components, managing state, and interacting with the database. |
| 🧩 | **Modularity**     | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for different functionalities such as components, pages, and utilities. |
| 🧪 | **Testing**        | Implement unit tests using frameworks like Jest or React Testing Library to ensure the reliability and robustness of the codebase.       |
| ⚡️  | **Performance**    | The performance of the system can be optimized based on factors such as the browser and hardware being used. Consider implementing performance optimizations such as code splitting, caching, and image optimization for better efficiency.|
| 🔐 | **Security**       | Enhance security by implementing measures such as input validation, data encryption, and secure communication protocols.|
| 🔀 | **Version Control**| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | **Integrations**   | Interacts with browser APIs, external services through HTTP requests, and includes integrations with social login APIs like Google and Facebook. |
| 📶 | **Scalability**    | Design the system to handle increased user load and data volume, utilizing caching strategies and cloud-based solutions for better scalability.           |

## 📂 Structure
```text
fitness-goals-social-tracker
├── components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── GoalInput.tsx
│   ├── ProgressChart.tsx
│   └── SocialShareButton.tsx
├── pages
│   ├── api
│   │   ├── auth.ts
│   │   ├── goals.ts
│   │   └── progress.ts
│   ├── _app.tsx
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── login.tsx
├── styles
│   └── global.css
├── utils
│   ├── helpers.ts
│   ├── api.ts
│   ├── auth.ts
│   └── validation.ts
├── config
│   └── next-auth.config.ts
├── middleware
│   └── authentication.ts
├── .env
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json

```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- Docker (Optional for deployment)

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/coslynx/fitness-goals-social-tracker.git`
2. Navigate to the project directory:
   - `cd fitness-goals-social-tracker`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   - `npm run dev`
2. Open your browser and navigate to `http://localhost:3000`.

### ⚙️ Configuration
Adjust configuration settings in `next.config.js`, `.env`, or `next-auth.config.ts` as needed.

### 📚 Examples
- 📝 **Example 1**: Create a new goal by filling in the required information in the `GoalInput` form on the dashboard page.
- 📝 **Example 2**: Log workout data, nutrition, or weight information using the dedicated forms provided on the dashboard page.
- 📝 **Example 3**: Share your progress updates on the social feed, connect with other users, and motivate each other.

## 🌐 Hosting
### 🚀 Deployment Instructions
#### Vercel Deployment
1. **Login to Vercel:** Create an account or log in to your existing Vercel account.
2. **Import Project:** Click on "New Project" and select "Import Git Repository" to import the project from GitHub.
3. **Connect Repository:** Provide the GitHub repository URL: `https://github.com/coslynx/fitness-goals-social-tracker.git`
4. **Environment Variables:** Set up any necessary environment variables (e.g., `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`).
5. **Deploy:** Click on "Deploy" to deploy the application to Vercel.

#### Heroku Deployment
1. **Install Heroku CLI:**  `npm install -g heroku`
2. **Login to Heroku:** `heroku login`
3. **Create a New Heroku App:** `heroku create`
4. **Set Up Environment Variables:**  Use `heroku config:set` to set up environment variables for database connection and other configurations.
5. **Push to Heroku:**  `git push heroku main`

### 🔑 Environment Variables
- `DATABASE_URL`: The connection string for your PostgreSQL database.
- `NEXTAUTH_URL`: The URL of your NextAuth application (e.g., `https://your-app.vercel.app`).
- `NEXTAUTH_SECRET`: A secret key for NextAuth session management.

## 📜 API Documentation
### 🔍 Endpoints
- **GET /api/goals**: Retrieves a list of goals for the authenticated user.
- **POST /api/goals**: Creates a new goal for the authenticated user.
- **PUT /api/goals/:id**: Updates an existing goal for the authenticated user.
- **DELETE /api/goals/:id**: Deletes an existing goal for the authenticated user.
- **GET /api/progress**: Retrieves progress data for a specific goal.
- **POST /api/progress**: Logs progress data for a specific goal.

### 🔒 Authentication
User authentication is handled using JWT tokens via NextAuth.js. 

### 📝 Examples
- `curl -X GET http://localhost:3000/api/goals` (Requires authentication)

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- **CosLynxAI** - [CosLynx.com](https://coslynx.com) - [GitHub](https://github.com/coslynx)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</div>