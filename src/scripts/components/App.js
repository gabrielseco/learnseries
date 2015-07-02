'use strict';

import React from 'react/addons';
import Router from 'react-router';
import FluxComponent from 'flummox/component';

import UINavbar from './UI/Navbar';

const RouteHandler = Router.RouteHandler;


//WE CONNECT WITH STORES

let App = React.createClass({

    componentDidMount() {
      this.props.flux.getActions('films').fetchFilms();
      this.props.flux.getActions('tv').fetchTV();

      },

    render() {

        return (
            <div >
                <FluxComponent {...this.props} connectToStores={['films', 'tv']}>
                    <UINavbar />
                    <RouteHandler />
                </FluxComponent>
            </div>
        );
    }
});

module.exports = App;
