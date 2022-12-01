import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData, logout } from "../store/actions/actionCreator";

import Swal from "sweetalert2";

import Loading from "./Loading";
import Pagination from "./Pagination";
import TableHomeHead from "./TableHomeHead";
import TableHomeRow from "./TableHomeRow";

export default function TableHome(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortById, setSortById] = useState("asc");
  const [sortByType, setSortByType] = useState("asc");

  const filter = props.filter;

  const data = useSelector((state) => {
    return {
      data: state.reducer.data,
      error: state.reducer.error,
    };
  });
  //! Logout if token expired
  if (data.error) {
    dispatch(logout()).then(() => {
      Swal.fire({
        icon: "error",
        title: data.error,
      });
      localStorage.clear();
      navigate("/login");
    });
  }

  const totalPage = useSelector((state) => {
    return state.reducer.totalPage;
  });

  //! Fetch data
  useEffect(() => {
    setLoading(true);
    dispatch(fetchData(page, filter, sortById, sortByType)).finally(() => {
      setLoading(false);
    });
  }, [page, filter, sortById, sortByType]);

  if (loading) return <Loading />;

  return (
    <div>
      <table className="table table-dark align-middle mb-4 bg-white col-2 table-responsive table-hover">
        <TableHomeHead
          sortById={sortById}
          setSortById={setSortById}
          sortByType={sortByType}
          setSortByType={setSortByType}
        />
        <TableHomeRow data={data} />
      </table>

      <Pagination page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  );
}
