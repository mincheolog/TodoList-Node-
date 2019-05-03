import React, { Component } from 'react';
import '../css/TodoItem.css';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const styles = {
    root : {
        color :green[600],
        '&$checked': {
            color: green[500],
        },
    },
    checked: {}
};

class TodoItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            [this.props.id]: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked || this.state[this.props.id] !== nextState[this.props.id];
    }

    handleOpenEdit = (e) => {
        this.setState({
            [this.props.id]: true
        });
    };

    handleCloseEdit = (e) => {
        this.setState( {
            [this.props.id]: false
        });
    };

    render() {
        const {
            text,
            checked,
            id,
            edit_input,
            onToggle,
            onRemove,
            onEditChange,
            onSave,
            onEditCancel,
            classes
        } = this.props;

        return (
            <div className="todo-item">
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id)
                }
                }><i className="far fa-trash-alt"></i></div>
                <div className={`todo-text ${checked && this.state[id] === false && 'checked'}`}>
                    { this.state[id] === false
                        ? <div>{ text }</div>
                        : <TextField
                            label="Edit"
                            margin="dense"
                            fullWidth="true"
                            value={edit_input}
                            onChange={onEditChange}
                        />}
                </div>
                {
                    this.state[id] === false
                        ? <Checkbox
                            checked={checked}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggle(id);
                            }}
                            classes={{
                                root: classes.root,
                                checked: classes.checked
                            }}
                            color="primary"
                            className="check-box"
                        />
                        : ""
                }
                <div className={this.state[id] === false ? "edit" : "confirm"}>
                    {
                        this.state[id] === false
                            ? <i className="fas fa-sync-alt" onClick={this.handleOpenEdit}></i>
                            : <i className="far fa-edit" onClick={(e) => {
                                e.stopPropagation();
                                onSave(id);
                                this.handleCloseEdit();
                            }
                            }></i>
                    }
                    {
                        this.state[id] === false
                            ? ""
                            : <i className="fas fa-undo" onClick={(e) => {
                                e.stopPropagation();
                                onEditCancel();
                                this.handleCloseEdit();
                            }
                            }></i>
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TodoItem);