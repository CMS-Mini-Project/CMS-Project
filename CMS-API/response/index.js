'use strict';

// HTTP Status Codes
const HttpStatus = require('http-status-codes');

module.exports = {
  success: (data, response) => {
    response.status(HttpStatus.StatusCodes.OK).json(data);
  },
  created: (data, response) => {
    response.status(HttpStatus.StatusCodes.CREATED).json(data);
  },
  no_content: (response) => {
    response.status(HttpStatus.StatusCodes.NO_CONTENT).end();
  },
  bad_request: (data, response) => {
    response.status(HttpStatus.StatusCodes.BAD_REQUEST).json(data);
  },
  unauthorized: (data, response) => {
    response.status(HttpStatus.StatusCodes.UNAUTHORIZED).json(data);
  },
  forbidden: (data, response) => {
    response.status(HttpStatus.StatusCodes.FORBIDDEN).json(data);
  },
  not_found: (data, response) => {
    response.status(HttpStatus.StatusCodes.NOT_FOUND).json(data);
  },
  internal_server_error: (data, response) => {
    response.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(data);
  },
};
