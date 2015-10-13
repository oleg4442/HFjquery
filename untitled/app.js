// products will be presented by reactbsTable
var Box = React.createClass({
	getInitialState: function(){
		return {data: []};
	},
	componentDidMount: function(){
		$.ajax({
			url: "fg.xml",
			cache: false,
			dataType: "xml",
			success:  function(xml){
				$('#feed_group').empty();
				$(xml).find("row").each(function(){
					var info = '<li>FG Code: ' + $(this).attr("GROUP_CODE") + ',  FG Name: '
						+ $(this).attr("GROUP_NAME") + ',  FG Description: ' + $(this).attr("GROUP_DESC") + '</li>';
					$('#feed_group').append(info);
				});
			}
		});
	},

	render: function () {
		return (
			<div className = "box">
				<h1>Feed Groups</h1>
				<List data = {this.state.data}></List>
			</div>
		)
	}
})

var List = React.createClass({
	render: function () {
		return (

		)
	}
})

var Table = React.createClass({
	render: function () {
		return (
			<BootstrapTable data={products}>
				<TableHeaderColumn dataField="id" isKey={true}>Product ID</TableHeaderColumn>
				<TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
				<TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
			</BootstrapTable>
		)
	}
})

var products = [
	{
		id: 1,
		name: "Item name 1",
		price: 100
	},{
		id: 2,
		name: "Item name 2",
		price: 100
	},{
		id: 3,
		name: "Item name 3",
		price: 110
	},{
		id: 4,
		name: "Item name 4",
		price: 100
	},{
		id: 5,
		name: "Item name 5",
		price: 100
	},{
		id: 6,
		name: "Item name 6",
		price: 100
	}
];
// It's a data format example.
function priceFormatter(cell, row){
	return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

React.render(
<Table/>,
	document.body
);