import React, {useState} from 'react';
import './authorization.css';
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    return (
        <div className="authorization">
            <div className="authorization__header">
                Регистрация
            </div>
            <Input value={name} setValue={setName} type="text" placeholder='Введите имя'/>
            <Input value={email} setValue={setEmail} type="email" placeholder='Введите email'/>
            <Input value={password} setValue={setPassword} type="password" placeholder='Введите пароль'/>
            <Input value={repeatPassword} setValue={setRepeatPassword} type="password" placeholder='Повторите пароль'/>

            <button
                className="authorization__btn"
                onClick={() => registration(name, email, password, repeatPassword)}
            >Регистрация</button>
        </div>
    );
};

export default Registration;