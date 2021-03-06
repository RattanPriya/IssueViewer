var React = require('react');
var IssueList = require('./issueList');
var Paginate = require('./Paginate');
var ReactPaginate = require('react-paginate');
var issueStore = require('../stores/issueViewerStore.js');
var dataSaved = require('./data');
var Paginator = require('react-paginate');
var Paginate = require('react-paginate');
var TOTAL_COUNT = 0;
var LIMIT = 25;
var issueRoot = React.createClass({
    getInitialState: function() {
        return issueStore.getInitialState();
    },

    handlePageClick: function(data) {
        var selected = data.selected;
        var page = this.state.page;

        this.setState({
            pageNum: this.state.pageNum
        }, function() {
            this.loadIssuesFromServer(page);
        }.bind(this));
        this.loadIssuesFromServer(page);
    },

    /**
     * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
     * headers according to the format described here:
     * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
     * This method parses that string into a user-friendly key/value pair object.
     */
     parseResponseHeaders: function(headerStr) {
      var headers = {};
      if (!headerStr) {
        return headers;
      }
      var headerPairs = headerStr.split('\u000d\u000a');
      for (var i = 0, len = headerPairs.length; i < len; i++) {
        var headerPair = headerPairs[i];
        var index = headerPair.indexOf('\u003a\u0020');
        if (index > 0) {
          var key = headerPair.substring(0, index);
          var val = headerPair.substring(index + 2);
          headers[key] = val;
        }
      }
      return headers;
    },

    /**
      * Extract value of link for pagination. Github API returns
      * information about pagination in its response headers. We can find out
      * total number of pages, next page, last page etc from the response header.
      * Pretty Sweet! :)
      **/
    parseResponse: function(request) {
      var headerStr = request.getAllResponseHeaders(),
          headers = this.parseResponseHeaders(headerStr),
          link = headers.Link,
          urls = link.split('rel='),
          next = urls[0].replace(/\</,' ').replace(/\>\;/,' ').trim(),
          last = urls[1].replace(/\</,' ').replace(/\>\;/,' ').trim();
          this.setState({pageNum: this.getParameterByName('page', next)});
          TOTAL_COUNT = this.getParameterByName('page', last);
    },

    /**
     * Extract the query parameters from the response header
     * 
     */
    getParameterByName: function(name, request) {
      request = request.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(request);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },


    loadIssuesFromServer: function() {

     /* window.jQuery.ajax({
        url: this.props.source,
        data: {
          page: this.state.pageNum,
          per_page: 25
        },
        cache: true,
        dataType: 'json',
        type: 'GET',

        success: function(data, textStatus, request) {
          debugger;
          if (textStatus === 'success') {
            this.parseResponse(request);

          }
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
      debugger;
      this.setState({
        DONE: true,
        LOADING: false,
        data: data
      });
    },

    componentDidMount: function() {
        this.loadIssuesFromServer(this.state.page);
    },
    
  /*  componentDidUpdate: function() {
        this.loadIssuesFromServer(this.state.page);
    },*/
    onChangePage: function(pageNum) {
       debugger;

       this.setState({pageNum: pageNum});
    },


    render: function() {
      if (this.state.DONE ) {
          return (
          <div className='issue-root'>
            <div className='issue-list'> 
              <IssueList  issues={this.state.data}/>
            </div> 
            <Paginator max={5} onChange={this.onChangePage.bind(this)} onClick={this.onChangePage}/>

          </div>
          );
      } else if (this.state.ERROR) {
         return( <div className='error'> <h3> {this.state.data} </h3><img src="../../images/404.jpg" alt="Page Not Found (404)."/></div> );
      } else 
        return (
          <div className='loader' > Loading ...</div>
        );
    }

});

module.exports = issueRoot;
var data = [
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21278",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21278/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21278/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21278/events",
    "html_url": "https://github.com/rails/rails/pull/21278",
    "id": 101525727,
    "number": 21278,
    "title": "Use == 0 instead of .zero? in #try",
    "user": {
      "login": "byroot",
      "id": 44640,
      "avatar_url": "https://avatars.githubusercontent.com/u/44640?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/byroot",
      "html_url": "https://github.com/byroot",
      "followers_url": "https://api.github.com/users/byroot/followers",
      "following_url": "https://api.github.com/users/byroot/following{/other_user}",
      "gists_url": "https://api.github.com/users/byroot/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/byroot/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/byroot/subscriptions",
      "organizations_url": "https://api.github.com/users/byroot/orgs",
      "repos_url": "https://api.github.com/users/byroot/repos",
      "events_url": "https://api.github.com/users/byroot/events{/privacy}",
      "received_events_url": "https://api.github.com/users/byroot/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-17T22:46:50Z",
    "updated_at": "2015-08-17T22:46:50Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21278",
      "html_url": "https://github.com/rails/rails/pull/21278",
      "diff_url": "https://github.com/rails/rails/pull/21278.diff",
      "patch_url": "https://github.com/rails/rails/pull/21278.patch"
    },
    "body": "The perf gain is relatively minor but consistent:\r\n\r\n```\r\nCalculating -------------------------------------\r\n             0.zero?   137.091k i/100ms\r\n             1.zero?   137.350k i/100ms\r\n              0 == 0   142.207k i/100ms\r\n              1 == 0   144.724k i/100ms\r\n-------------------------------------------------\r\n             0.zero?      8.893M (± 6.5%) i/s -     44.280M\r\n             1.zero?      8.751M (± 6.4%) i/s -     43.677M\r\n              0 == 0     10.033M (± 7.0%) i/s -     49.915M\r\n              1 == 0      9.814M (± 8.0%) i/s -     48.772M\r\n```\r\n\r\nAnd try! is quite a big hotspot for us so every little gain is appreciable.\r\n\r\n@rafaelfranca for review please."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21274",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21274/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21274/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21274/events",
    "html_url": "https://github.com/rails/rails/pull/21274",
    "id": 101509500,
    "number": 21274,
    "title": "Add test cases for `safe_constantize`",
    "user": {
      "login": "repinel",
      "id": 1685896,
      "avatar_url": "https://avatars.githubusercontent.com/u/1685896?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/repinel",
      "html_url": "https://github.com/repinel",
      "followers_url": "https://api.github.com/users/repinel/followers",
      "following_url": "https://api.github.com/users/repinel/following{/other_user}",
      "gists_url": "https://api.github.com/users/repinel/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/repinel/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/repinel/subscriptions",
      "organizations_url": "https://api.github.com/users/repinel/orgs",
      "repos_url": "https://api.github.com/users/repinel/repos",
      "events_url": "https://api.github.com/users/repinel/events{/privacy}",
      "received_events_url": "https://api.github.com/users/repinel/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-17T21:04:18Z",
    "updated_at": "2015-08-17T21:04:18Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21274",
      "html_url": "https://github.com/rails/rails/pull/21274",
      "diff_url": "https://github.com/rails/rails/pull/21274.diff",
      "patch_url": "https://github.com/rails/rails/pull/21274.patch"
    },
    "body": "The issue was fixed by 7a41295, but there are no tests covering it.\r\n\r\nCloses #15570"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21267",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21267/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21267/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21267/events",
    "html_url": "https://github.com/rails/rails/pull/21267",
    "id": 101477143,
    "number": 21267,
    "title": "Use the PORT environment variable for rails server",
    "user": {
      "login": "davidcornu",
      "id": 325821,
      "avatar_url": "https://avatars.githubusercontent.com/u/325821?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/davidcornu",
      "html_url": "https://github.com/davidcornu",
      "followers_url": "https://api.github.com/users/davidcornu/followers",
      "following_url": "https://api.github.com/users/davidcornu/following{/other_user}",
      "gists_url": "https://api.github.com/users/davidcornu/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/davidcornu/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/davidcornu/subscriptions",
      "organizations_url": "https://api.github.com/users/davidcornu/orgs",
      "repos_url": "https://api.github.com/users/davidcornu/repos",
      "events_url": "https://api.github.com/users/davidcornu/events{/privacy}",
      "received_events_url": "https://api.github.com/users/davidcornu/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-17T18:04:46Z",
    "updated_at": "2015-08-17T18:09:37Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21267",
      "html_url": "https://github.com/rails/rails/pull/21267",
      "diff_url": "https://github.com/rails/rails/pull/21267.diff",
      "patch_url": "https://github.com/rails/rails/pull/21267.patch"
    },
    "body": "Allow the server port to be set with the `PORT` environment variable.\r\n\r\n- This has become somewhat of a standard on various platforms\r\n- Would simplify setting a default port in development (which is currently only possible by either [monkey-patching](http://stackoverflow.com/a/6539193) or using a custom script to start the server)"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21266",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21266/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21266/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21266/events",
    "html_url": "https://github.com/rails/rails/issues/21266",
    "id": 101448127,
    "number": 21266,
    "title": "[PERF] ActiveRecord save",
    "user": {
      "login": "tgxworld",
      "id": 4335742,
      "avatar_url": "https://avatars.githubusercontent.com/u/4335742?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/tgxworld",
      "html_url": "https://github.com/tgxworld",
      "followers_url": "https://api.github.com/users/tgxworld/followers",
      "following_url": "https://api.github.com/users/tgxworld/following{/other_user}",
      "gists_url": "https://api.github.com/users/tgxworld/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/tgxworld/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/tgxworld/subscriptions",
      "organizations_url": "https://api.github.com/users/tgxworld/orgs",
      "repos_url": "https://api.github.com/users/tgxworld/repos",
      "events_url": "https://api.github.com/users/tgxworld/events{/privacy}",
      "received_events_url": "https://api.github.com/users/tgxworld/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-17T15:30:48Z",
    "updated_at": "2015-08-17T16:02:08Z",
    "closed_at": null,
    "body": "BenchmarkScript: https://github.com/ruby-bench/ruby-bench-suite/blob/426e2fb379d2c2e6a7d3a1f00feb57ab53149be8/rails/benchmarks/bm_activerecord_save.rb\r\n\r\n#### Before https://github.com/rails/rails/commit/e0cb21f\r\n```\r\nactiverecord/postgres_save 970.6787719264458/ips\r\nactiverecord/mysql2_save 1159.4730621393544/ips\r\n```\r\n\r\n#### At https://github.com/rails/rails/commit/e0cb21f\r\n```\r\nactiverecord/postgres_save 951.5163865085796/ips (-1.98%)\r\nactiverecord/mysql2_save 1078.8367875046874/ips (-6.95%)\r\n```\r\n\r\nView full graphs\r\nhttp://rubybench.org/rails/rails/commits?result_type=activerecord/mysql2_save&display_count=2000\r\nhttp://rubybench.org/rails/rails/commits?result_type=activerecord/postgres_save&display_count=2000\r\n\r\ncc/ @tristang\r\n\r\nLet me know if you need more information :smile:\r\n\r\n\r\n\r\n"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21262",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21262/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21262/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21262/events",
    "html_url": "https://github.com/rails/rails/issues/21262",
    "id": 101388137,
    "number": 21262,
    "title": "BigDecimal::NaN not quoted in SQL query",
    "user": {
      "login": "Hugo-Hache",
      "id": 5188983,
      "avatar_url": "https://avatars.githubusercontent.com/u/5188983?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Hugo-Hache",
      "html_url": "https://github.com/Hugo-Hache",
      "followers_url": "https://api.github.com/users/Hugo-Hache/followers",
      "following_url": "https://api.github.com/users/Hugo-Hache/following{/other_user}",
      "gists_url": "https://api.github.com/users/Hugo-Hache/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Hugo-Hache/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Hugo-Hache/subscriptions",
      "organizations_url": "https://api.github.com/users/Hugo-Hache/orgs",
      "repos_url": "https://api.github.com/users/Hugo-Hache/repos",
      "events_url": "https://api.github.com/users/Hugo-Hache/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Hugo-Hache/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
        "name": "activerecord",
        "color": "0b02e1"
      },
      {
        "url": "https://api.github.com/repos/rails/rails/labels/needs%20feedback",
        "name": "needs feedback",
        "color": "ededed"
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 2,
    "created_at": "2015-08-17T10:17:33Z",
    "updated_at": "2015-08-17T18:04:40Z",
    "closed_at": null,
    "body": "With any model with a decimal column, if you try to query for the rows with a NaN value you get the following error:\r\n\r\n<pre>\r\nModel.where(column: BigDecimal::NAN)\r\n\r\nPG::UndefinedColumn: ERROR:  column \"nan\" does not exist\r\nLINE 1: ... \"model\".\"column\" = NaN\r\n</pre>\r\n\r\nThe problem is the missing quotes around NaN, as <pre>Model.where(\" column = 'NaN' \")</pre> works just fine.\r\n\r\nBy browsing the source code I presume there is a missing BigDecimal case in this class, https://github.com/rails/rails/blob/master/activerecord/lib/active_record/connection_adapters/postgresql/quoting.rb#L83, but being not aware of the AR internals I was not confident enough to propose a patch. "
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21257",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21257/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21257/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21257/events",
    "html_url": "https://github.com/rails/rails/pull/21257",
    "id": 101278838,
    "number": 21257,
    "title": "Initial implementation of ActiveJob AsyncAdapter.",
    "user": {
      "login": "jdantonio",
      "id": 173910,
      "avatar_url": "https://avatars.githubusercontent.com/u/173910?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/jdantonio",
      "html_url": "https://github.com/jdantonio",
      "followers_url": "https://api.github.com/users/jdantonio/followers",
      "following_url": "https://api.github.com/users/jdantonio/following{/other_user}",
      "gists_url": "https://api.github.com/users/jdantonio/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/jdantonio/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/jdantonio/subscriptions",
      "organizations_url": "https://api.github.com/users/jdantonio/orgs",
      "repos_url": "https://api.github.com/users/jdantonio/repos",
      "events_url": "https://api.github.com/users/jdantonio/events{/privacy}",
      "received_events_url": "https://api.github.com/users/jdantonio/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 9,
    "created_at": "2015-08-16T16:36:14Z",
    "updated_at": "2015-08-17T16:28:48Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21257",
      "html_url": "https://github.com/rails/rails/pull/21257",
      "diff_url": "https://github.com/rails/rails/pull/21257.diff",
      "patch_url": "https://github.com/rails/rails/pull/21257.patch"
    },
    "body": "Now that `activesupport` has a runtime dependency on `concurrent-ruby`, we can begin taking advantage of those tools in more ways. This PR creates a simple asynchronous ActiveJob adapter that posts jobs to a concurrent-ruby thread pool. Within the context of ActiveJob it provides functionality comparable to [sucker_punch](https://github.com/brandonhilkert/sucker_punch). Rails 5 users will now be able to create simple asynchronous jobs without installing additional gems simply by setting the new adapter:\r\n\r\n```ruby\r\n# config/application.rb\r\nmodule YourApp\r\n  class Application < Rails::Application\r\n    config.active_job.queue_adapter = :async\r\n  end\r\nend\r\n```\r\n\r\nA simple benchmark script which compares enqueue performance vs. sucker_punch can be found [here](https://gist.github.com/jdantonio/7d665df3045ccc8ff669). Performance is comparable on both Ruby 2.2.2 and JRuby 9000.\r\n\r\nIf this PR is accepted I can add more features such as job prioritization and per-queue thread pools."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21254",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21254/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21254/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21254/events",
    "html_url": "https://github.com/rails/rails/pull/21254",
    "id": 101223471,
    "number": 21254,
    "title": "Add Rails commands for existing rake tasks",
    "user": {
      "login": "ccallebs",
      "id": 397982,
      "avatar_url": "https://avatars.githubusercontent.com/u/397982?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/ccallebs",
      "html_url": "https://github.com/ccallebs",
      "followers_url": "https://api.github.com/users/ccallebs/followers",
      "following_url": "https://api.github.com/users/ccallebs/following{/other_user}",
      "gists_url": "https://api.github.com/users/ccallebs/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/ccallebs/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/ccallebs/subscriptions",
      "organizations_url": "https://api.github.com/users/ccallebs/orgs",
      "repos_url": "https://api.github.com/users/ccallebs/repos",
      "events_url": "https://api.github.com/users/ccallebs/events{/privacy}",
      "received_events_url": "https://api.github.com/users/ccallebs/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-16T01:24:30Z",
    "updated_at": "2015-08-16T01:38:47Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21254",
      "html_url": "https://github.com/rails/rails/pull/21254",
      "diff_url": "https://github.com/rails/rails/pull/21254.diff",
      "patch_url": "https://github.com/rails/rails/pull/21254.patch"
    },
    "body": "Aims to implement #18878.\r\n\r\nThis is a proof of concept branch. The code is a bit messy and I've left comments where I plan to clean it up. I'm also not sure what dependencies will end up being shared among tasks, so a lot of functionality is in the Base class at the moment.\r\n\r\nPlacing each set of rake tasks inside of a wrapper class allows some flexibility for the future in terms of providing contextual documentation. For example, `rails test --help` could provide a custom help message for only test commands (and encapsulate those messages inside of each class).\r\n\r\nCurrently working:\r\n- Original commands\r\n- `rails test:db`\r\n\r\nBefore I go any further moving more rake tasks to this architecture, I wanted to get feedback on the implementation. I think this approach is sensible and I can knock out the rest of them quickly."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21251",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21251/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21251/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21251/events",
    "html_url": "https://github.com/rails/rails/pull/21251",
    "id": 101196281,
    "number": 21251,
    "title": "Add test for parsing application/vnd.api+json",
    "user": {
      "login": "rodzyn",
      "id": 274277,
      "avatar_url": "https://avatars.githubusercontent.com/u/274277?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/rodzyn",
      "html_url": "https://github.com/rodzyn",
      "followers_url": "https://api.github.com/users/rodzyn/followers",
      "following_url": "https://api.github.com/users/rodzyn/following{/other_user}",
      "gists_url": "https://api.github.com/users/rodzyn/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/rodzyn/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/rodzyn/subscriptions",
      "organizations_url": "https://api.github.com/users/rodzyn/orgs",
      "repos_url": "https://api.github.com/users/rodzyn/repos",
      "events_url": "https://api.github.com/users/rodzyn/events{/privacy}",
      "received_events_url": "https://api.github.com/users/rodzyn/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-15T18:22:51Z",
    "updated_at": "2015-08-15T19:41:24Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21251",
      "html_url": "https://github.com/rails/rails/pull/21251",
      "diff_url": "https://github.com/rails/rails/pull/21251.diff",
      "patch_url": "https://github.com/rails/rails/pull/21251.patch"
    },
    "body": "I was intrigued by https://github.com/rails/rails/issues/21168 so I've added tests for parsing this."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21250",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21250/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21250/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21250/events",
    "html_url": "https://github.com/rails/rails/pull/21250",
    "id": 101189594,
    "number": 21250,
    "title": "safe_constantize - Added Object scoped missing test cases",
    "user": {
      "login": "ronakjangir47",
      "id": 1909242,
      "avatar_url": "https://avatars.githubusercontent.com/u/1909242?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/ronakjangir47",
      "html_url": "https://github.com/ronakjangir47",
      "followers_url": "https://api.github.com/users/ronakjangir47/followers",
      "following_url": "https://api.github.com/users/ronakjangir47/following{/other_user}",
      "gists_url": "https://api.github.com/users/ronakjangir47/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/ronakjangir47/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/ronakjangir47/subscriptions",
      "organizations_url": "https://api.github.com/users/ronakjangir47/orgs",
      "repos_url": "https://api.github.com/users/ronakjangir47/repos",
      "events_url": "https://api.github.com/users/ronakjangir47/events{/privacy}",
      "received_events_url": "https://api.github.com/users/ronakjangir47/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 2,
    "created_at": "2015-08-15T16:53:40Z",
    "updated_at": "2015-08-17T11:38:07Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21250",
      "html_url": "https://github.com/rails/rails/pull/21250",
      "diff_url": "https://github.com/rails/rails/pull/21250.diff",
      "patch_url": "https://github.com/rails/rails/pull/21250.patch"
    },
    "body": "For more details please see #15570"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21241",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21241/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21241/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21241/events",
    "html_url": "https://github.com/rails/rails/pull/21241",
    "id": 101123896,
    "number": 21241,
    "title": "In url_for, never append ? when the query string is empty anyway.",
    "user": {
      "login": "pdg137",
      "id": 466760,
      "avatar_url": "https://avatars.githubusercontent.com/u/466760?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/pdg137",
      "html_url": "https://github.com/pdg137",
      "followers_url": "https://api.github.com/users/pdg137/followers",
      "following_url": "https://api.github.com/users/pdg137/following{/other_user}",
      "gists_url": "https://api.github.com/users/pdg137/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/pdg137/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/pdg137/subscriptions",
      "organizations_url": "https://api.github.com/users/pdg137/orgs",
      "repos_url": "https://api.github.com/users/pdg137/repos",
      "events_url": "https://api.github.com/users/pdg137/events{/privacy}",
      "received_events_url": "https://api.github.com/users/pdg137/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-14T23:56:44Z",
    "updated_at": "2015-08-14T23:56:44Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21241",
      "html_url": "https://github.com/rails/rails/pull/21241",
      "diff_url": "https://github.com/rails/rails/pull/21241.diff",
      "patch_url": "https://github.com/rails/rails/pull/21241.patch"
    },
    "body": "It used to behave like this:\r\n\r\n    url_for(controller: 'x', action: 'y', q: {})\r\n    # -> \"/x/y?\"\r\n\r\nWe previously avoided empty query strings in most cases by removing\r\nnil values, then checking whether params was empty.  But as you can\r\nsee above, even non-empty params can yield an empty query string.  So\r\nI changed the code to just directly check whether the query string\r\nended up empty.\r\n\r\n(To make everything more consistent, the \"removing nil values\"\r\nfunctionality should probably move to ActionPack's Hash#to_query, the\r\nplace where empty hashes and arrays get removed.  However, this would\r\nchange a lot more behavior.)"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21237",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21237/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21237/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21237/events",
    "html_url": "https://github.com/rails/rails/pull/21237",
    "id": 101047650,
    "number": 21237,
    "title": "Prevent destructive action on production database",
    "user": {
      "login": "schneems",
      "id": 59744,
      "avatar_url": "https://avatars.githubusercontent.com/u/59744?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/schneems",
      "html_url": "https://github.com/schneems",
      "followers_url": "https://api.github.com/users/schneems/followers",
      "following_url": "https://api.github.com/users/schneems/following{/other_user}",
      "gists_url": "https://api.github.com/users/schneems/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/schneems/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/schneems/subscriptions",
      "organizations_url": "https://api.github.com/users/schneems/orgs",
      "repos_url": "https://api.github.com/users/schneems/repos",
      "events_url": "https://api.github.com/users/schneems/events{/privacy}",
      "received_events_url": "https://api.github.com/users/schneems/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 2,
    "created_at": "2015-08-14T16:29:53Z",
    "updated_at": "2015-08-17T10:50:47Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21237",
      "html_url": "https://github.com/rails/rails/pull/21237",
      "diff_url": "https://github.com/rails/rails/pull/21237.diff",
      "patch_url": "https://github.com/rails/rails/pull/21237.patch"
    },
    "body": "It is possible to run your tests against your production database by accident right now. While infrequently, but as an anecdotal data point, Heroku receives a non-trivial number of requests for a database restore due to this happening. In these cases the loss can be large. \r\n\r\nTo prevent against running tests against production we can store the \"environment\" version that was used when migrating the database in the schema table. Before executing tests we can see if the database is a \"production\" database and abort. There is a manual escape valve to force this check from happening with environment variable `RUN_AGAINST_PRODUCTION_DATABASE=1`\r\n\r\nThis is a WIP\r\n\r\nTODO\r\n\r\n- [ ] schema load populates environment in the schema table\r\n- [ ] check for `supports_migrations?`\r\n- [ ] handle case for when activerecord is included but no database used\r\n\r\nTo Test\r\n\r\n- [ ] add test for when `rake test` with RAILS_ENV prevents task from running\r\n- [ ] add test for when `rake test` is called without any environment data in the schema\r\n\r\ncc @rafaelfranca @sgrif"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21235",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21235/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21235/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21235/events",
    "html_url": "https://github.com/rails/rails/pull/21235",
    "id": 100984464,
    "number": 21235,
    "title": "Make dbconsole default to using database.yml password.",
    "user": {
      "login": "akampjes",
      "id": 196615,
      "avatar_url": "https://avatars.githubusercontent.com/u/196615?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/akampjes",
      "html_url": "https://github.com/akampjes",
      "followers_url": "https://api.github.com/users/akampjes/followers",
      "following_url": "https://api.github.com/users/akampjes/following{/other_user}",
      "gists_url": "https://api.github.com/users/akampjes/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/akampjes/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/akampjes/subscriptions",
      "organizations_url": "https://api.github.com/users/akampjes/orgs",
      "repos_url": "https://api.github.com/users/akampjes/repos",
      "events_url": "https://api.github.com/users/akampjes/events{/privacy}",
      "received_events_url": "https://api.github.com/users/akampjes/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 4,
    "created_at": "2015-08-14T10:37:02Z",
    "updated_at": "2015-08-15T13:21:28Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21235",
      "html_url": "https://github.com/rails/rails/pull/21235",
      "diff_url": "https://github.com/rails/rails/pull/21235.diff",
      "patch_url": "https://github.com/rails/rails/pull/21235.patch"
    },
    "body": "This is approximately the opposite of the previous behaviour for the dbconsole command.\r\nNow `-p` or `--provide-password` allow you to provide a password for the database login.\r\n\r\nI believe that this is the more natural behaviour to expect."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21233",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21233/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21233/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21233/events",
    "html_url": "https://github.com/rails/rails/pull/21233",
    "id": 100966038,
    "number": 21233,
    "title": "Use `SET CONSTRAINTS` for `disable_referential_integrity` without superuser privileges",
    "user": {
      "login": "mtsmfm",
      "id": 1796864,
      "avatar_url": "https://avatars.githubusercontent.com/u/1796864?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/mtsmfm",
      "html_url": "https://github.com/mtsmfm",
      "followers_url": "https://api.github.com/users/mtsmfm/followers",
      "following_url": "https://api.github.com/users/mtsmfm/following{/other_user}",
      "gists_url": "https://api.github.com/users/mtsmfm/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/mtsmfm/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/mtsmfm/subscriptions",
      "organizations_url": "https://api.github.com/users/mtsmfm/orgs",
      "repos_url": "https://api.github.com/users/mtsmfm/repos",
      "events_url": "https://api.github.com/users/mtsmfm/events{/privacy}",
      "received_events_url": "https://api.github.com/users/mtsmfm/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
        "name": "activerecord",
        "color": "0b02e1"
      },
      {
        "url": "https://api.github.com/repos/rails/rails/labels/PostgreSQL",
        "name": "PostgreSQL",
        "color": "fbca04"
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 1,
    "created_at": "2015-08-14T08:58:40Z",
    "updated_at": "2015-08-14T09:20:58Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21233",
      "html_url": "https://github.com/rails/rails/pull/21233",
      "diff_url": "https://github.com/rails/rails/pull/21233.diff",
      "patch_url": "https://github.com/rails/rails/pull/21233.patch"
    },
    "body": "ref: 72c1557"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21230",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21230/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21230/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21230/events",
    "html_url": "https://github.com/rails/rails/pull/21230",
    "id": 100902234,
    "number": 21230,
    "title": "Avoid overflow-x on Welcome page",
    "user": {
      "login": "ixkaito",
      "id": 5457539,
      "avatar_url": "https://avatars.githubusercontent.com/u/5457539?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/ixkaito",
      "html_url": "https://github.com/ixkaito",
      "followers_url": "https://api.github.com/users/ixkaito/followers",
      "following_url": "https://api.github.com/users/ixkaito/following{/other_user}",
      "gists_url": "https://api.github.com/users/ixkaito/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/ixkaito/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/ixkaito/subscriptions",
      "organizations_url": "https://api.github.com/users/ixkaito/orgs",
      "repos_url": "https://api.github.com/users/ixkaito/repos",
      "events_url": "https://api.github.com/users/ixkaito/events{/privacy}",
      "received_events_url": "https://api.github.com/users/ixkaito/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/rails/rails/labels/activesupport",
        "name": "activesupport",
        "color": "FC9300"
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": {
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
    "milestone": {
      "url": "https://api.github.com/repos/rails/rails/milestones/34",
      "html_url": "https://github.com/rails/rails/milestones/5.0.0",
      "labels_url": "https://api.github.com/repos/rails/rails/milestones/34/labels",
      "id": 665192,
      "number": 34,
      "title": "5.0.0",
      "description": null,
      "creator": {
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
      "open_issues": 96,
      "closed_issues": 137,
      "state": "open",
      "created_at": "2014-05-21T00:58:22Z",
      "updated_at": "2015-08-14T07:57:36Z",
      "due_on": null,
      "closed_at": null
    },
    "comments": 2,
    "created_at": "2015-08-14T00:43:13Z",
    "updated_at": "2015-08-14T01:01:40Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21230",
      "html_url": "https://github.com/rails/rails/pull/21230",
      "diff_url": "https://github.com/rails/rails/pull/21230.diff",
      "patch_url": "https://github.com/rails/rails/pull/21230.patch"
    },
    "body": " ![20150814094238](https://cloud.githubusercontent.com/assets/5457539/9265057/d80f4a8c-4268-11e5-911d-3c9b671efd26.png)\r\n"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21228",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21228/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21228/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21228/events",
    "html_url": "https://github.com/rails/rails/issues/21228",
    "id": 100861883,
    "number": 21228,
    "title": "undefined method `existent' coming from active_support/i18n_railtie.rb",
    "user": {
      "login": "schneems",
      "id": 59744,
      "avatar_url": "https://avatars.githubusercontent.com/u/59744?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/schneems",
      "html_url": "https://github.com/schneems",
      "followers_url": "https://api.github.com/users/schneems/followers",
      "following_url": "https://api.github.com/users/schneems/following{/other_user}",
      "gists_url": "https://api.github.com/users/schneems/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/schneems/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/schneems/subscriptions",
      "organizations_url": "https://api.github.com/users/schneems/orgs",
      "repos_url": "https://api.github.com/users/schneems/repos",
      "events_url": "https://api.github.com/users/schneems/events{/privacy}",
      "received_events_url": "https://api.github.com/users/schneems/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/rails/rails/labels/activesupport",
        "name": "activesupport",
        "color": "FC9300"
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": {
      "url": "https://api.github.com/repos/rails/rails/milestones/34",
      "html_url": "https://github.com/rails/rails/milestones/5.0.0",
      "labels_url": "https://api.github.com/repos/rails/rails/milestones/34/labels",
      "id": 665192,
      "number": 34,
      "title": "5.0.0",
      "description": null,
      "creator": {
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
      "open_issues": 96,
      "closed_issues": 137,
      "state": "open",
      "created_at": "2014-05-21T00:58:22Z",
      "updated_at": "2015-08-14T07:57:36Z",
      "due_on": null,
      "closed_at": null
    },
    "comments": 10,
    "created_at": "2015-08-13T20:33:23Z",
    "updated_at": "2015-08-17T14:31:43Z",
    "closed_at": null,
    "body": "On Rails master, i18n version 0.7.0\r\n\r\n```\r\n/Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/i18n_railtie.rb:45:in `map': undefined method `existent' for #<String:0x007fd489ea2968> (NoMethodError)\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/i18n_railtie.rb:45:in `block in initialize_i18n'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/i18n_railtie.rb:41:in `each'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/i18n_railtie.rb:41:in `initialize_i18n'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/i18n_railtie.rb:15:in `block in <class:Railtie>'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/lazy_load_hooks.rb:36:in `call'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/lazy_load_hooks.rb:36:in `execute_hook'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/lazy_load_hooks.rb:45:in `block in run_load_hooks'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/lazy_load_hooks.rb:44:in `each'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/lazy_load_hooks.rb:44:in `run_load_hooks'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/application/finisher.rb:62:in `block in <module:Finisher>'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/initializable.rb:30:in `instance_exec'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/initializable.rb:30:in `run'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/initializable.rb:55:in `block in run_initializers'\r\n  from /Users/richardschneeman/.rubies/ruby-2.2.2/lib/ruby/2.2.0/tsort.rb:226:in `block in tsort_each'\r\n  from /Users/richardschneeman/.rubies/ruby-2.2.2/lib/ruby/2.2.0/tsort.rb:348:in `block (2 levels) in each_strongly_connected_component'\r\n  from /Users/richardschneeman/.rubies/ruby-2.2.2/lib/ruby/2.2.0/tsort.rb:429:in `each_strongly_connected_component_from'\r\n  from /Users/richardschneeman/.rubies/ruby-2.2.2/lib/ruby/2.2.0/tsort.rb:347:in `block in each_strongly_connected_component'\r\n  from /Users/richardschneeman/.rubies/ruby-2.2.2/lib/ruby/2.2.0/tsort.rb:345:in `each'\r\n  from /Users/richardschneeman/.rubies/ruby-2.2.2/lib/ruby/2.2.0/tsort.rb:345:in `call'\r\n  from /Users/richardschneeman/.rubies/ruby-2.2.2/lib/ruby/2.2.0/tsort.rb:345:in `each_strongly_connected_component'\r\n  from /Users/richardschneeman/.rubies/ruby-2.2.2/lib/ruby/2.2.0/tsort.rb:224:in `tsort_each'\r\n  from /Users/richardschneeman/.rubies/ruby-2.2.2/lib/ruby/2.2.0/tsort.rb:203:in `tsort_each'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/initializable.rb:54:in `run_initializers'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/application.rb:352:in `initialize!'\r\n  from /Users/richardschneeman/Documents/projects/codetriage/config/environment.rb:5:in `<top (required)>'\r\n  from /Users/richardschneeman/.gem/ruby/2.2.2/gems/skylight-0.6.1/lib/skylight/probes.rb:81:in `require'\r\n  from /Users/richardschneeman/.gem/ruby/2.2.2/gems/skylight-0.6.1/lib/skylight/probes.rb:81:in `require'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/dependencies.rb:302:in `block in require'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/dependencies.rb:268:in `load_dependency'\r\n  from /Users/richardschneeman/Documents/projects/rails/activesupport/lib/active_support/dependencies.rb:302:in `require'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/application.rb:328:in `require_environment!'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/commands/commands_tasks.rb:147:in `require_application_and_environment!'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/commands/commands_tasks.rb:68:in `console'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/commands/commands_tasks.rb:40:in `run_command!'\r\n  from /Users/richardschneeman/Documents/projects/rails/railties/lib/rails/commands.rb:18:in `<top (required)>'\r\n  from bin/rails:4:in `require'\r\n  from bin/rails:4:in `<main>'\r\n```\r\n"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21224",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21224/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21224/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21224/events",
    "html_url": "https://github.com/rails/rails/issues/21224",
    "id": 100804947,
    "number": 21224,
    "title": "Escaped entities in requests are not properly decoded",
    "user": {
      "login": "stevenkaras",
      "id": 322377,
      "avatar_url": "https://avatars.githubusercontent.com/u/322377?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/stevenkaras",
      "html_url": "https://github.com/stevenkaras",
      "followers_url": "https://api.github.com/users/stevenkaras/followers",
      "following_url": "https://api.github.com/users/stevenkaras/following{/other_user}",
      "gists_url": "https://api.github.com/users/stevenkaras/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/stevenkaras/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/stevenkaras/subscriptions",
      "organizations_url": "https://api.github.com/users/stevenkaras/orgs",
      "repos_url": "https://api.github.com/users/stevenkaras/repos",
      "events_url": "https://api.github.com/users/stevenkaras/events{/privacy}",
      "received_events_url": "https://api.github.com/users/stevenkaras/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-13T15:56:03Z",
    "updated_at": "2015-08-13T15:56:03Z",
    "closed_at": null,
    "body": "Reproduced here: https://gist.github.com/stevenkaras/042ca66a61b3aea40a83\r\n\r\nThe problem is that some clients will escape more entities than they need to, and routing will fail to unescape them. I've observed this in several cases where automated crawlers will escape the at symbol \"@\" to \"%40\". A workaround is to do the following:\r\n\r\n```ruby\r\nget ':at:user_name', to: \"test#foobar\", constraints: { at: /@|%40/ }, defaults: { at: \"@\" }\r\n```\r\n\r\nDespite these being horribly misconfigured clients that shouldn't be escaping the @ in the path, they are, and there is no way to directly match against an escaped sequence in Rails' router (`get '%40:user_name'` would match a literal '%2540foobar', but not '%40foobar') without using the workaround above."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21223",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21223/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21223/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21223/events",
    "html_url": "https://github.com/rails/rails/issues/21223",
    "id": 100803220,
    "number": 21223,
    "title": "AR: has_one/belongs_to dependent callback loop and raise error",
    "user": {
      "login": "ledowong",
      "id": 77749,
      "avatar_url": "https://avatars.githubusercontent.com/u/77749?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/ledowong",
      "html_url": "https://github.com/ledowong",
      "followers_url": "https://api.github.com/users/ledowong/followers",
      "following_url": "https://api.github.com/users/ledowong/following{/other_user}",
      "gists_url": "https://api.github.com/users/ledowong/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/ledowong/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/ledowong/subscriptions",
      "organizations_url": "https://api.github.com/users/ledowong/orgs",
      "repos_url": "https://api.github.com/users/ledowong/repos",
      "events_url": "https://api.github.com/users/ledowong/events{/privacy}",
      "received_events_url": "https://api.github.com/users/ledowong/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-13T15:47:14Z",
    "updated_at": "2015-08-13T15:47:14Z",
    "closed_at": null,
    "body": "I just upgrade my project from Rails 4.1.12 to 4.2.3, then some record raising error when I try to destroy them.\r\n```\r\nActiveRecord::ActiveRecordError: cannot update a destroyed record\r\n```\r\n\r\n## Can be reproduce like this:\r\n### Two database tables (I am using mySQL):\r\n```\r\nclass CreateCars < ActiveRecord::Migration\r\n  def change\r\n    create_table :cars do |t|\r\n\r\n      t.references :engine\r\n\r\n      t.timestamps null: false\r\n    end\r\n  end\r\nend\r\n```\r\n```\r\nclass CreateEngines < ActiveRecord::Migration\r\n  def change\r\n    create_table :engines do |t|\r\n\r\n      t.timestamps null: false\r\n    end\r\n  end\r\nend\r\n```\r\n### Models:\r\n```\r\nclass Car < ActiveRecord::Base\r\n\r\n  # arr I know it should be has_one engine... just demo the bug...\r\n  belongs_to :engine, dependent: :destroy \r\n\r\nend\r\n```\r\nIf I 'destroy' the car, I want the engine destroy as well.\r\n```\r\nclass Engine < ActiveRecord::Base\r\n\r\n  has_one :car, dependent: :nullify\r\n\r\nend\r\n```\r\nIf I 'destroy' the engine, I want to keep the car, just set engine_id to NULL.\r\n\r\n### Test in console:\r\nCreate car and engine, with relationship.\r\n```\r\nc = Car.new\r\ne = Engine.new\r\ne.save\r\nc.engine = e\r\nc.save\r\n```\r\nTry to destroy car.\r\n```\r\nc = Car.last\r\nc.destroy\r\n```\r\n### SQL log:\r\n```\r\n   (0.7ms)  BEGIN\r\n  SQL (0.9ms)  DELETE FROM `cars` WHERE `cars`.`id` = 3\r\n  Engine Load (1.4ms)  SELECT  `engines`.* FROM `engines` WHERE `engines`.`id` = 3 LIMIT 1\r\n   (4.8ms)  ROLLBACK\r\nActiveRecord::ActiveRecordError: cannot update a destroyed record\r\n```\r\nWhat I think:\r\n1. delete car from DB.\r\n2. trigger car's dependent, destroy engine.\r\n3. load engine from DB.\r\n4. try to set car's engine_id to null... but car is destroyed....\r\n\r\nI am not sure if this is a bug, or I shouldn't write the code in models like this...\r\n\r\n\r\n\r\n"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21222",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21222/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21222/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21222/events",
    "html_url": "https://github.com/rails/rails/pull/21222",
    "id": 100735659,
    "number": 21222,
    "title": "Regular expression check changed from (.change) to (=~)",
    "user": {
      "login": "ferdinandrosario",
      "id": 1284503,
      "avatar_url": "https://avatars.githubusercontent.com/u/1284503?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/ferdinandrosario",
      "html_url": "https://github.com/ferdinandrosario",
      "followers_url": "https://api.github.com/users/ferdinandrosario/followers",
      "following_url": "https://api.github.com/users/ferdinandrosario/following{/other_user}",
      "gists_url": "https://api.github.com/users/ferdinandrosario/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/ferdinandrosario/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/ferdinandrosario/subscriptions",
      "organizations_url": "https://api.github.com/users/ferdinandrosario/orgs",
      "repos_url": "https://api.github.com/users/ferdinandrosario/repos",
      "events_url": "https://api.github.com/users/ferdinandrosario/events{/privacy}",
      "received_events_url": "https://api.github.com/users/ferdinandrosario/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 2,
    "created_at": "2015-08-13T10:39:16Z",
    "updated_at": "2015-08-13T11:30:08Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21222",
      "html_url": "https://github.com/rails/rails/pull/21222",
      "diff_url": "https://github.com/rails/rails/pull/21222.diff",
      "patch_url": "https://github.com/rails/rails/pull/21222.patch"
    },
    "body": "Hi, This is my first and very small PR which I changed the pattern matching ( match) method with =~ for improvement. \r\n\r\nKindly guide me for any modification or required details."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21220",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21220/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21220/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21220/events",
    "html_url": "https://github.com/rails/rails/issues/21220",
    "id": 100686589,
    "number": 21220,
    "title": "ActionMailer deliver_later ovewrites message_id in Rails 4.2.3",
    "user": {
      "login": "tarr11",
      "id": 369807,
      "avatar_url": "https://avatars.githubusercontent.com/u/369807?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/tarr11",
      "html_url": "https://github.com/tarr11",
      "followers_url": "https://api.github.com/users/tarr11/followers",
      "following_url": "https://api.github.com/users/tarr11/following{/other_user}",
      "gists_url": "https://api.github.com/users/tarr11/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/tarr11/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/tarr11/subscriptions",
      "organizations_url": "https://api.github.com/users/tarr11/orgs",
      "repos_url": "https://api.github.com/users/tarr11/repos",
      "events_url": "https://api.github.com/users/tarr11/events{/privacy}",
      "received_events_url": "https://api.github.com/users/tarr11/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/rails/rails/labels/actionmailer",
        "name": "actionmailer",
        "color": "8B00FC"
      },
      {
        "url": "https://api.github.com/repos/rails/rails/labels/activejob",
        "name": "activejob",
        "color": "5319e7"
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 2,
    "created_at": "2015-08-13T04:18:42Z",
    "updated_at": "2015-08-17T23:24:40Z",
    "closed_at": null,
    "body": "I am not sure how to put a test together for this, but it appears that `deliver_later` is overwriting the message_id after delivery\r\n\r\n``` \r\nmsg = Notifier.welcome(User.first)\r\nmsg.message_id = \"foo\"\r\nmsg.deliver_now\r\n# check message_id on delivered mail, as expected\r\n\r\nmsg.deliver_later\r\n# check message_id on delivered mail (ie, check development.log), it has changed\r\n```\r\n\r\nI'd expect `deliver_later` to not change the message_id "
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21218",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21218/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21218/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21218/events",
    "html_url": "https://github.com/rails/rails/pull/21218",
    "id": 100668861,
    "number": 21218,
    "title": "WIP: Fix the AS::Callbacks terminator regression from 4.2.3",
    "user": {
      "login": "repinel",
      "id": 1685896,
      "avatar_url": "https://avatars.githubusercontent.com/u/1685896?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/repinel",
      "html_url": "https://github.com/repinel",
      "followers_url": "https://api.github.com/users/repinel/followers",
      "following_url": "https://api.github.com/users/repinel/following{/other_user}",
      "gists_url": "https://api.github.com/users/repinel/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/repinel/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/repinel/subscriptions",
      "organizations_url": "https://api.github.com/users/repinel/orgs",
      "repos_url": "https://api.github.com/users/repinel/repos",
      "events_url": "https://api.github.com/users/repinel/events{/privacy}",
      "received_events_url": "https://api.github.com/users/repinel/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/rails/rails/labels/activesupport",
        "name": "activesupport",
        "color": "FC9300"
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": {
      "url": "https://api.github.com/repos/rails/rails/milestones/34",
      "html_url": "https://github.com/rails/rails/milestones/5.0.0",
      "labels_url": "https://api.github.com/repos/rails/rails/milestones/34/labels",
      "id": 665192,
      "number": 34,
      "title": "5.0.0",
      "description": null,
      "creator": {
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
      "open_issues": 96,
      "closed_issues": 137,
      "state": "open",
      "created_at": "2014-05-21T00:58:22Z",
      "updated_at": "2015-08-14T07:57:36Z",
      "due_on": null,
      "closed_at": null
    },
    "comments": 2,
    "created_at": "2015-08-13T01:11:50Z",
    "updated_at": "2015-08-14T13:17:29Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21218",
      "html_url": "https://github.com/rails/rails/pull/21218",
      "diff_url": "https://github.com/rails/rails/pull/21218.diff",
      "patch_url": "https://github.com/rails/rails/pull/21218.patch"
    },
    "body": "Rails 4.2.3 AS::Callbacks will not halt chain if `false` is returned. That is the behavior of specific callbacks like AR::Callbacks and AM::Callbacks.\r\n\r\nThe two test cases from https://gist.github.com/repinel/93ab39881825d913466d might illustrate my point.\r\n\r\nFixes #21122\r\n\r\n@claudiob @kaspth What do you think?"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21216",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21216/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21216/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21216/events",
    "html_url": "https://github.com/rails/rails/issues/21216",
    "id": 100661058,
    "number": 21216,
    "title": "EXPLAIN Queries with Different Connections",
    "user": {
      "login": "kapkaev",
      "id": 795242,
      "avatar_url": "https://avatars.githubusercontent.com/u/795242?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/kapkaev",
      "html_url": "https://github.com/kapkaev",
      "followers_url": "https://api.github.com/users/kapkaev/followers",
      "following_url": "https://api.github.com/users/kapkaev/following{/other_user}",
      "gists_url": "https://api.github.com/users/kapkaev/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/kapkaev/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/kapkaev/subscriptions",
      "organizations_url": "https://api.github.com/users/kapkaev/orgs",
      "repos_url": "https://api.github.com/users/kapkaev/repos",
      "events_url": "https://api.github.com/users/kapkaev/events{/privacy}",
      "received_events_url": "https://api.github.com/users/kapkaev/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
        "name": "activerecord",
        "color": "0b02e1"
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 2,
    "created_at": "2015-08-12T23:56:39Z",
    "updated_at": "2015-08-13T17:22:11Z",
    "closed_at": null,
    "body": "I encountered an issue with EXPLAIN queries being run on the same connection, while multiple databases are involved in a query.\r\n\r\nFor example, there are two tables located in different databases. When I try to run a query on a large collection of records, AR automatically executes EXPLAIN queries. As a result, it throws an error.\r\n\r\n```ruby\r\nclass Book < ActiveRecord::Base\r\n  establish_connection :db1\r\nend\r\n\r\nclass Author < ActiveRecord::Base\r\n  establish_connection :db2\r\n\r\n  belongs_to :book\r\nend\r\n\r\nBook.includes(:author).explain\r\n```\r\n\r\n```ruby\r\nEXPLAIN (201.9ms)  EXPLAIN SELECT \"authors\".* FROM \"authors\" WHERE \"authors\".\"id\" IN (917, 929, 30, 186434, 188423)\r\nPG::UndefinedTable: ERROR:  relation \"authors\" does not exist\r\nLINE 1: EXPLAIN SELECT \"authors\".* FROM \"authors\"  WHERE \"autho...\r\n```\r\n\r\nIt seems like the code that causes the issue is here:\r\nhttps://github.com/rails/rails/blob/master/activerecord/lib/active_record/explain.rb#L26\r\n\r\nTested on Rails 3.2 and 4.2\r\n"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21209",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21209/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21209/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21209/events",
    "html_url": "https://github.com/rails/rails/issues/21209",
    "id": 100537761,
    "number": 21209,
    "title": "Threading error when using `ActiveRecord with_connection do` & ActionController::Live",
    "user": {
      "login": "duttski",
      "id": 1206402,
      "avatar_url": "https://avatars.githubusercontent.com/u/1206402?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/duttski",
      "html_url": "https://github.com/duttski",
      "followers_url": "https://api.github.com/users/duttski/followers",
      "following_url": "https://api.github.com/users/duttski/following{/other_user}",
      "gists_url": "https://api.github.com/users/duttski/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/duttski/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/duttski/subscriptions",
      "organizations_url": "https://api.github.com/users/duttski/orgs",
      "repos_url": "https://api.github.com/users/duttski/repos",
      "events_url": "https://api.github.com/users/duttski/events{/privacy}",
      "received_events_url": "https://api.github.com/users/duttski/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 3,
    "created_at": "2015-08-12T12:59:53Z",
    "updated_at": "2015-08-16T21:19:19Z",
    "closed_at": null,
    "body": "Source: http://stackoverflow.com/questions/31535545/threading-error-when-using-activerecord-with-connection-do-puma , https://github.com/puma/puma/issues/758\r\n\r\n**Summary:**  When using Puma and running long-running connections I am consistently receiving errors related to ActiveRecord connections crossing threads. This manifests itself in message like `message type 0x## arrived from server while idle` and a locked (crashed) server.\r\n\r\n** Edit: ** Added OS X and Rainbows to applicable versions\r\n\r\nWhat isn't clear is what conditions could cause the connection to be crossed between threads, i.e. am I, or is Puma, doing something wrong and needs correcting, or is the connection_pool getting confused. If you think this is better placed somewhere else then please let me know. I'm trying to do leg work on this but pretty much out of ideas!\r\n\r\n---------------------\r\nThe set up:\r\n\r\n - Ubuntu 15 / OS X Yosemite\r\n - PostgreSQL (9.4) / MySQL (`mysqld 5.6.25-0ubuntu0.15.04.1`)\r\n - Ruby - MRI `2.2.2p95 (2015-04-13 revision 50295) [x86_64-linux]` / Rubinius `rbx-2.5.8`\r\n - Rails (`4.2.3`, `4.2.1`)\r\n - Puma (`2.12.2`, `2.11`) / Rainbows\r\n - pg (`pg-0.18.2`) / mysql2\r\n \r\nNote, not all combinations of the above versions have been tried. First listed version is what I'm currently testing against.\r\n\r\n - `rails new issue-test`\r\n - Add a route `get 'events' => 'streaming#events'`\r\n - Add a controller `streaming_controller.rb`\r\n - Set up database stuff (`pool: 2`, but seen with different pool sizes)\r\n\r\nCode:\r\n\r\n\tclass StreamingController < ApplicationController\r\n\r\n\t  include ActionController::Live\r\n\r\n\t  def events\r\n\t\tbegin\r\n\t\t  response.headers[\"Content-Type\"] = \"text/event-stream\"\r\n\t\t  sse = SSE.new(response.stream)\r\n\t\t  sse.write( {:data => 'starting'} , {:event => :version_heartbeat})\r\n\t\t  ActiveRecord::Base.connection_pool.release_connection\r\n\t\t  while true do\r\n\t\t\tActiveRecord::Base.connection_pool.with_connection do |conn|\r\n\t\t\t  ActiveRecord::Base.connection.query_cache.clear\r\n\t\t\t  logger.info 'START'\r\n\t\t\t  conn.execute 'SELECT pg_sleep(3)'\r\n\t\t\t  logger.info 'FINISH'\r\n\t\t\t  sse.write( {:data => 'continuing'}, {:event => :version_heartbeat})\r\n\t\t\t  sleep 0.5\r\n\t\t\t end\r\n\t\t  end\r\n\t\trescue IOError\r\n\t\trescue ClientDisconnected\r\n\t\tensure\r\n\t\t  logger.info 'Ensuring event stream is closed'\r\n\t\t  sse.close\r\n\t\tend\r\n\t\trender nothing: true\r\n\t  end\r\n\tend\r\n\r\nPuma configuration:\r\n\r\n\tworkers 1\r\n\tthreads 2, 2\r\n    #...\r\n\tbind \"tcp://0.0.0.0:9292\"\r\n\r\n\t#...\r\n\tactivate_control_app\r\n\r\n\ton_worker_boot do\r\n\t  require \"active_record\"\r\n\t  ActiveRecord::Base.connection.disconnect! rescue ActiveRecord::ConnectionNotEstablished\r\n\t  ActiveRecord::Base.establish_connection(YAML.load_file(\"#{app_dir}/config/database.yml\")[rails_env])\r\n\tend\r\n\r\n - Run the server `puma -e production -C path/to/puma/config/production.rb`\r\n\r\nTest script:\r\n\r\n\t#!/bin/bash\r\n\r\n\ttimeout 30 curl -vS http://0.0.0.0/events &\r\n\ttimeout 5 curl -vS http://0.0.0.0/events &\r\n\ttimeout 30 curl -vS http://0.0.0.0/events\r\n\r\n\r\nThis reasonably consistently results in a complete lock of the application server (in PostgreSQL, see notes). The scary message comes from `libpq`:\r\n\r\n    message type 0x44 arrived from server while idle\r\n    message type 0x43 arrived from server while idle\r\n    message type 0x5a arrived from server while idle\r\n    message type 0x54 arrived from server while idle\r\n\r\n\r\nIn the 'real-world' I have quite a few extra elements and the issue presents itself at random. My research indicates that this message comes from `libpq` and is subtext for *'communication problem, possibly using connection in different threads'*. Finally, while writing this up, I had the server lock up without a single message in any log.\r\n\r\n--------------\r\nI don't see the issue happen if I change the controller block to look like:\r\n\r\n\tbegin\r\n\t  #...\r\n\t  while true do\r\n\t\tt = Thread.new do #<<<<<<<<<<<<<<<<<\r\n\t\t\tActiveRecord::Base.connection_pool.with_connection do |conn|\r\n\t  \t\t    #...\r\n\t\t\tend\r\n\t\t end\r\n\t\t t.join #<<<<<<<<<<<<<<<<<\r\n\t  end\r\n\t  #...\r\n\trescue IOError\r\n\t#...\r\n\r\nBut I don't know whether this has actually solved the problem or just made it extremely unlikely. Nor can I really fathom why this would make a difference.\r\n\r\n--------------\r\n**MySQL**\r\n\r\nIf running MySQL, the message is a bit different, and the application recovers (though I'm not sure if it is then in some undefined state):\r\n\r\n\tF, [2015-07-30T14:12:07.078215 #15606] FATAL -- : \r\n\tActiveRecord::StatementInvalid (Mysql2::Error: This connection is in use by: #<Thread:0x007f563b2faa88@/home/dev/.rbenv/versions/2.2.2/lib/ruby/gems/2.2.0/gems/actionpack-4.2.3/lib/action_controller/metal/live.rb:269 sleep>: SELECT  `tasks`.* FROM `tasks`  ORDER BY `tasks`.`id` ASC LIMIT 1):"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21208",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21208/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21208/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21208/events",
    "html_url": "https://github.com/rails/rails/pull/21208",
    "id": 100505918,
    "number": 21208,
    "title": "Fix ActiveRecord::StatementInvalid error when merge nested ActiveRecord::Relation",
    "user": {
      "login": "seiyeah78",
      "id": 6185139,
      "avatar_url": "https://avatars.githubusercontent.com/u/6185139?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/seiyeah78",
      "html_url": "https://github.com/seiyeah78",
      "followers_url": "https://api.github.com/users/seiyeah78/followers",
      "following_url": "https://api.github.com/users/seiyeah78/following{/other_user}",
      "gists_url": "https://api.github.com/users/seiyeah78/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/seiyeah78/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/seiyeah78/subscriptions",
      "organizations_url": "https://api.github.com/users/seiyeah78/orgs",
      "repos_url": "https://api.github.com/users/seiyeah78/repos",
      "events_url": "https://api.github.com/users/seiyeah78/events{/privacy}",
      "received_events_url": "https://api.github.com/users/seiyeah78/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-12T09:45:03Z",
    "updated_at": "2015-08-12T09:45:03Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21208",
      "html_url": "https://github.com/rails/rails/pull/21208",
      "diff_url": "https://github.com/rails/rails/pull/21208.diff",
      "patch_url": "https://github.com/rails/rails/pull/21208.patch"
    },
    "body": "Error occurs that invalid statement when join other nested `ActiveRecord::Relation` using `.merge`\r\n\r\nFor example:\r\n\r\n```ruby\r\nclass Project < ActiveRecord::Base\r\n  has_many :teams\r\nend\r\n\r\nclass Team < ActiveRecord::Base\r\n  has_many :members\r\n  belongs_to :project\r\nend\r\n\r\nclass Member < ActiveRecord::Base\r\n  belongs_to :team\r\n  has_many :tasks\r\nend\r\n\r\nclass Task < ActiveRecord::Base\r\n  belongs_to :member\r\n\r\n  scope :not_complete, lambda { where(complete: false).where(\"tasks.term <= ? \", Date.today.end_of_day) }\r\nend\r\n```\r\n\r\nResult:\r\n```ruby\r\n[1] pry(main)> Project.joins(:teams).merge( Team.joins(:members).merge( Member.joins(:tasks).merge(Task.not_complete) ) ).to_a\r\n  Project Load (0.5ms)  SELECT `projects`.* FROM `projects` INNER JOIN `teams` ON `teams`.`project_id` = `projects`.`id` LEFT OUTER JOIN `tasks` ON `tasks`.`member_id` = `members`.`id` LEFT OUTER JOIN `members` ON `members`.`team_id` = `teams`.`id` WHERE `tasks`.`complete` = 0 AND (tasks.term <= '2015-08-12 23:59:59' )\r\nActiveRecord::StatementInvalid: Mysql2::Error: Unknown column 'members.id' in 'on clause': SELECT `projects`.* FROM `projects` INNER JOIN `teams` ON `teams`.`project_id` = `projects`.`id` LEFT OUTER JOIN `tasks` ON `tasks`.`member_id` = `members`.`id` LEFT OUTER JOIN `members` ON `members`.`team_id` = `teams`.`id` WHERE `tasks`.`complete` = 0 AND (tasks.term <= '2015-08-12 23:59:59' )\r\nfrom /vagrant/rails/activerecord/lib/active_record/connection_adapters/abstract_mysql_adapter.rb:421:in `query'\r\n```"
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21207",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21207/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21207/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21207/events",
    "html_url": "https://github.com/rails/rails/pull/21207",
    "id": 100494426,
    "number": 21207,
    "title": "Fix polymorphic association scope when sti_name is specified",
    "user": {
      "login": "exAspArk",
      "id": 577441,
      "avatar_url": "https://avatars.githubusercontent.com/u/577441?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/exAspArk",
      "html_url": "https://github.com/exAspArk",
      "followers_url": "https://api.github.com/users/exAspArk/followers",
      "following_url": "https://api.github.com/users/exAspArk/following{/other_user}",
      "gists_url": "https://api.github.com/users/exAspArk/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/exAspArk/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/exAspArk/subscriptions",
      "organizations_url": "https://api.github.com/users/exAspArk/orgs",
      "repos_url": "https://api.github.com/users/exAspArk/repos",
      "events_url": "https://api.github.com/users/exAspArk/events{/privacy}",
      "received_events_url": "https://api.github.com/users/exAspArk/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 2,
    "created_at": "2015-08-12T08:39:11Z",
    "updated_at": "2015-08-12T10:42:28Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/21207",
      "html_url": "https://github.com/rails/rails/pull/21207",
      "diff_url": "https://github.com/rails/rails/pull/21207.diff",
      "patch_url": "https://github.com/rails/rails/pull/21207.patch"
    },
    "body": "Hi,\r\n\r\nAssociation scope ignores custom `.sti_name` (and `.store_full_sti_class` attribute) for polymorphic models and uses `.name` as a type instead.\r\n\r\nTo fix it, I would like to suggest to use [sti_name](https://github.com/rails/rails/blob/4-2-stable/activerecord/lib/active_record/inheritance.rb#L134-L136) by default."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/21198",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/21198/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/21198/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/21198/events",
    "html_url": "https://github.com/rails/rails/issues/21198",
    "id": 100365519,
    "number": 21198,
    "title": "Marking a class as unloadable causes code reload to throw \"Unable to autoload constant, expected ...rb to define it\"",
    "user": {
      "login": "pierre-pretorius",
      "id": 2392091,
      "avatar_url": "https://avatars.githubusercontent.com/u/2392091?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/pierre-pretorius",
      "html_url": "https://github.com/pierre-pretorius",
      "followers_url": "https://api.github.com/users/pierre-pretorius/followers",
      "following_url": "https://api.github.com/users/pierre-pretorius/following{/other_user}",
      "gists_url": "https://api.github.com/users/pierre-pretorius/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/pierre-pretorius/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/pierre-pretorius/subscriptions",
      "organizations_url": "https://api.github.com/users/pierre-pretorius/orgs",
      "repos_url": "https://api.github.com/users/pierre-pretorius/repos",
      "events_url": "https://api.github.com/users/pierre-pretorius/events{/privacy}",
      "received_events_url": "https://api.github.com/users/pierre-pretorius/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/rails/rails/labels/activesupport",
        "name": "activesupport",
        "color": "FC9300"
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-11T17:37:35Z",
    "updated_at": "2015-08-11T17:43:45Z",
    "closed_at": null,
    "body": "The following steps explain and reproduce the problem:\r\n\r\n1) Create new Rails 4.2.3 app:\r\n```\r\nrails new polls\r\ncd polls\r\nbundle exec rails generate scaffold Question name:string\r\nbundle exec rake db:migrate\r\n```\r\n\r\n2) Mark the Question model as unloadable:\r\n```\r\nnano app/models/question.rb\r\n\r\n# Edit the content so that it looks as follows:\r\nclass Question < ActiveRecord::Base\r\n  unloadable\r\nend\r\n```\r\n\r\n3) Do something that causes Rails to reload code:\r\n\r\n```\r\nrails s &\r\ncurl localhost:3000/questions -s > /dev/null\r\ntouch app/models/question.rb\r\ncurl localhost:3000/questions -s > /dev/null\r\n```\r\n\r\nThe following is printed by the rails server:\r\n```\r\nStarted GET \"/questions\" for 127.0.0.1 at 2015-08-11 19:31:11 +0200\r\nProcessing by QuestionsController#index as */*\r\nCompleted 500 Internal Server Error in 1ms (ActiveRecord: 0.0ms)\r\n\r\nLoadError (Unable to autoload constant Question, expected /home/pierre/poll/app/models/question.rb to define it):\r\n  app/controllers/questions_controller.rb:9:in `index'\r\n\r\n\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/actionpack-4.2.3/lib/action_dispatch/middleware/templates/rescues/_source.erb (2.7ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/actionpack-4.2.3/lib/action_dispatch/middleware/templates/rescues/_trace.html.erb (1.3ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/actionpack-4.2.3/lib/action_dispatch/middleware/templates/rescues/_request_and_response.html.erb (0.7ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/actionpack-4.2.3/lib/action_dispatch/middleware/templates/rescues/diagnostics.html.erb within rescues/layout (11.5ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/web-console-2.2.1/lib/web_console/templates/_markup.html.erb (0.2ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/web-console-2.2.1/lib/web_console/templates/_inner_console_markup.html.erb within layouts/inlined_string (0.2ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/web-console-2.2.1/lib/web_console/templates/_prompt_box_markup.html.erb within layouts/inlined_string (0.2ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/web-console-2.2.1/lib/web_console/templates/style.css.erb within layouts/inlined_string (0.2ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/web-console-2.2.1/lib/web_console/templates/console.js.erb within layouts/javascript (8.2ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/web-console-2.2.1/lib/web_console/templates/main.js.erb within layouts/javascript (0.2ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/web-console-2.2.1/lib/web_console/templates/error_page.js.erb within layouts/javascript (0.2ms)\r\n  Rendered /usr/local/lib/ruby/gems/2.1.0/gems/web-console-2.2.1/lib/web_console/templates/index.html.erb (17.8ms)\r\n```\r\n\r\nUnloadable is used extensively by Redmine plugins (it's been in their plugin generate scripts for years) and their latest stable is now Rails 4.2.3:\r\nhttp://www.redmine.org/issues/20513"
  }
]
