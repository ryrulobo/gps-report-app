import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/actionCreator";
import Swal from "sweetalert2";

import logo from "../img/logo.png";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    Swal.fire({
      title: "Are you sure want to log out?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(logout()).then((res) => {
          Swal.fire({
            icon: "success",
            title: "Session expired, please login to continue",
          });
          navigate("/login");
        });
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand ms-2">
          <img src={logo} alt="logo" width="50px" />
          <span className="ms-3 font-montserrat">GPS Report</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-2">
            <button
              className="btn btn-outline-danger font-montserrat"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
