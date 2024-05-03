import mysql2 from 'mysql2';

const dbConf = {
  host: 'localhost',
  user: 'jardev',
  password: 'jarssdev',
  database: 'absensi_guru',
  connectionLimit: 10
}

const db = mysql2.createConnection(dbConf);

const connectDB = async () => {
  try {
    db.connect();
    console.log("Connected to database");
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;