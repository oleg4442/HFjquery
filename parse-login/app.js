var Timesheet = Parse.Object.extend("Timesheet");

var MyComponent = React.createClass({

	handleOnClick: function(event){
		event.preventDefault();
		var project = React.findDOMNode(this.refs.projectName).value.trim();
		var hours = parseInt(React.findDOMNode(this.refs.hoursAmount).value.trim());
		if (!project || !hours){
			return;
		}

		var newTimesheetElement = new Timesheet();
		newTimesheetElement.save({Project: project,Hours: hours}, {
			success: function() {
			},
			error: function(model, error) {
				console.log("Error: " + error.message );
			}
		});
	},
	componentWillMount: function() {
		Parse.initialize("VPVoX5hnanP5ZtdrimS1IZ4LVYygHHQPAKd5SD36", "BUqrEQNyj2zDAaqNlnILAXVBzoKyAGsYvWjF1GFX");
		//this.loadFromParse();
	},
	render: function () {
		return (
			<div id="main">
				<h1>React!</h1>

				<p><input type="input" ref='projectName'/></p>
				<p><input type="input" ref='hoursAmount'/></p>
				<p><input type="button" value = "Add" onClick = {this.handleOnClick}/></p>

			</div>
		)
	}
});


React.render(<MyComponent/>,document.getElementById("example"));