import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import api from "../../utils/api";
import Toggle from 'react-toggle'
import "react-toggle/style.css"; // Import default styles
import style from "./AuthForm.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faAddressCard } from '@fortawesome/free-solid-svg-icons';

const AuthForm = ({ login }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(login)
    const [errMsg, setErrMsg] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const handleRegister = async (userInfo) => {
        try {
            console.log(userInfo)

            const res = await api.post('/auth/register', {
                ...userInfo
            })
            setErrMsg('')
            if (res?.status === 201) navigate('/auth/login');
        } catch (error) {
            console.error('Failed to complete function', error)
            setErrMsg(error.response?.data?.message) // || login ? 'Failed to Login' : 'Failed to Register')
        }
    }

    const handleLogin = async (userInfo) => {
        try {
            console.log(userInfo)

            const res = await api.post('/auth/login', {
                ...userInfo
            })

            const { token } = res.data
            sessionStorage.setItem('token', token)
            localStorage.setItem('token', token)

            setErrMsg('')
            navigate('/tasks');
        } catch (error) {
            console.error('Failed to complete function', error)
            setErrMsg(error.response?.data?.msg) // || login ? 'Failed to Login' : 'Failed to Register')
        }
    }

    const handleToggle = (e) => {
        console.log(e.target.checked)
        setIsLogin(prev => !prev)
        if (!isLogin) {
            navigate('/auth/login')
        }
        else {
            navigate('/auth/register')
        }
    }

    return (
        <form onSubmit={handleSubmit(isLogin ? handleLogin : handleRegister)} className={style.form}>
            <h1 className={style.header}>{isLogin ? "Login" : "Register"}</h1>
            {
                !isLogin && (
                    <>
                        <label>Name:</label>
                        <input type='text' placeholder="Name" {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters long'
                            }
                        })}
                        />
                        {errors.name && <p className={style.error}>{errors.name.message}</p>}
                    </>
                )
            }
            <label>Email:</label>
            <input type="text" placeholder="Email" {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
            })} />
            {errors.email && <p className={style.error}>{errors.email.message}</p>}
            <label>Password:</label>
            <input type='password' placeholder="Password" {...register('password', {
                required: 'Password is required',
                minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long'
                }
            })} />
            {errors.password && <p className={style.error}>{errors.password.message}</p>}
            <button type="submit" className={style.button} disabled={isSubmitting}>{isLogin ? "Login" : "Register"}</button>
            {errMsg && <span>{errMsg}</span>}
            <label className={style.switch}>
                <Toggle
                    checked={isLogin}
                    onChange={handleToggle}
                    icons={{
                        checked: <FontAwesomeIcon icon={faRightToBracket} style={{
                            color: 'black',
                            position: 'absolute',
                            top: '-3px'
                        }} />,
                        unchecked: <FontAwesomeIcon icon={faAddressCard} style={{
                            color: 'white',
                            position: 'absolute',
                            top: '-3px',
                            right: '-4px'
                        }} />
                    }}
                />
                <span></span>
            </label>
        </form>
    );
};

export default AuthForm;