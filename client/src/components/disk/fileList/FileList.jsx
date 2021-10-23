import React from 'react';
import "./fileList.css";
import {useSelector} from "react-redux";
import File from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const FileList = () => {
    const files = useSelector(state => state.files.files);
    const fileView = useSelector(state => state.files.view);

    if (files.length === 0) {
        return (
            <div className="loader">Файлы не найдены</div>
        );
    }
    if (fileView === 'list') {
        return (
            <div className="fileList">
                <div className="fileList__header">
                    <div className="fileList__name">Название</div>
                    <div className="fileList__date">Дата</div>
                    <div className="fileList__size">Размер</div>
                </div>
                <div className="fileList__files">
                    <TransitionGroup>
                        {files.map(file =>
                            <CSSTransition
                                key={file._id}
                                timeout={500}
                                classNames={'file'}

                            >
                                <File file={file}/>
                            </CSSTransition>
                        )}
                    </TransitionGroup>

                </div>
            </div>
        );
    }
    if (fileView === 'plate') {
        return (

            <div className="filePlate">
                {files.map(file => <File key={file._id} file={file}/>)}
            </div>

        );
    }

};

export default FileList;