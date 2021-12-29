import React, { Component } from "react";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

import NewPostModal from "./NewPostModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

import "../css/util.css";

class PaginatedPostList extends Component {
  constructor(props) {
    super(props);

    this.pageSize = 20;
    this.state = {
      currentPage: 0,
    };
  }

  handleClick(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index,
    });
  }

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
    const { currentPage } = this.state; //This means `const currentPage = this.state.currentPage;`
    const posts = this.props.posts;
    const pagesCount = Math.ceil(this.props.posts.length / this.pageSize);
    
    return (
      <React.Fragment>
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
              posts
                .slice(
                  currentPage * this.pageSize,
                  (currentPage + 1) * this.pageSize
                )
                .map((post) => (
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
                    <td align="center" className="borderless-cell">
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

        <div className="pagination-wrapper">
          <Pagination aria-label="Pagination with Reactstrap">
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={(e) => this.handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
            </PaginationItem>

            {[...Array(pagesCount)].map((page, i) => (
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink
                  onClick={(e) => this.handleClick(e, i)}
                  href="#"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))} 

            <PaginationItem disabled={currentPage >= pagesCount - 1}>
              <PaginationLink
                onClick={(e) => this.handleClick(e, currentPage + 1)}
                next
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </div>
      </React.Fragment>
    );
  }
}

export default PaginatedPostList;
