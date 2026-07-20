"use client";
import React from 'react';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';

const DateRange = ({ setFormData, formData }) => {


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
    

  return (
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
  )
}

export default DateRange