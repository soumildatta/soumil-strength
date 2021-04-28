# Soumil-Strength (Workout App)
A simple hybrid workout app built using the Ionic framework and Angular, and uses Cloud Firestore to store data. 
This application was made as a proof of concept for the semester project in a Mobile Development course, by [Alex Madesclaire](https://github.com/amadesclaire) and [Soumil Datta](https://github.com/soumildatta) at the **University of Mississippi**.    
[Visit the app](https://soumil-strength.web.app)  
View the app screenshots [**HERE**](screenshots/README.md)   
**Note**: This application is not fully functional, but serves as a good proof of concept for our semester project for the course. 

## Description
Soumil Strength is a workout routing planner, lift logger, and progress tracker wrapped into a convenient and simple to use package. Focus on only the data that matters with our charts and stats that are generated from your workout sessions.
You have the ability to pick your goal, and get a personalized workout routine generated for you. In case you are unsure about how to do a certain workout, instructional videos are 
directly embedded into the app so that you do not have to leave the app during a workout session. To save this app for easy access, open [Soumil Strength](https://soumil-strength.web.app) on a mobile 
browser, and save it to your homescreen which can be done on both Android and iOS(through safari only). While best experienced on mobile, this app can even be used on your laptop in any browser if you wish.

## Structure 
This app was built using Ionic, which gives it the capabilities of a hybrid application. This Angular-based codebase utilizes Firebase to store the user's profile and workout information for easy storage and access from any device. 
The app consists of 4 tabs: 
1. **Workout** - This is where the user logs their workout sets. 
2. **Data** - This is where you can find your stats for the current workout session.
3. **How To** - Find how to videos in the form of embedded YouTube video players. 
4. **Profile** - Update your profile and change your password for the app.

The app also consists of other pages, such as the **Login**, **Sign up**, and **Forgot password** pages as well as the **About** and **Change password** pages accessed from the profile tab inside the app.   
You can view the [App Screenshots](screenshots/README.md) to  see the main screens of the application.

## Contributors
#### [Alexandre Madesclaire](https://github.com/amadesclaire)
Responsible for the workout page, charts page, and the about page for the app.
Customized and tested Android dark mode color theming and added app fonts using google fonts. 
Responsible for implementing the updating of data from the user input on the workout page onto Firestore.
Also responsible for the reading and displaying of data that was sent from the workouts page into the charts page from Firestore.


#### [Soumil Datta](https://github.com/soumildatta)
Responsible for the profile page, login page, sign-up page, and the how-to page for the app. 
Customized and tested iOS dark mode color theming.
Responsible for implementing the user authentication with Firebase Authentication and AngularFireAuth to sign up, login, log out, and the ability to change password. 
Also responsible for updating Firestore from the profile page inputs and then displaying them when logged in at a different time. 
