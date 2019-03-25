import React from "react";
import { Card, Button } from "react-bootstrap";
import Select from "react-select";
import { _getUsers } from "../_DATA";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedUser } from "../Store/Actions/auth";

const styles = {
  logInCard: {
    width: window.innerWidth < 500 ? "100%" : 500,
    margin: "auto"
  },
  logInImg: {
    width: 200
  },
  signInMiniHeading: {
    color: "#1abc9c",
    fontWeight: "bold",
    fontSize: 18
  },
  logInBTN: {
    backgroundColor: "#1abc9c",
    border: 0,
    width: "100%",
    fontWeight: "bold"
  }
};

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      accounts: [],
      accountsLoading: true,
      selectedAccount: {}
    };
    this.getAccounts = this.getAccounts.bind(this);
    this._selectAccount = this._selectAccount.bind(this);
    this.logIn = this.logIn.bind(this);
  }
  componentWillMount() {
    if (this.props.auth.isLogged) {
      this.props.history.push("/dashboard");
    }
  }
  componentDidMount() {
    this.getAccounts();
  }
  getAccounts() {
    _getUsers().then(users => {
      const accounts = Object.values(users).map(user => ({
        value: user.id,
        label: user.name
      }));
      this.setState({
        accounts,
        accountsLoading: false
      });
    });
  }
  _selectAccount(e) {
    this.setState({
      selectedAccount: e.value
    });
  }
  logIn() {
    if (Object.keys(this.state.selectedAccount).length) {
      this.props.setLoggedUser(this.state.selectedAccount);
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Card className="text-center" style={styles.logInCard}>
          <Card.Header>
            <b> Welcome To The Would You Rather App...</b>
            <br />
            Please SignIn To Continue
          </Card.Header>
          <Card.Body>
            <Card.Img
              src="https://equimper.gallerycdn.vsassets.io/extensions/equimper/react-native-react-redux/2.0.3/1551449028703/Microsoft.VisualStudio.Services.Icons.Default"
              style={styles.logInImg}
            />
            <p style={styles.signInMiniHeading}>Sign In</p>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={this.state.accounts[0]}
              isDisabled={false}
              isLoading={this.state.accountsLoading}
              isClearable={false}
              isRtl={false}
              isSearchable={true}
              name="color"
              options={this.state.accounts}
              onChange={this._selectAccount}
            />
            <Button style={styles.logInBTN} onClick={this.logIn}>
              Sign In
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default connect(
  state => ({ auth: state.auth }),
  { setLoggedUser }
)(withRouter(LogIn));
