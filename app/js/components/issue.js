var React = require('react');
var moment = require('moment');
	moment().format();
var Issue = React.createClass({
	parseSummary: function() {
		debugger;
		var trimmedString = this.props.summary.substring(0,141),
			lastSpaceIndex = trimmedString.lastIndexOf(' ');

		return trimmedString.substring(0,lastSpaceIndex);
	},

	render: function() {
		var relativeDate = moment(this.props.date).fromNow();
		return (
			<div className='details'> 
				<div className='title'> {this.props.title} </div>
				<div className='summary'> {this.parseSummary()} </div>
				<div className='meta'> 
				<span> #{this.props.issueNumber} created on {relativeDate} </span></div>
			</div>
		);
	}

});

module.exports = Issue;