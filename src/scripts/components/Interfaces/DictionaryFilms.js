'use strict';

import React from 'react/addons';
import Loading from '../UI/Loading';
var Table = require('reactabular').Table;
var Search = require('reactabular').Search;
var Paginator = require('react-pagify');
var sortColumn = require('reactabular').sortColumn;
import { Navigation, TransitionHook, State } from 'react-router';

require('reactabular/style.css');


let DictionaryFilms = React.createClass({

  mixins: [ Navigation, TransitionHook, State ],
  getInitialState(){
    var columns = [
      {
          property: 'english',
          header: 'English'
      }, {
          property: 'spanish',
          header: 'Spanish'
      },
      {
          property: 'Pelicula',
          header: 'Película'
      },
      {
        property: 'editar',
        header: 'Editar',
        cell: (value, data, rowIndex, property) => {
           var editar = () => {
             var id = data[rowIndex].ID;
             console.log(id);
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

    this.props.flux.getActions('diccionarios').fetchFilmsWords().then((res) => {
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
  this.transitionTo('/addWords/:id', {id: '1'});


},

    render() {
      if(this.state.data !== ''){
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

    } else {
      return (<Loading/>);
    }


    }

});


module.exports = DictionaryFilms;
