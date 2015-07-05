'use strict';

import React from 'react/addons';

let Loading = React.createClass({
    render() {
      return (
        <div className="sk-spinner sk-spinner-wave">
          <div className="sk-rect1"></div>
          <div className="sk-rect2"></div>
          <div className="sk-rect3"></div>
          <div className="sk-rect4"></div>
          <div className="sk-rect5"></div>
        </div>
      );
    }

});


module.exports = Loading;
