import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import style from "./AuthForm.module.css";
import api from "../../utils/api";

const AuthForm = ({ isLogin }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = userInfo;

    const onChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value }); // real-time form validation
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const res = await api.post('/auth/login', { email, password });
                const { token } = res.data;
                console.log("Login successful: ", res.data);
                sessionStorage.setItem('token', token);
                localStorage.setItem('token', token);
                navigate('/tasks');
            } else {
                const res = await api.post('/auth/register', { name, email, password });
                console.log("Registeration successful: ", res.data);
                navigate('/auth/login');
            }
        } catch (error) {
            console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
        }
    };

    return (
        <form onSubmit={onSubmit} className={style.form}>
            <h1 className={style.header}>{isLogin ? "Login" : "Register"}</h1>
            {
                !isLogin && (
                    <input
                        type='text'
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Name"
                        required={!isLogin}
                        className={style.input}
                    />
                )
            }
            <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                required
                className={style.input}
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
                className={style.input}
            />
            <button type="submit" className={style.button}>{isLogin ? "Login" : "Register"}</button>
        </form>
    );
};

export default AuthForm;