import React, { useEffect } from "react";
import Loader from "../layouts/Loader";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userAction";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  // hamdle the for submission
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };  



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="form-group ">
                  <label htmlFor="password_field">
                    Password <span>( not less than 8 character)</span>
                  </label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <Link to="/users/forgotPassword" className="float-right mb-4">Forgot Password</Link>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py3"
                >
                  LOGIN
                </button>
                <Link to="/users/signup" className="float-right mt-3">New User ?</Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
