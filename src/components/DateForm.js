import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
            <KeyboardDatePicker
                inputVariant="outlined"
                label="Select Now Date"
                value={selectedDate}
                onChange={handleDateChange}
                onClose={setDate}
                format="yyyy-MM-dd"
                mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DateForm;
