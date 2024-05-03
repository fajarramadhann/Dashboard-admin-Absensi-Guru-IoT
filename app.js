import express from "express";
import mqtt from "mqtt";
import path from 'path';
import { fileURLToPath } from 'url';

import pageRoute from './routes/routePage.js';

import connectDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// const client = mqtt.connect("wss://jarprojects:pU1p1SKIPuCpjsUk@jarprojects.cloud.shiftr.io");
const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");
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
client.subscribe('absensi_guru', { qos: 1}, (err) => {
  if (err){
    console.error("Failed Sub Topic: ", err);
  } else {
    // console.log("Subscribe to topic", topic);
    client.on("message", (topic, payload) => {
      console.log(topic)
      console.log(payload.toString())
    })
  }
});

// const topic = 'uuid_rfid';
client.subscribe('uuid_rfid', { qos: 1 }, (err) => {
  if (err){
    console.error("Failed Sub Topic: ", err);
  } else {
    // console.log("Subscribe to topic: ", topic);

    client.on("message", (topic, payload) => {
      console.log(topic)
      console.log(payload.toString())
      const dataUUID = payload.toString();
      app.locals.dataUUID = dataUUID; // Menyimpan variabel global
    })
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
client.on('disconnect', () => {
    console.log('Gagal terhubung ke MQTT broker');
    connectionStatus = 'Terputus';
    app.locals.connectionStatus = connectionStatus; // Menyimpan variabel global
  });

export default app;

