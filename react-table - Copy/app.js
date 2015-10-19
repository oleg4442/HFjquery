/**
 * Created by Oleg on 17.09.2015.
 */
var Row = React.createClass({
    getInitialState: function(){
        return {
            code: faker.hacker.abbreviation(),
            desc: faker.hacker.phrase()
            //name: faker.name.findName(),
            //email: faker.internet.email(),
            //avatar: faker.image.avatar()
        }
    },
    render: function () {
        return (
            <div>
                <tr>
                    <td>{this.state.code}</td>
                    <td>{this.state.code}</td>
                    <td>{this.state.desc}</td>
                </tr>
            </div>
        )
    }
})
var App = React.createClass({
    render: function () {
        return (
            <table>
                <th>Code</th>
                <th>Name</th>
                <th>Description</th>
               <Row/>
                <Row/>
                <Row/>
                <Row/>
                <Row/>
                <Row/>
                <Row/>
            </table>
        )
    }
})

React.render(<App/>, document.getElementById("fgtable"));