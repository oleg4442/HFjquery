/**
 * Created by onaydin on 9/22/2015.
 */
var CommentBox = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: "fg.xml",
			cache: false,
			dataType: "xml",
			success:  function(xml){
				$(xml).find("row").each(function(){
					var fgcode = $(this).attr("GROUP_CODE");
					var fgname = $(this).attr("GROUP_NAME");
					var fgdesc = $(this).attr("GROUP_DESC");
					
					var info = '<li>FG Code: ' + $(this).attr("GROUP_CODE") + ',  FG Name: '
						+ $(this).attr("GROUP_NAME") + ',  FG Description: ' + $(this).attr("GROUP_DESC") + '</li>';
					$('#feed_group').append(info);
				});
			}
		});

		//$.ajax({
		//	url: this.props.url,
		//	dataType: 'json',
		//	cache: false,
		//	success: function(data) {
		//		this.setState({data: data});
		//	}.bind(this),
		//	error: function(xhr, status, err) {
		//		console.error(this.props.url, status, err.toString());
		//	}.bind(this)
		//});
	},
	render: function () {
		return (
			<div className="commentBox">
				<h1>comments</h1>
				<CommentList data = {this.state.data}/>
				<CommentForm/>
			</div>
		)
	}
})

var CommentList = React.createClass({
	render: function () {
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author = {comment.author}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		)
	}
})

var Comment = React.createClass({
	render: function () {
		return (
			<div className = "comment">
				<h2 className = "commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		)
	}
})

var CommentForm = React.createClass({
	render: function () {
		return (
			<div className="commentBox">
				Hello world! I'm a CommentForm
			</div>
		)
	}
})
React.render(
	<CommentBox url="fg.xml" />,
	document.getElementById('content')
);
