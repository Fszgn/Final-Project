const express = require("express");
const morgan = require("morgan");
const request = require("request");

const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8000;
const {
  studentLogedIn,
  mentorLogedIn,
  getTheUser,
  userGen,
  getTheMentors,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(cookieParser())
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //generates fake Mentors data
  .get("/userGen", userGen)
  // get the user based on the userUId from Cookie storage
  .get("/getTheUser", getTheUser)
  // post student email with unique sub id
  .post("/studentLogIn", studentLogedIn)
  // post mentor email with unique sub id
  .post("/mentorLogIn", mentorLogedIn)
  //get the Mentors based on city
  .get("/getTheMentors", getTheMentors)
  .listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
  });
