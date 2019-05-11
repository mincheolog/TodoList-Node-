import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: 50 + "%"
    },
});

class TimeSelector extends React.Component {
    state = {
        start_select: '',
        end_select: '',
        start_open: false,
        end_open: false
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClose = (e) => {
        let name = e.target.name;
        if(name == "start_select"){
            this.setState({ start_open: false });
        } else {
            this.setState({ end_open: false });
        }
    };

    handleOpen = (e) => {
        let name = e.target.name;
        if(name == "start_select"){
            this.setState({ start_open: false });
        } else {
            this.setState({ end_open: false });
        }
    };

    render() {

        const time_list = [
            "AM 00:00",
            "AM 00:30",
            "AM 01:00",
            "AM 01:30",
            "AM 02:00",
            "AM 02:30",
            "AM 03:00",
            "AM 03:30",
            "AM 04:00",
            "AM 04:30",
            "AM 05:00",
            "AM 05:30",
            "AM 06:00",
            "AM 06:30",
            "AM 07:00",
            "AM 07:30",
            "AM 08:00",
            "AM 08:30",
            "AM 09:00",
            "AM 09:30",
            "AM 10:00",
            "AM 10:30",
            "AM 11:00",
            "AM 11:30",
            "PM 12:00",
            "PM 12:30",
            "PM 01:00",
            "PM 01:30",
            "PM 02:00",
            "PM 02:30",
            "PM 03:00",
            "PM 03:30",
            "PM 04:00",
            "PM 04:30",
            "PM 05:00",
            "PM 05:30",
            "PM 06:00",
            "PM 06:30",
            "PM 07:00",
            "PM 07:30",
            "PM 08:00",
            "PM 08:30",
            "PM 09:00",
            "PM 09:30",
            "PM 10:00",
            "PM 10:30",
            "PM 11:00",
            "PM 11:30"
        ];

        const { classes } = this.props;

        return (
            <React.Fragment>
                <FormControl className={classes.formControl} className={"start-time"}>
                    <InputLabel htmlFor="Start-Time">Start Time</InputLabel>
                    <Select
                    open={this.state.open}
                    onClose={this   .handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.start_select}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'start_select',
                        id: 'Start-Time',
                    }}
                >
                    {time_list.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl} className={"end-time"}>
                    <InputLabel htmlFor="End-Time">End Time</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.end_select}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'end_select',
                            id: 'End-Time',
                        }}
                    >
                        {time_list.map((item) => (
                            <MenuItem value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </React.Fragment>
        );
    }
}

TimeSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeSelector)