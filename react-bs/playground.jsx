/** @jsx React.DOM */

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

var Test = React.createClass({
    render: function() {
        return <ModalTrigger
            trigger={<Btn><Icon fa="gear"/> Modal</Btn>}
            header={<h3>A Modal</h3>}
            footer={<Btn data-dismiss="modal"><Icon fa="check"/> OK</Btn>}
            body={<input type="text"/>
                   }
            /> }})

React.renderComponent(<Test/>, document.getElementById('test'))

//class ModalExample extends React.Component {
//
//    render(){
//        let closeModal = () => this.setState({ open: false })
//
//        let saveAndClose = () => {
//            api.saveData()
//                .then(() => this.setState({ open: false }))
//        }
//
//        return (
//            <div>
//                <button type='button'>Launch modal</button>
//
//                <Modal
//                    show={this.state.open}
//                    onHide={closeModal}
//                    aria-labelledby="ModalHeader"
//                    >
//                    <Modal.Header closeButton>
//                        <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
//                    </Modal.Header>
//                    <Modal.Body>
//                        <p>Some Content here</p>
//                    </Modal.Body>
//                    <Modal.Footer>
//                        // If you don't have anything fancy to do you can use
//                        // the convenient `Dismiss` component, it will
//                        // trigger `onHide` when clicked
//                        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
//
//                        // Or you can create your own dismiss buttons
//                        <button className='btn btn-primary' onClick={saveAndClose}>
//                            Save
//                        </button>
//                    </Modal.Footer>
//                </Modal>
//            </div>
//        )
//    }
//}
//
//React.render(<ModalExample />, mountNode);

//var Container = React.createClass({
//    getInitialState(){
//        return { showModal: false };
//    },
//    close(){
//        this.setState({ showModal: false });
//    },
//    open(){
//        this.setState({ showModal: true });
//    },
//    render() {
//        return (
//            <div className="jumbotron">
//                <h3>
//                    This is the parent container.
//                </h3>
//                <p>
//                    <a className="btn btn-primary"
//                       href="#" role="button"
//                       onClick={this.open}>Show modal
//                    </a>
//                </p>
//                <Modal show={this.state.showModal} onHide={this.close}/>
//            </div>
//        );
//    }
//});
//
//var Modal = React.createClass({
//    render() {
//        return <div
//            className={classNames('alert alert-success alert-dismissible', { hidden: !this.props.show}) } role="alert">
//            <button type="button"
//                    className="close" onClick={this.props.onHide}>
//                <span>&times;</span>
//            </button>
//            <strong>Well done!</strong> Click the button on the right to dismiss.
//        </div>;
//    }
//});
//
//React.render(<Container />, mountNode);

//const ControlledModalExample = React.createClass({
//
//    getInitialState(){
//        return { showModal: false };
//    },
//
//    close(){
//        console.log("close");
//        this.setState({ showModal: false });
//    },
//
//    open(){
//        console.log("open");
//        this.setState({ showModal: true });
//    },
//
//    render() {
//        console.log("render... showModal is - " + this.state.showModal);
//        return (
//            <div>
//                <Button onClick={this.open}>
//                    Launch modal
//                </Button>
//
//                <Modal show={this.state.showModal} onHide={this.close}>
//                    <Modal.Header closeButton>
//                        <Modal.Title>Modal heading</Modal.Title>
//                    </Modal.Header>
//                    <Modal.Body>
//                        <div>Modal content here </div>
//                    </Modal.Body>
//                    <Modal.Footer>
//                        <Button onClick={this.close}>Close</Button>
//                    </Modal.Footer>
//                </Modal>
//            </div>
//        );
//    }
//});
//
//React.render(< ControlledModalExample />, mountNode);

//const modalInstance = (
//    <div className="static-modal">
//        <Modal.Dialog>
//            <Modal.Header>
//                <Modal.Title>Modal title</Modal.Title>
//            </Modal.Header>
//
//            <Modal.Body>
//                One fine body...
//                <p><input type="input"/></p>
//                <p><input type="input"/></p>
//            </Modal.Body>
//
//            <Modal.Footer>
//                <Button className="btn btn-default" data-dismiss="modal">Close</Button>
//                <Button bsStyle="primary">Save changes</Button>
//            </Modal.Footer>
//
//        </Modal.Dialog>
//    </div>
//);
//
//React.render(modalInstance, mountNode);