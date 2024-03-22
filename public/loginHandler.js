function getUsername() {
    return localStorage.getItem('username');
}
function storeTempData(name, value) {
    sessionStorage.setItem(name, value);
}

function getTempData(nombre) {
    return sessionStorage.getItem(nombre); //name was "deprecated" for some reason, renamed it.
}

function setUsername(username) {
    localStorage.setItem('username', username);
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

function getGameData(){
    return getTempData("gameData");
}


function logout() {
    sessionStorage.removeItem('username');
}
function attemptLogin(username, password){
    return true;
}
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // don't know what it does by default. Don't want it to do that yet. Only what I tell it to.
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pword").value;
    if(attemptLogin(username, password)){
        setUsername(username);
        var url = "lobbies.html?username=" + encodeURIComponent(username);
        // go to Lobbies while logged in.
        window.location.href = url;
    } else{

    }

    
  });