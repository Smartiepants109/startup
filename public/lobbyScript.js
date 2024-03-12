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
let yelpLogoLink = 'https://s3-media0.fl.yelpcdn.com/assets/public/cookbook.yji-0a2bf1d9c330d8747446.svg'
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
var latitude = 0;
var longitude = 0;
var biz = [];

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

    fetch('/api/yelp?' + new URLSearchParams(params), {
        method: 'GET',
        headers: {
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch restaurants');
        }
        return response.json();
    })
        .then(data => {
            displayRestaurants(data.businesses);
            //share results to each user in Websocket here FIXME

        })
        .catch(error => {
            console.error('Error fetching restaurants:', error);
        })
        .finally(() => {
            toggleDivs("duringRound");
            setBuisness(tickerCount);
        });

    function displayRestaurants(restaurants) {
        restaurants.forEach(restaurant => {
            var data = {};
            data.name = restaurant.name;
            data.rating = restaurant.rating;
            data.location = restaurant.location.display_address.join(', ');
            data.imageUrl = restaurant.image_url;
            data.url = restaurant.url;
            biz.push(data);

            console.log('Name:', data.name);
            console.log('Rating:', data.rating);
            console.log('Location:', data.location);
            console.log('Image URL:', data.imageUrl);
            console.log('Yelp URL: ', data.url);
            console.log('--------------------------'); //pleaseworkpleaseworkpleaseworkpleaseweorsfkjeflksjefosajef os
        });
    }



}
let tickerCount = 0;
function setBuisness(biztm) {
    document.getElementById("img").src = biz[biztm].imageUrl;
    document.getElementById("rimg").textContent = biz[biztm].rating;
    document.getElementById("yurl").href = biz[biztm].url;
    document.getElementById("location").textContent = biz[biztm].location;
    document.getElementById("name").textContent = biz[biztm].name;
}
function handleButtonClick(action) {//tickercount is still here, but now it'll go through the images that are found. Hopefully. 

    tickerCount = tickerCount + 1;
    setBuisness(tickerCount);

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
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
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
