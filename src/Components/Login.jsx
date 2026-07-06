import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styling/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        
        const newErrors = {}
        
        if (!email) {
            newErrors.email = "Email is required"
        } else if (!email.includes("@")) {
            newErrors.email = "Enter a valid email"
        }
        
        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }
        
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return
        
        alert("Login successful!")
        navigate("/")
    }

    return (
        <div className="login-page">
            <h1>Login to MediLite</h1>
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <button type="submit">Login</button>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;