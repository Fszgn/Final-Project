const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = require("express")();
const httpServer = require("http").createServer(app);
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
  startConversation,
  addNewMessage,
  receiveMessages,
} = require("./handlers");
const options = {
  /* ... */ cors: {
    origin: "https://teal-daifuku-553f1c.netlify.app/",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(httpServer, options);
//smthng
//Handle SOCKET.IO
io.on("connection", async (socket) => {
  /* ... */
  const msgArray = await receiveMessages();
  io.emit("receive_message", msgArray);

  socket.on("send_message", async (data) => {
    await addNewMessage(data);
    const msgArray = await receiveMessages(data);
    io.emit("receive_message", msgArray);
  });
});
// SOCKET.IO SERVER
httpServer.listen(8001);

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


  .get("/", (req,res) => {
       return res.status(200).json({
         status: 200,
         body: "this application runs",
         success: true,
       });
    })
  //generates fake Mentors data
  .get("/userGen", userGen)
  // get the user based on the userUId from Cookie storage
  .get("/getTheUser", getTheUser)
  // post student email with unique sub id
  .post("/studentLogIn", studentLogedIn)
  // post mentor email with unique sub id
  .post("/mentorLogIn", mentorLogedIn)
  // post new message
  .post("/startConversation", startConversation)
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

  .listen(process.env.PORT || 8000, () => {
    console.log(`Example app listening on PORT`);
  });
