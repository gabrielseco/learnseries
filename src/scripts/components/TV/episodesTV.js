'use strict';

import React from 'react/addons';
var Table = require('reactabular').Table;
var Search = require('reactabular').Search;
var Paginator = require('react-pagify');
var sortColumn = require('reactabular').sortColumn;
import { Navigation, TransitionHook, State } from 'react-router';

require('reactabular/style.css');


let episodesTV = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
    var columns = [
      {
          property: 'Nombre',
          header: 'Nombre'
      }, {
          property: 'Serie',
          header: 'Serie'
      }, {
          property: 'Temporada',
          header: 'Temporada'
      },
      {
          property: 'Numero',
          header: 'Número'
      },
      {
          property: 'ver',
          header: 'Ver',
          cell: (value, data, rowIndex, property) => {
             var ver = () => {
               var id = data[rowIndex].ID;
               console.log('ver palabras de un capítulo'+id);
               this.transitionTo('dictionaryEpisode/:id', {id: id} );

             };

             return {
                 value: <span>
                     <a onClick={ver} className="edit-btn">ver</a>
                 </span>
             };
           }
      },
      {
        property: 'editar',
        header: 'Editar',
        cell: (value, data, rowIndex, property) => {
           var editar = () => {
             var id = data[rowIndex].ID;
             var idSerie = this.getParams().id;
             console.log('editar episodio '+id);
             console.log('idSerie' +idSerie);
             this.transitionTo('/modifyEpisode/:serie/:id', {serie: idSerie, id: id});
           };

           return {
               value: <span>
                   <a onClick={editar} className="edit-btn">Editar</a>
               </span>
           };
         }
       },
       {
         property: 'eliminar',
         header: 'Eliminar',
         cell: (value, data, rowIndex, property) => {
            var eliminar = () => {
              var id = data[rowIndex].ID;
              console.log(id);
            };

            return {
                value: <span>
                    <a onClick={eliminar} className="delete-btn">Eliminar</a>
                </span>
            };
          }
        }

    ];
    return {
      data: [],
      columns: columns,
      pagination: {
        page: 0,
        perPage: 10
      },
      search: {
            column: '',
            query: ''
      },
      header: {
        onClick: (column) => {
        sortColumn(
            this.state.columns,
            column,
            this.setState.bind(this)
        );
      }
    }
    };
  },
  componentWillMount() {
    var params = this.getParams().id;

    var self = this;

    this.props.flux.getActions('tv').fetchTVEpisodes(params).then((res) => {
      console.log('res', res);

      this.setState({ data: res });

    });


  },
  onSearch(search) {

    console.log(search);
    this.setState({
        search: search
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

addEpisodes(){
  console.log('Add Episodes');

  var id = this.getParams().id;

  this.transitionTo('/addEpisode/:id', {id: id});
},

    render() {
      var dataPagination = this.state.data;
      var pagination = this.state.pagination;
      var header = this.state.header;

      if (this.state.search.query) {
        // apply search to data
        // alternatively you could hit backend `onChange`
        // or push this part elsewhere depending on your needs
        dataPagination = Search.search(
            this.state.data,
            this.state.columns,
            this.state.search.column,
            this.state.search.query
        );


    }

      dataPagination = sortColumn.sort(dataPagination, this.state.sortingColumn);


      var paginated = Paginator.paginate(dataPagination, pagination);

      return (
        <div className="table-react">
          <div className="dictionaryButton">
            <button className="addWords" onClick={this.addEpisodes}>ADD EPISODES</button>
          </div>
          <div className='per-page-container'>
              Results <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
        </div>
        <div className='search-container'>
                Search <Search columns={this.state.columns} data={this.state.data} onChange={this.onSearch}></Search>
            </div>
          <Table columns={this.state.columns} data={paginated.data} header={header} ></Table>
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


    }

});


module.exports = episodesTV;
