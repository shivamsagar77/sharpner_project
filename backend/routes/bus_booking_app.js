const express = require('express');
const router = express.Router();

const bus_booking_appController = require('../controller/bus_booking_appController')

app.post('creat_user',bus_booking_appController.create_user)