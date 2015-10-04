'use strict';

import React from 'react/addons';
var Table = require('reactabular').Table;
var Search = require('reactabular').Search;
var Paginator = require('react-pagify');
var sortColumn = require('reactabular').sortColumn;
import { Navigation, TransitionHook, State } from 'react-router';

require('reactabular/style.css');


let FilmsWords = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
    var columns = [
      {
          property: 'english',
          header: 'English'
      }, {
          property: 'spanish',
          header: 'Spanish'
      }, {
          property: 'pelicula',
          header: 'Pelicula'
      },
      {
        property: 'editar',
        header: 'Editar',
        cell: (value, data, rowIndex, property) => {
           var editar = () => {
             var id = data[rowIndex].ID;
             var idPelicula = this.getParams().id;
             this.transitionTo('/editWords/:id/:idPelicula/:idEpisodio',{id: id, idPelicula: idPelicula, idEpisodio: 0});
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
              var english = data[rowIndex].english;

              var del = confirm('Quieres eliminar la palabra '+english+ ' ?');

              if(del){
                this.props.flux.getActions('diccionarios').deleteWords(id).then(function(res){
                  //console.log('res delete', res);
                  if(res[0].Resultado === 200){
                    location.reload();
                  }
                });
              }
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

    this.props.flux.getActions('films').fetchFilmsWords(params).then((res) => {
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

addWords(){
  console.log('Add Words');
  var idPelicula = this.getParams().id;
  this.transitionTo('/addWords/:id/:idPelicula/:idEpisodio', {id: '3', idPelicula: idPelicula, idEpisodio:0});
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
            <button className="addWords" onClick={this.addWords}>ADD WORDS</button>
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


module.exports = FilmsWords;
