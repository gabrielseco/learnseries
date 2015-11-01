'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid';
import request from '../utils/config';



let serverFetch = async function(apiendpoint) {

    let books = await request.get(apiendpoint + 'libros');

    return books.data;

};

let serverFetchBook = async function(apiendpoint, params) {

    let books = await request.get(apiendpoint + 'libro?ID='+params);
    return books.data;
}

let serverFetchWords = async function(apiendpoint, params) {

    let books = await request.get(apiendpoint + 'diccionarios_libros?ID='+params);

    return books.data;

};

let serverCreate = async function(apiendpoint, apiBooks, params) {

  let qry = "?q="+params.name;

  var books = await request.get(apiBooks + qry);

  var arrayOfBooks = new Array();

  for( var i = 0; i < books.data.items.length; i++) {
    console.log(books.data.items[i].volumeInfo);
    if(params.name === books.data.items[i].volumeInfo.title ) {

      arrayOfBooks.push(books.data.items[i]);

    }
  }

};

let serverModify = async function(apiendpoint, params) {

  var fecha = params.airdate.split("/");

  fecha = fecha[1] + "/" + fecha[0] + "/"+ fecha[2];

  console.log('fecha',fecha);



  let qry = "modificar_libro?ID="+params.ID+"&name="+params.name+"&imagen="+params.photo+"&descripcion="+params.description+"&airdate="+fecha+"&youtube="+params.youtube;
  console.log(apiendpoint + qry);
  var books = await request.get(apiendpoint + qry);

  return books.data;
};


export class BookActions extends Actions {

    constructor(apiendpoint, apiBooks) {
        super();
        this.apiendpoint = apiendpoint;
        this.apiBooks = apiBooks;
    }
    async fetchBook(params){
      const response = await serverFetchBook(this.apiendpoint,params);
      return response;
    }

    async fetchBooks() {
      const response = await serverFetch(this.apiendpoint);
      return response;
    }

    async fetchWords(params){

      const response = await serverFetchWords(this.apiendpoint, params);
      return response;

    }

    async create(params){
      const response = await serverCreate(this.apiendpoint, this.apiBooks, params);
      return response;
    }

    async modify(params) {

      const response = await serverModify(this.apiendpoint, params);
      return response;
    }


  }
