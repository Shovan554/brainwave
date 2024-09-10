# BrainWave Documentation

## Frameworks Used

### 1. Frontend (Cross-platform)
- **Flutter**: Used to build the Android, iOS, and Web versions of the app.
  - **Dart**: The programming language used for Flutter development.

### 2. Backend
- **Node.js**: Provides the backend API that communicates with the PostgreSQL database.
  - **Express.js**: A minimalist web framework for Node.js to handle routing and HTTP requests.
  - **pg**: A PostgreSQL client for Node.js to manage database interactions.

### 3. Database
- **PostgreSQL**: A robust relational database system used to store all user data, posts, clubs, assignments, and other platform content.

### 4. API Communication
- **REST API**: The Node.js backend uses Express to create a RESTful API for communication between the Flutter app and the backend.

### 5. State Management (Flutter)
- **Provider** or **Riverpod**: For managing application state efficiently across the Flutter app.

### 6. Authentication
- **JWT (JSON Web Tokens)**: Used for securing API endpoints and managing user authentication and sessions.

### 7. Storage
- **Shared Preferences** (Flutter): Used to securely store JWT tokens on the client side for user authentication.

---

## Future Enhancements
- Real-time features for chat and collaboration using WebSockets.
- Club and classroom management with enhanced collaboration tools.
- Integration with additional microlearning and content curation tools.