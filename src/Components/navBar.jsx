import React from "react";
import {withRouter} from "react-router-dom";

import { Navbar, Nav,  Container } from "react-bootstrap";

const styles = {
    userIMG: {
        width: 32
    }
};

const NavBar = ({history}) =>{
    const navigateToRoute = (route) => {
        history.push(route);
    }
    return(
        <Container>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            {
                window.innerWidth < 992 &&
                <Navbar.Brand onClick={_=>navigateToRoute('/')}>Would You Rather...</Navbar.Brand>
            }
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={_=>navigateToRoute('/')}>Home</Nav.Link>
                    <Nav.Link onClick={_=>navigateToRoute('/newQuestion')}>New Question</Nav.Link>
                    <Nav.Link onClick={_=>navigateToRoute('/leaderBoard')}>Leader Board</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="userNavGreeting">Hello, <img style={styles.userIMG} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Ta7Pq5Fx8vT4XxAVHxBEcpq90nQZQmnl4n2_4v4H4JNMcIjy" /></Nav.Link>
                    <Nav.Link onClick={_=>navigateToRoute('/')}>
                        Logout
      </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Container>
);

}

export default withRouter(NavBar);