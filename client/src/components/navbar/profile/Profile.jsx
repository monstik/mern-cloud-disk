import React from 'react';
import './profile.css';
import {useDispatch} from "react-redux";
import {uploadAvatar, deleteAvatar} from "../../../actions/user";

const Profile = () => {

    const dispatch = useDispatch();

    const changeHandler = (event) => {
        const file = event.target.files[0];
        dispatch(uploadAvatar(file));
    }

    return (
        <div>
            <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
            <input
                multiple={false}
                accept="image/*"
                onChange={changeHandler}
                type="file"
                placeholder="Загрузить аватар..."
            />
        </div>
    );
};

export default Profile;