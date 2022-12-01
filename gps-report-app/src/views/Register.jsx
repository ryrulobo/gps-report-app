import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../store/actions/actionCreator";
import Swal from "sweetalert2";

import logo from "../img/logo.png";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerAction = (e) => {
    e.preventDefault();
    dispatch(register(registerForm))
      .then((res) => {
        if (!res.err) {
          Swal.fire({
            icon: "success",
            title: "Account successfully created",
            message: "Please login to continue",
          });
          navigate("/login");
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
                onSubmit={registerAction}
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
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={registerForm.name}
                    onChange={(e) => {
                      setRegisterForm({
                        ...registerForm,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={(e) => {
                      setRegisterForm({
                        ...registerForm,
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
                    value={registerForm.password}
                    onChange={(e) => {
                      setRegisterForm({
                        ...registerForm,
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
                    Create Account
                  </button>
                </div>
                <div className="form-text text-center mb-0 text-dark">
                  Already have an account?{" "}
                  <Link to="/login" className="link text-dark fw-bold">
                    Login here
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
