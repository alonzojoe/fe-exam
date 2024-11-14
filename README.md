# Archintel FE-Exam

This is a Vue.js-based Writer/Editor Dashboard application that allows users to manage articles for a company. Writers can create and edit articles, while Editors can edit and publish articles, manage users, and companies.

## Features

### Writer Features

- **Create Articles**: Writers can create new articles. When a new article is created, it is marked as "For Edit" by default.
- **Edit Articles**: Writers can edit articles that are still in "For Edit" status.
- **Dashboard**: The Writer's Dashboard displays a list of articles that are either in "For Edit" or "Published" status, with article details like Image, Title, Link, Writer Name, and Editor Name.
- **All Media**: Writers can view all articles, including unpublished ones, with options to edit only the articles that are still "For Edit."

### Editor Features

- **Edit and Publish Articles**: Editors can edit articles and change the status to "Published" once they are ready. Editors can also assign themselves as the editor for the article.
- **Dashboard**: The Editor's Dashboard displays articles that are in "For Edit" or "Published" status, with article details similar to the Writer's Dashboard.
- **Manage Users**: Editors can add, update, and delete users (Writers and Editors).
- **Manage Companies**: Editors can manage company information, including adding and updating company details.

### Authentication and Access Control

- **Login**: Users (Writers and Editors) can log in to access their respective dashboards.
- **Access Restrictions**: Writers can only manage their articles, while Editors have full access to manage users, companies, and all articles.

## Prerequisites

To run this project locally, you need to have the following installed:

- Node.js
- npm

## How to Run the Project

### 1. Clone the repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/alonzojoe/fe-exam.git
```

### 2. Install Dependencies

Install dependencies by running the following command:

```bash
cd fe-exam
npm install
# or if you're using Yarn
yarn install
```

### 3. Run the Development Server

To start the development server and run the project locally, use the following command:

```bash
npm run dev
# or if you're using Yarn
yarn dev
```

This will start a local server at http://localhost:5173 (by default). You can now view the project in your browser.

## Sample Users

Here are a few sample users to demonstrate different user types in the system:

### User Type: Writer

- **Username**: alonzojoe
- **Password**: 123123

### User Type: Editor

- **Username**: janedoe
- **Password**: 1234

## Repos in Development Mode

Frontend: [Front End Repo Link](https://github.com/alonzojoe/fe-exam.git)

Backend: [Backend Server (Firebase) API Endpoint](<https://firestore.googleapis.com/v1/projects/article-db-6e0cd/databases/(default)/documents/articles>)

## Live Link in Production Mode

Live Link: [https://fe-exam-articles.netlify.app/](https://fe-exam-articles.netlify.app/)

## Backend: API Endpoints

The API is hosted on Firebase Firestore, and the following endpoints are available for interacting with the database:

### Base URL

All endpoints use the base URL: https://firestore.googleapis.com/v1/projects/article-db-6e0cd/databases/(default)/documents

- **`/articles`**
- **`/users`**
- **`/companies`**
