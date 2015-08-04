var React = require('react');
var IssueList = require('./issueList');
var issueRoot = React.createClass({
    getInitialState: function() {
        return {
            data: {}
        };
    },

    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            if (this.isMounted()) {
                this.setState({
                    data: result
                });

            }
        }.bind(this));


    },

    render: function() {
        var result = [{"id": "A"},{"id": "B"}, {"id": "C"},{"id": "D"}];
        return (
            <IssueList issues={this.state.data}/>
        );
    }

});

module.exports = issueRoot;