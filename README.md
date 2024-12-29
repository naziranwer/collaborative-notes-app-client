# Collaborative Notes App - Client

This is the frontend client for the Collaborative Notes App. It is built with React and Vite. The client allows users to create, edit, and manage notes collaboratively with real-time updates.

## Hosted URL

The application is hosted at: [https://collaborative-notes-app-client.onrender.com](https://collaborative-notes-app-client.onrender.com)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, edit, and delete notes
- Manage note versions and revert to previous versions
- Add collaborators with different roles (viewer, editor)
- Real-time updates with WebSockets (if applicable)
- User authentication and authorization

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/collaborative-notes-app.git
   cd collaborative-notes-app/client
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with an existing account.
3. Create a new note or select an existing note to edit.
4. Add collaborators by entering their email addresses and assigning roles.
5. Use the version history to view and revert to previous versions of notes.

## Routes

- `/` - Home page
- `/login` - User login page
- `/register` - User registration page
- `/notes` - List of all notes
- `/notes/:id` - View or edit a specific note
- `/profile` - User profile page

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
