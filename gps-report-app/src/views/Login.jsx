import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/actionCreator";
import Swal from "sweetalert2";

import logo from "../img/logo.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const loginAction = (e) => {
    e.preventDefault();
    dispatch(login(loginForm))
      .then((res) => {
        if (!res.err) {
          Swal.fire({
            icon: "success",
            title: "Log in success",
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: res.err.response.data.message,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err,
        });
      });
  };

  return (
    <section className="vh-100 bg-color-login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form
                noValidate
                onSubmit={loginAction}
                className="card-body cardbody-color p-lg-5 rounded font-montserrat"
              >
                <div className="text-center">
                  <img
                    src={logo}
                    className="img-fluid my-3 mb-4"
                    width="150px"
                    alt="logo"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) => {
                      setLoginForm({
                        ...loginForm,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => {
                      setLoginForm({
                        ...loginForm,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-dark px-5 mb-5 w-100"
                  >
                    Login
                  </button>
                </div>
                <div className="form-text text-center mb-4 text-dark">
                  Not registered?{" "}
                  <Link to="/register" className="link text-dark fw-bold">
                    Create an account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
