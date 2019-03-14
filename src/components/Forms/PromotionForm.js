import React, { Component, Fragment } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  Row,
  Button,
  CardFooter
} from "reactstrap";
import { handleError, handleInfo } from "../../utils/customToast";
import { decamelize } from "./../../utils/stringUtil";
import requiredValidation from "./../../utils/validations/requiredValidation";

class PromotionForm extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      startDate: "",
      endDate: "",
      websites: "",
      parentId: props.match.params.parentId,
      errors: {}
    };
    this.state = this.initialState;
  }

  handleChange = ({ target }) => {
    if (target.options) {
      var options = target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      this.setState({ [target.name]: value });
    } else {
      target.files
        ? this.setState({
            [target.name]: target.files[0]
          })
        : this.setState({ [target.name]: target.value });
    }

    console.log(this.state);
  };

  handleSubmit = async e => {
    const { service, urlAfterSubmit } = this.props;
    try {
      e.preventDefault();
      let errors = requiredValidation(this.state);
      this.setState(
        {
          errors
        },
        async () => {
          if (Object.keys(errors).length === 0) {
            let result = await service.save(this.state);
            handleInfo(result.message);
            this.props.history.push(urlAfterSubmit);
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
    const { service } = this.props;
    try {
      const id = this.props.match.params.id;
      if (id) {
        let result = await service.get({ id });
        this.setState(result.giveaway);
      }
    } catch (error) {
      handleError(error.message);
    }
  }

  render() {
    const { startDate, endDate, errors } = this.state;
    //TODO: add errrors
    const { selectOptions } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <strong>Add/Edit PromotionForm</strong>
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
                      <Label htmlFor="startDate">Start Date</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.startDate ? "is-invalid" : ""}
                        type="date"
                        id="startDate"
                        name="startDate"
                        placeholder="date"
                        onChange={this.handleChange}
                        value={startDate}
                      />
                      <div class="invalid-feedback">{errors.startDate}</div>
                      <FormText color="muted">
                        Please select the start date of your promotion
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="endDate">End Date</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.endDate ? "is-invalid" : ""}
                        type="date"
                        id="endDate"
                        name="endDate"
                        placeholder="date"
                        onChange={this.handleChange}
                        value={endDate}
                      />
                      <div class="invalid-feedback">{errors.endDate}</div>
                      <FormText color="muted">
                        Please select the end date of your promotion
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="websites">Multiple select</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        className={errors.websites ? "is-invalid" : ""}
                        type="select"
                        name="websites"
                        id="websites"
                        multiple
                        onChange={this.handleChange}
                      >
                        {selectOptions.map((item, key) => (
                          <option value={key}>{decamelize(item, " ")}</option>
                        ))}
                      </Input>
                      <div class="invalid-feedback">{errors.websites}</div>
                      <FormText color="muted">
                        Please select the websites where you want to promote
                        (Hint: Ctrl + click to select multiple)
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
        </Row>
      </div>
    );
  }
}

export default PromotionForm;
