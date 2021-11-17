import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import NewPostForm from "./NewPostForm";

class NewPostModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previousState => ({
      modal: !previousState.modal
    }));
  };

  render() {
    const create = this.props.create; // 'True' passed from parent if in create mode.

    var title = "Edit Post";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Create New Post";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );
    }

    //Modal is a pop-up dialogue box that appears on top of current window.
    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} > 
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewPostForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              post={this.props.post}
              create={this.props.create}
              key={this.props.post ? this.props.post.id : 0}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewPostModal;