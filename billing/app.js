var contract = Parse.Object.extend("Contract");

var MyComponent = React.createClass({

	getInitialState: function(){
		console.log("getInitialState");
		return {data:[]}
	},

	loadFromParse: function(){
		var query = new Parse.Query(contract);
		console.log("loadFromParse");
		query.find({
			success: function(results){
				var newDataRows = [];
				for (var i in results){
					var startDate = results[i].get("startDate").toDateString()
					var person = results[i].get("person");
					var project = results[i].get("project");
					var rateHourly = results[i].get("rateHourly");
					var rateMothly = results[i].get("rateMothly");
					var currency = results[i].get("currency");
					var overtimeFactor = results[i].get("overtimeFactor");
					newDataRows = newDataRows.concat({person:person,project:project,startDate:startDate,rateHourly:rateHourly,rateMonthly:rateMothly,currency:currency,overtimeFactor:overtimeFactor});
				}
				//this.setState({data: newDataRows});
			}.bind(this),
			error: function(error){
				console.log("Query Error:" + error.message)
			}
		});
	},

	componentWillMount: function() {
		console.log("componentWillMount");
		Parse.initialize("VPVoX5hnanP5ZtdrimS1IZ4LVYygHHQPAKd5SD36", "BUqrEQNyj2zDAaqNlnILAXVBzoKyAGsYvWjF1GFX");
		this.loadFromParse();
	},

	render: function () {
		const data = this.state.data;
		console.log("rendering");
		return(
			<BootstrapTable data={data} height="190" striped={true} hover={true}>
				<TableHeaderColumn dataField="startDate">Start Date</TableHeaderColumn>
				<TableHeaderColumn dataField="person" isKey={true}>Person</TableHeaderColumn>
				<TableHeaderColumn dataField="project" dataSort={true}>Project</TableHeaderColumn>
				<TableHeaderColumn dataField="rateHourly">Rate hourly</TableHeaderColumn>
				<TableHeaderColumn dataField="rateMonthly">Rate monthly</TableHeaderColumn>
				<TableHeaderColumn dataField="currency">Currency</TableHeaderColumn>
				<TableHeaderColumn dataField="overtimeFactor">Overtime Factor</TableHeaderColumn>
			</BootstrapTable>
		)
	}
});

React.render(
	<MyComponent/>, document.getElementById("example")
);