<div align="center">

# 🌐 Dumpper

> A fullstack social network where users can publish posts, follow other people and form connections (mutual friends) through a follower system.

[![Java](https://img.shields.io/badge/Java-17+-orange?style=for-the-badge&logo=openjdk)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen?style=for-the-badge&logo=spring)](https://spring.io/projects/spring-boot)
[![Hibernate](https://img.shields.io/badge/Hibernate-ORM-informational?style=for-the-badge&logo=hibernate)](https://hibernate.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

<img width="1917" height="1078" alt="feed" src="https://github.com/user-attachments/assets/b4a333b2-fa0b-4b26-b86a-1466c58c3476" />

---

## 💡 About the Project

**Dumpper** is a full-stack interactive social platform. More than a simple CRUD, the application handles business rules such as **directed many-to-many relationships (follower system)**, **post feed**, and **mutual friendship calculation**.

The backend is a RESTful API built with **Java and Spring Boot**, consumed by a **React + Vite** frontend.

---

## ✨ Key Features

### 👤 User Management
Profiles with bio, photo, name and username.

<img width="1917" height="1078" alt="profile" src="https://github.com/user-attachments/assets/5ee1c20f-ce97-4ae5-b9e8-fe0ee7784049" />

### 📝 Posts & Feed
Creating and listing posts from the community.

<img width="1917" height="1078" alt="feed2" src="https://github.com/user-attachments/assets/c163dbb3-b4bb-41cc-8561-74f09e279123" />

### 🤝 Connections (Follows)
- Follow and unfollow users.
- Automatic and transactional management of counters (`followers` and `following`).
- Listing of followers, following, and dynamic calculation of **mutual friends** (when the follow is reciprocal, you become friends).

### 🔐 Login
Simple email and password verification against the data stored in the database.

---

## 🔐 Authentication

Currently, login is done through a direct verification: the provided email is looked up in the database and the password is compared against the stored value. There is no password hashing, session tokens (JWT), or permission control yet, it's a simple mechanism, suited for the current stage of the project.

---

## 🗺️ Roadmap

- [ ] Password hashing (e.g. BCrypt) and more robust authentication
- [ ] Token-based authentication (JWT) and sessions
- [x] "Now playing" status structure on the profile (`/users/{id}/listening`)
- [ ] Real integration with the Spotify API (under evaluation, since the API's development mode limits the number of authorized accounts that can display data, which conflicts with the idea of any user being able to use the feature)

---

## 🛠️ Tech Stack & Architecture

The project follows a layered architecture (Controller → Service → Repository → Model), ensuring business logic isolation and transactional safety (`@Transactional`).

**Backend**

| Layer / Tool | Technology |
|---------------------|-----------|
| Language | Java 17+ |
| Framework | Spring Boot |
| Persistence | Spring Data JPA / Hibernate |
| Database | PostgreSQL |
| Validation & Utilities | Lombok |
| Dependency Management | Maven |

**Frontend**

| Layer / Tool | Technology |
|---------------------|-----------|
| Library | React |
| Build Tool | Vite |

---

## 📡 API Endpoints

### Users (`/users`)

| Method | Endpoint | Description |
|--------|----------|-----------|
| POST | `/users` | Creates a user |
| GET | `/users/{id}` | Retrieves a user by ID |
| PUT | `/users/{id}` | Updates a user's data |
| DELETE | `/users/{id}` | Removes a user |
| GET | `/users/username/{username}` | Retrieves a profile by username |
| PATCH | `/users/{id}/listening` | Updates the "now playing" status on the profile |
| POST | `/users/register` | Registers a new user |
| POST | `/users/login` | Authenticates a user |
| GET | `/users/search?query=` | Searches users by name/username |

### Posts (`/post`)

| Method | Endpoint | Description |
|--------|----------|-----------|
| GET | `/post/{id}` | Retrieves a post by ID |
| POST | `/post` | Creates a new post |
| GET | `/post` | Lists all posts |
| PUT | `/post/update/{id}` | Updates a post |
| DELETE | `/post/{id}` | Removes a post |

### Likes (`/likes`)

| Method | Endpoint | Description |
|--------|----------|-----------|
| POST | `/likes/{userId}/{postId}` | Likes a post |
| GET | `/likes/{postId}` | Lists users who liked the post |
| GET | `/likes/check/{userId}/{postId}` | Checks whether a user liked the post |

### Connections (`/follow`)

| Method | Endpoint | Description |
|--------|----------|-----------|
| POST | `/follow?followerId=&followingId=` | Follows a user |
| DELETE | `/follow?followerId=&followingId=` | Unfollows a user |
| GET | `/follow/following/{userId}` | Lists who the user is following |
| GET | `/follow/followers/{userId}` | Lists the user's followers |
| GET | `/follow/check?followerId=&followingId=` | Checks whether one follows the other |
| GET | `/follow/{userId}/friends` | Lists mutual friends |

---

## 🚀 Running Locally

### Prerequisites

- **Java JDK 17** or higher
- **Maven** (or use your IDE)
- **Node.js** and **npm** (for the frontend)

### Backend

```bash
# 1. Clone the repository
git clone https://github.com/rafael-vincensi/dumpper.git

# 2. Enter the backend folder
cd dumpper/socialapp

# 3. Run the application via Maven
mvn spring-boot:run
```

### Frontend

```bash
# 1. Enter the frontend folder
cd dumpper/social-frontend

# 2. Install dependencies
npm install

# 3. Run in development mode
npm run dev
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
