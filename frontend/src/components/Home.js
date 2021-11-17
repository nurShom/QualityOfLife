import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import PostList from "./PostList";
import PaginatedPostList from "./PaginatedPostList";
import NewPostModal from "./NewPostModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.resetState();
  }

  getPosts = () => {
    axios.get(API_URL).then(response => {
        this.setState({ posts: response.data })
    });
  };

  resetState = () => {
    this.getPosts();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <PaginatedPostList
              posts={this.state.posts}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewPostModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;