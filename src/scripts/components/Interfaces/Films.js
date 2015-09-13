'use strict';

import React from 'react/addons';
import FilmsListItem from '../Films/FilmListItem';
import Loading from '../UI/Loading';
import Router from 'react-router';
import { Navigation, TransitionHook } from 'react-router';
import Paginator from 'react-pagify';
import SearchInput from 'react-search-input';




let InterfaceFilms = React.createClass({
    mixins: [ Navigation, TransitionHook ],
    getInitialState(){
      return {
        films: '',
        pagination: {
            page: 0,
            perPage: 10,
        },
        searchTerm: '',
        paginacion: 'pagination'
      };
    },
    componentWillMount() {
      this.props.flux.getActions('films').fetchFilms().then((res) => {
        //console.log('res', res);

        this.setState({ films: res });

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
      if (this.state.films !== ''){
        var data = this.state.films;
        var pagination = this.state.pagination;
        var paginated = Paginator.paginate(data, pagination);
        if (this.state.searchTerm.length > 0) {
          var filters = ['Nombre'];
          paginated.data = this.state.films.filter(this.refs.search.filter(filters));
        }





        var list = paginated.data.map((film, i) => {
          //console.log(film.ID);
          return (
            <FilmsListItem key={film.ID} data={film} flux={this.props.flux}/>
          );

        });

        const addFilm = () => {
        //  console.log('we go to addFilm');
          this.transitionTo('/addFilm');
        };


          return (
              <div className="films">
              <SearchInput ref='search' onChange={this.searchUpdated} />
                <div className="filmButton">
                  <button className="addFilm" onClick={addFilm}>ADD FILM</button>
                </div>
                <div className="films">
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

module.exports = InterfaceFilms;
