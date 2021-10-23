import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import "./disk.css";
import Popup from "./popup/Popup";
import {setCurrentDir, setPopupDisplay, setView} from "../../reducers/fileReducer";
import Uploader from "../uploader/Uploader";
import Loader from "../loader/Loader";

const Disk = () => {

    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const loader = useSelector(state => state.app.loader);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('name');

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);

    const showPopupHandler = () => {
        dispatch(setPopupDisplay('flex'))
    };

    const backClickHandler = () => {
        const backDir = dirStack.pop();
        dispatch(setCurrentDir(backDir));
    };

    const fileUploadHandler = (event) => {

        const files = [...event.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));

    };

    const inputClickHandler = (event) => {
        event.target.value = '';
    };

    const dragEnterHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setDragEnter(true);

    };

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setDragEnter(false);

    };

    const dropHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();


        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));

        setDragEnter(false);
    }


    if(loader === true){
        return (
           <Loader/>
        )
    }

    return (!dragEnter ?


            <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}>
                <div className="disk__btns">
                    <button className="disk__back" onClick={backClickHandler}>Назвад</button>
                    <button className="disk__create" onClick={showPopupHandler}>Создать папку</button>
                    <div className="disk__upload">
                        <label
                            htmlFor="disk__upload-input"
                            className="disk__upload__label">Загрузить</label>
                        <input
                            multiple={true}
                            onClick={inputClickHandler}
                            onChange={fileUploadHandler}
                            type="file"
                            id="disk__upload-input"
                            className="disk__upload__input"/>
                    </div>
                    <button className="disk__plate" onClick={() => dispatch(setView('plate'))}/>
                    <button className="disk__list" onClick={() => dispatch(setView('list'))}/>
                    <label className="disk__label">Сортировать:</label>
                    <select value={sort} onChange={(event) => setSort(event.target.value)} className="disk__select">
                        <option value="name">Имя</option>
                        <option value="type">Тип</option>
                        <option value="date">Дата</option>
                        <option value="size">Размер</option>
                    </select>

                </div>
                <FileList/>
                <Popup/>
                <Uploader/>
            </div>
            :
            <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Перетащите файлы сюда
            </div>


    );
};

export default Disk;