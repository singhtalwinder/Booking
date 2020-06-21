import React, { Component } from "react";
import axios from "axios";
import "./Auth.css";

class AuthPage extends Component {
	state = {
		isLogin: true,
	};

	constructor(props) {
		super(props);
		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
	}

	switchModeHandler = () => {
		this.setState((prevState) => {
			return { isLogin: !prevState.isLogin };
		});
	};

	submitHandler = async (event) => {
		event.preventDefault();
		const email = this.emailEl.current.value;
		const password = this.passwordEl.current.value;

		if (this.state.isLogin) {
			//signin
			const query = `
				query {
					signin(email: "${email}", password: "${password}") {
						...on AuthData {
									userId
									token
									tokenExpiration
							}
							... on Error {
								message
						}
					  }
				}
			`;
			try {
				let result = await axios.post("/graphql", {
					query,
				});

				let signin = result.data.data.signin;

				if (signin.hasOwnProperty("token")) {
					alert("Success");
				} else {
					alert(signin.message);
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			//signup
			const query = `
				mutation {
					signup (email: "${email}", password: "${password}") {
					__typename
					... on User {
					userId
					}
					
					... on Error {
					message
					}
				}
				}
			`;
			try {
				let result = await axios.post("/graphql", {
					query,
				});

				let signup = result.data.data.signup;

				if (signup.hasOwnProperty("userId")) {
					alert("Success");
				} else {
					alert(signup.message);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	render() {
		return (
			<form className="auth-form" onSubmit={this.submitHandler}>
				<div className="form-control">
					<label htmlFor="email">E-Mail</label>
					<input type="email" id="email" ref={this.emailEl} />
				</div>
				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" ref={this.passwordEl} />
				</div>
				<div className="form-actions">
					<button type="submit">Submit</button>
					<button type="button" onClick={this.switchModeHandler}>
						Switch to {this.state.isLogin ? "Signup" : "Login"}
					</button>
				</div>
			</form>
		);
	}
}

export default AuthPage;
