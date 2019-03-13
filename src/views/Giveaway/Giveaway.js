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
  Button,
  CardFooter
} from "reactstrap";
import { handleError, handleInfo } from "../../utils/customToast";
import { UserConsumer } from "../../context/user-context";
import giveawayValidator from "./../../utils/validations/giveawayValidator";
import GiveawayService from "./../../services/giveaway-service";
class Giveaway extends Component {
  static giveawayService = new GiveawayService();
  constructor(props) {
    super(props);
    this.initialState = {
      giveawayUrl: "",
      title: "",
      sponsorName: "",
      description: "",
      prize: "",
      giveawayCover: "",
      eligibility: "US, CA, 18+",
      prizeValue: "",
      category: "",
      entryMethod: "",
      sponsorEmail: props.userEmail,
      errors: {}
    };
    this.state = this.initialState;
  }

  handleChange = ({ target }) => {
    target.files
      ? this.setState({ [target.name]: target.files[0] })
      : this.setState({ [target.name]: target.value });
    console.log(this.state);
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();
      let errors = giveawayValidator(this.state);
      this.setState(
        {
          errors
        },
        async () => {
          if (Object.keys(errors).length === 0) {
            let result = await Giveaway.giveawayService.save(this.state);
            handleInfo(result.message);
            this.props.history.push("/giveaways/list");
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
        let result = await Giveaway.giveawayService.get({ id });
        this.setState(result.giveaway);
      }
    } catch (error) {
      handleError(error.message);
    }
  }

  render() {
    const {
      giveawayUrl,
      title,
      sponsorName,
      description,
      prize,
      giveawayCover,
      eligibility,
      sponsorEmail,
      category,
      entryMethod,
      prizeValue,
      errors
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <strong>Add/Edit Giveaway</strong>
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
                      <Label htmlFor="giveawayUrl">Giveaway Link</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.giveawayUrl ? "is-invalid" : ""}
                        type="text"
                        id="giveawayUrl"
                        name="giveawayUrl"
                        placeholder="URL..."
                        autoComplete="giveawayUrl"
                        value={giveawayUrl}
                        onBlur={this.retrieveUdemyData}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.giveawayUrl}</div>
                      <FormText color="muted">
                        Place your giveaway url here
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
                        Please enter/edit your giveaway title
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.description ? "is-invalid" : ""}
                        type="textarea"
                        name="description"
                        id="description"
                        rows="9"
                        placeholder="description..."
                        value={description}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.description}</div>
                      <FormText className="help-block">
                        Please enter/edit your giveaway description
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="sponsorName">Sponsor Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.sponsorName ? "is-invalid" : ""}
                        type="text"
                        id="sponsorName"
                        name="sponsorName"
                        placeholder="Sponsor Name..."
                        autoComplete="sponsor-name"
                        value={sponsorName}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.sponsorName}</div>
                      <FormText className="help-block">
                        Please enter/edit your sponsor name
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="prize">Prize</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.prize ? "is-invalid" : ""}
                        type="text"
                        id="prize"
                        name="prize"
                        placeholder="What is the prize?..."
                        autoComplete="prize"
                        value={prize}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.prize}</div>
                      <FormText className="help-block">
                        Please add the name of your prize here
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="giveawayCover">Giveaway cover</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.giveawayCover ? "is-invalid" : ""}
                        type="file"
                        id="giveawayCover"
                        name="giveawayCover"
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.giveawayCover}</div>
                      <FormText className="help-block">
                        Please add a giveaway cover
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="sponsorEmail">Sponsor Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.sponsorEmail ? "is-invalid" : ""}
                        type="email"
                        id="sponsorEmail"
                        name="sponsorEmail"
                        placeholder="Sponsor Email..."
                        autoComplete="email"
                        value={sponsorEmail}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.sponsorEmail}</div>
                      <FormText className="help-block">
                        Please enter/edit your email
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="prizeValue">Prize Value</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.prizeValue ? "is-invalid" : ""}
                        type="number"
                        id="prizeValue"
                        name="prizeValue"
                        placeholder="Prize value..."
                        autoComplete="email"
                        value={prizeValue}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.prizeValue}</div>
                      <FormText className="help-block">
                        Please enter the prize value of your giveaway
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="eligibility">Eligibility</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.eligibility ? "is-invalid" : ""}
                        type="text"
                        id="eligibility"
                        name="eligibility"
                        placeholder="Eligibility..."
                        autoComplete="eligibility"
                        value={eligibility}
                        onChange={this.handleChange}
                      />
                      <div class="invalid-feedback">{errors.eligibility}</div>
                      <FormText className="help-block">
                        Please state who is eligibile to enter (e.g US, CA, 18+)
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="category">Category</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.category ? "is-invalid" : ""}
                        type="select"
                        name="category"
                        id="category"
                        onChange={this.handleChange}
                        value={category}
                      >
                        <option value="0">Please select</option>
                        <option value="technology">Technology</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="beauty">Beauty</option>
                      </Input>
                      <div class="invalid-feedback">{errors.category}</div>
                      <FormText className="help-block">
                        Please select a giveaway category
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="entryMethod">Entry Method</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        className={errors.entryMethod ? "is-invalid" : ""}
                        type="select"
                        name="entryMethod"
                        id="entryMethod"
                        onChange={this.handleChange}
                        value={entryMethod}
                      >
                        <option>Please select</option>
                        <option value="gleamio">Gleam.io</option>
                        <option value="rafflecopter">Rafflecopter</option>
                        <option value="viralsweep">Viralsweep</option>
                      </Input>
                      <div class="invalid-feedback">{errors.entryMethod}</div>
                      <FormText className="help-block">
                        Please select the entry method
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
const GiveawayWithContext = props => {
  return (
    <UserConsumer>
      {user => <Giveaway {...props} userEmail={user.email} />}
    </UserConsumer>
  );
};
export default GiveawayWithContext;
