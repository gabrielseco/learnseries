'use strict';

import React from 'react/addons';
import TVListItem from '../TV/TVListItem';
import Router from 'react-router';
import { Navigation, TransitionHook } from 'react-router';


//WE USE A MAP TO LIST OUR TV ITEMS

let InterfaceTV = React.createClass({

    mixins: [ Navigation, TransitionHook ],
    getInitialState(){
      return {
        tv: ''
      };
    },
    componentWillMount() {
      this.props.flux.getActions('tv').fetchTV().then((res) => {
        console.log('res', res);

        this.setState({ tv: res });

      });
    },
    render() {

      if(this.state.tv !== '') {
      var list = this.state.tv.map((tv, i) => {
        return (
          <TVListItem key={tv.ID} data={tv} flux={this.props.flux} />
        );
      });

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
    } else {
      return (<div></div>);
    }
  }
});

module.exports = InterfaceTV;
