import React, { useState } from "react";
import md5 from "md5";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        databasename: "",
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const convertToMd5 = (password) => {
        return md5(password);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        // myHeaders.append(
        //   "Cookie",
        //   "Aras.Server.Session=CfDJ8DHH7Jh0cgFHmpet2BwCCsrEs50%2BOMmM6WNGQbCEujtP1TdkEWtyT8ZUNK%2FtzD2bH9mTSEk4wehx41yIwBN7X6lPtnlUyxIqS9lQhzmNfHRh7PSV007UquLbsIsGUixfnpIkONc6DFaZcvDSMI5AdScbwozxuV%2F7FZfzlFBLQbw4"
        // );

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "password");
        urlencoded.append("scope", "Innovator");
        urlencoded.append("client_id", "IOMApp");
        urlencoded.append("username", formData.username);
        urlencoded.append("password", convertToMd5(formData.password));
        urlencoded.append("database", formData.databasename);
        console.log(formData.databasename, formData.username, formData.password);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            credentials: "include",  // Add this
            body: urlencoded,
            //   redirect: "follow",
        };

        try {
            //   const response = await fetch(
            //     "http://localhost/InnovatorServer21/oauthserver/connect/token",
            //     requestOptions
            //   );

            // forwarding request to proxy server
            const response = await fetch(
                "http://localhost:5000/api/oauthserver/connect/token",
                requestOptions
            );

            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }

            const result = await response.json();
            setSuccess("Login successful!");
            console.log(result); 

            // Save the token and expiry time in sessionStorage
            const tokenExpiryTime = new Date().getTime() + result.expires_in * 1000; // Calculate expiry time in milliseconds
            sessionStorage.setItem("access_token", result.access_token);
            sessionStorage.setItem("token_expiry", tokenExpiryTime);

            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="databasename">Database Name:</label>
                    <input
                        type="text"
                        id="databasename"
                        name="databasename"
                        value={formData.databasename}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ padding: "10px 20px", background: "#007BFF", color: "#fff", border: "none", cursor: "pointer" }}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
            {success && <p style={{ color: "green", marginTop: "15px" }}>{success}</p>}
        </div>
    );
};

export default LoginPage;
