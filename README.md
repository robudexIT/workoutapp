# workoutapp
# Project Architecture 
  Backend - Nodejs/express (on premise)
  Frontend - Vuejs (on premise)
  Database - Mysql (on premise)
  
  #Anatomy and Feaures of the Project
  - This Project solely focus on the functionality, All frontend design like css and html are copied on different sources. 
  - This project support Authentication with jwt token.
  - Users can signin,signup signout on the App..and start adding its workout.
  - user password are completly hash before saving on the database.
  - Each user can only see and delete its own workout.
  - After successful login, the backend issue refresh and access token and frontend save it in vuex state and in the localstorage.
  - Each request,backend issue new accessToken
  - Some routes are protected, meaning it can't be access without authentication.


Note:This this app uses environment variables save on .env file.Please add .env file on the root of backend folder and add the following:
- DB_HOST=<YOUR DB HOST>
- DB_NAME=<YOUR DBNAME>
- DB_USER=<YOUR DB_USER>
- DB_PWD=<YOUR DB_PwD>
- PORT=<YOUR CHOOSEN APP PORT>
- TOKEN_SECRET=<STRING THE LONGER THE BETTER>


  
  
