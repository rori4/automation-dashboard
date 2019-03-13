import React, { Component, Fragment } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Media,
  Button,
  Alert,
  CardFooter
} from "reactstrap";
import Iframe from "react-iframe";
import numeral from "numeral";
import bookValidator from "../../utils/validations/bookValidator";
import AmazonService from "../../services/amazon-service";
import BookService from "../../services/course-service";
import { handleError, handleInfo } from "../../utils/customToast";
import { UserConsumer } from "../../context/user-context";

class Book extends Component {
  static amazonService = new AmazonService();
  static bookService = new BookService();
  constructor(props) {
    super(props);
    this.initialState = {
      amazonUrl: "",
      title: "",
      authorName: "",
      synopsis: "",
      authorBio: "",
      keywords: "",
      bookCover: "",
      salesRank: "",
      reviewsIframe: "",
      authorEmail: this.props.userEmail,
      amazonFetched: false,
      errors: {}
    };
    this.state = this.initialState;
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(this.state);
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();
      let errors = bookValidator(this.state)
      this.setState(
        {
          errors
        },
        async () => {
          if (Object.keys(errors).length === 0) {
            let result = await Book.bookService.save(this.state);
            handleInfo(result.message);
            this.props.history.push('/books/list');
          }
        }
      );
    } catch (error) {
      handleError(error.message);
    }
  };

  handleReset = () => {
    this.setState(this.initialState);
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      if (id) {
        let result = await Book.bookService.get({id});
        result.book.amazonFetched = true;
        this.setState(result.book);
      }
    } catch (error) {
      handleError(error.message);
    }
  }

  retrieveAmazonData = async () => {
    const { amazonUrl } = this.state;
    try {
      let result = await Book.amazonService.info({
        amazonUrl
      });
      if (result.success) {
        let book = result.bookInfo;
        book.amazonFetched = true;
        this.setState(book);
      } else {
        handleInfo(result.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  render() {
    const {
      amazonUrl,
      title,
      authorName,
      synopsis,
      authorBio,
      keywords,
      bookCover,
      amazonFetched,
      authorEmail,
      salesRank,
      reviewsIframe,
      errors
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Kindle Book</strong>
              </CardHeader>
              <Form
                onSubmit={this.handleSubmit}
                onReset={this.handleReset}
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="amazonUrl">Amazon Link</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.amazonUrl ? "is-invalid" : ""}
                        type="text"
                        id="amazonUrl"
                        name="amazonUrl"
                        placeholder="Amazon URL..."
                        autoComplete="amazon-url"
                        value={amazonUrl}
                        onBlur={this.retrieveAmazonData}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.amazonUrl}</div>
                      <FormText color="muted">
                        Place your Amazon Kindle book link here (should have
                        dp/XXXXXXXXXX/ inside which is the ASIN)
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="title">Title</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.title ? "is-invalid" : ""}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title..."
                        autoComplete="title"
                        value={title}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.title}</div>
                      <FormText className="help-block">
                        Please enter/edit your book title
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="authorName">Author Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.authorName ? "is-invalid" : ""}
                        type="text"
                        id="authorName"
                        name="authorName"
                        placeholder="Author Name..."
                        autoComplete="author-name"
                        value={authorName}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.authorName}</div>
                      <FormText className="help-block">
                        Please enter/edit your author name
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="synopsis">Synopsis</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.synopsis ? "is-invalid" : ""}
                        type="textarea"
                        name="synopsis"
                        id="synopsis"
                        rows="9"
                        placeholder="Synopsis..."
                        value={synopsis}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.synopsis}</div>
                      <FormText className="help-block">
                        Please enter/edit your book synopsis
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="authorBio">Author Biography</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.authorBio ? "is-invalid" : ""}
                        type="textarea"
                        name="authorBio"
                        id="authorBio"
                        rows="9"
                        placeholder="Author biography..."
                        value={authorBio}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.authorBio}</div>
                      <FormText className="help-block">
                        Please enter/edit your author biography
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="keywords">Keywords</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.keywords ? "is-invalid" : ""}
                        type="text"
                        id="keywords"
                        name="keywords"
                        placeholder="Keywords..."
                        autoComplete="keywords"
                        value={keywords}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.keywords}</div>
                      <FormText className="help-block">
                        Please add your book keywords separated by comma
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="authorEmail">Author Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.authorEmail ? "is-invalid" : ""}
                        type="email"
                        id="authorEmail"
                        name="authorEmail"
                        placeholder="Author Email..."
                        autoComplete="email"
                        value={authorEmail}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.authorEmail}</div>
                      <FormText className="help-block">
                        Please enter/edit your email
                      </FormText>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button
                    type="submit"
                    className="mr-3"
                    size="sm"
                    color="primary"
                  >
                    <i className="fa fa-dot-circle-o" /> Submit
                  </Button>
                  <Button
                    type="reset"
                    className="mr-3"
                    size="sm"
                    color="danger"
                  >
                    <i className="fa fa-ban" /> Reset
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
          <Col>
            <Row>
              <Col xs="12" md="12" lg="6">
                <Card color="warning">
                  <CardBody>
                    <div className="h4 m-0">
                      {amazonFetched
                        ? salesRank === "FREE"
                          ? salesRank
                          : "#" + numeral(salesRank).format("0,0")
                        : "-"}
                    </div>
                    <div>Best Sellers Rank</div>
                  </CardBody>
                </Card>
                <Card color="danger">
                  <CardBody>
                    <div className="h4 m-0">{amazonFetched ? title : "-"}</div>
                    <div>Book Title</div>
                  </CardBody>
                </Card>
                <Card color="info">
                  <CardBody>
                    <div className="h4 m-0">
                      {amazonFetched ? authorName : "-"}
                    </div>
                    <div>Author Name</div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="12" lg="6">
                <Card>
                  <CardBody>
                    <Media
                      className="col-12"
                      src={
                        amazonFetched ? bookCover : "../assets/img/no-image.png"
                      }
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" className="h-100">
                <Card>
                  <CardBody>
                    {amazonFetched ? (
                      <Iframe
                        url={reviewsIframe}
                        position="relative"
                        width="100%"
                        id="myId"
                        height="100vh"
                        allowFullScreen
                      />
                    ) : (
                      <Alert color="primary" className="text-center">
                        Please provide an Amazon URL so we can fetch book
                        reviews
                      </Alert>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
const BookWithContext = props => {
  return (
    <UserConsumer>
      {user => <Book {...props} userEmail={user.email} />}
    </UserConsumer>
  );
};
export default BookWithContext;
