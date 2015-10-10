'use strict';

import React from 'react/addons';
import Loading from '../UI/Loading';
import BookListItem from '../books/BookListItem';
import Router from 'react-router';
import { Navigation, TransitionHook } from 'react-router';
import Paginator from 'react-pagify';
import SearchInput from 'react-search-input';



let Interfacedata = React.createClass({
    mixins: [ Navigation, TransitionHook ],
    getInitialState(){
      return {
        data: '',
        pagination: {
            page: 0,
            perPage: 10,
        },
        searchTerm: '',
        paginacion: 'pagination'
      };
    },
    componentWillMount() {
      this.props.flux.getActions('books').fetchBooks().then((res) => {
        //console.log('res', res);

        this.setState({ data: res });

        var width = document.getElementById('data').offsetWidth;

        var img = 230;

        var total = parseInt(width / img);

        total = total * 2;

        var pagination = {
          page: 0,
          perPage: total,
        };


        this.setState({pagination: pagination});


      });
    },
    onSelect(page) {
      var pagination = this.state.pagination || {};

      pagination.page = page;

      this.setState({
          pagination: pagination
      });
  },

  onPerPage(e) {
      var pagination = this.state.pagination || {};

      pagination.perPage = parseInt(event.target.value, 10);

      this.setState({
          pagination: pagination
      });
  },
  searchUpdated(term) {
    this.setState({searchTerm: term});
    if (this.state.searchTerm.length > 0) {
      this.setState({
        paginacion: 'hide-pagination pagination'
      });
    }
    else {
      this.setState({
        paginacion: 'pagination'
      });
    }
  },
    render() {
      if (this.state.data !== ''){
        var data = this.state.data;
        var pagination = this.state.pagination;
        var paginated = Paginator.paginate(data, pagination);

        if (this.state.searchTerm.length > 0) {
          var filters = ['Nombre'];
          paginated.data = this.state.data.filter(this.refs.search.filter(filters));
          console.log('search'+paginated.data);
        }

        var list = paginated.data.map((book, i) => {
          //console.log(film.ID);
          return (
            <BookListItem key={book.ID} data={book} flux={this.props.flux}/>
          );

        });

        const addBook = () => {
        //  console.log('we go to addFilm');
          this.transitionTo('/addBook');
        };


          return (
              <div className="films">
              <SearchInput ref='search' onChange={this.searchUpdated} placeholder='Buscar...' />
                <div className="filmButton">
                  <button className="addFilm" onClick={addBook}>ADD BOOK</button>
                </div>
                <div id='data' className="data">
                  {list}
                </div>
                <div id='paginacion' className={this.state.paginacion}>
                  <Paginator
                      page={paginated.page}
                      pages={paginated.amount}
                      beginPages={3}
                      endPages={3}
                      onSelect={this.onSelect}>
                 </Paginator>
                </div>
              </div>
          );
        }
        else {
          return (<Loading/>);
        }
    }
});

module.exports = Interfacedata;
