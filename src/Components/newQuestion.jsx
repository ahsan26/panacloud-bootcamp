import React from "react";
import { Card, Button } from "react-bootstrap";
import { _saveQuestion } from "../_DATA";
import { connect } from "react-redux";

class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionA: "",
      optionB: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitQuestion(e) {
    e.preventDefault();
    const { optionA, optionB } = this.state;
    if (optionA && optionB) {
      _saveQuestion({
        author: this.props.auth.loggedUser,
        optionOneText: optionA,
        optionTwoText: optionB
      }).then(_ => {
        this.setState({ optionA: "", optionB: "" });
      });
    }
  }
  render() {
    const { optionA, optionB } = this.state;
    return (
      <div
        style={
          window.innerWidth < 500
            ? { width: "100%", margin: "0 auto", paddingTop: 20 }
            : { width: 450, margin: "0 auto", paddingTop: 20 }
        }
      >
        <Card>
          <Card.Header>
            <h4 style={{ textAlign: "center" }}>
              <b>Create New Question</b>
            </h4>
          </Card.Header>
          <Card.Body>
            <p>Complete The Question</p>
            <b>Would You Rather ...</b>
            <form onSubmit={this.submitQuestion}>
              <input
                type="text"
                value={optionA}
                onChange={this.handleChange}
                style={{ marginTop: 10, marginBottom: 10 }}
                name="optionA"
                className="form-control"
                placeholder="Enter Option One"
              />
              <div className="text-center">
                <b>OR</b>
              </div>
              <input
                type="text"
                placeholder="Enter Option Two"
                style={{ marginTop: 10 }}
                value={optionB}
                onChange={this.handleChange}
                name="optionB"
                className="form-control"
              />
              <Button
                type="submit"
                style={{
                  backgroundColor: "#1abc9c",
                  border: 0,
                  width: "100%",
                  marginTop: 15
                }}
              >
                Submit
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }),
  {}
)(NewQuestion);
