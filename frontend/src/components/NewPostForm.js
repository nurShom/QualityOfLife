import React from "react";
import { Button, Form, FormGroup, Input, Label, Textarea } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

class NewPostForm extends React.Component {
  state = {
    id: 0,
    title: "",
    bodytext: "",
    author: ""
  };

  /* The componentDidMount function runs immediately after the component is mounted. 
   * We can obtain the props set by the parent component (this.props) here, and set 
   * the state with them (if this.props.post exist, for the editing scenario.)
   */
  componentDidMount() {
    if (this.props.post) {
      const { id, title, bodytext, author } = this.props.post;
      // console.log(this.props.post);
      this.setState({ id, title, bodytext, author });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPost = e => {
    e.preventDefault();
    // axios.post(url, data)
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState(); // Refreshes data from API with a GET request
      this.props.toggle(); // toggle() passed from parent toggles the value of parent's (i.e. Modal) state, thus activating or deactivating it.
    });
  };

  editPost = e => {
    e.preventDefault();
    // axios.put(url, data)
    axios.put(API_URL + this.state.id, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.post ? this.editPost : this.createPost}>
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input
            type="text"
            name="title"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.title)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="bodytext">Text:</Label>
          <Input
            type="textarea"
            name="bodytext"
            rows="5"
            cols="50"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.bodytext)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author:</Label>
          <Input
            type="text"
            name="author"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.author)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewPostForm;