// Dashboard script to manage the user table
const tableBody = document.getElementById('usersTableBody');
const emptyState = document.getElementById('emptyState');
const dashboardMessage = document.getElementById('dashboardMessage');
const filterAdminsButton = document.getElementById('filterAdminsButton');
const searchInput = document.getElementById('searchInput');

let allUsers = [];
let showingAdminsOnly = false;
let searchQuery = '';

function showMessage(message, type) {
    dashboardMessage.textContent = message;
    dashboardMessage.className = `message ${type}`;
}

function clearMessage() {
    dashboardMessage.textContent = '';
    dashboardMessage.className = 'message';
}

// Helper to create a table cell quickly
function createCell(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}

function renderUsers(users) {
    tableBody.textContent = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(user.name));
        row.appendChild(createCell(user.email));

        const roleCell = document.createElement('td');
        const roleBadge = document.createElement('span');
        roleBadge.className = 'role-badge';
        roleBadge.textContent = user.role;
        roleCell.appendChild(roleBadge);
        row.appendChild(roleCell);

        tableBody.appendChild(row);
    });

    emptyState.style.display = users.length === 0 ? 'block' : 'none';
}

function visibleUsers() {
    let users = allUsers;

    if (showingAdminsOnly) {
        users = users.filter((user) => user.role === 'admin');
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        users = users.filter((user) => 
            user.name.toLowerCase().includes(query) || 
            user.email.toLowerCase().includes(query)
        );
    }

    return users;
}

filterAdminsButton.addEventListener('click', () => {
    showingAdminsOnly = !showingAdminsOnly;
    filterAdminsButton.textContent = showingAdminsOnly ? 'Show All Users' : 'Show Only Admins';
    renderUsers(visibleUsers());
});

searchInput.addEventListener('input', (event) => {
    searchQuery = event.target.value.trim();
    renderUsers(visibleUsers());
});

// Main function to fetch users from the database
async function loadUsers() {
    console.log('Fetching users from the API...');
    clearMessage();
    filterAdminsButton.disabled = true;

    try {
        const response = await fetch('api/users.php', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        const result = await response.json();

        if (!result.success) {
            showMessage(result.error || 'Unable to load users.', 'error');
            renderUsers([]);
            return;
        }

        allUsers = Array.isArray(result.users) ? result.users : [];
        console.log('Successfully loaded ' + allUsers.length + ' users');
        renderUsers(visibleUsers());
    } catch (error) {
        showMessage('Unable to load users. Please try again.', 'error');
        renderUsers([]);
    } finally {
        filterAdminsButton.disabled = false;
    }
}

loadUsers();
