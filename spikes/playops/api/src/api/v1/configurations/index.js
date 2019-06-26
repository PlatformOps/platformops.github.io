const express = require('express');
const validate = require('express-validation');
const controller = require('./configurations.controller');
const validation = require('./configurations.validation');

const router = express.Router();

/**
 * @api {post} api/v1/configurations configurations
 * @apiDescription Api for Generating Api for creating Angular App from UI
 * @apiVersion 1.0.0
 * @apiName configurations
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
  .post(validate(validation.configurations), controller.configurations);

module.exports = router;
