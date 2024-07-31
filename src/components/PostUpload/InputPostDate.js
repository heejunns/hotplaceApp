import { useState } from "react";
import DatePicker from "react-datepicker";

const InputPostDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div style={{ width: "100%" }}>
      <DatePicker
        // showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        // dateFormat={"yyyy-MM-dd"}
      />
    </div>
  );
};

export default InputPostDate;
