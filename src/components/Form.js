import React from 'react';
import '../css/Form.css';
import TextField from '@material-ui/core/TextField';

const Form = ({value, onChange, onCreate, onKeyPress}) => {
    return (
        <div className="form">
            <TextField
                label="Todo Item"
                margin="dense"
                fullWidth="true"
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <div className="create-button" onClick={onCreate}>
                Add
            </div>
        </div>
    );
};

export default Form;