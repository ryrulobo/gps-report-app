import { useState } from "react";

import TableHome from "../components/TableHome";

export default function Home() {
  const [filter, setFilter] = useState("");

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  return (
    <section className="vh-100 bg-color">
      <div className="container-fluid d-flex justify-content-center align-items-center pt-5">
        <div
          className="row d-flex align-items-center post-detail rounded-5 col-10 pt-5 pb-3 px-5"
          style={{ border: "2pt #393E46 solid", backgroundColor: "#212529" }}
        >
          <div className="d-flex justify-content-between">
            <h3 className="text-white mb-4 font-montserrat">GPS Summary</h3>
            <div className="col-3">
              <input
                type="text"
                className="form-control font-montserrat"
                placeholder="Search by Device ID/Type"
                name="filter"
                value={filter}
                onChange={filterHandler}
              />
            </div>
          </div>
          <TableHome filter={filter} />
        </div>
      </div>
    </section>
  );
}
