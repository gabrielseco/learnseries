'use strict';

import React from 'react/addons';
import TVListItem from '../TV/TVListItem';
import Loading from '../UI/Loading';
import Router from 'react-router';
import { Navigation, TransitionHook } from 'react-router';
import Paginator from 'react-pagify';
import SearchInput from 'react-search-input';




//WE USE A MAP TO LIST OUR TV ITEMS

let InterfaceTV = React.createClass({

    mixins: [ Navigation, TransitionHook ],
    getInitialState(){
      return {
        tv: '',
        pagination: {
            page: 0,
            perPage: 10,
        },
        searchTerm: '',
        paginacion: 'pagination'
      };
    },
    componentWillMount() {
      this.props.flux.getActions('tv').fetchTV().then((res) => {
        //console.log('res', res);

        this.setState({ tv: res });

        var width = document.getElementById('tv').offsetWidth;

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

      if(this.state.tv !== '') {
        var data = this.state.tv;
        var pagination = this.state.pagination;
        var paginated = Paginator.paginate(data, pagination);

        if (this.state.searchTerm.length > 0) {
          var filters = ['Nombre'];
          paginated.data = this.state.tv.filter(this.refs.search.filter(filters));
        }

        var list = paginated.data.map((tv, i) => {
          return (
            <TVListItem key={tv.ID} data={tv} flux={this.props.flux} />
          );
        });

      const addTV = () => {
        this.transitionTo('/addTV');
      };

        return (
            <div className="tv">
            <SearchInput ref='search' onChange={this.searchUpdated} placeholder='Buscar...' />
              <div className="tvButton">
                <button className="addTV" onClick={addTV}>ADD TV SHOW</button>
              </div>
              <div id='tv' className="tv-wrapper">
                {list}
              </div>
              <div className='pagination'>
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
    } else {
      return (<Loading/>);
    }
  }
});

module.exports = InterfaceTV;
