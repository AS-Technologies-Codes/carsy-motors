"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';

const DateRange = ({ setFormData, formData }) => {
  const pathName = usePathname();


  const handleApply = (event, picker) => {
    // Formats the selected start and end dates with their corresponding times
    const pickUpDate = picker.startDate.format('YYYY-MM-DD');
    const ReturnDate = picker.startDate.format('YYYY-MM-DD');
    const pickUpTime = picker.startDate.format('hh:mm A');
    const ReturnTime = picker.startDate.format('hh:mm A');
    setFormData(data => ({
      ...data,
      pickUpDate,
      ReturnDate,
      pickUpTime,
      ReturnTime,
    }));
  };

   const handleDate = (event) => {
    console.log(event.target.value);
    
    // Formats the selected start and end dates with their corresponding times
    // const pickUpDate = event.target.value[]
    // const ReturnDate = picker.startDate.format('YYYY-MM-DD');
    // const pickUpTime = picker.startDate.format('hh:mm A');
    // const ReturnTime = picker.startDate.format('hh:mm A');
    // setFormData(data => ({
    //   ...data,
    //   pickUpDate,
    //   ReturnDate,
    //   pickUpTime,
    //   ReturnTime,
    // }));
  };


  return (
    <>
      {
        pathName.toString().includes("short") ?
          <div className="form-group-1 dateRange" style={{ width: "150%" }}>
            <label>Pick up & Return</label>
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
                  className="p-0"
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
                value="2026-07-24"
                onChange={handleDate} className='p-0' />
              </div>
            </div>
            <div className="form-group-1">
              <label>No.of Weeks</label>
              <div className="group-select tf-select">
                <select
                  name="weeks"
                  value={formData.weeks}
                  // onChange={handleChange}
                  className="nice-select"
                // value={door}
                // onChange={(e) => setDoor(e.target.value)}
                >
                  <option value={1}>1 Week</option>
                  <option value={6}>6 Weeks</option>
                  <option value={8}>8 Weeks</option>
                  <option value={12}>12 Weeks</option>
                  <option value={26}>26 Weeks</option>
                  <option value={52}>52 Weeks</option>
                </select>
              </div>
            </div>
          </>
      }
    </>
  )
}

export default DateRange