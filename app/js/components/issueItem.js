var React = require('react');
var Comments = require('./Comments');
var Status = require('./Status');
var Issue = require('./Issue');
var IssueItem = React.createClass({
	handleClick: function() {
		alert('Clicked');

	},
	render: function() {
		if (this.props.data) {
			var issueNumber = this.props.data.number ? this.props.data.number : '',
				title = this.props.data.title ? this.props.data.title : '',
				state = this.props.data.status ? this.props.data.status : '',
				labels = this.props.data.labels ? this.props.data.labels : '',
				userName = this.props.data.user && this.props.data.user.login ? this.props.data.user.login : '',
				gravatar = this.props.data.user.avatar_url ? this.props.data.user.avatar_url : '',
				summary = this.props.data.body ? this.props.data.body : '',
				date = this.props.data.created_at ? this.props.data.created_at : '',
				userUrl = this.props.data.user.html_url ? this.props.data.user.html_url : '' 

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
					   className='issue-details'

				/>
				<div>
					<div className='gravatar'> 
						<img src={gravatar} /> 
					</div>
					<div className='user'> {userName} </div>
				</div>
				
			</li>
		);
	}

});

module.exports = IssueItem;