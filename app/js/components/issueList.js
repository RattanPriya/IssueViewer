var React = require('react');
var IssueItem = require('./issueItem');
var ReactPaginate = require('react-paginate');
var IssueList = React.createClass({

	render: function() {
		if (this.props.issues.length) {
    	    return (
    	      <ul>
    	        {this.props.issues.map(function(result) {
    	          return <IssueItem data={result} key={result.id}/>;
    	        })}
    	      </ul>
    	    );
        } else {
            return (<div> Loading </div>)
        }
  	}

});

module.exports = IssueList;