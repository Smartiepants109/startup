# startup
 cs project
### [Notes](notes.md)
# Specifications:
## Elevator Pitch: 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The short version of the idea is that this is like Tinder but for nearby restaurants. I'm going to call it Tender. Users will be able to get together, physically or not, and be able to vote on what food they want to eat that is nearby. Users will be able to blacklist certain places so that they will not appear in the possible restaurants to buy food from. Finding the correct lobby can be done via a lobby selector, which will one day be upgraded to have friends and a search function. But for now, it is meant to be a small community that needs a little help deciding where to eat.
## Key Features and Description:
### Logging in and Creating an Account
The user should be able to access their account by entering a username and password or using some other authentication method. Usernames should be unique, and passwords should be reasonably strong (min. characters)
### Retrieving and Editing Profile Data from the Database
The user should be able to edit certain settings, like managing their blacklist. Things can be manually added, but a prompt will appear after a store is "denied" in the "game" portion of the application 5 times in a row by the same user, asking if they would like that store to be added to their blacklist. 
### Joining a Lobby and Chatting there
After logging in, users should be able to see any open lobbies. Once the "game" portion of the lobby starts, it should no longer appear in the lobby selector. Users should be able to chat while they are waiting for the rest of their party to join the lobby. Once everyone is inside the lobby, the host should be able to start the next section. A link could also be used to join directly, without using the lobby system.
### Playing the "Choose Where to Eat" Game
In an interface similar to Tinder, users should be able to collectively vote on food sources that they are most interested in consuming from. There would be multiple rounds, depending on how many restaurants are nearby and the lobby's settings (cost, avg. reviews, max rounds). In each round, the top-ranking restaurants will be promoted to the next. If the final round ends with a tie, then the winner is chosen at random. There will be a "rock the vote" option, which if chosen by the majority of users, will switch the winner to whatever was in second place instead.
## Design Images (with descriptions)
![login](loginpage.png)
![lobbySelector](lobbySelectionPage.png)
![lobby](lobby.png)
