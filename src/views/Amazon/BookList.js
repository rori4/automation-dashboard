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
import SweetAlert from "sweetalert-react";
import BookService from "../../services/book-service";
import { handleError, handleInfo } from "./../../utils/customToast";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

const brandDanger = getStyle("--danger");

class BookList extends Component {
  static bookService = new BookService();
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      search: "",
      showDelete: false,
      deleteItemId: "",
      deleteItemTitle: "",
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

  confirmDeleteDialog = async () => {
    const { deleteItemId } = this.state;
    try {
      let result = await BookList.bookService.delete({ id: deleteItemId });
      result.success ? handleInfo(result.message) : handleError(result.message);
    } catch (error) {
      handleError(error.message);
    }
    this.hideDialog();
    this.retreiveBooks();
  };

  cancelDeleteDialog = () => {
    this.hideDialog();
  };

  hideDialog = () => {
    this.setState({ showDelete: false, deleteItemId: "", deleteItemTitle: "" });
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
    const { isLoading, books, showDelete, deleteItemTitle } = this.state;
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
                          <tr key={key}>
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
                              {item.keywords.split(",").map((keyword, id) => (
                                <Badge color="secondary m-1">
                                  {keyword.trim()}
                                </Badge>
                              ))}
                            </td>
                            <td className="text-center">{item.authorEmail}</td>
                            <td>
                              <a
                                class="btn btn-warning mr-2 mb-2"
                                href={"/books/stats/" + item._id}
                              >
                                <i class="fa fa-area-chart" />
                              </a>
                              <a
                                class="btn btn-warning mr-2 mb-2"
                                href={"/books/promote/" + item._id}
                              >
                                <i class="fa fa-flash" />
                              </a>
                              <a
                                class="btn btn-success mr-2 mb-2"
                                href={"/books/edit/" + item._id}
                              >
                                <i class="fa fa-pencil" />
                              </a>
                              <a
                                class="btn btn-danger mr-2 mb-2"
                                onClick={() =>
                                  this.setState({
                                    showDelete: true,
                                    deleteItemId: item._id,
                                    deleteItemTitle: item.title
                                  })
                                }
                                href="#"
                              >
                                <i class="fa fa-trash" />
                                <SweetAlert
                                  show={showDelete}
                                  type="warning"
                                  showCancelButton={true}
                                  confirmButtonText="Delete"
                                  confirmButtonColor={brandDanger}
                                  title={"Delete " + deleteItemTitle + "?"}
                                  text="Are you sure you want to delete this item?"
                                  onConfirm={this.confirmDeleteDialog}
                                  onCancel={this.cancelDeleteDialog}
                                />
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
