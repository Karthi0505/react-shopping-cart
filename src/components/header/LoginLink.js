import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginUser } from "../../actions/authentication/authActions";

import { Link } from 'react-router-dom';
import LogoutLink from './LogoutLink';


class LoginLink extends Component {

    render() {
        const loggedIn = this.props.auth.isAuthenticated;
        const { user } = this.props.auth;
        
        if (this.props.auth.isAuthenticated) {
            console.log("Welcome, You loggedin");
        } else {
            console.log("You are loggedOut");
        }
        
        return loggedIn ? (
            <div>
                Welcome, {user.name.split(" ")[0]} 

                <LogoutLink />
                
            </div>
        ): (
            <div>
                You are loggedOut: <Link to="/login" variant="primary" className="btn btn-primary">Login</Link>
            </div>
        );

           
    }
}
/*export default LoginLink;*/

LoginLink.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { loginUser }
)(LoginLink);