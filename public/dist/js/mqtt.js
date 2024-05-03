const clientId = "project_absensi#1";
const host = "wss://jarprojects:Noi0SArZnxKxdQ6n@jarprojects.cloud.shiftr.io:443/";

const options = {
  keepalive: 60,
  clientId: clientId,
  username: "rahmadhanfajar420@gmail.com",
  password: "buatBrokerMQTT",
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: false,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
};

console.log("Connecting to the broker: ", host);
const client = mqtt.connect(host, options);

if(client){
  console.log("Connected to the broker");
} else {
  console.log("Failed to connect to the broker");
}
