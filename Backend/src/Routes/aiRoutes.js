const express = require('express');
const aiController = require('../controllers/aicontroller');
const router = express.Router();

router.post('/get-resume',aiController.getResume);

router.post('/generate-resume-pdf',aiController.getResumePDF);

module.exports = router;