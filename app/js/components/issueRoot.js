var React = require('react');
var IssueList = require('./issueList');
var issueRoot = React.createClass({
    getInitialState: function() {
        return {
            data: {}
        };
    },

    componentDidMount: function() {
        window.jQuery.get(this.props.source, function(result) {
            if (this.isMounted()) {
                this.setState({
                    data: result
                });

            }
        }.bind(this));


    },

    render: function() {
        return (
            <div className='issue-list'>
                <IssueList  issues={this.state.data}/>
            </div>
        );
    }

});

module.exports = issueRoot;