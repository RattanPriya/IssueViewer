var React = require('react');

var Buttons = React.createClass({

	render: function() {
		return (
			<button >{this.props.key} </button>
		);
	}

});

module.exports = Buttons;