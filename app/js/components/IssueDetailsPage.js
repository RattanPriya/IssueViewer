var React = require('react');
var Header = require('./Header');
var Issue = require('./issue');
var Comments = require('./Comments');
var postComments = require('./postComments');

var IssueDetailsPage = React.createClass({

    render: function() {
        var issueNumber = this.props.data.number ? this.props.data.number : '',
            title = this.props.data.title ? this.props.data.title : '',
            state = this.props.data.status ? this.props.data.status : '',
            labels = this.props.data.labels ? this.props.data.labels : '',
            userName = this.props.data.user && this.props.data.user.login ? this.props.data.user.login : '',
            gravatar = this.props.data.user.avatar_url ? this.props.data.user.avatar_url : '',
            summary = this.props.data.body ? this.props.data.body : '',
            date = this.props.data.created_at ? this.props.data.created_at : '',
            userUrl = this.props.data.user.html_url ? this.props.data.user.html_url : '' ;
        return (
            <div className='issue-details'> 
                <Issue title={title} 
                       date={date}
                       state={state}
                       summary={summary}
                       issueNumber={issueNumber}
                       gravatar={gravatar}
                       userName={userName}
                       className='issue-details'
                />
                <Comments   />
                <postComments/>
            </div>

        );
    }

});

module.exports = IssueDetailsPage;