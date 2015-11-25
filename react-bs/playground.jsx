var Alert = ReactBootstrap.Alert;
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;

//const alertInstance = (
//    React.createElement(Alert, {bsStyle: "success"},
//      React.createElement("strong",null,"It Works!"), "Good job, you are ready to start the tutorial."
//    )
//);

var mountNode = document.getElementById("demo");

const modalInstance = (
    <div className="static-modal">
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                One fine body...
            </Modal.Body>

            <Modal.Footer>
                <Button className="btn btn-default" data-dismiss="modal">Close</Button>
                <Button bsStyle="primary">Save changes</Button>
            </Modal.Footer>

        </Modal.Dialog>
    </div>
);

React.render(modalInstance, mountNode);