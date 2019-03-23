import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import DatePicker from "material-ui-pickers/DatePicker/DatePickerInline";
import DateFnsUtils from "@date-io/date-fns";
import SearchButton from '@material-ui/core/Button';
import React, { useState } from "react";

let selected_date = '';

const Button = ({onSearch}) => {
    return (
        <SearchButton
            color='primary'
            size='large'
            variant='outlined'
            className="btn-date-search"
            component={onSearch(selected_date)}
        >
            <i className="fas fa-search"></i>List Search
        </SearchButton>
    )
};

const Picker = () => {
    const [selectedDate, handleDateChange] = useState(new Date());
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth() + 1;
    let day = selectedDate.getDate();
    month = month.toString().length === 1 ? "0" + month : month;
    day = day.toString().length === 1 ? "0" + day : day;

    selected_date = year + "-" + month + "-" + day;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        </MuiPickersUtilsProvider>
    )
};

const DateForm = ({onSearch}) => {
    return(
        <section className="picker dateform-wrapper">
            <Picker/>
            <Button
                onSearch={onSearch}
            />
        </section>
    );
};

export default DateForm;
