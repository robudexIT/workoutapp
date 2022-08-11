# workoutapp
This branch is same features as localstorage branch except its save refressToken in cookie storage to prevent Cross-Site Scripting (XSS) 

Note:This this app uses environment variables save on .env file.Please add .env file on the root of backend folder and add the following:
DB_HOST=<YOUR DB HOST>
DB_NAME=<YOUR DBNAME>
DB_USER=<YOUR DB_USER>
DB_PWD=<YOUR DB_PwD>
PORT=<YOUR CHOOSEN APP PORT>
ACCESS_TOKEN_SECRET=<STRING THE LONGER THE BETTER>
REFRESH_TOKEN_SECRET=<STRING THE LONGER THE BETTER>
