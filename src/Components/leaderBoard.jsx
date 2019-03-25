import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { _getUsers } from "../_DATA";
import { setUsers } from "../Store/Actions/auth";

class LeaderBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  fetchUsers() {
    const users = this.sortUsers(Object.values(this.props.auth.users));
    this.setState({
      users
    });
  }
  componentDidMount() {
    this.fetchUsers();
  }
  sortUsers(users) {
    let sortedUsersByScore = [];
    sortedUsersByScore = users.sort(
      (a, b) =>
        Object.values(b.answers).length +
        b.questions.length -
        (Object.values(a.answers).length + a.questions.length)
    );
    return sortedUsersByScore;
  }
  render() {
    return (
      <div
        style={
          window.innerWidth < 500
            ? { width: "100%", margin: "0 auto" }
            : { width: 500, margin: "0 auto" }
        }
      >
        {this.state.users.map(user => (
          <EachLeaderBoardUser user={user} />
        ))}
      </div>
    );
  }
}

const EachLeaderBoardUser = ({ user }) => {
  return (
    <div style={{ margin: "20px 0", border: "2px solid #ecf0f1", padding: 5 }}>
      <Row>
        <Col md={2} sm={2}>
          <img src={user.avatarURL} style={{ width: 75 }} />
        </Col>
        <Col md={8} sm={8}>
          <h4>
            <b>{user.name}</b>
          </h4>
          <p>
            <Row>
              <Col md={10} sm={10} xs={10}>
                Answered Questions:
              </Col>
              <Col md={2} sm={2} xs={2}>
                <b>{Object.keys(user.answers).length}</b>
              </Col>
            </Row>
          </p>
          <p>
            <Row>
              <Col md={10} sm={10} xs={10}>
                Created Questions:
              </Col>
              <Col md={2} sm={2} xs={2}>
                <b>{Object.keys(user.questions).length}</b>
              </Col>
            </Row>
          </p>
        </Col>
        <Col md={2} sm={2}>
          <div style={{ height: 80 }}>
            <div
              style={{
                height: 40,
                textAlign: "center",
                lineHeight: "40px",
                fontWeight: "bold",
                backgroundColor: "#ecf0f1"
              }}
            >
              Score
            </div>
            <div
              style={{
                height: 40,
                width: 40,
                backgroundColor: "#1abc9c",
                borderRadius: "50%",
                lineHeight: "40px",
                color: "#fff",
                margin: "5px auto",
                textAlign: "center"
              }}
            >
              {Object.keys(user.answers).length +
                Object.keys(user.questions).length}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  state => ({ auth: state.auth }),
  { setUsers }
)(LeaderBoard);
