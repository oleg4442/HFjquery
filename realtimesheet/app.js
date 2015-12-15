/**
 * Created by onaydin on 11/16/2015.
 */
var headers = [
	"Date" , "Project" , "Deliverable" , "PDP/BSD No" , "Description of task", "Hours"
];
var data = [
	["2015-10-01" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Web-services bugs fixing" ,"8"],
	["2015-10-02" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Web-services bugs fixing" ,"8"],
	["2015-10-05" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Moving Sail source" ,"8"],
	["2015-10-06" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Ractjs learning. moving sail source. It's ready for tests" ,"8"],
	["2015-10-07" , "ESF Development" ,	"ESF Development" , "ESF Development" , "learning Reactjs, connecting IBM MQ to SAIL" ,"8"],
	["2015-10-08" , "ESF Development" ,	"ESF Development" , "ESF Development" , "set up GTH 3.0. Ready to local deploy" ,"8"],
	["2015-10-09" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Testing SAIL before demo" ,"8"],
	["2015-10-12" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Setting up gth sandbox 3.0. Prepairing test data" ,"8"],
	["2015-10-13" , "ESF Development" ,	"ESF Development" , "ESF Development" , "deploying ws to prod","8" ],
	["2015-10-14" , "ESF Development" ,	"ESF Development" , "ESF Development" , "deploying ws to dev5, prepairing roles, FG, FI, for web-services" ,"8"],
	["2015-10-15" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Creating application in dev5","8" ],
	["2015-10-16" , "ESF Development" ,	"ESF Development" , "ESF Development" , "UI development using Reactjs" ,"8"],
	["2015-10-19" , "ESF Development" ,	"ESF Development" , "ESF Development" , "UI development using Reactjs" ,"8"],
	["2015-10-20" , "ESF Development" ,	"ESF Development" , "ESF Development" , "UI development using Reactjs","8" ],
	["2015-10-21" , "ESF Development" ,	"ESF Development" , "ESF Development" , "UI development using Reactjs" ,"8"],
	["2015-10-22" , "ESF Development" ,	"ESF Development" , "ESF Development" , "UI development using Reactjs" ,"8"],
	["2015-10-23" , "ESF Development" ,	"ESF Development" , "ESF Development" , "UI development using Reactjs" ,"8"],
	["2015-10-26" , "ESF Development" ,	"ESF Development" , "ESF Development" , "UI development using Reactjs" ,"8"],
	["2015-10-27" , "ESF Development" ,	"ESF Development" , "ESF Development" , "UI development using Reactjs" ,"8"],
	["2015-10-28" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Web-services bugs fixing","8" ],
	["2015-10-29" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Web-services bugs fixing" ,"8"],
	["2015-10-30" , "ESF Development" ,	"ESF Development" , "ESF Development" , "UI development using Reactjs" ,"8"],
	["2015-10-31" , "ESF Development" ,	"ESF Development" , "ESF Development" , "Web-services bugs fixing. Dev5 Dev1 deploy" ,"8"]
];

var Excel = React. createClass({
	getInitialState: function(){
		return ({data: this.props.initialData,
			sortby: null,
			descending: false,
			edit: null,
			search: false})
	},

	displayName: "Excel",

	propTypes: {
		headers: React.PropTypes.arrayOf(
			React.PropTypes.string
		),
		initialData: React.PropTypes.arrayOf(
			React.PropTypes.arrayOf(
				React.PropTypes.string
			)
		),
	},

	_preSearchData: null,

	_log: [],

	_logSetState: function (newState) {
		// remember the old state in a clone
		if (this. _log. length === 0) {
			this. _log. push(JSON. parse(JSON. stringify(this. state)));
			console.warn("IS PUT FIRST");
		}
		this. _log. push(JSON. parse(JSON. stringify(newState)));
		console.warn("PUSH in array: " + this._log.length);
		this. setState(newState);
	},

	componentDidMount: function() {
		document. onkeydown = function(e) {
			if (e. altKey && e. shiftKey && e. which === 82) { // ALT+SHIFT+R(replay)
				this. _replay();
			}
			if (e. altKey && e. which === 90) { // ALT+Z(undo)
				this. _undo();
			}

			if (e. altKey && e. which === 121) { // ALT+R(redo)
				this. _redo();
			}
		}. bind(this);
	},

	_replay: function() {
		if (this. _log. length === 0) {
			console. warn('No state to replay yet' );
			return;
		}
		var idx = - 1;
		var interval = setInterval(function() {
			idx++;
			if (idx === this. _log. length - 1) { // the end
				clearInterval(interval);
			}
			this. setState(this. _log[idx]);
		}. bind(this), 1000);
	},

	_undo:function(){
		if (this. _log. length === 0) {
			console. warn(" It's initial state ");
			return;
		}
		this.setState(this._log[this._log.length-2]);
		this._log.splice(this._log.length-1);
		console.warn(this._log.length);
	},

	_sort: function(e){
		var column = e.target.cellIndex;
		var data = this.state.data.slice();
		var descending = this.state.sortby === column && !this.state.descending
		data.sort(function(a,b){
			return descending
				? a[column] < b[column]
				: a[column] > b[column];
		});
		this._logSetState({
			data:data,
			sortby: column,
			descending: descending
		});
	},
	_showEditor: function(e){
		this._logSetState({edit: {
			row: parseInt(e.target.dataset.row,10),
			cell: e.target.cellIndex
		}})
	},

	_save: function(e){
		e.preventDefault();
		// ... do the save
		var input = e.target.firstChild;
		var data = this.state.data.slice();
		data[this.state.edit.row][this.state.edit.cell] = input.value;
		this._logSetState({
			edit: null,
			data:data
		})
	},

	_toggleSearch: function() {
		if (this. state. search) {
			this. _logSetState({
				data: this. _preSearchData,
				search: false
			});
			this. _preSearchData = null;
		} else {
			this. _preSearchData = this. state. data;
			this. _logSetState({
				search: true
			});
		}
	},

	_search: function(e) {
		var needle = e. target. value. toLowerCase();
		if (! needle) {
			this. _logSetState({data: this. _preSearchData});
			return;
		}
		var idx = e. target. dataset. idx;
		var searchdata = this. _preSearchData. filter(function (row) {
			return row[idx]. toString(). toLowerCase(). indexOf(needle) > - 1;
		});
		this. _logSetState({data: searchdata});
	},

	_renderToolbar: function() {
		return React. DOM. div({className: 'toolbar' },
			React. DOM. button({
				onClick: this. _toggleSearch
			}, 'Search' ),
			React. DOM. a({
				onClick: this. _download. bind(this, 'json' ),
				href: 'data.json'
			}, 'Export JSON ' ),
			React. DOM. a({
				onClick: this. _download. bind(this, 'csv' ),
				href: 'data.csv'
			}, 'Export CSV ' )
		);
	},

	_download: function (format, ev) {
		var contents = format === 'json'
			? JSON. stringify(this. state. data)
			: this. state. data. reduce(function(result, row) {
			return result
				+ row. reduce(function(rowresult, cell, idx) {
					return rowresult
						+ '"'
						+ cell. replace(/"/g, '""' )
						+ '"'
						+ (idx < row. length - 1 ? ',' : '' );
				}, '' )
				+ "\n" ;
		}, '' );
		var URL = window. URL || window. webkitURL;
		var blob = new Blob([contents], {type: 'text/' + format});
		ev. target. href = URL. createObjectURL(blob);
		ev. target. download = 'data.' + format;
	},

	_renderSearch(){
		if(!this.state.search){
			return null;
		}
		return(
			React.DOM.tr({onChange: this._search},
				this.props.headers.map(function(_ignore,idx){
					return React.DOM.td({key: idx},
						React.DOM.input({
							type: 'text',
							'data-idx': idx,
						})
					);
				})
			)
		);
	},
	_renderTable: function() {

		var self = this;
		var edit = self.state.edit;
		return (
			React.DOM.table(null,
				React.DOM.thead({onClick: this._sort},
					React.DOM.tr(null,
						this.props.headers.map(function (title, idx) {
							if (this.state.sortby === idx) {
								title += this.state.descending ? ' \u2191' : ' \u2193'
							}
							return React.DOM.th({key: idx}, title);
						}.bind(this))
					)
				),
				React.DOM.tbody({onDoubleClick: self._showEditor},
					this._renderSearch(),
					self.state.data.map(function (row, rowidx) {
						return (
							React.DOM.tr({key: rowidx},
								row.map(function (cell, idx) {
									var content = cell;

									if (edit && edit.row === rowidx && edit.cell === idx) {
										content = React.DOM.form({onSubmit: self._save},
											React.DOM.input({
												type: 'text',
												defaultValue: content
											})
										);
									}

									return React.DOM.td({
										key: idx,
										'data-row': rowidx
									}, content);
								})
							)
						);
					})
				)
			)
		)
	},

	render: function() {
		return (
			React.DOM.div(null,
				this._renderToolbar(),
				this._renderTable()
			)
		);
	}
});

React. render(
	React. createElement(Excel, {
		headers: headers,
		initialData: data
	}),
	document. getElementById("example")
);