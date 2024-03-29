import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    if (username.length < 5) {
      return setErrors({
        username: "Username must be at least 5 characters"
      })
    }

    if (password.length < 6) {
      return setErrors ({
        password: "Pasword must be at least 6 characters"
      })
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="form-container form-content">
      <h1 className="form-header">Sign Up to ByteBites</h1>
      <div className="error">{errors.server}</div>
      <form onSubmit={handleSubmit} className="form-form">
        <label className="form-input">
          Email
          <input className="form-text-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="error">{errors.email}</div>
        <label className="form-input">
          Username
          <input className="form-text-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className="error">{errors.username}</div>
        <label className="form-input">
          Password
          <input className="form-text-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
       <div className="error">{errors.password}</div>
        <label className="form-input">
          Confirm Password
          <input className="form-text-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="error">{errors.confirmPassword}</div>
        <button className="form-submit-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
