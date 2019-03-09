import React, { Component } from 'react';
import '../css/TodoItem.css';

class TodoItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    }

    render() {
        const { text, checked, id, onToggle, onRemove } = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id)
                }
                }><i className="far fa-trash-alt"></i></div>
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{ text }</div>
                </div>
                {
                    checked && (<div className="check-mark"><i className="fas fa-check"></i></div>)
                }
            </div>
        );
    }
}

export default TodoItem;