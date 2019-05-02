import React, { Component } from 'react';
import '../css/TodoItem.css';
import TextField from '@material-ui/core/TextField';

class TodoItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            [this.props.id]: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    }

    handleOpenEdit = (e) => {
        let id = e.target.getAttribute("data-value");
        this.setState({
            [id]: true
        })
    };

    handleCloseEdit = (e) => {
        let id = e.target.getAttribute("data-value");
        this.setState( {
            [id]: false
        })
    };

    render() {
        console.log(id);
        console.log(this.state);
        const { value, text, checked, id, onToggle, onRemove, onChange, onKeyPress, onSave } = this.props;

        return (
            <div className="todo-item" onClick={this.state[id] === false ? () => onToggle(id) : ""}>
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
                            value={value}
                            onChange={onChange}
                            onKeyPress={onKeyPress}
                        />}
                </div>
                {
                    checked && this.state[id] === false && (<div className="check-mark"><i className="fas fa-check"></i></div>)
                }
                <div className={this.state[id] === false ? "edit" : "confirm"}>
                    {
                        this.state[id] === false
                            ? <i className="fas fa-sync-alt" data-value={id} onClick={(e) => {
                                this.handleOpenEdit()
                            }
                            }></i>
                            : <i className="far fa-edit" data-value={id} onClick={(e) => {
                                this.handleCloseEdit()
                            }
                            }></i>
                    }
                </div>
            </div>

        );
    }
}

export default TodoItem;