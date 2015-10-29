var React = require('react');
var store = require('../../stores/issueViewerStore');
var Comment = require('./Comment');

var Comments = React.createClass({
    getInitialState: function() {
        return store.getCommentsState();
    },

    loadCommentsFromServer: function() {
 /*       window.jQuery.ajax({
            url: this.props.url,
            cache: true,
            dataType: 'json',
            type: 'GET',
            data: {
                client_id:"6bcb89fa65fb925edd55",
                client_secret:"f611d5b0011b15be5f3bd404970d349af13da6a6"
            },

            success: function(data, textStatus, request) {
                if (this.isMounted()) {
                    this.setState({
                        DONE: true,
                        LOADING: false,
                        data: data
                    });
                }
            }.bind(this),

            error: function(xhr, status, err) {
                console.error(xhr);
                this.setState({
                    ERROR: true,
                    LOADING: false,
                    data: xhr.responseJSON.message
                });
            }.bind(this)
        });*/
                if (this.isMounted()) {
                    this.setState({
                        DONE: true,
                        LOADING: false,
                        data: data
                    });
                }
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
    },

    render: function() {
        if (this.state.LOADING) {
            return (<div className='loader' > Loading ...</div>);
        } else {
            return (
                <div class="issue-comments">
                  <ul>
                    {this.state.data.map(function(result) {
                        return <Comment  data={result} key={result.id}/>;
                    })}
                        
                  </ul>

                </div>
            );
        }

    }

});

module.exports = Comments;

var data = [
  {
    "url": "https://api.github.com/repos/rails/rails/issues/comments/131175111",
    "html_url": "https://github.com/rails/rails/pull/21237#issuecomment-131175111",
    "issue_url": "https://api.github.com/repos/rails/rails/issues/21237",
    "id": 131175111,
    "user": {
      "login": "rafaelfranca",
      "id": 47848,
      "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/rafaelfranca",
      "html_url": "https://github.com/rafaelfranca",
      "followers_url": "https://api.github.com/users/rafaelfranca/followers",
      "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
      "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
      "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
      "repos_url": "https://api.github.com/users/rafaelfranca/repos",
      "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
      "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
      "type": "User",
      "site_admin": false
    },
    "created_at": "2015-08-14T16:43:17Z",
    "updated_at": "2015-08-14T16:43:17Z",
    "body": "I think we have to make sure that `rails test` also check this."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/comments/131778739",
    "html_url": "https://github.com/rails/rails/pull/21237#issuecomment-131778739",
    "issue_url": "https://api.github.com/repos/rails/rails/issues/21237",
    "id": 131778739,
    "user": {
      "login": "pixeltrix",
      "id": 6321,
      "avatar_url": "https://avatars.githubusercontent.com/u/6321?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/pixeltrix",
      "html_url": "https://github.com/pixeltrix",
      "followers_url": "https://api.github.com/users/pixeltrix/followers",
      "following_url": "https://api.github.com/users/pixeltrix/following{/other_user}",
      "gists_url": "https://api.github.com/users/pixeltrix/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/pixeltrix/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/pixeltrix/subscriptions",
      "organizations_url": "https://api.github.com/users/pixeltrix/orgs",
      "repos_url": "https://api.github.com/users/pixeltrix/repos",
      "events_url": "https://api.github.com/users/pixeltrix/events{/privacy}",
      "received_events_url": "https://api.github.com/users/pixeltrix/received_events",
      "type": "User",
      "site_admin": false
    },
    "created_at": "2015-08-17T10:50:47Z",
    "updated_at": "2015-08-17T10:50:47Z",
    "body": "I think what @senny said is fatal flaw for doing it via a column in the `schema_migrations` table and I wasn't a fan of encoding it there anyway. What about creating a new `schema_environment` table that just has a single row and then don't add the value to `db/structure.sql`?"
  }
]
