# startup
 cs project
## Signin
Prerequisite: Simon Login deployed to your production environment
Yup	

This criterion is linked to a Learning Outcome Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
Yup	


This criterion is linked to a Learning Outcome Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable
	Yup!

This criterion is linked to a Learning Outcome Prerequisite: At least 10 git commits spread consistently throughout the assignment period
	I believe so, yes.

This criterion is linked to a Learning Outcome Supports new user registration
	That it does.

This criterion is linked to a Learning Outcome Supports existing user authentication
It definitely does

This criterion is linked to a Learning Outcome Stores application data in MongoDB
Yes. The user's credentials. In future iterations, it can be made to store user settings.

This criterion is linked to a Learning Outcome Stores and retrieves credentials in MongoDB
Yes, that it does.

This criterion is linked to a Learning Outcome Restricts application functionality based upon authentication
Yes. It won't let you host if you are a guest.





## Service
better formatting -  learned that the readme wasn't using my newlines for some reason unless I used two. So I added two.

Prerequisite: Simon Service deployed to your production environment - yup


Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page - that's still there


Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable - yup, this just makes it look nicer


Prerequisite: At least 10 git commits spread consistently throughout the assignment period - pretty sure. I committed a lot (of crimes against my computer).


Create an HTTP service using Node.js and Express - yes, i did that. That would be the server system. If you have two tabs open, you can "see" any currently hosted lobbies on the Lobbies screen. (make sure to press the host button to actually host it, automatically doing so would be rather tacky of me)


Frontend served up using Express static middleware  - yup. Not sure what else to add to this one. It's served up through Express.


Your frontend calls third party service endpoints - yes, albeit indirectly. It needs to call a back-end endpoint, which then calls the actual third party one. This is the major sticking point, it wouldn't accept anything unless it was from the server itself. I really should have just done a quotes page, lol. So, the actual third party service call is on the index.js file. I made another HTTP service that calls this third party one, because Yelp is rather fussy. Anyways, the content of what is being served up *should* be restraunts near to where you are. One problem: I don't know if it's my browser protecting my piracy, but it seems that it thinks we are in California. But, the coordinates it grabs are automatic. Should I make a manual override for users to give more accurate data?


Your backend provides service endpoints - Yes. They are in the index.js file, at least if I understood correctly as to what you are asking. If I didn't, please let me know.
yeah. i worked way too long on them.
note: git commits only represent when I was reasonably thinking that it would work.
it almost never did.


Your frontend calls your service endpoints - Once again, if I understood what was meant by "service endpoint", that is what I called throughout my code. It is scattered a bit between individual scripts in my HTML files (for things I only use once) and .js files (for those that I use more often).


## JS
Not much CSS has changed, other than a few things that really bugged me. Sorry, graders. It isn't exactly the same as the css submission, but honestly, not a whole lot has changed. Just a few buttons getting smaller and more inline, as they were bugging me as they were.
Prerequisite: Simon JavaScript deployed to your production environment  - yup.
Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page  - yup.
Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable - that's this, yup!
Prerequisite: At least 10 git commits spread consistently throughout the assignment period - I have at least 10 of them.
JavaScript support for future login - have functions inserted and a rudimentary string saver to make it look like its there until it is ready to fully implement.
JavaScript support for future database data - same.
JavaScript support for future WebSocket - same.
JavaScript support for your application's interaction logic - also here.

## CSS
this is structured as your announcement said to:
[x] - done - Prerequisite: Simon CSS deployed to your production environment
[x] - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
[x] - done - Prerequisite: Notes in your startup Git repository README.md file
[x] - done - 30% Header, footer, and main content body. Used flex to layout sections.
[x] - done - 20% Navigation elements. 
[x] - done - 10% Responsive to window resizing. Looks nice on desktop, better on mobile.
[x] - done - 20% Application elements. Buttons use a onhover css element to make them responsive with a darker color.
[x] - done - 10% Application text content. Text is displayed using the Georgia font, with exceptions in the footer in order for it to look *impressive*
[x] - done - 10% Application images. made image formatted. :)





## HTML
sorry, didn't include this last time. They found everything they needed to other than the placeholder for an outside service call. That'll be in the lobby.html. I added some text to make it more obvious in the future, so we should be fine. :)


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

The login page will be generic. Nothing special here. Checks login information against authentication information stored in a database. Creates a session token for the application to use.

![lobbySelector](lobbySelectionPage.png)

Lobbies on the internet are listed here. You can also edit your profile settings through the blue button at the bottom. Creating a lobby is done using the green button on the bottom.

![lobby](lobby.png)

This is the lobby screen. With a chatbox on the bottom for non-hosts, users will be able to message each other until the minigame starts.
