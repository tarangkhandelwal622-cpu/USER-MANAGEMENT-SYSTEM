# User Management System 

This is a simple User Management System . It allows users to register, log in, and see a list of other registered users on a dashboard. It also includes a search feature and an admin filter.

## Features
- **User Registration**: Create a new account with a name, email, and password.
- **Secure Login**: Session-based login with password hashing.
- **Dashboard**: A clean table showing all registered users.
- **Search & Filter**: Find users quickly by name/email or filter to see only admins.
- **Responsive Design**: Works on both desktop and mobile.

## Tech Stack
- **Frontend**: HTML5, CSS, and JavaScript (ES6).
- **Backend**: PHP (using PDO for database security).
- **Database**: MySQL

## Project Flow
This section describes how the application works and the logic behind each step:

### 1. User Registration
- The journey starts at the registration page (`register.html`). 
- When a user fills out the form, JavaScript validates the inputs (e.g., checking for a valid email format and password length).
- The data is sent as a JSON object to `api/register.php`.
- The backend checks if the email is already taken. If it's unique, the password is hashed and the user is saved into the MySQL database.

### 2. Authentication (Login)
- Users can log in through the main page (`index.html`).
- The system verifies the email and password against the database records.
- Once authenticated, a secure PHP session is started, and the user is redirected to the dashboard.

### 3. Dashboard and Data Display
- The dashboard (`dashboard.html`) is the central hub.
- It automatically fetches the list of all registered users from `api/users.php`.
- Access Control: Only logged-in users can view this page. If someone tries to access it without logging in, they are blocked.

### 4. Search and Filtering
- **Search**: As you type in the search bar, the table updates in real-time to show matching results. This is handled by JavaScript for a fast, "app-like" feel.
- **Admin Filter**: A dedicated button allows you to quickly toggle between seeing everyone and seeing only the administrators.

## Database Structure
The system uses a single table called `users`:
- `id`: Unique identifier for each user
- `name`: Full name of the user
- `email`: User's email address (used for login)
- `password`: Hashed version of the user's password
- `role`: Defines access level (either 'admin' or 'user')
- `created_at`: Automatically generated timestamp

## Folder Structure
- `/api`
    - `register.php`
    - `login.php`
    - `users.php`
- `/css`
- `/js`
    - `register.js`
    - `login.js`
    - `dashboard.js`
- `db.php`
- `index.html`

## Key Implementation Details
- **Security**: Passwords are never stored as plain text. I used PHP's `password_hash()` with the default algorithm.
- **SQL Injection Prevention**: All database queries are performed using **PDO prepared statements** to keep the data safe.
- **Form Validation**: I implemented both frontend (JavaScript) and backend (PHP) validation to ensure data integrity.
- **Real-time Search**: The dashboard includes a client-side search that filters the table as you type, improving the user experience.

## Future Improvements
- Implement a "Profile Edit" page for users to update their own details.
- Add a "Forgot Password" flow with email verification.
- Add more granular permissions for the Admin role.

