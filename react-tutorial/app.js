/**
 * Created by Oleg on 17.09.2015.
 */
var Card = React.createClass({
    getInitialState: function(){
        return{
            name: faker.name.findName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar()
        }

    },
    render: function () {
        return (
        <div>
            <img src = {this.state.avatar}/>
            <h1>{this.state.name}</h1>
            <h2>{this.state.email}</h2>
        </div>
        )
    }
})

var App = React.createClass({
    render: function(){
        return(
            <div>
                <Card/>
                <Card/>
            </div>
        )
    }
})
React.render(<App/>,document.getElementById("app"));