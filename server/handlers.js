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
      const student = await db.collection("students").find().toArray();
      
      console.log(student)
    return res.status(200).json({
      status: 200,
      data: student,
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






module.exports = {
  studentLogedIn,
};
