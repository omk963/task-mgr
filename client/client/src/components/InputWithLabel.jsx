import React from "react";
import { useRef, useEffect } from "react";
import style from './TodoListItem/TodoListItem.module.css'
import PropTypes from 'prop-types';

const InputWithLabel = ({ id, children, value, onInputChange, placeholder }) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <React.Fragment>
            <label className={style.title}>{children}</label>
            <input
                className={style.input}

                id={id} type='text'
                name={children}
                value={value}
                placeholder={placeholder}
                onChange={onInputChange}
                ref={inputRef}
            />
            <label htmlFor={id}></label>
        </React.Fragment>
    );
};

InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    value: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
};

export default InputWithLabel;