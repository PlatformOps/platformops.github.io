const express = require('express');
const validate = require('express-validation');
const controller = require('./directory.controller');
const validation = require('./directory.validation');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

/**
 * @api {get} api/v1/directory directory
 * @apiDescription Api is used for directory structure
 * @apiVersion 1.0.0
 * @apiName directory
 * @apiPermission public
 *
 * @apiParam  {String} code  Test Code
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .get(validate(validation.directory), controller.directory);

router.route('/openDirectory')
    .post(urlencodedParser,controller.openDirectory);

router.route('/pasteDirectory')
    .post(urlencodedParser,controller.pasteDirectory);


module.exports = router;
