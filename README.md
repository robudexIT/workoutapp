# workoutapp
This branch is implementing cookie in the crossite domain. And because cookie is not allowed to be sent and recieve on  unsecure connection, we
need to use https.

The many ways to do it.. we can get valid ssl certificate, inject is to our backend server.
But in this implementation, we use aws apigateway as proxy to take advantage the native https of apigateway.

#Project Architecture 
  - Backend  - nodejs/express running EC2
  - Fronted  - vuejs running on EC2
  - PROXY     - APIGATEWAY  (http proxy integration)
   -Database  - RDS mysql Instance
   
# Project Feautres and Anatomy
- This Project is same as in cookie branch. But this time , we used seperate servers for backend and frontend to simulated cross-domain
- We Implemented in AWS.
- Launch two ubuntu instance (t2.micro) on default VPC
- Launch RDS Instance on default VPC
- SETUP The necessary permission on Security Groups
- on EC2 backend and frontend  clone this repo.
  (make sure to run npm install on each project)
 -S

