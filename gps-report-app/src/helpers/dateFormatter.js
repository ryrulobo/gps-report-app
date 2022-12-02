import moment from "moment";

const dateFormatter = (date) => {
  return moment(date).format("DD-MM-YYYY hh:mm");
};

export default dateFormatter;
