const express = require('express');
const app = express();
const router = require('express').Router();
const createFeed = require('../controllers/feeds/create_feed');
const getAll = require('../controllers/feeds/getAll');
const deleteFeed = require('../controllers/feeds/deleteFeed');
const auth = require('../controllers/login/auth');

router.post('/login', auth);
router.post('/create', createFeed);
router.post('/delete', deleteFeed);
router.get('/list', getAll);
app.use('/api/v1', router);
module.exports = router;
