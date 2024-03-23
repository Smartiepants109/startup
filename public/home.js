document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // don't know what it does by default. Don't want it to do that yet. Only what I tell it to.
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pword").value;
    if (attemptLogin(username, password)) {

    } else {
    }
});

function attemptLogin(username, password) {
    setUsername(username); // This is here for local session storage. Nice to have so I don't have to hit the db every 10 seconds.
    var login = {
        username: username,
        password: password
    };
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
        .then(response => {
            if (!response.ok) {
                document.getElementById("pword").style.backgroundColor = 'red';
                throw new Error('login failed');

            }
        })
        .then(data => {
            if(data.a == true){
                console.log("realLog");
            }else{
                console.log("Don'tLog");
            }
            console.log('logged in', data);
            var url = "lobbies.html" + encodeURIComponent(username);
            // go to Lobbies while logged in.
            window.location.href = url;
            return true;
        })
        .catch(error => {
            console.error('login fail', error);
            document.getElementById("pword").style.backgroundColor = 'red';
            return false;
        });
}


function logout() {
    sessionStorage.removeItem('username');
}