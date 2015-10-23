var Item = React.createClass({
	render: function () {
		return (
			<li>{this.props.code} {this.props.name} {this.props.desc}</li>
		)
	}
})

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
		React.findDOMNode(this.refs.fCode).value = '';
		React.findDOMNode(this.refs.fName).value = '';
		React.findDOMNode(this.refs.fDesc).value = '';
	},

	loadFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleSubmit: function(row) {
		var dataRows = this.state.data;
		var newDataRows = dataRows.concat([row]);
		this.setState({data: newDataRows});
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: row,
			success: function(data) {
				//this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	componentWillMount: function() {
		this.loadFromServer();
		//setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	//render: function () {
	//	const data = this.state.data;
	//	return (
	//		<div>
	//			<input type="input" placeholder = "Type fg code" ref="fCode"/>
	//			<input type="input" placeholder = "Feed group name " ref="fName"/>
	//			<input type="input" placeholder = "Description" ref="fDesc"/>
	//			<input type = "button" value = "Submit" onClick = {this.handleOnClick}/>
	//			<ul>
	//				{data.map(function(item){
	//					return <Item code ={item.code} name ={item.name} desc ={item.desc}/>
	//				})}
	//			</ul>
	//		</div>
	//	)
	//}

	render: function () {
		const data = this.state.data;
		return(
			<BootstrapTable data={data} height="120" striped={true} hover={true}>
				<TableHeaderColumn dataField="code" isKey={true} dataAlign="center" dataSort={true}>Code</TableHeaderColumn>
				<TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
				<TableHeaderColumn dataField="desc">Description</TableHeaderColumn>
			</BootstrapTable>
		)
	}
})

React.render(
	<MyComponent url = "fg.json"/>, document.getElementById("example")
);