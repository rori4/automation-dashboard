import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import { Container } from "reactstrap";
import { UserConsumer } from "../../context/user-context";
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import {
  publicRoutes,
  privateRoutes,
  adminRoutes,
  allRoutes
} from "../../routes";
import AuthorizedRouteWithContext from "./../../components/Routes/AuthorizedRoute";

// const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const AnonymousHeader = React.lazy(() => import("./AnonymousHeader"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    const { logoutUser, history } = this.props;
    e.preventDefault();
    history.replace("/login")
    logoutUser();
  }

  componentWillMount() {
    console.log(this.props);
  }
  render() {
    const { isLoggedIn, username } = this.props;
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            {isLoggedIn ? (
              <DefaultHeader onLogout={e => this.signOut(e)} {...this.props} />
            ) : (
              <AnonymousHeader
                onLogout={e => this.signOut(e)}
                {...this.props}
              />
            )}
          </Suspense>
        </AppHeader>
        <div className="app-body">
          {isLoggedIn ? (
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
          ) : null}
          <main className="main">
            <AppBreadcrumb appRoutes={allRoutes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {publicRoutes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  {privateRoutes.map((route, idx) => {
                    return route.component ? (
                      <AuthorizedRouteWithContext
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  {adminRoutes.map((route, idx) => {
                    return route.component ? (
                      <AuthorizedRouteWithContext
                        allowedRoles={["Admin"]}
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect form="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const LayoutWithContext = props => {
  return (
    <UserConsumer>
      { user => (
        <DefaultLayout
          {...props}
          isLoggedIn={user.isLoggedIn}
          logoutUser={user.logoutUser}
        />
      )}
    </UserConsumer>
  );
};

export default LayoutWithContext;
