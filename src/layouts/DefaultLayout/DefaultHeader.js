import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
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

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, isLoggedIn, username, roles, ...attributes } = this.props;
    return (
      <React.Fragment>
        <Link to="/">
          <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
            minimized={{
              src: sygnet,
              width: 30,
              height: 30,
              alt: "CoreUI Logo"
            }}
          />
        </Link>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        {(roles ? (
          roles.includes("Admin")
        ) : (
          false
        )) ? (
          <Nav className="d-md-down-none" navbar>
            <NavItem className="px-3">
              <Link to="/admin/users" className="nav-link">
                Users Administration
              </Link>
            </NavItem>
          </Nav>
        ) : null}
        <Nav className="ml-auto mr-4" navbar>
          <NavItem className="px-3">Hello, {username}</NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={"../../assets/img/avatars/6.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem>
                <i className="fa fa-user" /> Profile
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench" /> Settings
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
