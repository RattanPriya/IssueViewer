var React = require('react');
var IssueList = require('./issueList');
var ReactPaginate = require('react-paginate');

var issueRoot = React.createClass({
    getInitialState: function() {
        return {
            data: {},
            page: 1,
        };
    },

    handlePageClick: function(data) {
        var selected = data.selected;
        var offset = Math.ceil(selected * this.props.perPage);

        this.setState({
            offset: offset
        }, function() {
            this.loadIssuesFromServer();
        }.bind(this));

        this.loadIssuesFromServer();
    },

    loadIssuesFromServer: function(page) {

      window.jQuery.ajax({
        url: this.props.source+'?page='+page+'per_page=25',
        data: {
          limit: this.props.perPage,
          offset: this.state.offset
        },
        cache: true,
        dataType: 'json',
        type: 'GET',

        success: function(data, textStatus, request) {
          debugger;

          if (this.isMounted()) {
            this.setState({
              data: data,
              pageNum: Math.ceil(data.length / 25)
            });
          }
        }.bind(this),

        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    componentDidMount: function() {
        this.loadIssuesFromServer(this.state.page);
    },

    render: function() {
      var pagination = this.state.data.length > 0 ?
                      <div className='issue-list'> 
                        <IssueList  issues={this.state.data}/>
                        <Paginate previousLabel={"previous"}
                         nextLabel={"next"}
                         breakLabel={<li className="break"><a href="">...</a></li>}
                         pageNum={this.state.pageNum}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         clickCallback={this.handlePageClick}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClass={"active"} /> </div>:
                        <div>
                      </div>
        return (
            <div className='issue-root'>
                     {pagination} 
            </div>
        );
    }

});

module.exports = issueRoot;