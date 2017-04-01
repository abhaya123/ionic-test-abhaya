# louisvillegeek-ionic-moodstatus

The mood of a person will be organized into 9 statuses each day called an �I am�. 3 in the morning, 3 in the afternoon, and 3 in the evening. 



# Android

List of required plugins needs to be add to work with Ok Google 'take a not'

1. ionic plugin add cordova-sqlite-storage

2. ionic plugin add https://github.com/Initsogar/cordova-webintent.git

# IOS

List of required plugins needs to be add to work with Hey Siri 'send a message using appname'

1. ionic plugin add cordova-sqlite-storage

2. ionic plugin add https://github.com/abhaya123/cordova-abhaya-siriintent.git ( to get intent data from ios)

!Important

1. git init

2. git clone https://github.com/abhaya123/louisvillegeek-ionic-moodstatus.git

3. npm install (for node_module)

4. npm platform add ios/android

5. open ios app and provision profile

6. Add below property and method to AppDelegate.h/.m file

---

7. Add New >> Target >> Intent Extension >> give name "moodstatusSiriIntent". open IntentHandler and add below code.

---

