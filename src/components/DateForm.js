import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import DatePicker from "material-ui-pickers/DatePicker/DatePickerInline";
import DateFnsUtils from "@date-io/date-fns";
import SearchButton from '@material-ui/core/Button';
import React, { useState } from "react";

const DateForm = () => {
    const [selectedDate, handleDateChange] = useState(new Date());
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <section className="picker dateform-wrapper">
                <DatePicker
                    keyboard
                    clearable
                    variant="outlined"
                    label="Select Now Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="yyyy-MM-dd"
                    mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
                />
                <SearchButton
                    color='primary'
                    size='large'
                    variant='outlined'
                    className="btn-date-search"
                >
                    <i className="fas fa-search"></i>List Search
                </SearchButton>
            </section>
        </MuiPickersUtilsProvider>
    );
};

export default DateForm;
