var React = require('react');
var Comments = require('./Comments');
var Status = require('./Status');
var Title = require('./Title');
var IssueItem = React.createClass({

	render: function() {
		return (
			<li>
				{this.props.data.id}
				<Status/>
				<Title/>
				<Comments/>				 				
			</li>
		);
	}

});

module.exports = IssueItem;