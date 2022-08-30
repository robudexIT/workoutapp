# workoutapp
This branch is same us cookie-cross-domain branch, with additional caching layer on the project.And also replacing S3 on the frontend instead of EC2 instance.

# Project Architecture 
  - Backend  - nodejs/express running EC2
  - Frontned  - S3 Static WebHosting
  - PROXY     - APIGATEWAY  (http proxy integration)
  - Caching Layer - AWS Elasticache (memcached)
  - Database  - RDS mysql Instance
   
# Project Features and Anatomy
- This Project is same as in cookie branch. But this time , we used seperate servers for backend and frontend to simulated cross-domain
- We Implemented in AWS.
- Launch  ubuntu instance (t2.micro)  for backend on default VPC and download the backend project on this instance (run npm install on the project folder and run npm run start)
- Launch RDS Instance on default VPC
- For Elasticached follow heres the docs https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/GettingStarted.html
- SETUP The necessary permission on Security Groups
- Navigate to AWS APIGATEway, Click APIs the <Click Create> API button. Under REST API import the workoutapi.yaml swagger file
- on the Integration Request of each method, udpate Enpooint Url: of your ec2 instance, (ie  http://ec2-54-213-192-152.us-west-2.compute.amazonaws.com:3000/getworkouts, enable CORS with these options
   Access-Control-Allow-Headers: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Headers'
   Access-Control-Allow-Origin*: 'your s3 webstatic endpoint'
   Access-Control-Allow-Credentials: 'true'
- Deploy the API
  
- On your computer, download the project, open the frontend/src/store/index.js and update the  apiAddr of your apigateway endpoint
 - run npm install on the workoutapp/frontend , then run npm build 
- Create S3 bucket, enable static webhosting, created bucket policy to allowed read access on this bucket,and upload the build project of the vuejs frontend

 Note:This this app uses environment variables save on .env file.Please add .env file on the root of backend folder and add the following:
DB_HOST=
DB_NAME=
DB_USER=
DB_PWD=
PORT=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
MEMCACHED_CLUSTER_ENDPOINT=
  


