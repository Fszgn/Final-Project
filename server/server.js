const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8000;
const { studentLogedIn } = require("./handlers");

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
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))
    

  .get("/api", (req, res) => {
    res.status(200).json({ status: 200, message: "hello react" });
  })
  .post("/studentLogIn", studentLogedIn)

  .listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
  });
