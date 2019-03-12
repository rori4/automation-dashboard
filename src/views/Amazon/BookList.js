import React, { Component, lazy, Suspense, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Badge,
  Row,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import BookService from "./../../services/book-service";
import { handleError, handleInfo } from "./../../utils/customToast";

class BookList extends Component {
  static bookService = new BookService();
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      search: "",
      isLoading: true
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  handleChange = async ({ target }) => {
    this.setState({ [target.name]: target.value });
    this.retreiveBooks();
    console.log(this.state);
  };

  componentDidMount() {
    this.retreiveBooks();
  }

  async retreiveBooks() {
    const { search } = this.state;
    try {
      let result = await BookList.bookService.list({ search });
      if (result.success) {
        this.setState({
          books: result.data,
          isLoading: false
        });
      } else {
        handleInfo(result.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  }

  render() {
    const { isLoading, books } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  size="16"
                  type="text"
                  name="search"
                  onChange={this.handleChange}
                  placeholder="What are you looking for?"
                />
              </InputGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>My Kindle Books</CardHeader>
              <CardBody>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-sm-table"
                >
                  <thead>
                    <tr>
                      <th className="text-center">Image</th>
                      <th className="text-center">Title</th>
                      <th>Keywords</th>
                      <th className="text-center">Author Email</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      this.loading
                    ) : (
                      <Fragment>
                        {books.map((item, key) => (
                          <tr>
                            <td className="text-center">
                              <div className="book-list">
                                <img
                                  src={item.bookCover}
                                  className="img-book"
                                />
                              </div>
                            </td>
                            <td>
                              <div>{item.title}</div>
                              <div className="small text-muted">
                                <span>New</span> | Registered: Jan 1, 2015
                              </div>
                            </td>
                            <td>
                              <Badge color="secondary">{item.keywords}</Badge>
                            </td>
                            <td className="text-center">{item.authorEmail}</td>
                            <td>
                              <a class="btn btn-success" href="#">
                                <i class="fa fa-search-plus" />
                              </a>
                              <a class="btn btn-success" href="#">
                                <i class="fa fa-search-plus" />
                              </a>
                              <a class="btn btn-success" href="#">
                                <i class="fa fa-search-plus" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BookList;
