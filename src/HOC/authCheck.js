import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function AuthCheck(ComposedComponnet) {
    class AuthCheck extends React.Component {
        componentDidMount() {
            if (!this.props.Auth.login) {
                this.props.history.push('/login');
            }
        }
        render() {
            return (
                <ComposedComponnet />
            );
        }
    }

    return connect(state => ({ Auth: state.Auth }), {})(withRouter(AuthCheck));
}

export default AuthCheck;