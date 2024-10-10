import React from "react";
import { useRef, useEffect } from "react";
import style from './TodoListItem/TodoListItem.module.css'
import PropTypes from 'prop-types';

const InputWithLabel = ({ id, children, value, onInputChange }) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <React.Fragment>
            <label className={style.title}>{children}</label>
            <input
                className={style.todo}
                id={id} type='text'
                name={children}
                value={value}
                onChange={onInputChange}
                ref={inputRef}
            />
            <label htmlFor={id}></label>
        </React.Fragment>
    );
};

InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired
};

export default InputWithLabel;