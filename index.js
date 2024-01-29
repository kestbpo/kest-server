import express, { json } from "express";
import cors from "cors";
import { join } from 'path';
//import mongoose, { connect } from "mongoose";
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import SENDMAIL from   './emailer.js';
//import { MongoClient, ServerApiVersion } from 'mongodb';
//import client from "./models/dataform.js";



const app = express();
app.use(cors())
app.use(json())


const __dirname = dirname(fileURLToPath(import.meta.url));
 
console.log(__dirname);
const staticPath= join(__dirname,"../client/build");
console.log(staticPath);
app.use(express.static(staticPath));

app.post('/send', (req, res) => {
  try {

const Options = {
      from: process.env.Email, // sender address
      to: "mohan@kestbpo.com, mohan.velaga333@gmail.com", // list of receivers
      subject:"contact us", // Subject line
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
      <li>Name: ${req.body.FirstName  +''+ req.body.LastName}</li>
      <li>Email: ${req.body.Email}</li>
      <li>Phone: ${req.body.Phone}</li>
      <li>Address: ${req.body.Address}</li>

      </ul>
      `
} 
SENDMAIL(Options, function (err, info) {
  if (err) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong. Try again later'
    });
  } else {
    res.send({
      success: true,
      message: 'Thanks for contacting us. We will get back to you shortly',
    });
  }
});
} catch (error) {
res.status(500).send({
  success: false,
  message: 'Something went wrong. Try again later'
});
}
});

    
    




app.listen(process.env.PORT, ()=>{
  console.log('app listening at port:',process.env.PORT);
});