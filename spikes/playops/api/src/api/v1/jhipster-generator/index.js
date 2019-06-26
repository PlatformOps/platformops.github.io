const express = require('express');
const validate = require('express-validation');
const controller = require('./jhipster-generator.controller');
const validation = require('./jhipster-generator.validation');

const router = express.Router();

/**
 * @api {post} api/v1/jhipsterGenerator jhipsterGenerator
 * @apiDescription API for creating Jhipster application by passing options in form of Array
 * @apiVersion 1.0.0
 * @apiName jhipsterGenerator
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
router.route('/generate-app')
  .post(validate(validation.jhipsterGenerator), controller.jhipsterGenerator);

module.exports = router;
