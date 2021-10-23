import axios from "axios";
import {setUser} from "../reducers/userReducer";
import {API_URL} from "../config";

export const registration = async (name, email, password, repeatPassword) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`,
            {
                email,
                name,
                password,
                repeatPassword,
            });
        alert(response.data.message);

    } catch (e) {
        alert(e.response.data.message);
    }
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`,
                {
                    email,
                    password,
                })
            localStorage.setItem('token', response.data.token);
            dispatch(setUser(response.data.user));
        } catch (e) {
            alert(e)
        }
    };

};

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

            localStorage.setItem('token', response.data.token);
            dispatch(setUser(response.data.user));

        } catch (e) {

            localStorage.removeItem('token');
        }
    }
};

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});


            dispatch(setUser(response.data));

        } catch (e) {

            console.log(e);
        }
    }
};

export const deleteAvatar = () => {
    return async dispatch => {
        try {

            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});


            dispatch(setUser(response.data));

        } catch (e) {

            console.log(e);
        }
    }
};