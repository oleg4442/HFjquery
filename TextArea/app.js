/**
 * Created by onaydin on 10/27/2015.
 */
var Counter = React.createClass({
	name: "Counter",
	propTypes: {
		count: React.PropTypes.number.isRequired,
	},
	shouldComponentUpdate(nextProps, nextState_ignore) {
		return nextProps. count !== this. props. count;
	},
	render: function () {
		console.log(this.name + "::render()");
		return React.DOM.span(null, this.props.count);


	}
})
var TextAreaCounter = React.createClass({
	name: "TextAreaCounter",
	getInitialState: function(){
		return {text: ""}
	},
	_textChange: function(ev){
		this.setState({text:ev.target.value})
	},
	render: function () {
		console.log(this.name + "::render()");
		var counter = null;
		if (this.state.text.length > 0){
			counter = React.DOM.h3(null,
				React.createElement(Counter, {
					count: this.state.text.length
				})
			)
		}

		return React.DOM.div(null, React.DOM.textarea({
			value: this.state.text,
				onChange: this._textChange
			}),
			counter
		)
	}
})

React.render(React.createElement(TextAreaCounter,{text: "TXT"}), document.getElementById("example"));