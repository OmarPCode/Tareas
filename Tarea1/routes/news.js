const express = require('express');
const { getSources, getTopHeadlines, getEverything } = require('../controllers/newsController');

const router = express.Router();

router.get('/sources', getSources);
router.get('/top-headlines', getTopHeadlines);
router.get('/everything', getEverything);

module.exports = router;
