import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import DatePicker from "material-ui-pickers/DatePicker/DatePickerInline";
import DateFnsUtils from "@date-io/date-fns";
<<<<<<< HEAD
import React, {useCallback, useEffect, useState} from "react";

const DateForm = ({onSetDate}) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    let current_date = '';

    useEffect(() => {
        current_date = getYYYYMMDD();

        onSetDate(current_date);
    }, []);

    const getYYYYMMDD = () => {
        let year = selectedDate.getFullYear();
        let month = selectedDate.getMonth() + 1;
        let day = selectedDate.getDate();
        month = month.toString().length === 1 ? "0" + month : month;
        day = day.toString().length === 1 ? "0" + day : day;

        return year + "-" + month + "-" + day;
    };

    const setDate = useCallback(
        e => {
            current_date = getYYYYMMDD();

            onSetDate(current_date);
        },
        [selectedDate]
    );

    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                keyboard
                clearable
                variant="outlined"
                label="Select Now Date"
                value={selectedDate}
                onChange={handleDateChange}
                onClose={setDate}
                format="yyyy-MM-dd"
                mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
            />
=======
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
>>>>>>> 9f476ac398aecce93e849a4b94fdc029ccef76cb
        </MuiPickersUtilsProvider>
    );
};

export default DateForm;
