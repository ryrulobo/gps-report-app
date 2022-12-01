export default function TableHomeHead(props) {
  const { sortById, setSortById, sortByType, setSortByType } = props;
  return (
    <thead className="bg-light text-center font-poppins">
      <tr>
        <th
          onClick={() => {
            sortById === "asc" ? setSortById("desc") : setSortById("asc");
          }}
        >
          DeviceID ({sortById.toUpperCase()})
        </th>
        <th
          onClick={() => {
            sortByType === "asc" ? setSortByType("desc") : setSortByType("asc");
          }}
        >
          Device Type ({sortByType.toUpperCase()})
        </th>
        <th>Latest Timestamp</th>
        <th>Latest Location</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}
