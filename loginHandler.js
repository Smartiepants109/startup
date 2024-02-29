function getUsername() {
    return sessionStorage.getItem('username');
}

function setUsername(username) {
    sessionStorage.setItem('username', username);
}

function updateHeader() {
    var username = getUsername();
    var usernamePlaceholder = document.getElementById('usernamePlaceholder');
    if (username) {
        usernamePlaceholder.textContent = username;
        return username;
    } else {
        usernamePlaceholder.textContent = "Guest";
        return "guest";
    }
}

// I ... think that this would call the above function after the page loads?
updateHeader();

function logout() {
    sessionStorage.removeItem('username');
}
