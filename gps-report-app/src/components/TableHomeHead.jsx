export default function TableHomeHead(props) {
  const { sortById, setSortById, sortByType, setSortByType } = props;
  return (
    <thead className="bg-light text-center font-poppins">
      <tr>
        <th>
          <button
            className="bg-dark text-white fw-bold border-0 m-0"
            onClick={() => {
              sortById === "asc" ? setSortById("desc") : setSortById("asc");
            }}
          >
            DeviceID ({sortById.toUpperCase()})
          </button>
        </th>
        <th>
          <button
            className="bg-dark text-white fw-bold border-0 m-0"
            onClick={() => {
              sortByType === "asc"
                ? setSortByType("desc")
                : setSortByType("asc");
            }}
          >
            Device Type ({sortByType.toUpperCase()})
          </button>
        </th>
        <th>
          <button className="bg-dark text-white fw-bold border-0 m-0">
            Latest Timestamp
          </button>
        </th>
        <th>
          <button className="bg-dark text-white fw-bold border-0 m-0">
            Latest Location
          </button>
        </th>
        <th>
          <button className="bg-dark text-white fw-bold border-0 m-0">
            Action
          </button>
        </th>
      </tr>
    </thead>
  );
}
