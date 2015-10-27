var GroupObject = Parse.Object.extend("ERFGROUP");;

var MyComponent = React.createClass({

	getInitialState: function(){
		return {data:[]}
	},
	handleOnClick: function(e){
		e.preventDefault();
		const code = React.findDOMNode(this.refs.fCode).value.trim();
		const name = React.findDOMNode(this.refs.fName).value.trim();
		const desc = React.findDOMNode(this.refs.fDesc).value.trim();
		if (!code || !name) {
			return;
		}
		this.handleSubmit({code: code, name: name, desc: desc});

		//*Parse BLOCK*/

		var groupObject = new GroupObject();
		groupObject.save({Code: code,Name: name, Desc: desc}, {
			success: function(object) {
				$(".success").show();
			},
			error: function(model, error) {
				console.log("Error:" + error.message );
			}
		});

		React.findDOMNode(this.refs.fCode).value = '';
		React.findDOMNode(this.refs.fName).value = '';
		React.findDOMNode(this.refs.fDesc).value = '';
	},

	loadFromParse: function(){
		var dataRows = this.state.data;
		var query = new Parse.Query(GroupObject);
		query.find({
			success: function(results){
				var newDataRows = [];
				for (var i in results){
					var code = results[i].get("Code");
					var name = results[i].get("Name");
					var desc = results[i].get("Desc");
					newDataRows = newDataRows.concat({code:code,name:name,desc:desc});
					console.log("FG CODE: " + code);
				}
				this.setState({data: newDataRows});
			}.bind(this),
			error: function(error){
				console.log("Query Error:" + error.message)
		````}
		});
	},

	handleSubmit: function(row) {
		var dataRows = this.state.data;
		var newDataRows = dataRows.concat([row]);
		this.setState({data: newDataRows});
	},
	componentWillMount: function() {
		Parse.initialize("RLodcdOxlKYYPTmLZ4sofv3M5R3XKG7d7qZE6XBe", "IoKsmB6f7HbdvkzXLpCHn2JbYrqjMev7HTFYaq4r");
		//this.loadFromServer();
		this.loadFromParse();
		//setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},

	render: function () {
		const data = this.state.data;

		return(
			<div>
				<input type="input" placeholder = "Type fg code" ref="fCode"/>
				<input type="input" placeholder = "Feed group name " ref="fName"/>
				<input type="input" placeholder = "Description" ref="fDesc"/>
				<input type="button" value = "Submit" onClick = {this.handleOnClick}/>
				<div>
					<BootstrapTable data={data} height="190" striped={true} hover={true}>
						<TableHeaderColumn dataField="code" isKey={true} dataAlign="center" dataSort={true}>Code</TableHeaderColumn>
						<TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
						<TableHeaderColumn dataField="desc">Description</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		)
	}
})

React.render(
	<MyComponent/>, document.getElementById("example")
);