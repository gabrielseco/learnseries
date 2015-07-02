'use strict';

import React from 'react/addons';
import TVListItem from '../TV/TVListItem';
import Router from 'react-router';
import { Navigation, TransitionHook } from 'react-router';


//WE USE A MAP TO LIST OUR TV ITEMS

let InterfaceTV = React.createClass({

    mixins: [ Navigation, TransitionHook ],


    componentWillMount() {
      this.props.flux.getStore('tv').addListener('change', this.onTVStoreChange);
    },

    componentWillUnmount() {
      this.props.flux.getStore('tv').removeListener('change', this.onTVStoreChange);

    },

    onTVStoreChange() {
      this.setState({tv: this.props.flux.getStore('tv').getTV() });
    },
    render() {
      var list = this.props.tv.map((tv, i) => {
        return (
          <TVListItem key={tv.ID()} data={tv} flux={this.props.flux} />
        );
      }).toJS();

      const addTV = () => {
        this.transitionTo('/addTV');
      };

        return (
            <div className="tv">
              <div className="tvButton">
                <button className="addTV" onClick={addTV}>ADD TV SHOW</button>
              </div>
              <div className="tv-wrapper">
                {list}
              </div>
            </div>
        );
    }
});

module.exports = InterfaceTV;
