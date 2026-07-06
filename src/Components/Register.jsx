import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styling/Register.css"

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        
        const newErrors = {}
        
        if (!name) {
            newErrors.name = "Name is required"
        }
        
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
        
        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }
        
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return
        
        alert("Registration successful!")
        navigate("/")
    }

    return (
        <div className="register-page">
            <h1>Create Account</h1>
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>

                    <button type="submit">Register</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register;