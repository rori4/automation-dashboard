import React, { Component, lazy, Suspense } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import DashboardSearch from "./../components/Searches/DashboardSearch";
import BookService from './../services/book-service';
import CourseService from './../services/course-service';
import GiveawayService from './../services/giveaway-service';

class Dashboard extends Component {
  static bookService = new BookService();
  static courseService = new CourseService();
  static giveawayService = new GiveawayService();
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      books: [],
      giveaways: [],
      courses: []
    };
  }

  handleChange = async ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    const { isLoading, search } = this.state;
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
                  placeholder="What are you looking for?"
                  onChange={this.handleChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="info">Search</Button>
                </InputGroupAddon>
              </InputGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="6">
            <DashboardSearch
              service = {Dashboard.bookService}
              search={this.state.search}
              headerText="Latest Books Added"
              isLoading={isLoading}
            />
          </Col>
          <Col xs="12" sm="6" lg="6">
            <DashboardSearch
              service={Dashboard.courseService}
              search={this.state.search}
              headerText="Latest Courses Added"
              isLoading={isLoading}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DashboardSearch
              service={Dashboard.giveawayService}
              search={this.state.search}
              headerText="Latest Giveaways Added"
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
