'use strict';
const http = require('http');

class HttpError extends Error{
    constructor(status, message){
        Error.apply(this, arguments);
        Error.captureStackTrace(this, HttpError);

        this.status = status;
        this.message = message || http.STATUS_CODES[status] || "Error";
    }
}
exports.HttpError = HttpError;

class AuthError extends Error{
    constructor (message){
        Error.apply(this, arguments);
        Error.captureStackTrace(this, HttpError);

        this.message = message;
    }
}

exports.AuthError = AuthError;