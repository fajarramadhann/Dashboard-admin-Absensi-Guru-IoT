import express from "express";
import mqtt from "mqtt";
import path from 'path';
import { fileURLToPath } from 'url';

import pageRoute from './routes/routePage.js';

import connectDB from "./config/db.js";
import { send } from "process";
import { connect } from "http2";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const client = mqtt.connect("wss://jarprojects:pU1p1SKIPuCpjsUk@jarprojects.cloud.shiftr.io");
const app = express();

// EJS
app.set('view engine', 'ejs');
app.set("views", "views");

app.use(express.static("public"));

app.use('/', pageRoute);

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
connectDB();

// MQTT
// Subscribe to topic
const topic = 'absensi_guru';
client.subscribe(topic, { qos: 1}, (err) => {
  if (err){
    console.error("Failed Sub Topic: ", err);
  } else {
    console.log("Subscribe to topic: ", topic);
  }
});

// Pub to topic
app.post('/publish', (req, res) => {  
  const { message } = req.body;
  client.publish(topic, message, { qos: 1 }, (err) => {
    if (err) {
      console.error("Failed Pub data to Topic: ", err);
    } else {
      console.log("Success Pub data to Topic: ", topic);
      res.status(200).send('Data berhasil dipublish');
    }
  });
});

let connectionStatus = 'Tidak Terhubung'; 
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    connectionStatus = 'Terhubung ke Broker';
    app.locals.connectionStatus = connectionStatus; // Menyimpan variabel global
});
client.on('error', () => {
    console.log('Gagal terhubung ke MQTT broker');
    connectionStatus = 'Terputus';
    app.locals.connectionStatus = connectionStatus; // Menyimpan variabel global
  });

export default app;

