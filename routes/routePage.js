import app from "../app.js";
import express from "express";

const router = express.Router()

router.get('/', (req, res) => {
  const status = { status: app.locals.connectionStatus };
  res.render('pages/dashboard', status);
})

router.get('/data_guru', (req, res) => {
  const status = { status: app.locals.connectionStatus };
  res.render('pages/data_guru', status);
})

router.get('/data_absen', (req, res) => {
  const status = { status: app.locals.connectionStatus };
  res.render('pages/data_absen', status);
})

router.get('/pengguna', (req, res) => {
  const status = { status: app.locals.connectionStatus };
  res.render('pages/pengguna', status);
})

router.get('/device', (req, res) => {
  const status = { status: app.locals.connectionStatus };
  res.render('pages/device', status);
})

router.get('/setting', (req, res) => {
  const status = { status: app.locals.connectionStatus };
  res.render('pages/setting', status);
})

router.get('/add_guru', (req, res) => {
  const status = { status: app.locals.connectionStatus };
  res.render('pages/add_guru', status);
})



export default router;