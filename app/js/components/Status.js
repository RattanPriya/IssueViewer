var React = require('react');

var Status = React.createClass({

	render: function() {
		return (
			<div className="table-list-cell table-list-cell-type">
    			<a href="" 
    				aria-label="View all issues" className="tooltipped tooltipped-n">
      			<span className="">{this.props.state}</span>
				</a> 
			</div>
		);
	}

});

module.exports = Status;