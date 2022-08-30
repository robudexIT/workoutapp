# workoutapp
This branch is implementing cookie in the crossite domain. And because cookie is not allowed to be sent and recieve on  unsecure connection, we
need to use https.

The many ways to do it.. we can get valid ssl certificate, inject is to our backend server.
But in this implementation, we use aws apigateway as proxy to take advantage the native https of apigateway.

# Project Architecture 
  - Backend  - nodejs/express running EC2
  - Frontned  - vuejs running on EC2
  - PROXY     - APIGATEWAY  (http proxy integration)
  - Database  - RDS mysql Instance
   
# Project Features and Anatomy
- This Project is same as in cookie branch. But this time , we used seperate servers for backend and frontend to simulated cross-domain
- We Implemented in AWS.
- Launch two ubuntu instance (t2.micro) on default VPC
- Launch RDS Instance on default VPC
- SETUP The necessary permission on Security Groups
- on EC2 backend and frontend  clone this repo.
  (make sure to run npm install on each project  to start on backend run npm start, for frontend just run npm run dev or npm run build for production )
 - SETUP The necessary permission on Security Groups
- Navigate to AWS APIGATEway, Click APIs the <Click Create> API button. Under REST API import the workoutapi.yaml swagger file
- on the Integration Request of each method, udpate Enpooint Url: of your ec2 instance, (ie  http://ec2-54-213-192-152.us-west-2.compute.amazonaws.com:3000/getworkouts, enable CORS with these options
   Access-Control-Allow-Headers: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Headers'
   Access-Control-Allow-Origin*: 'your ec2 instance frontend endpoint'
   Access-Control-Allow-Credentials: 'true'
- Deploy the API
  
 
 
 Note:This this app uses environment variables save on .env file.Please add .env file on the root of backend folder and add the following:
DB_HOST=
DB_NAME=
DB_USER=
DB_PWD=
PORT=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

