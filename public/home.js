document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // don't know what it does by default. Don't want it to do that yet. Only what I tell it to.
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pword").value;
    if (attemptLogin(username, password)) {

    } else {
    }
});

async function loghelper(login) {
    // const newO = { username: userName, password: password1 };
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json;' },
            body: login,
        });

        const Json = await response.json();

        return Json.a;
    } catch{
        return false;
    }
}

async function attemptLogin(username, password) {
    setUsername(username); // This is here for local session storage. Nice to have so I don't have to hit the db every 10 seconds.
    var login = {
        username: username,
        password: password
    };

    const response = await loghelper(login);
    if (response) {
        setUsername(username);
        console.log("realLog");
        console.log('logged in');
        var url = "lobbies.html";
        // go to Lobbies while logged in.
        window.location.href = url;
        return true;
    } else {
        console.log("Don'tLog");
        document.getElementById("pword").style.backgroundColor = 'red';
        throw new Error('login failed');
    }

}


function logout() {
    sessionStorage.removeItem('username');
}