import React, { Component } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

export default class Register extends Component {

    constructor() {
        super();
        this.state = {
            email: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(this.state.email, config);
        toast.success(`Email is sent to ${this.state.email}. Click the link to complete yor registration.`);

        window.localStorage.setItem('emailForRegistration', this.state.email);

        this.setState({email: ''});
    };

    registerForm = () => (
        <form onSubmit={this.handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={ e => this.setState({email: e.target.value})}
                autoFocus
            />
            <button type="submit" className="btn btn-raised">
                Register
            </button>
        </form>
    );

    render() {
        return (
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>Register</h4>
                        { this.registerForm() }
                    </div>
                </div>

            </div>
        )
    }
}
