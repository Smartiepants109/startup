function toggleDivs(divToShow) {
    var divs = ['pregame', 'duringRound', 'postRound'];

    divs.forEach(function (divId) {
        var div = document.getElementById(divId);
        if (divId === divToShow) {
            div.style.display = 'block';
            console.log(divId)
        } else {
            div.style.display = 'none';
        }
    });
}

// array of chat messages that can show up. What i'd imagine is being talked about. That, or memes.
var chatMessages = [
    "Hello, how are you?",
    "Nice weather today!",
    "What's your favorite food?",
    "I'm excited for this round!",
    "Any plans for the weekend?",
    "This lobby is fun!"
];

// Function to generate semi-random chat messages
function generateChatMessage() {
    var randomIndex = Math.floor(Math.random() * chatMessages.length);
    return chatMessages[randomIndex];
}

// Function to add user input to the chat
function sendMessage() {
    var userInput = document.getElementById("message-input").value;
    if (userInput.trim() !== '') {
        var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var message = '<li class="message">' +
            '<span class="sender">You </span>' +
            '<span class="timestamp">' + currentTime + '</span>' +
            '<div class="content">' + userInput + '</div>' +
            '</li>';
        document.getElementById("messages").innerHTML += message;
        document.getElementById("message-input").value = ''; // Clear input field
    }
}

// Function to generate and display semi-random chat messages
function displayChatMessages() {
    var chatDiv = document.getElementById("chat");
    setInterval(function () {
        var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var randomMessage = generateChatMessage();
        var message = '<li class="message">' +
            '<span class="sender">John Doe</span>' +
            '<span class="timestamp">' + currentTime + '</span>' +
            '<div class="content">' + randomMessage + '</div>' +
            '</li>';
        document.getElementById("messages").innerHTML += message;
    }, 20000);
}


function onKeyPrs(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
}

function handleSubmit(event) {
    event.preventDefault(); 

    var lobbyTitle = document.getElementById("lTitle").value;
    var nickname = document.getElementById("lHostNick").value;
    var password = document.getElementById("lPass").value;

    var gameData = {
        lobbyTitle: lobbyTitle,
        nickname: nickname || "Your Username",
        password: password || "None"
    };

    storeTempData('gameData', JSON.stringify(gameData)); // now lobby will show up in lobbies page, hahaahahahahhahahahahhahahad IM GOING INSANE
}

document.getElementById("hostcontrols").addEventListener("submit", handleSubmit);

function startGame() {
    toggleDivs("duringRound");
}
