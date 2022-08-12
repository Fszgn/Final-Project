"use strict";
const request = require("request-promise");
const { MongoClient, ObjectId } = require("mongodb");
var NodeGeocoder = require("node-geocoder");

require("dotenv").config("./.env");
const { MONGO_URI, GOOGLE_MAP_API } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4, stringify } = require("uuid");
//Generates Random Mentor info for the Project
const userGen = (req, res) => {
  const userInfo = async () => {
    const response = await request(
      "https://randomuser.me/api/?nat=ca,tr,us,gr",
      { json: true },
      (err, res, body) => {
        if (err) {
          return console.log(err);
        }
      }
    );
    return response;
  };
  userInfo()
    .then((data) => {
      const cityArray = [
        "Montreal",
        "Toronto",
        "Vancouver",
        "Quebec City",
        "Ottawa",
        "Kitchener",
        "Gatineau",
        "Calgary",
        "Edmonton",
        "Winnipeg",
        "Victoria",
        "Halifax",
        "Hamilton",
        "St. John's",
        "Saskatoon",
        "Mississauga",
        "Brampton",
        "Windsor",
      ];
      let profesMentor = [
        "Math",
        "Science",
        "Computer",
        "Chemistry",
        "Computer Science",
        "Earth Sciences",
        "English Language and Literature",
        "Geography",
        "History",
        "Music",
        "Philosophy",
        "Physics",
        "Sociology",
        "Ancient Greek",
        "Arabic",
        "French",
        "Spanish",
        "Dance",
        "Gymnastics",
        "Swimming",
        "Weight training",
        "Agriculture",
        "Chemistry",
        "Earth science",
        "Physical science",
        "Environmental science",
        "Religious studies",
        "World history",
        "Painting",
        "Robotics",
        "Computer-aided drafting",
      ];
      let conditArr = [true, false];

      console.log(data.results);
      let Obj = {};
      Obj._id = data.results[0].login.uuid;
      Obj.email = data.results[0].email;
      Obj.firstName = data.results[0].name.first;
      Obj.lastName = data.results[0].name.last;
      // Obj.address = "5985 Rue Jean-Talon E, Saint-Léonard, QC H1S 1M5";
      Obj.city = cityArray[Math.floor(Math.random() * cityArray.length)];
      Obj.country = "Canada";
      Obj.picture = data.results[0].picture.medium;
      Obj.mentroship = [
        profesMentor[Math.floor(Math.random() * profesMentor.length)],
        profesMentor[Math.floor(Math.random() * profesMentor.length)],
        profesMentor[Math.floor(Math.random() * profesMentor.length)],
      ];
      Obj.isGreen = conditArr[Math.floor(Math.random() * 2)];

      return Obj;
    })
    .then(async (data) => {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
      try {
        const db = client.db("finalpro");

        const insertMentor = await db.collection("mentors").insertOne(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        client.close();
      }
      return data;
    })
    .then((data) => {
      console.log(data);
      return res.status(200).json({
        status: 200,
        body: data,
        success: true,
      });
    });
};
// Insert logedin Students information into Mongodb
const studentLogedIn = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("finalpro");
    const insertStudent = await db.collection("students").insertOne({
      _id: req.body.student.sub,
      studentEmail: req.body.student.email,
    });
    console.log(insertStudent);

    return res.status(200).json({
      status: 200,
      body: insertStudent,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};
// Insert logedin Mentor information into Mongodb
const mentorLogedIn = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("finalpro");
    const insertMentor = await db.collection("mentors").insertOne({
      _id: req.body.mentor.sub,
      mentorEmail: req.body.mentor.email,
    });
    console.log(insertMentor);

    return res.status(200).json({
      status: 200,
      body: insertMentor,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

// receives users data from DataBase
const getTheUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("finalpro");
    const getTheUser = await db.collection("students").findOne({
      _id: req.cookies.userUId,
    });

    const getTheUserMnt = await db.collection("mentors").findOne({
      _id: req.cookies.userUId,
    });

    // console.log(getTheUser, "mntr->", getTheUserMnt);

    return res.status(200).json({
      status: 200,
      body: { student: getTheUser, mentor: getTheUserMnt },
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

// receives Mentors data from DataBase
const getTheMentors = async (req, res) => {
  console.log(req.params)
  let cityName = req.params.city;

  // if (req.params.city === "null") {
  //   cityName = "Montreal";
  //   console.log("cityName");
  // }
    console.log(cityName);
  
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("finalpro");

    // if the parameter is empty
    if (cityName === "null") {
      const allTheUser = await db
        .collection("mentors")
        .find({ city: "Montreal" })
        .toArray();
      return res.status(200).json({
        status: 200,
        body: allTheUser,
        success: true,
      });
    }

    // if the parameter is NOT empty
    else if (cityName !== "null") {
      const getTheUser = await db
        .collection("mentors")
        .find({ city: cityName })
        .toArray();

      return res.status(200).json({
        status: 200,
        body: getTheUser,
        success: true,
      });
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

// return the user's address info based on coordinates  !!!####!!!!!-------->>>>>>>
const fetchCity = async (req, res) => {
  var options = {
    provider: "google",
    httpAdapter: "https", // Default
    apiKey: GOOGLE_MAP_API, // for Mapquest, OpenCage, Google Premier
    formatter: "json", // 'gpx', 'string', ...
  };

  var geocoder = NodeGeocoder(options);

  geocoder.reverse({ lat: 28.5967439, lon: 77.3285038 }, function (err, res) {
    console.log(res);
  });
};

//Get each user
const findEachUser = async (req, res) => {
  const uniqueId = req.params.id;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("finalpro");
    const getTheUser = await db
      .collection("mentors")
      .findOne({ _id: uniqueId });

    return res.status(200).json({
      status: 200,
      body: getTheUser,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

//UPDATE review mentor's Database
const postReview = async (req, res) => {
  const uniqueId = req.params.id;
  const rev = req.body.text;
  console.log(rev)
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("finalpro");
    const insertReview = await db
      .collection("mentors")
      .updateOne({ _id: uniqueId }, { $push: { reviews: rev } });

    return res.status(200).json({
      status: 200,
      body: insertReview,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

//UPDATE review mentor's Database
const deleteReview = async (req, res) => {
  const uniqueId = req.params.id;
  const revId = req.body.id;
console.log(uniqueId,req.body)
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("finalpro");
    const insertReview = await db
      .collection("mentors")
      .updateOne({ _id: uniqueId }, { $pull: { reviews: { time: revId } } });

    return res.status(200).json({
      status: 200,
      body: insertReview,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};
module.exports = {
  studentLogedIn,
  mentorLogedIn,
  getTheUser,
  userGen,
  getTheMentors,
  fetchCity,
  findEachUser,
  postReview,
  deleteReview,
};
