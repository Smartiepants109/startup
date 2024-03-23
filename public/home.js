
function regiCall(){
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pword").value;
    if (attemptRegi(username, password)) {

    }
}function loginCall(){
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pword").value;
    if (attemptLogin(username, password)) {

    }
}


async function loghelper(login) {
    // const newO = { username: userName, password: password1 };
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json;' },
            body: login,
        });

        const Json = await response.json();

        return Json;
    } catch{
        return false;
    }
}async function reghelper() {
    // const newO = { username: userName, password: password1 };
    try {
        const response = await fetch('/api/regi', {
            method: 'GET',
            headers: { 'content-type': 'application/json;' },
        });

        const Json = await response.json();

        return Json;
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
    const response = await loghelper();

    var loggedIn = false;
    response.forEach(element => {
        if(element.username == login.username){
            if(element.password == login.password){
                loggedIn = true;
            }
        }
    });

    if (loggedIn) {
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

}async function attemptRegi(username, password) {
    setUsername(username); // This is here for local session storage. Nice to have so I don't have to hit the db every 10 seconds.
    var login = {
        username: username,
        password: password
    };

    const response = await reghelper(login);
    loggedIn = false;
    response.forEach(element => {
        if(element.username == login.username){
            if(element.password != login.password){
                loggedIn = false;
            }
        }
    });
    if (loggedIn) {
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