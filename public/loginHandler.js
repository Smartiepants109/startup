
function getUsername() {
    return localStorage.getItem('username');
}
function storeTempData(name, value) {
    sessionStorage.setItem(name, value);
}

function getTempData(nombre) {
    return sessionStorage.getItem(nombre); //name was "deprecated" for some reason, renamed it.
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




