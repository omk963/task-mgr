import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";

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
        <form onSubmit={onSubmit}>
            <h1>{isLogin ? "Login" : "Register"}</h1>
            {
                !isLogin && (
                    <input
                        type='text'
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Name"
                        required={!isLogin}
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
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
            />
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
    );
};

export default AuthForm;