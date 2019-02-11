import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import AuthActions from "../Store/Actions/auth";

class LogIn extends React.Component {
    constructor() {
        super();
        this.state = {
            usrName: '',
            passw: ''
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateFields = this.validateFields.bind(this);
    }
    componentDidMount() {
        console.log(this.props)
    }
    validateFields() {
        const { usrName, passw } = this.state;
        if (usrName && passw) return true;
        return false;
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    login(e) {
        const { usrName, passw } = this.state;
        e.preventDefault();
        if (this.validateFields()) {
            const usrFound = this.props.auth.users.find(usr => ((usr.usrName).toLowerCase() === (usrName).toLowerCase()) && usr.passw===passw);
        }
    }
    render() {
        return (
            <div style={styles.loginContainer}>
                {/* <h1>LogIn</h1> */}
                <form onSubmit={this.login}>
                    <InputGroup>
                        <FormControl
                            placeholder="Username"
                            name="usrName"
                            onChange={this.handleChange}
                            aria-label="Username"
                            value={this.state.usrName}
                        />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <FormControl
                            onChange={this.handleChange}
                            type="password"
                            name="passw"
                            value={this.state.passw}
                            placeholder="Password"
                            aria-label="Passowrd"
                        />
                    </InputGroup>
                    <br />
                    <Button type="submit" variant="info" style={styles.logInBTN}>LogIn</Button>
                </form>
            </div>
        );
    }
}

const styles = {
    loginContainer: {
        height: '98vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    logInBTN: {
        width: 100
    }
};

export default connect(state => ({ auth: state.Auth, errors: state.Errors }), { Login: AuthActions.Login, LogOut: AuthActions.LogOut })(LogIn);