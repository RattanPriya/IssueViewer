var React = require('react');

var Status = React.createClass({

	render: function() {
		return (
			<div class="table-list-cell table-list-cell-type">
    			<a href="/jakemmarsh/react-rocket-boilerplate/issues?q=is%3Aissue+is%3Aopen" 
    				aria-label="View all issues" class="tooltipped tooltipped-n">
      			<span class="octicon octicon-issue-opened open"></span>
				</a> 
			</div>
		);
	}

});

module.exports = Status;