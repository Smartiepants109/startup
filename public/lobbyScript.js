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
        id: gid,
        lobbyTitle: lobbyTitle,
        nickname: nickname || getUsername(),
        password: password || "",
        location: "US",
        users: 0
    };

    fetch('/api/lobbyU', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create lobby');
            }
            return response.json();
        })
        .then(data => {
            console.log('Lobby created successfully:', data);
        })
        .catch(error => {
            console.error('Error creating lobby:', error);
        });
}

document.getElementById("hostcontrols").addEventListener("submit", handleSubmit);

function startGame() {
    const apiUrl = 'https://api.yelp.com/v3/businesses/search';

    const params = {
        term: 'restaurants', //really hope that this gets any non-restaurant filtered out.
        latitude: latitude, 
        longitude: longitude,
        radius: 10000,
        limit: 20, 
        sort_by: 'distance',
    };

    const headers = {
        Authorization: 'Bearer YOUR_YELP_API_KEY', //FIXME replace with actual key when Yelp lets me in.
    };

    fetch(apiUrl + '?' + new URLSearchParams(params), {
        method: 'GET',
        headers: headers,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }
            return response.json();
        })
        .then(data => {
            displayRestaurants(data.businesses);
            //shareDataWithWebSocket(data.businesses); //haha, this is another FIXME. when the websocket goes here, put it in here.
        })
        .catch(error => {
            console.error('Error fetching restaurants:', error);
        });

    function displayRestaurants(restaurants) {
        restaurants.forEach(restaurant => {
            const name = restaurant.name;
            const rating = restaurant.rating;
            const location = restaurant.location.display_address.join(', '); 
            const imageUrl = restaurant.image_url;

            console.log('Name:', name);
            console.log('Rating:', rating);
            console.log('Location:', location);
            console.log('Image URL:', imageUrl);
            console.log('--------------------------'); //pleaseworkpleaseworkpleaseworkpleaseweorsfkjeflksjefosajef os
        });
    }

    toggleDivs("duringRound");
}
let tickerCount = 0;

function handleButtonClick(action) {//tickercount is still here, but now it'll go through the images that are found. Hopefully. 

    tickerCount = tickerCount + 1;

    if (tickerCount >= 20) {
        toggleDivs("postRound"); // not implemented fully bc this will be using websockets in the final product.
    }
}
function rtv() {
    //finished product will only do this if enough votes from group. 
    document.getElementById("Congradulations").textContent = "Understood. The next highest is _____."
    document.getElementById("rtv").textContent = "I don't want this (1/X votes required [met!])"
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            //fetchRestaurantsByLocation(latitude, longitude); FIXME
        }, error => {
            console.error('something went wrong. See:', error);
        });
    } else {
        console.error('browser doesn\'t do location services');
    }
}
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();

    var lobbyTitle = document.getElementById("lTitle").value;
    var nickname = document.getElementById("lHostNick").value;
    var password = document.getElementById("lPass").value;

    var gameData = {
        id: gid,
        lobbyTitle: lobbyTitle,
        nickname: nickname || getUsername(),
        password: password || "",
        location: "US",
        users: 0
    };

    
    fetch('/api/lobbyU', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete lobby');
            }
            return response.json();
        })
        .then(data => {
            console.log('Lobby deleted successfully:', data);
        })
        .catch(error => {
            console.error('Error deleting lobby:', error);
        });
});
getUserLocation();
var gid = Math.floor(Math.random() * 1000000000);
