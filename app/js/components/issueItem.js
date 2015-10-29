var React = require('react');
var Comments = require('./Comments');
var Status = require('./Status');
var Issue = require('./Issue');
var IssueDetailsPage = require('./IssueDetailsPage');
var IssueItem = React.createClass({
	parseSummary: function(summary) {
		var trimmedString = summary.substring(0,141),
			lastSpaceIndex = trimmedString.lastIndexOf(' ');

		return trimmedString.substring(0,lastSpaceIndex);
	},

    handleClick: function() {
       	
        React.render(<IssueDetailsPage data ={this.props.data} />, document.getElementById('content'))
    },

	render: function() {
		if (this.props.data) {
			var issueNumber = this.props.data.number ? this.props.data.number : '',
				title = this.props.data.title ? this.props.data.title : '',
				state = this.props.data.status ? this.props.data.status : '',
				labels = this.props.data.labels ? this.props.data.labels : '',
				userName = this.props.data.user && this.props.data.user.login ? this.props.data.user.login : '',
				gravatar = this.props.data.user.avatar_url ? this.props.data.user.avatar_url : '',
				summary = this.props.data.body ? this.parseSummary(this.props.data.body) : '',
				date = this.props.data.created_at ? this.props.data.created_at : '',
				userUrl = this.props.data.user.html_url ? this.props.data.user.html_url : '' ,
				url = this.props.data.html_url ? this.props.data.html_url : '',
				state = this.props.state ? this.props.state : '',
				commentsUrl = this.props.data.comments_url ? this.props.data.comments_url : '',
				comments = this.props.comments ? this.props.comments : '';

		} else {
			return (<div> Ooops encountered an error! </div>)
		}

		return (
			<li onClick={this.handleClick} className='issue-item'>
				<Issue title={title} 
					   date={date}
					   state={state}
					   summary={summary}
					   issueNumber={issueNumber}
					   gravatar={gravatar}
					   userName={userName}
					   parseSummary={summary}
					   url = {url}
					   state = {state}
					   commentsUrl= {commentsUrl}
					   comments = {comments}

				/>
			</li>
		);
	}

});

module.exports = IssueItem;