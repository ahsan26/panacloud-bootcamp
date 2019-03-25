import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const PrivateComponent = ComposedComponent => {
  class _PrivateComponent extends React.Component {
    componentWillMount() {
      if (!this.props.auth.isLogged) {
        this.props.history.push("/");
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  return connect(
    state => ({ auth: state.auth }),
    {}
  )(withRouter(_PrivateComponent));
};

export default PrivateComponent;
