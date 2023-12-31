const express = require('express');

const screenController = require('../controller/screenController');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/', auth.user, screenController.getScreen);
router.get('/schedule-time/', auth.user, screenController.getScreenByScheduleIdAndTime);
router.get('/schedule/:scheduleId', screenController.getScreenByScheduleId);
router.post('/booked-seat/:screenId', auth.user, screenController.setBookedSeat);
router.post('/booked-seat/:screenId', auth.user, screenController.setBookedSeat);
router.post('/get/', auth.user, screenController.getScreenByScheduleIdAndTime);
router.delete('/booked-seat/:bookedSeatId', auth.user, screenController.deleteBookedSeat);
router.delete('/reset-seat/:screenId', auth.manager, screenController.resetSeatArray);
router.delete('/:screenId', auth.manager, screenController.clearAllBookedSeatOfScreen);

module.exports = router;