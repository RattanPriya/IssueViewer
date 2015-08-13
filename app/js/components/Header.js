'use strict';

import React from 'react/addons';

var Header = React.createClass({

  render() {
    return (
        <div>
            <h1 className='issue-header'> 
                <span className='issue-number'> #{this.props.issueNumber} </span>
                <span className='issue-title'> {this.props.title} </span>
                
            </h1>
            
        </div>
    );
  }

});

export default Header;