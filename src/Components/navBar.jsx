import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { logOut } from "../Store/Actions/auth";
const styles = {
  userIMG: {
    width: 32
  }
};

const NavBar = ({ logOut, history, auth }) => {
  const navigateToRoute = route => {
    history.push(route);
  };
  const _LogOut = () => {
    logOut();
    history.push("/");
  };
  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        {window.innerWidth < 992 && (
          <Navbar.Brand onClick={_ => navigateToRoute("/")}>
            Would You Rather...
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={_ => navigateToRoute("/dashboard")}>
              Home
            </Nav.Link>
            <Nav.Link onClick={_ => navigateToRoute("/newQuestion")}>
              New Question
            </Nav.Link>
            <Nav.Link onClick={_ => navigateToRoute("/leaderBoard")}>
              Leader Board
            </Nav.Link>
          </Nav>
          {auth && auth.isLogged && (
            <Nav>
              <Nav.Link className="userNavGreeting">
                Hello, {auth.users[auth.loggedUser].name}
                <img
                  style={styles.userIMG}
                  src={auth.users[auth.loggedUser].avatarURL}
                />
              </Nav.Link>
              <Nav.Link onClick={_LogOut}>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default connect(
  state => ({ auth: state.auth }),
  { logOut }
)(withRouter(NavBar));
