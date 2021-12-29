import React, { Component } from "react";
import { Table } from "reactstrap";

import NewPostModal from "./NewPostModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

import "../css/util.css"

class PostList extends Component {
  truncText = (text) => {
    if (text.length > 60) {
      return text.substring(0, 58) + "..";
    }
    return text;
  };

  formatDate = (daystr) => {
    let dayvar = new Date(daystr);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return dayvar.toLocaleDateString("en-US", options);
  };

  render() {
    const posts = this.props.posts;
    return (
      <Table hover responsive striped bordered>
        <thead className="table-secondary">
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Author</th>
            <th>Posted</th>
            <th className="borderless-cell"></th>
            <th className="borderless-cell"></th>
          </tr>
        </thead>
        <tbody className="table-light">
          {!posts || posts.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Oops, no post here yet</b>
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id}>
                <td>{this.truncText(post.title)}</td>
                <td>{this.truncText(post.bodytext)}</td>
                <td>{this.truncText(post.author)}</td>
                <td>{this.formatDate(post.created_at)}</td>
                <td align="center" className="borderless-cell">
                  <NewPostModal
                    create={false}
                    post={post}
                    resetState={this.props.resetState}
                    key={post.id}
                  />
                </td>
                <td align="center" className="borderless-cell" >
                  <ConfirmRemovalModal
                    id={post.id}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default PostList;
