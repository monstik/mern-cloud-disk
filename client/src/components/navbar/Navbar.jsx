import React, {useState} from 'react';
import './navbar.css';
import logo from "../../assets/img/logo192.png";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFile} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import avatarLogo from "../../assets/img/avatar.png";
import {API_URL} from "../../config";

const Navbar = () => {

    const isAuth = useSelector(state => state.user.isAuth);
    const currentUser = useSelector(state => state.user.currentUser);

    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo;
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const searchChangeHandler = (event) => {
        setSearchName(event.target.value);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        if (event.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFile(value));

            }, 500, event.target.value))

        } else {
            dispatch(getFiles());
        }

    }

    return (
        <div className="navbar">
            <div className="container">
                <img src={logo} alt="logo" className="navbar__logo"/>
               <NavLink className="navbar__link" to={'/'}>
                   <div className="navbar__header">MERN_CLOUD</div>
               </NavLink>
                {!isAuth
                    ?
                    <>
                        <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>
                        <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>
                    </>

                    :
                    <>
                        <input
                            onChange={searchChangeHandler}
                            value={searchName}
                            type="text"
                            placeholder="Название файла..."
                            className="navbar__search"/>
                        <div className="navbar__login" onClick={() => dispatch(logout())}>Выйти</div>
                        <NavLink to={'/profile'}>
                            <img src={avatar} className="navbar__avatar" alt="avatar"/>
                        </NavLink>
                    </>

                }
            </div>
        </div>
    );
};

export default Navbar;