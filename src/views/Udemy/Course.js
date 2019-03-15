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
  CardFooter
} from "reactstrap";
import { handleError, handleInfo } from "../../utils/customToast";
import { UserConsumer } from "../../context/user-context";
import courseValidator from '../../utils/validations/giveawayValidator';
import UdemyService from "../../services/udemy-service";
import CourseService from './../../services/course-service';

class Course extends Component {
  static udemyService = new UdemyService();
  static courseService = new CourseService();
  constructor(props) {
    super(props);
    this.initialState = {
      url: "",
      title: "",
      price: "",
      instructorName: "",
      summary: "",
      keywords: "",
      cover: "",
      email: props.userEmail,
      udemyFetched: false,
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
      let errors = courseValidator(this.state);
      this.setState(
        {
          errors
        },
        async () => {
          if (Object.keys(errors).length === 0) {
            let result = await Course.courseService.save(this.state);
            handleInfo(result.message);
            this.props.history.push('/courses/list');
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
  
  retrieveUdemyData = async () => {
    const { url } = this.state;
    try {
      let result = await Course.udemyService.info({ url });
      if (result.success) {
        let course = result.course;
        course.udemyFetched = true;
        this.setState(course);
        this.setState({errors: courseValidator(this.state)});
      } else {
        handleInfo(result.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      if (id) {
        let result = await Course.courseService.get({id});
        result.course.udemyFetched = true;
        this.setState(result.course);
      }
    } catch (error) {
      handleError(error.message);
    }
  }

  render() {
    const {
      url,
      title,
      instructorName,
      keywords,
      cover,
      price,
      udemyFetched,
      email,
      errors,
      summary
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6 }}>
            <Card>
              <CardHeader>
                <strong>Add Udemy Course</strong>
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
                      <Label htmlFor="url">Udemy Link</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.url ? "is-invalid" : ""}
                        type="text"
                        id="url"
                        name="url"
                        placeholder="Udemy URL..."
                        autoComplete="udemy-url"
                        value={url}
                        onBlur={this.retrieveUdemyData}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.url}</div>
                      <FormText color="muted">
                        Place your Udemy course link here
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
                        Please enter/edit your course title
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="summary">Summary</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.summary ? "is-invalid" : ""}
                        type="textarea"
                        name="summary"
                        id="summary"
                        rows="9"
                        placeholder="Summary..."
                        value={summary}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.summary}</div>
                      <FormText className="help-block">
                        Please enter/edit your course summary
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="instructorName">Instructor Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.instructorName ? "is-invalid" : ""}
                        type="text"
                        id="instructorName"
                        name="instructorName"
                        placeholder="Instructor Name..."
                        autoComplete="instructor-name"
                        value={instructorName}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">
                        {errors.instructorName}
                      </div>
                      <FormText className="help-block">
                        Please enter/edit your instructor name
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
                        Please add your course keywords separated by comma
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email">Instructor Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.email ? "is-invalid" : ""}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Instructor Email..."
                        autoComplete="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">
                        {errors.email}
                      </div>
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
                    <div className="h4 m-0">{udemyFetched ? price : "-"}</div>
                    <div>Course Price</div>
                  </CardBody>
                </Card>
                <Card color="danger">
                  <CardBody>
                    <div className="h4 m-0">{udemyFetched ? title : "-"}</div>
                    <div>Course Title</div>
                  </CardBody>
                </Card>
                <Card color="info">
                  <CardBody>
                    <div className="h4 m-0">
                      {udemyFetched ? instructorName : "-"}
                    </div>
                    <div>Instructor Name</div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="12" lg="6">
                <Card>
                  <CardBody>
                    <Media
                      className="col-12"
                      src={
                        udemyFetched
                          ? cover
                          : "../assets/img/no-image.png"
                      }
                    />
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
const CourseWithContext = props => {
  return (
    <UserConsumer>
      {user => <Course {...props} userEmail={user.email} />}
    </UserConsumer>
  );
};
export default CourseWithContext;
