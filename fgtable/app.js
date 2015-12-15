/**
 * Created by onaydin on 10/13/2015.
 */
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
	componentDidMount: function() {
		this.loadFromServer();
		//setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function () {
		const data = this.state.data;
		return (
			<div>
				<input type="input" placeholder = "Type fg code" ref="fCode"/>
				<input type="input" placeholder = "Feed group name " ref="fName"/>
				<input type="input" placeholder = "Description" ref="fDesc"/>
				<input type = "button" value = "Submit" onClick = {this.handleOnClick}/>
				<ul>
					{data.map(function(item){
						return <Item code ={item.code} name ={item.name} desc ={item.desc}/>
					})}
				</ul>
			</div>
		)
	}
})

React.render(<MyComponent url = "fg.json" pollInterval = {2000}/>,document.getElementById("example"));

//var Item = React.createClass({
//	handleOnMarkAsCompleted: function(){
//		this.props.onMarkAsCompleted(this.props.item.id);
//	},
//	render: function () {
//		const completed = this.props.item.completed;
//		const value = this.props.item.value;
//		return <li onClick = {this.handleOnMarkAsCompleted}>
//			{completed ? <s>{value}</s> : value}
//		</li>;
//
//	}
//})
//var Field = React.createClass({
//	getInitialState: function(){
//		return{text:"",items:[]};
//	},
//	handleChange: function(e){
//		this.setState({text:e.target.value});
//	},
//	handleClick: function(){
//		const items = this.state.items;
//		const text = this.state.text;
//		items.push({id:Math.random(), value: text, completed: false});
//		this.setState({text:"",items: items})
//	},
//	markAsCompleted: function(id){
//		const items = this.state.items;
//		const idx = items.findIndex(function(item){return item["id"] === id})
//		items[idx]["completed"] = true;
//		this.setState({items: items});
//	},
//	render: function () {
//		const text = this.state.text;
//		const items = this.state.items;
//		return (
//			<div>
//				<input type="text" value={text} onChange={this.handleChange}/>
//				<input type="button" value="add" onClick = {this.handleClick}/>
//				<ul>
//				{items.map(function(item){
//					return <Item onMarkAsCompleted={this.markAsCompleted} value={item}/>
//				},this)}
//				</ul>
//			</div>
//		);
//	}
//})
//
//React.render(<Field/>, document.getElementById("example"))

//var Item = React.createClass({
//	render: function () {
//		return <li>{this.props.value}</li>;
//
//	}
//})
//var Field = React.createClass({
//	getInitialState: function(){
//		return{text:"",items:[]};
//	},
//	handleChange: function(e){
//		this.setState({text:e.target.value});
//	},
//	handleClick: function(){
//		const items = this.state.items;
//		const text = this.state.text;
//		items.push(text);
//		this.setState({text:"",items: items})
//	},
//	render: function () {
//		const text = this.state.text;
//		const items = this.state.items;
//		return (
//			<div>
//				<input type="text" value={text} onChange={this.handleChange}/>
//				<input type="button" value="add" onClick = {this.handleClick}/>
//				<ul>
//					{items.map(function(item){
//						return <Item value={item}/>
//					})}
//				</ul>
//			</div>
//		);
//	}
//})
//
//React.render(<Field/>, document.getElementById("example"))

//const MyComponent = React.createClass({
//	// HINT: getInitialState
//	// BEGIN
//	getInitialState: function(){
//		return {newForm:true,value:""}
//	},
//	// END
//
//
//	handleOnSubmit: function(e) {
//		e.preventDefault();
//		// BEGIN
//		this.setState({newForm:false});
//		// END
//
//	},
//
//	// BEGIN
//
//	handleOnClick: function(e) {
//		this.setState({value: "", newForm: true})
//	},
//
//	// END
//
//
//	handleOnChange: function(e) {
//		e.preventDefault();
//		// BEGIN
//		this.setState({value:e.target.value})
//		// END
//
//	},
//
//	render: function() {
//		// BEGIN
//		var newForm = this.state.newForm;
//		var value = this.state.value;
//		// END
//
//		if (newForm) {
//			return (
//				<form onSubmit={this.handleOnSubmit}>
//					<input className="text" type="text" value={value} onChange={this.handleOnChange} />
//					<input className="submit" type="submit"/>
//				</form>
//			);
//		} else {
//			return (
//				<div>
//					<button className="reset" onClick={this.handleOnClick}>Reset</button>
//					<div className="value">{value}</div>
//				</div>
//			);
//		}
//	}
//	// END
//})
//
//React.render(
//	<MyComponent />,
//	document.getElementById('example')
//);




//var Field = React.createClass({
//	getInitialState: function(){
//		return {text:""};
//	},
//	handleChange: function(e){
//		this.setState({text:e.target.value})
//	},
//	render: function () {
//		const text = this.state.text;
//		return (
//			<div>
//				<input type="text" value={text} onChange={this.handleChange}/>
//				<div>{text}</div>
//			</div>
//		)
//	}
//})
//React.render(<Field/>,document.getElementById("example"))



//var MyButton = React.createClass({
//	getInitialState: function(){
//		return {pressed:true,count:this.props.count}
//	},
//	handleClick: function(){
//		const pressed = this.state.pressed;
//		this.setState({pressed:!pressed});
//		this.state.count = this.state.count +1;
//	},
//	render: function () {
//		const pressed=this.state.pressed;
//		const count = this.state.count;
//		var className;
//		if (pressed){
//			className = "pressed";
//		}else{
//			className = "unpressed";
//		}
//		return (
//			<input type="button" className={className} value={"value: " + count} onClick={this.handleClick}/>
//		)
//	}
//})
//React.render(<MyButton count = {10}/>,document.getElementById("example"))