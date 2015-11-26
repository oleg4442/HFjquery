var contract = Parse.Object.extend("Contract");
var ModalTrigger = React.createClass(
	{ handleClick: function(e) {
		$(this.refs.payload.getDOMNode()).modal(); }

		, render: function() {
		return <div onClick={this.handleClick}>
			{this.props.trigger}
			<Modal ref="payload"
				   header={this.props.header}
				   body={this.props.body}
				   footer={this.props.footer}
				/>
		</div> }
	})


var Modal = React.createClass(
	{ componentDidMount: function() {
		$(this.getDOMNode()).modal({ background: true
			, keyboard: true
			, show: false
		})}

		, componentWillUnmount: function(){
		$(this.getDOMNode()).off('hidden'); }

		, handleClick: function(e) {
		e.stopPropagation(); }

		, render: function() {
		console.log(this.props)

		return (<div onClick={this.handleClick} className="modal fade" role="dialog" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">{this.props.header}</div>
					<div className="modal-body">{this.props.body}</div>
					<div className="modal-footer">{this.props.footer}</div>
				</div>
			</div>
		</div>) }
	});


var Btn = React.createClass({
	render: function() {
		var aProps = {className: "btn btn-default", href:"#"}

		for (k in this.props) {
			if (k != "className") aProps[k] = this.props[k]
			else aProps[k] =  (aProps[k] + " " + this.props[k])
		}

		return React.DOM.a(aProps) }})


var Icon = React.createClass({
	render: function() { return <i className={"fa fa-" + this.props.fa} /> }})

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
				this.setState({data: newDataRows});
			}.bind(this),
			error: function(error){
				console.log("Query Error:" + error.message)
			}
		});
	},

	componentWillMount: function() {
		console.log("componentWillMount");
		Parse.initialize("VPVoX5hnanP5ZtdrimS1IZ4LVYygHHQPAKd5SD36", "BUqrEQNyj2zDAaqNlnILAXVBzoKyAGsYvWjF1GFX"); // Real Timesheet app in Parse.com
		this.loadFromParse();
	},


	handleOnClick: function(e) {
		e.preventDefault();
		const staff = React.findDOMNode(this.refs.person).value.trim();
		console.log("Person = " + staff);
		console.log("Clicked!");
		//var person = prompt("Please enter your name", "Harry Potter");
		//
		//if (person != null) {
		//	console.log("Hello " + person + "! How are you today?");
		//}
	},

	render: function () {
		const data = this.state.data;
		console.log("rendering");
		return(
			<div>
				<BootstrapTable data={data} height="250" striped={true} hover={true}>
					<TableHeaderColumn dataField="startDate">Start Date</TableHeaderColumn>
					<TableHeaderColumn dataField="person" isKey={true}>Person</TableHeaderColumn>
					<TableHeaderColumn dataField="project" dataSort={true}>Project</TableHeaderColumn>
					<TableHeaderColumn dataField="rateHourly">Rate hourly</TableHeaderColumn>
					<TableHeaderColumn dataField="rateMonthly">Rate monthly</TableHeaderColumn>
					<TableHeaderColumn dataField="currency">Currency</TableHeaderColumn>
					<TableHeaderColumn dataField="overtimeFactor">Overtime Factor</TableHeaderColumn>
				</BootstrapTable>
				<ModalTrigger
					trigger={<Btn><Icon fa="gear"/> Modal</Btn>}
					header={<h3>A Modal</h3>}
					footer={<Btn data-dismiss="modal" onClick={this.handleOnClick}><Icon fa="check"/> OK</Btn>}
					body={<div>
							<p><input type="date" placeholder = "Type start date" ref="start_date"/></p>
							<p><input type="input" placeholder = "Type person" ref="person"/></p>
							<p><input type="input" placeholder = "Type project" ref="project"/></p>
							<p><input type="input" placeholder = "rate hourly" ref="rate_hourly"/></p>
							<p><input type="input" placeholder = "rate monthly" ref="rate_monthly"/></p>
							<p><input type="input" placeholder = "currency" ref="currency"/></p>
							<p><input type="input" placeholder = "overtime factor" ref="overtime_factor"/></p>
						  </div>
                   }
				/>
			</div>


		)
	}
});

React.render(
	<MyComponent/>, document.getElementById("example")
);