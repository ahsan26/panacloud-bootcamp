import React from "react";
import { Card, Button, ProgressBar, Row, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { _saveQuestionAnswer, _getUsers, _getQuestions } from "../_DATA";
import { setUsers } from "../Store/Actions/auth";
import { setQuestions } from "../Store/Actions/poll";

class ViewPoll extends React.Component {
  state = {
    selectedPollOption: "",
    getResponse: false,
    currentPollToShow: {}
  };
  componentDidMount() {
    if (
      this.props.auth.users[this.props.auth.loggedUser].answers[
        this.props.match.params.qId
      ] === null ||
      this.props.auth.users[this.props.auth.loggedUser].answers[
        this.props.match.params.qId
      ] === undefined
    ) {
      this.setState({
        getResponse: true
      });
    } else {
      this.setState({
        currentPollToShow: this.props.poll.questions[
          this.props.match.params.qId
        ]
      });
    }

    if (!this.props.poll.questions.length) {
      _getQuestions().then(q => {
        this.props.setQuestions(q);
      });
    }
  }
  savePollResponse() {
    if (this.state.selectedPollOption) {
      const question = this.props.poll.questions[this.props.match.params.qId];
      _saveQuestionAnswer(
        this.props.auth.loggedUser,
        question.id,
        this.state.selectedPollOption
      ).then(_ => {
        _getUsers().then(users => {
          this.props.setUsers(users);
        });
      });
      _getQuestions().then(q => {
        this.props.setQuestions(q);
      });
    }
  }
  handleChange(n) {
    this.setState({
      selectedPollOption: n === 1 ? "optionOne" : n === 2 ? "optionTwo" : ""
    });
  }
  getTotalVotes() {
    const optionA = this.state.currentPollToShow.optionOne
      ? this.state.currentPollToShow.optionOne
      : {};
    const optionB = this.state.currentPollToShow.optionTwo
      ? this.state.currentPollToShow.optionTwo
      : {};
    if (optionA.votes && optionB.votes) {
      return optionA.votes.length + optionB.votes.length;
    }
    return 0;
  }
  render() {
    const questionAskerProfile = this.props.auth.users[
      this.props.poll.questions[this.props.match.params.qId].author
    ];
    const question = this.props.poll.questions[this.props.match.params.qId];
    return (
      <div
        style={
          window.innerWidth < 500
            ? { width: "100%", margin: "0 auto", paddingTop: 20 }
            : { width: 599, margin: "0 auto", paddingTop: 20 }
        }
      >
        {this.state.getResponse ? (
          <Card>
            <Card.Header>
              <b>Asked By {questionAskerProfile.name}</b>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col
                  style={{
                    lineHeight: "100px",
                    borderRight: "2px solid rgba(0,0,0,0.3)"
                  }}
                  className="text-center"
                  md={6}
                  sm={6}
                  xs={12}
                >
                  <img
                    style={{
                      width: 75,
                      borderRadius: "50%",
                      verticalAlign: "center"
                    }}
                    src={questionAskerProfile.avatarURL}
                  />
                </Col>
                <Col md={6} sm={6} xs={12}>
                  <b>Would You Rather ...</b>
                  <br />
                  <br />
                  <input
                    type="radio"
                    onChange={this.handleChange.bind(this, 1)}
                    name="wyr"
                    value={question.optionOne.text}
                  />{" "}
                  {question.optionOne.text}
                  <br />
                  <input
                    type="radio"
                    name="wyr"
                    value={question.optionTwo.text}
                    onChange={this.handleChange.bind(this, 2)}
                  />{" "}
                  {question.optionTwo.text}
                  <Button
                    onClick={this.savePollResponse.bind(this)}
                    style={{
                      backgroundColor: "#1abc9c",
                      color: "#fff",
                      border: 0,
                      outline: "none",
                      fontWeight: "bold",
                      display: "block",
                      marginTop: 10,
                      width: "100%"
                    }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Header>
              <b>Asked By {questionAskerProfile.name}</b>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col
                  style={{
                    lineHeight: "100px",
                    borderRight: "2px solid rgba(0,0,0,0.3)"
                  }}
                  className="text-center"
                  md={6}
                  sm={6}
                  xs={12}
                >
                  <img
                    style={{
                      width: 175,
                      borderRadius: "50%",
                      verticalAlign: "center"
                    }}
                    src={questionAskerProfile.avatarURL}
                  />
                </Col>
                <Col md={6} sm={6} xs={12}>
                  <b style={{ fontSize: 20 }}>Results: </b>
                  <PollOption
                    option={this.state.currentPollToShow.optionOne}
                    totalVotes={this.getTotalVotes()}
                    loggedUser={this.props.auth.loggedUser}
                  />
                  <PollOption
                    loggedUser={this.props.auth.loggedUser}
                    option={this.state.currentPollToShow.optionTwo}
                    totalVotes={this.getTotalVotes()}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

const PollOption = ({
  option = { text: "", votes: [] },
  totalVotes = 0,
  loggedUser = ""
}) => {
  const perc = ((100 / totalVotes) * option.votes.length).toFixed(2);
  const showYourVote = option.votes.indexOf(loggedUser) > -1 ? true : false;
  return (
    <div
      style={{
        width: "100%",
        marginTop: 25,
        padding: "10px 15px 10px 15px",
        border: `${showYourVote ? 2 : 1}px solid ${
          showYourVote ? "#1abc9c" : "#bdc3c7"
        }`
      }}
    >
      {showYourVote && (
        <div className="cr cr-top cr-right cr-sticky cr-turquoise">
          Your Vote
        </div>
      )}
      <b>Would you rather {option.text}</b>
      <ProgressBar
        now={perc === "NaN" ? 0 : perc}
        style={{ height: 25, marginTop: 20 }}
        label={`${perc === "NaN" ? 0 : perc}%`}
      />
      {`${option.votes.length} out of ${totalVotes}`}
    </div>
  );
};

export default connect(
  state => ({ auth: state.auth, poll: state.poll }),
  { setUsers, setQuestions }
)(ViewPoll);
