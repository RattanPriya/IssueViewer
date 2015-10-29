var React = require('react');
var moment = require('moment');
	moment().format();

var Comment = React.createClass({
	render: function() {
		var gravatar = this.props.data.user.avatar_url,
			userUrl = this.props.data.user.html_url,
			user = this.props.data.user.login,
			body = this.props.data.body,
			date = this.props.data.created_at,
			relativeDate = moment(date).fromNow();
	
		
		var relativeDate = moment(date).fromNow();
		return (
			
			<div className='comments'>
    			<div className='header'>	
					<a href={userUrl}>
						<img className='gravatar' src={gravatar}/>
						<span> {user} </span>
					</a>

		    	    <div>commented {relativeDate}</div>
    			</div>
    			<div className='body'>{body}</div>
			</div>
		
		);
	}

});

module.exports = Comment;
