import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { baseurl } from "../Config/config";
import { IoBookSharp } from "react-icons/io5";

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState(""); // New state
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `${baseurl}/api/password-reset/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check if passwords match
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setMsg("");
			return;
		}

		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		<Fragment>
			{validUrl ? (
				<div className="container login-main1 mt-2">
					<div className="row">
						<div className="col-lg">
							<div className="container login-main m-auto mt-4 p-5">
								<div className="left-31">
									<h1 className="text-center fs-3 left-4-tx">
										<i className="log-i">
											<IoBookSharp />
										</i>{" "}
										Library
									</h1>

									<h1 className="text-center mt-3">
										Welcome Back <span className="hi-1">!</span>
									</h1>

									<p className="text-center">Enter your Credentials to access your account</p>
								</div>
								<div className="right-3 w-50">
									<div className="show-div">
										<h1 className="text-center fs-3">
											<i className="log-i">
												<IoBookSharp />
											</i>{" "}
											Library
										</h1>

										<h1 className="text-center mt-1">
											Welcome Back<span className="hi-1">!</span>
										</h1>

										<p className="text-center">Enter your Credentials to access your account</p>
									</div>
									<h1 className="mt-4">Create New Password</h1>
									<p>Enter your password to complete the reset</p>
									<form className={styles.form_container} onSubmit={handleSubmit}>
										<label htmlFor="password" className="label">
											Password
										</label>
										<br />
										<input
											type="password"
											name="password"
											onChange={(e) => setPassword(e.target.value)}
											value={password}
											required
											className="input-login1 mt-3"
										/>
										<label htmlFor="confirmPassword" className="label mt-3">
											Confirm Password
										</label>
										<br />
										<input
											type="password"
											name="confirmPassword"
											onChange={(e) => setConfirmPassword(e.target.value)}
											value={confirmPassword}
											required
											className="input-login1 mt-3"
										/>
										{error && <div className={styles.error_msg}>{error}</div>}
										{msg && <div className={styles.success_msg}>{msg}</div>}
										<button type="submit" className="login mt-4 w-50">
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default PasswordReset;
