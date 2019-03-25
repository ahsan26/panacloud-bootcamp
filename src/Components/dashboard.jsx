import React from "react";
import { _getQuestions } from "../_DATA";
import { connect } from "react-redux";
import { sortByDateAndTime } from "../Utils";
import {
  setUnAnsweredQuestions,
  setAnsweredQuestions,
  setQuestions
} from "../Store/Actions/poll";
import { Tabs, Tab, Typography } from "@material-ui/core";
import { Card, Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router";

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  );
}
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, value) {
    this.setState({ value });
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    _getQuestions().then(queries => {
      const questions = Object.values(queries);
      const unAnsweredQuestions = questions.filter(
        question =>
          this.props.auth.users[this.props.auth.loggedUser].answers[
            question.id
          ] === null ||
          this.props.auth.users[this.props.auth.loggedUser].answers[
            question.id
          ] === undefined
      );
      const answeredQuestions = Object.keys(
        this.props.auth.users[this.props.auth.loggedUser].answers
      ).map(qID => queries[qID]);
      const filteredUnAnweredQuestions = sortByDateAndTime(unAnsweredQuestions);
      const filteredAnweredQuestions = sortByDateAndTime(answeredQuestions);
      this.props.setUnAnsweredQuestions(filteredUnAnweredQuestions);
      this.props.setAnsweredQuestions(filteredAnweredQuestions);
      this.props.setQuestions(queries);
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { value } = this.state;
    return (
      <div
        style={
          window.innerWidth < 500
            ? { width: "100%", margin: "0 auto" }
            : { width: 599, margin: "0 auto" }
        }
      >
        <Tabs
          variant="fullWidth"
          inkBarStyle={{ background: "#fff" }}
          indicatorColor="#fff"
          value={value}
          onChange={this.handleChange}
        >
          <LinkTab
            style={value === 0 ? { color: "#1abc9c" } : {}}
            label="UnAnswered Questions"
          />
          <LinkTab
            style={value === 1 ? { color: "#1abc9c" } : {}}
            label="Answered Questions"
          />
        </Tabs>
        {value === 0 ? (
          <TabContainer>
            {this.state.isLoading ? (
              <div className="text-center">
                <i
                  className="fas fa-circle-notch fa-spin fa-3x"
                  style={{ color: "#1abc9c" }}
                />
              </div>
            ) : this.props.poll.unAnsweredQuestions.length ? (
              this.props.poll.unAnsweredQuestions.map(q => (
                <QuestionCard
                  author={this.props.auth.users[q.author].name}
                  pollOptionA={q.optionOne.text}
                  authorImg={this.props.auth.users[q.author].avatarURL}
                  qId={q.id}
                />
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No UnAnswered Questions</p>
            )}
          </TabContainer>
        ) : (
          <div />
        )}
        {value === 1 ? (
          <TabContainer>
            {this.state.isLoading ? (
              <div className="text-center">
                <i
                  className="fas fa-circle-notch fa-spin fa-3x"
                  style={{ color: "#1abc9c" }}
                />
              </div>
            ) : this.props.poll.answeredQuestions.length ? (
              this.props.poll.answeredQuestions.map(q => (
                <QuestionCard
                  author={this.props.auth.users[q.author].name}
                  pollOptionA={q.optionOne.text}
                  authorImg={this.props.auth.users[q.author].avatarURL}
                  qId={q.id}
                />
              ))
            ) : (
              <p>Not Any UnAnswered Question</p>
            )}
          </TabContainer>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const QuestionCard = withRouter(
  ({ history, authorImg, qId, author, pollOptionA }) => (
    <Card>
      <Card.Header>
        <b>{author} asks:</b>
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
              src={authorImg}
            />
          </Col>
          <Col md={6} sm={6} xs={12}>
            <b>Would You Rather</b>
            <br />
            <br />
            <p>{`${pollOptionA.slice(0, 2)} ...`}</p>
            <Button
              style={{
                border: "2px solid #1abc9c",
                color: "#1abc9c",
                width: "100%",
                backgroundColor: "#fff",
                outline: "none !important"
              }}
              onClick={_ => history.push(`/viewPoll${qId}`)}
            >
              View Poll
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
);

export default connect(
  state => ({ auth: state.auth, poll: state.poll }),
  { setUnAnsweredQuestions, setAnsweredQuestions, setQuestions }
)(Dashboard);
