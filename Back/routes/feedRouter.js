const router = require('express').Router();
const createFeed = require('../controllers/feeds/create_feed');
const getAll = require('../controllers/feeds/getAll');
const deleteFeed = require('../controllers/feeds/deleteFeed');
const auth = require('../controllers/login/auth');
const fetchFeed = require('../controllers/feeds/fetchFeed');

router.post('/login', auth);
router.post('/create', createFeed);
router.delete('/delete', deleteFeed);
router.get('/list', getAll);
router.get('/fetchfeed', fetchFeed);

module.exports = router;
