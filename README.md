# User Management System (Internship Project)

This is a simple User Management System I built during my internship. It allows users to register, log in, and see a list of other registered users on a dashboard. It also includes a search feature and an admin filter.

## Features
- **User Registration**: Create a new account with a name, email, and password.
- **Secure Login**: Session-based login with password hashing.
- **Dashboard**: A clean table showing all registered users.
- **Search & Filter**: Find users quickly by name/email or filter to see only admins.
- **Responsive Design**: Works on both desktop and mobile.

## Tech Stack
- **Frontend**: HTML5, Vanilla CSS, and JavaScript (ES6).
- **Backend**: PHP (using PDO for database security).
- **Database**: MySQL/MariaDB.

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
- `id` (Primary Key)
- `name`
- `email` (Unique)
- `password` (Hashed)
- `role` (Admin/User)
- `created_at`

---
*Created as part of my internship tasks.*
