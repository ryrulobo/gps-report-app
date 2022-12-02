import { Link } from "react-router-dom";
import dateFormatter from "../helpers/dateFormatter";

export default function TableHomeRow({ data }) {
  return (
    <tbody className="text-center font-poppins">
      {data.data.map((el) => {
        return (
          <tr key={el.id}>
            <td>{el.DeviceId}</td>
            <td>{el.DeviceType}</td>
            <td>{dateFormatter(el.Timestamp)}</td>
            <td>{el.location}</td>
            <td className="fw-bold">
              <Link
                to={el.DeviceId}
                className="btn btn-sm btn-outline-success font-montserrat"
              >
                Details
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
