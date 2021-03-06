# Optilyz Backend challenge


### Introduction:

This is Optilyz backend challenge, the backend is built with microservices archticture in mind, we have 2 services the `user` and the `task` services, I should have added a sperate service for the authentication but due to the limited time frame I have only created these two services also in real life project the database should be only connected to its crosponding service(s) which is not the case here, the services run using docker containers and docker compose, I have built four docker containers:
1. Haproxy container which acts as API Gateway for routing to the different services
2,3. 2 node containers for each service
4. mongodb container

We have 2 modes for the `NODE_ENV` variable in the .env:
1. `development` => to the application as services in the development environment
2. `test` => to run the endpoint test cases which runs the two services at the same time
3. `production` => just written to simulate the production variables
To run a single service you can specify the service name in `SERVICE_NAME` env variable from `user` or `task`
the service name should always be equal to the route file name

### The prerequests to run this project:

   1. to have node & npm installed 
   2. to have docker installed 
   3. to have docker-compose installed

then head over to the APIs at port 8080 at localhost which is the exposed port for the `haproxy` you can change that inside the `docker-compose.yml` file

### How to run the project:

 run the following commands:

   1. run command `npm install`
   2. run command `docker-compose build`
   3. run command `docker-compose up`


### The APIs can be found inside the postman collection

   and here is the list of all routes <br />
`user` service  <br />
   POST   `http://localhost:8080/login` <br />
   POST   `http://localhost:8080/register` <br />
`task` service   <br />
   POST   `http://localhost:8080/task/add` <br />
   GET    `http://localhost:8080/task?perPage=10&page=0` <br />
   PUT    `http://localhost:8080/task/edit/:id` <br />
   DELETE `http://localhost:8080/task/delete/:id` <br />



### How to run the test cases:

Stand at the root directory and run command `npm run test` to run the endpoint api test cases 


For any questions or issues when running the task please contact me at ahmedashrafsafwat@gmail.com

Looking forward to hear from you