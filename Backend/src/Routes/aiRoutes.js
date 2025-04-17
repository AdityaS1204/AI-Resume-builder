const express = require('express');
const aiController = require('../controllers/aicontroller');
const router = express.Router();

router.post('/get-resume',aiController.getResume);

module.exports = router;