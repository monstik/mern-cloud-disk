import React from 'react';
import './uploader.css';
import UploadFile from "./UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploader, showUploader} from "../../reducers/uploadReducer";
import {CSSTransition, Transition, TransitionGroup} from "react-transition-group";

const Uploader = () => {

    const files = useSelector(state => state.upload.files);

    const isVisible = useSelector(state => state.upload.isVisible);
    const dispatch = useDispatch();


    return (
        <>

            <button className="openUploader" onClick={() => dispatch(showUploader())}>Загрузки</button>


            <CSSTransition
                in={isVisible}

                unmountOnExit
                timeout={500}

                classNames={'alert'}


            >

                <div className="uploader">

                    <div className="uploader__header">

                        <div className="uploader__title">Загрузки</div>
                        <button className="uploader__close" onClick={() => dispatch(hideUploader())}>X</button>

                    </div>
                    <div className="uploader__files">
                        {files.map(file => <UploadFile key={file.id} file={file}/>)}

                    </div>
                </div>


            </CSSTransition>


        </>
    );
};

export default Uploader;