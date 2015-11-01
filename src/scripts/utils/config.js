'use strict';
import axios from 'axios';
const TIMEOUT = 3000;

var request = axios.create({
  timeout: TIMEOUT
});

module.exports = request;
