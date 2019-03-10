import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class AnonymousHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, isLoggedIn, username, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
        />
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down">
            <NavLink className="mr-3" href="/login">
              <Button block outline color="primary">
              <i className="fa fa-sign-in mr-2" />
                 Login
              </Button>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down">
            <NavLink className="mr-3" href="/register">
              <Button block color="primary">
                <i className="fa fa-user-circle-o mr-2" />
                 Register
              </Button>
            </NavLink>
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

AnonymousHeader.propTypes = propTypes;
AnonymousHeader.defaultProps = defaultProps;

export default AnonymousHeader;
