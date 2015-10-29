var React = require('react');
var Button = require('./Buttons')

var Paginate = React.createClass({
	
	handleClick: function(i) {
		this.props.onClick(i);
	},

	render: function() {
		var total = this.props.total,
			currentPage = parseInt(this.props.next) - 1,
			total = this.props.total,
			rows = [],
			numberButtons,
			i;
		for (var i=0; i<total; i++) {
			rows.push(<Button key={i} onClick={this.handleClick}/>);
		}
		
		return (
			<div>
				<button onClick={this.props.onClick} key='prev'> <a href> Prev </a> </button> 
				{rows}
				<button onClick={this.props.onClick}  key='next'> <a href> Next </a> </button> 
			</div>
		);
	}

});

module.exports = Paginate;