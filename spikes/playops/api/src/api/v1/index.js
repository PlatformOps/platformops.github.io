const express = require('express');

const router = express.Router();
const angularGeneratorRoute = require('./angular-generator');
const configurationsRoute = require('./configurations');
const directoryRoute = require('./directory');
const jhipsterGeneratorRoute = require('./jhipster-generator');


router.use('/angular-generator', angularGeneratorRoute);
router.use('/configurations', configurationsRoute);
router.use('/directory', directoryRoute);
router.use('/jhipster-generator', jhipsterGeneratorRoute);

module.exports = router;
