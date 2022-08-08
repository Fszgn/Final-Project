"use strict";
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config("./.env");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4, stringify } = require("uuid");

const studentLogedIn = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("finalpro");
      const insertStudent = await db
        .collection("students")
        .insertOne({
          _id: req.body.student.sub,
          studentEmail: req.body.student.email,
        });
      console.log(insertStudent);

      
    return res.status(200).json({
        status: 200,
        body:insertStudent,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
    
    // Unique UserID -> purpose of validating the USER
    // console.log(req.body.student.sub);

    // console.log(MONGO_URI)
};
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

  // Unique UserID -> purpose of validating the USER
  // console.log(req.body.student.sub);

  // console.log(MONGO_URI)
};

const getTheUser = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("finalpro");
    const getTheUser = await db.collection("students").findOne({
     _id: req.cookies.userUId
    });

    const getTheUserMnt = await db.collection("mentors").findOne({
     _id: req.cookies.userUId
    });

      console.log(getTheUser, "mntr->", getTheUserMnt);
      
    return res.status(200).json({
      status: 200,
      body: {student: getTheUser, mentor: getTheUserMnt},
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }

}





module.exports = {
  studentLogedIn,
  mentorLogedIn,
  getTheUser,
};
