const express = require('express');
const otherController = require('../controller/otherController')

const router = new express.Router();

router.get('/slides', otherController.getSlides);
router.get('/theatres', otherController.getTheatres);
module.exports = router;