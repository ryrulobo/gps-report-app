import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataById } from "../store/actions/actionCreator";
import { useLocation, Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import Loading from "../components/Loading";
import dateFormatter from "../helpers/dateFormatter";
import chartDataFormatter from "../helpers/chartDataFormatter";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.substring(1);

  const dataById = useSelector((state) => {
    return {
      data: state.reducer.dataById,
      error: state.reducer.error,
    };
  });
  //! Logout if token expired/invalid token
  if (dataById.error) {
    Swal.fire({
      icon: "error",
      title: dataById.error,
    });
    localStorage.clear();
    navigate("/login");
  }

  //! Assign chart data
  const chartData = chartDataFormatter(dataById.data);
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Count",
        data: chartData.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const [loading, setLoading] = useState(false);

  //! Fetch data
  useEffect(() => {
    setLoading(true);
    dispatch(fetchDataById(id)).finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className="pt-4 bg-color vh-100">
      <div className="container px-4 px-lg-5">
        <div
          className="row gx-4 gx-lg-5 align-items-center p-4 rounded-5"
          style={{ border: "2pt #393E46 solid", backgroundColor: "#212529" }}
        >
          <Link to="/" className="text-light fs-5 link font-montserrat">
            {"< Back"}
          </Link>

          <div className="col-md-6 ms-2">
            <Doughnut
              data={data}
              options={{
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          </div>
          <div className="col-md-5 ms-5">
            <h5 className="fw-bolder main-title ms-1 text-white font-poppins">
              {id}
            </h5>
            <h1 className="display-5 fw-bolder mb-3 text-white font-poppins">
              {dataById?.data[0]?.DeviceType}
            </h1>
            <table className="table table-dark align-middle table-responsive table-hover">
              <thead className="bg-light text-center font-poppins">
                <tr>
                  <th>Timestamp</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {dataById?.data.map((el) => {
                  return (
                    <tr key={el.id}>
                      <td className="font-poppins">
                        {dateFormatter(el.Timestamp)}
                      </td>
                      <td className="font-poppins">{el.location}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
