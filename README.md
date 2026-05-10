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

## How to Run Locally
I used **XAMPP** to run this project on Windows.

1. **Install XAMPP**: Download and install it from Apache Friends.
2. **Start Services**: Open XAMPP Control Panel and start **Apache** and **MySQL**.
   - *Note: I changed my Apache port to **8080** to avoid conflicts.*
3. **Setup Database**:
   - Go to `http://localhost:8080/phpmyadmin`.
   - Create a new database named `user_management`.
   - Run the SQL query provided in the `db_setup.sql` file (or create a `users` table manually).
4. **Move Files**: Copy this project folder into `C:\xampp\htdocs\internship`.
5. **Access the site**: Open `http://localhost:8080/internship/index.html` in your browser.

## Database Structure
The system uses a single table called `users`:
- `id`: Unique identifier for each user
- `name`: Full name of the user
- `email`: User's email address (used for login)
- `password`: Hashed version of the user's password
- `role`: Defines access level (either 'admin' or 'user')
- `created_at`: Automatically generated timestamp

## Folder Structure
- `/api`: Contains all the PHP backend logic.
    - `register.php`: Handles new user creation.
    - `login.php`: Manages user authentication and sessions.
    - `users.php`: Retrieves the list of users for the dashboard.
- `/css`: Contains the styling (`style.css`).
- `/js`: Contains the frontend logic.
    - `register.js`: Validation and API calls for the registration page.
    - `login.js`: Logic for the login page.
    - `dashboard.js`: Manages the user table, search, and filters.
- `db.php`: Central database connection configuration.
- `index.html`: The main login page (entry point).

## Key Implementation Details
- **Security**: Passwords are never stored as plain text. I used PHP's `password_hash()` with the default algorithm.
- **SQL Injection Prevention**: All database queries are performed using **PDO prepared statements** to keep the data safe.
- **Form Validation**: I implemented both frontend (JavaScript) and backend (PHP) validation to ensure data integrity.
- **Real-time Search**: The dashboard includes a client-side search that filters the table as you type, improving the user experience.

## Future Improvements
- Implement a "Profile Edit" page for users to update their own details.
- Add a "Forgot Password" flow with email verification.
- Add more granular permissions for the Admin role.

---
*Created as part of my internship tasks.*
