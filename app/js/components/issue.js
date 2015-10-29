var React = require('react');
var moment = require('moment');
	moment().format();
var utils = require('../utils/markdown');
var Issue = React.createClass({
	render: function() {
		var relativeDate = moment(this.props.date).fromNow();
		return (
			<div className='issue'>
				<div className='details'> 
					<div className='title'> <a href={this.props.url}> {this.props.title} </a> <span> {this.props.state}</span></div>
					<div className='summary'> {utils.processBody(this.props.summary)} </div>
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