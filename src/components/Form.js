import React from 'react';
import '../css/Form.css';
import TextField from '@material-ui/core/TextField';
import TimeForm from './TimeForm';

const Form = ({value, onChange, onCreate, onKeyPress}) => {

    return (
        <div className="form">
            <TimeForm/>
            <div className={"todo-form"}>
                <TextField
                    label="Todo Item"
                    margin="dense"
                    fullWidth="true"
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    className={"todo-input"}
                />
                <div className="create-button" onClick={onCreate}>
                    Add
                </div>
            </div>
        </div>
    );
};

export default Form