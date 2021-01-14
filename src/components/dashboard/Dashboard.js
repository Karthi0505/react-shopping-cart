import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, loginUser } from "../../actions/authentication/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  if (loginUser) {
    return <h1>Welcome back!</h1>;
  }

  render() {
    const { user } = this.props.auth;
    const { userLoggedIn } = this.props.auth;

    return !userLoggedIn ? (
      <div>Please login
        <button
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Logout
        </button>
      </div>
    ) :
    (
      <div style={{ display: "inline" }} className="">
              
          
            <b>Welcome,</b> {user.name.split(" ")[0]}
          
           
            <button
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);