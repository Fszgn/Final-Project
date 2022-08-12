const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {
  /* ... */ cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  /* ... */
  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  })
});

httpServer.listen(8001);


const PORT = 8000;
const {
  studentLogedIn,
  mentorLogedIn,
  getTheUser,
  userGen,
  getTheMentors,
  fetchCity,
  findEachUser,
  postReview,
  deleteReview,
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
  .use(cors())
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
  .get("/getTheMentors/:city", getTheMentors)
  // get City info by location
  .get("/fetchCity", fetchCity)
  // get City info by location
  .get("/findEachUser/:id", findEachUser)
  // post new mentor's review
  .put("/postReview/:id", postReview)
  // DELETE a review
  .delete("/deleteReview/:id", deleteReview)
  .listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
  });

