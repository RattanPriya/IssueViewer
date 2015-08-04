var React = require('react');

var Comments = React.createClass({

	render: function() {
		return (
			<div class="table-list-cell issue-comments">
			    <a href="/jakemmarsh/react-rocket-boilerplate/issues/3" class="muted-link ">
			      <span class="octicon octicon-comment"></span>
			      1
			    </a>
  			</div>
		);
	}

});

module.exports = Comments;