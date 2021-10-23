import React, {useState} from 'react';
import './popup.css';
import Input from "../../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {addFile, setPopupDisplay} from "../../../reducers/fileReducer";
import {createDir} from "../../../actions/file";

const Popup = () => {

    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    const closeHandler = () => {
        setDirName('');
        dispatch(setPopupDisplay('none'))
    };
    const createDirHandler = () => {
        dispatch(createDir(currentDir, dirName));
        setDirName('');
        dispatch(setPopupDisplay('none'))
    };

    return (
        <div className="popup" onClick={() => closeHandler()} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={event => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Создать папку</div>
                    <button className="popup__close" onClick={() => closeHandler()}>X</button>
                </div>
                <Input
                    type="text"
                    placeholder="Введите название папки..."
                    value={dirName}
                    setValue={setDirName}/>
                <button className="popup__create" onClick={() => createDirHandler()}>Создать</button>
            </div>

        </div>
    );
};

export default Popup;