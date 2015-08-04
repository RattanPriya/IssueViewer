var React = require('react');

var Title = React.createClass({

	render: function() {
		return (
			<div class="issue-title">
			    <a href="" class="issue-title-link js-navigation-open">
			      what does the polling exactly mean after start with "gulp dev"
			    </a>
			    <div class="issue-meta">
			      <span class="issue-meta-section opened-by">
			        #3
			          opened <time datetime="2015-04-03T18:24:53Z" is="relative-time" title="Apr 3, 2015, 11:24 AM PDT">on Apr 3</time> by
			          <a href="/jakemmarsh/react-rocket-boilerplate/issues?q=is%3Aissue+is%3Aopen+author%3Avikbert" aria-label="View all issues opened by vikbert" class="tooltipped tooltipped-s muted-link">vikbert</a>
			      </span>
			      <span class="issue-meta-section css-truncate issue-milestone">
			      </span>

			      
			    </div>
	 	 	</div>
		);
	}

});

module.exports = Title;