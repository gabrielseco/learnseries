'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid';


let serverFetch = async function(apiendpoint) {

    let books = await axios.get(apiendpoint + 'libros');

    return books.data;

};


export class BookActions extends Actions {

    constructor(apiendpoint) {
        super();
        this.apiendpoint = apiendpoint;
    }

    async fetchBooks() {
      const response = await serverFetch(this.apiendpoint);
      return response;
    }
  }
