"use client";
import React, { useEffect } from 'react';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';

const DateRange = ({ setFormData, formData, type }) => {
  const dateAndTtime = formData.pickUpDate + "T" + formData.pickUpTime;
  const weeks = [
    "1 Week",
    "6 Weeks",
    "8 Weeks",
    "12 Weeks",
    "26 Weeks",
    "52 Weeks",
  ];

  const handleApply = (event, picker) => {
    // Formats the selected start and end dates with their corresponding times
    const pickUpDate = picker.startDate.format('YYYY-MM-DD');
    const ReturnDate = picker.endDate.format('YYYY-MM-DD');
    const pickUpTime = new Date(picker.startDate).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Forces 24-hour mode
    }).toString();
    const ReturnTime = new Date(picker.endDate).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Forces 24-hour mode
    }).toString();
    setFormData(data => ({
      ...data,
      pickUpDate,
      ReturnDate,
      pickUpTime,
      ReturnTime,
    }));
  };

  const handleWeek = (event) => {
    // alert(event.target.value)
    if (!event.target.value) {
      setFormData(data => ({
        ...data,
        ReturnDate: "",
        ReturnTime: "",
        weeks: "",
      }));
      return;
    }
    const dateandtime = new Date(dateAndTtime); // Create a copy to avoid mutating the original
    dateandtime.setDate(dateandtime.getDate() + parseFloat(event.target.value) * 7);

    setFormData(data => ({
      ...data,
      weeks: event.target.value,
      ReturnDate: dateandtime.toISOString().toString().split("T")[0],
      ReturnTime: dateandtime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Forces 24-hour mode
      }).toString(),
    }));
  };


  const handleDate = (event) => {
    console.log(event.target.value);
    const [pickUpDate, pickUpTime] = event.target.value.toString().split("T");
    setFormData(ele => ({ ...ele, pickUpDate, pickUpTime }))
  };

  return (
    <>
      {
        type === "short" ?
          <div className="form-group-1 dateRange" style={{ width: "150%" }}>
            <label>Pick up & Return Duration</label>
            <div className="group-select tf-select">
              <DateRangePicker
                initialSettings={{
                  timePicker: true,            // Enables the time picker dropdowns
                  timePicker24Hour: false,     // False uses 12-hour AM/PM format
                  timePickerIncrement: 5,      // Minutes dropdown jumps by 5 mins
                  locale: {
                    format: 'MM/DD/YYYY hh:mm A', // Important: Tells picker to display time strings
                  },
                }}
                onApply={handleApply}
              >
                <input
                  type="text"
                  className="p-0 cursor-pointer"
                  value={(
                    formData.pickUpDate &&
                    formData.ReturnDate &&
                    formData.pickUpTime &&
                    formData.ReturnTime
                  ) ? `${formData.pickUpDate} ${formData.pickUpTime} - ${formData.ReturnDate} ${formData.ReturnTime}` : "Select Date & Time"}
                  readOnly
                />
              </DateRangePicker>
            </div>
          </div>

          :
          <>
            <div className="form-group-1 dateRange">
              <label>Pick up Date & Time</label>
              <div className="group-select tf-select">
                <input type='datetime-local'
                  value={dateAndTtime}
                  onChange={handleDate} className='p-0' />
              </div>
            </div>
            <div className="form-group-1">
              <label>No.of Weeks</label>
              <div className="group-select tf-select">
                <input
                  type="text"
                  name="weeks"
                  list="weeks-list" /* Must match the id of the datalist */
                  autoComplete="off"
                  value={formData.weeks}
                  onChange={handleWeek}
                  className="nice-select"
                // value={door}
                // onChange={(e) => setDoor(e.target.value)}
                />
                <datalist id="weeks-list">
                  <SearchDropDown value={formData.weeks} />

                  {weeks.filter(ele => parseFloat(ele) != parseFloat(formData.weeks)).map(ele =>
                    <option value={ele}>{ele}</option>
                  )}
                </datalist>
              </div>
            </div>
          </>
      }
    </>
  )
}

const SearchDropDown = ({ value }) => {
  const option = parseFloat(value) &&
    parseFloat(value) != NaN ? parseFloat(value) + " Weeks" : "";

  return (
    <>
      {
        parseFloat(option) == 1 ?
          <option value={option.replace("s", "")}>{option.replace("s", "")}</option>
          :
          <option value={option}>{option}</option>
      }
    </>
  )
}

export default DateRange