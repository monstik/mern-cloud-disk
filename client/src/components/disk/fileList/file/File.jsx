import React from 'react';
import './file.css';
import dirImg from '../../../../assets/img/dir.svg';
import fileImg from '../../../../assets/img/file.svg';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";
import downloadImg from "../../../../assets/img/download.gif";
import deleteImg from "../../../../assets/img/delete.png";

const File = ({file}) => {

    const currentDir = useSelector(state => state.files.currentDir);
    const fileView = useSelector(state => state.files.view);
    const dispatch = useDispatch();

    const openDirHandler = () => {
        dispatch(pushToStack(currentDir));
        dispatch(setCurrentDir(file._id));
    }

    const downloadClickHandler = (event) => {
        event.stopPropagation();
        downloadFile(file);
    }

    const deleteClickHandler = (event) => {
        event.stopPropagation();
        dispatch(deleteFile(file));

    }

    if (fileView === 'list') {
        return (
            <div className="file" onClick={file.type === 'dir' ? () => openDirHandler() : null}>
                <img src={file.type === 'dir' ? dirImg : fileImg} alt="" className="file__image"/>
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' &&
                <button onClick={downloadClickHandler} className="file__btn file__download"><img
                    className="file__download__image"
                    src={downloadImg}
                    alt=""
                /></button>}
                <button onClick={deleteClickHandler} className="file__btn file__delete">  <img
                    className="file__delete__image"
                    src={deleteImg}
                    alt=""
                /></button>
            </div>
        );
    }

    if (fileView === 'plate') {
        return (
            <div className="file-plate" onClick={file.type === 'dir' ? () => openDirHandler() : null}>
                <img src={file.type === 'dir' ? dirImg : fileImg} alt="" className="file-plate__image"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                    <button
                        onClick={downloadClickHandler}
                        className="file-plate__btn file-plate__download">
                        <img
                            className="file-plate__download__image"
                            src={downloadImg}
                            alt=""
                        />
                    </button>}
                    <button
                        onClick={deleteClickHandler}
                        className="file-plate__btn file-plate__delete">
                        <img
                            className="file-plate__delete__image"
                            src={deleteImg}
                            alt=""
                        />
                    </button>
                </div>
            </div>
        );
    }
};

export default File;