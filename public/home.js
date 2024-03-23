document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // don't know what it does by default. Don't want it to do that yet. Only what I tell it to.
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pword").value;
    if(attemptLogin(username, password)){
        var url = "lobbies.html" + encodeURIComponent(username);
        // go to Lobbies while logged in.
        window.location.href = url;
    } else{
        document.getElementById("pword").style.backgroundColor = 'red';
    }
});

function attemptLogin(username, password){
    setUsername(username); // This is here for local session storage. Nice to have so I don't have to hit the db every 10 seconds.
    const query = {uname: username};
    const options = {limit: 1};
    const users = mclient.db('tender').collection('users');
    const curse = users.find(query, options);
    const array = curse.toArray();
    if (array.length == 0) {
        users.insertOne({"uname":username, "pw":password});
    } else {
        if(array[0].pw == password){
            return true;
        }
        return false
    }
    return true;
}

function logout() {
    sessionStorage.removeItem('username');
}