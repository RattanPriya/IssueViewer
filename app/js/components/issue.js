var React = require('react');
var moment = require('moment');
	moment().format();
var Issue = React.createClass({
	render: function() {
		var relativeDate = moment(this.props.date).fromNow();
		return (
			<div className='issue'>
				<div className='details'> 
					<div className='title'> {this.props.title} </div>
					<div className='summary'> {this.props.summary} </div>
					<div className='meta'> 
					<span> #{this.props.issueNumber} created on {relativeDate} </span></div>
				</div>
				<div>
					<div className='gravatar'> 
						<img src={this.props.gravatar} /> 
					</div>
					<div className='user'> {this.props.userName} </div>
				</div>
			</div>
		);
	}

});

module.exports = Issue;