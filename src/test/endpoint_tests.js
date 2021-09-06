const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");

let Server = require("../server");

let serverClassUser = new Server("user",8081);
let serverClassTask = new Server("task",8082);

let serverUser = serverClassUser.start()
let serverTask = serverClassTask.start()

chai.use(chaiHttp);
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

// get tables
const  User  = require('../models/user');
const  Task  = require('../models/task');

var token = "",taskid="";

/**
 * Reports Tests
 */
describe("Endpoint Tests", function() {

  /* 
  * Clean Up the reports used for tests
  * as we have only one database and no test database
  * so lets change the tested upon doucment to make it go back to OPEN state before each test
  */
  before(async function(){ 
    await User.deleteOne({"email": "ahmedashraf@gmail.com"})
    await Task.deleteOne({"title": "This is a test title.","description":"This is a test description"})
  });

  describe("Testing user services", function() {
    it("Should be able to register", done => {
      chai
        .request(serverUser)
        .post("/register")
        .send({
            "email":"ahmedashraf@gmail.com",
            "password":"1234abcd",
            "name":"Ahmed Ashraf"        
        })
        .end((err, res) => {
          // Check for returned result

          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.have.all.keys(
            "_id",
            "name",
            "email",
            "token"
          );

          done();
        });
    });
    it("Should be able login", done => {
      chai
        .request(serverUser)
        .post("/login")
        .send({
          "email":"ahmedashraf@gmail.com",
          "password":"1234abcd"
        })
        .set("Content-Type", "application/json")
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.have.all.keys(
            "_id",
            "name",
            "email",
            "token"
          );

          token = res.body.data.token;
          done();
        });
    });
  })

  describe("Testing task services", function() {
    it("Should be able to add new task", done => {
      chai
        .request(serverTask)
        .post("/task/add")
        .set("x-access-token",token)
        .send({
          "title": "This is a test title",
          "description": "This is a test description",
          "deadline": "Fri Sep 03 2021 06:13:20 GMT+0200" ,
          "reminderTime": "Fri Sep 03 2021 06:13:20 GMT+0200",
          "isCompleted": false      
        })
        .end((err, res) => {
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.have.all.keys(
            "deadline",
            "reminderTime",
            "isCompleted",
            "_id",
            "title",
            "description",
          );
          taskid = res.body.data._id

          done();
        });
    });
    it("Should be able to get all tasks", done => {
      chai
        .request(serverTask)
        .get("/task")
        .set("x-access-token",token)
        .set("Content-Type", "application/json")
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.be.an('array')

          done();
        });
    });
    it("Should be able to get all tasks with pagination too", done => {
      chai
        .request(serverTask)
        .get("/task?perPage=6&page=0")
        .set("x-access-token",token)
        .set("Content-Type", "application/json")
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.be.an('array')

          done();
        });
    });
    it("Should be able to edit a tasks", done => {
      chai
        .request(serverTask)
        .put("/task/edit/" + taskid)
        .set("Content-Type", "application/json")
        .set("x-access-token",token)
        .send({
            "title": "1234",
            "description": "1234",
            "deadline": "Fri Sep 05 2021 06:13:20 GMT+0200" ,
            "reminderTime": "Fri Sep 05 2021 06:13:20 GMT+0200",
            "isCompleted": true
        })
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.have.property('nModified', 1);

          done();
        });
    });
    it("Should be able to delete a task", done => {
      chai
        .request(serverTask)
        .delete("/task/delete/" + taskid)
        .set("Content-Type", "application/json")
        .set("x-access-token",token)
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.have.property('deletedCount', 1);

          done();
        });
    });
  })

});


