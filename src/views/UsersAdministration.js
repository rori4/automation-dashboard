import React, { Component } from "react";
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
import Moment from "react-moment";
import { handleError, handleInfo } from "./../utils/customToast";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import UserService from "./../services/user-service";
const brandDanger = getStyle("--danger");
const brandSuccess = getStyle("--success");

export default class UsersAdministration extends Component {
  static userService = new UserService();
  constructor(props) {
    super(props);
    this.initialState = {
      showBanDialog: false,
      showActivateDialog: false,
      userId: "",
      username: "",
      status: ""
    };
    this.state = {
      users: [],
      ...this.initialState
    };
  }

  hideDialog = () => {
    this.setState({
      ...this.initialState
    });
  };

  confirmDialog = async () => {
    const { status, userId } = this.state;
    try {
      let result = await UsersAdministration.userService.changeStatus({
        userId,
        status
      });
      result.success ? handleInfo(result.message) : handleError(result.message);
    } catch (error) {
      handleError(error.message);
    }
    this.hideDialog();
    this.retreiveUsers();
  };

  async retreiveUsers() {
    try {
      const { search } = this.state;
      let result = await UsersAdministration.userService.list({ search });
      if (result.success) {
        this.setState({
          users: result.users,
          isLoading: false
        });
      } else {
        handleInfo(result.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  }
  componentDidMount() {
    this.retreiveUsers();
  }

  render() {
    const { users, username, showBanDialog, showActivateDialog } = this.state;
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Combined All Table
            </CardHeader>
            <CardBody>
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, key) => (
                    <tr key={key}>
                      <td>{user.username}</td>
                      <td>{user.createdOn}</td>
                      <td>{user.roles.map((role, key) => role + " ")}</td>
                      <td>
                        {user.status === "active" ? (
                          <Badge color="success">{user.status}</Badge>
                        ) : (
                          <Badge color="danger">{user.status}</Badge>
                        )}
                      </td>
                      <td>
                        {user.status === "active" ? (
                          <a
                            class="btn btn-sm btn-danger mr-2 mb-2"
                            onClick={() =>
                              this.setState({
                                showBanDialog: true,
                                userId: user._id,
                                username: user.username,
                                status: "banned"
                              })
                            }
                            href="#"
                          >
                            <i class="fa fa-ban" /> Ban User
                            <SweetAlert
                              show={showBanDialog}
                              type="warning"
                              showCancelButton={true}
                              confirmButtonText="Ban him from this great place!"
                              confirmButtonColor={brandDanger}
                              title={"Ban " + username + "?"}
                              text="Are you sure you want to ban this user?"
                              onConfirm={this.confirmDialog}
                              onCancel={this.hideDialog}
                            />
                          </a>
                        ) : (
                          <a
                            class="btn btn-sm btn-success mr-2 mb-2"
                            onClick={() =>
                              this.setState({
                                showActivateDialog: true,
                                userId: user._id,
                                username: user.username,
                                status: "active"
                              })
                            }
                            href="#"
                          >
                            <i class="fa fa-check-circle" /> Activate User
                            <SweetAlert
                              show={showActivateDialog}
                              type="warning"
                              showCancelButton={true}
                              confirmButtonText="Activate"
                              confirmButtonColor={brandSuccess}
                              title={"Activate " + username + "?"}
                              text="Are you sure you want to activate this user?"
                              onConfirm={this.confirmDialog}
                              onCancel={this.hideDialog}
                            />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
