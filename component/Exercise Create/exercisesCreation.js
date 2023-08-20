import FormStyle from '../../css/form.module.css';

import { useState, useEffect } from "react";
// import Link from 'next/link';
import { BiPlus } from 'react-icons/bi'
import customModalStyle from '../../css/customModal.module.css'
// import { HiDotsVertical } from 'react-icons/hi';
// import { AiFillMedicineBox } from 'react-icons/ai';
import { MdOutlineSportsKabaddi } from 'react-icons/md'
import {BsFillEyeFill} from 'react-icons/bs'
import {MdModeEdit} from 'react-icons/md'
import {HiTrash} from 'react-icons/hi'
import Image from 'next/image';
import { BiBody } from 'react-icons/bi'
import * as ACTION from './action'
import { useDispatch, useSelector } from 'react-redux';



function ExerciseCreation() {

    let [exerciseCreatePayload, setExerciseCreatePayload] = useState({
        exerciseName : "",
        exerciseHowToDo : "",
        description : "",
        hi_exerciseName : "",
        hi_exerciseHowToDo : "",
        hi_description : "",
        exerciseImage : "",
        exerciseVideo : "",
        exerciseGif : "",
    })

    let [fileUrls, setFileUrls] = useState({
        exerciseImage: "",
        exerciseVideo: "",
        exerciseGif: ""
    })

    let [haveResponse, setHaveResponse] = useState(false);
    let [listView, setListView] = useState(true);
    let [exercisesNameFromResponse, setExercisesNameFromResponse] = useState('');
    let [allExercisesList, setAllExercisesList] = useState([]);

    let dispatch = useDispatch();

    let state = useSelector((state) => state.CreateExerciseReducer);

    useEffect(() => {
        dispatch(ACTION.getAllExercisesList())
    }, [state.createExerciseSuccess]);



    useEffect(() => {
        if (state.getAllExercisesSuccess) {
            setAllExercisesList(state.getAllExercisesSuccess.allExercises)
        }
        if (state.getAllExercisesFailure) {
            console.log(state.getAllExercisesFailure, 'failure get')
        }

        dispatch(ACTION.resetToInitialState())

    }, [state.getAllExercisesSuccess, state.getAllExercisesFailure])




    useEffect(() => {

        if (state.createExerciseSuccess) {
            setExerciseCreatePayload({
                exerciseName : "",
                exerciseHowToDo : "",
                description : "",
                hi_exerciseName : "",
                hi_exerciseHowToDo : "",
                hi_description : "",
                exerciseImage : "",
                exerciseVideo : "",
                exerciseGif : "",
            })

            setFileUrls({
                exerciseImage: "",
                exerciseVideo: "",
                exerciseGif: ""
            })

            setExercisesNameFromResponse(state.createExerciseSuccess.name)
            setHaveResponse(true);
            setListView(true)
            setTimeout(() => { setHaveResponse(false); }, 6000);
        }

        if (state.createExerciseFailure) {
            console.log(state.createExerciseFailure, "failure")
        }

        dispatch(ACTION.resetToInitialState())

    }, [state.createExerciseSuccess, state.createExerciseFailure])






    const exerciseFormOnChangeHandler = (e) => {
        let exerciseCreatePayloadCopy = { ...exerciseCreatePayload }

        if (e.target.type === 'file') {
            let fileUrlsCopy = { ...fileUrls }

            exerciseCreatePayloadCopy[e.target.id] = e.target.files[0]
            setExerciseCreatePayload(exerciseCreatePayloadCopy)

            fileUrlsCopy[e.target.id] = e.target.value
            setFileUrls(fileUrlsCopy)
        }
        else {

            exerciseCreatePayloadCopy[e.target.id] = e.target.value;
            setExerciseCreatePayload(exerciseCreatePayloadCopy)

        }

    }


    const handleSubmit = () => {
        var form_data = new FormData();
        for (var key in exerciseCreatePayload) {
            form_data.append(key, exerciseCreatePayload[key]);
        }
        
        dispatch(ACTION.createExercise(form_data))
    }




    let enableForm = () => {
        setListView(false);
    }

    let closeModal = () => {
        setHaveResponse(false);
    }
    return (
        <>
            <section className={FormStyle.commonFormArea}>
                <div className="container">
                    <div className="row ">

                        <>
                            {haveResponse &&
                                <div className={customModalStyle.customModalLayout}>
                                    <div className={customModalStyle.customModalBox}>
                                        <p className='text-center text-success'>{exercisesNameFromResponse} Exercise Created Successfully.</p>
                                        <button type='button' className='btn btn-success' onClick={() => closeModal()}>Ok</button>
                                    </div>
                                </div>
                            }


                            <div className="col-lg-8 ">

                                <div className={FormStyle.commonFormWrapper}>
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <h1 className={FormStyle.formTitle}>
                                                <span className={FormStyle.formTitlelogo}>
                                                    < MdOutlineSportsKabaddi />
                                                </span>
                                                Exercise Creation Information
                                            </h1>
                                        </div>

                                        {listView ?
                                            <>

                                                <div className='col-lg-4 text-end'>
                                                    <button type='button' className='common-gradient' onClick={() => enableForm()}>
                                                        <BiPlus /> Add New</button>
                                                </div>
                                                <div className='col-md-12'>
                      <div className={FormStyle.formCommonUnderline}></div>
                    </div>

                                                <div className="col-md-12">
                                                    <div className={FormStyle.allListTable}>
                                                        {allExercisesList.length > 0 ?


                                                            allExercisesList.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <div className='row pt-3'>
                                                                            <div className="col-md-12">
                                                                                <div className={FormStyle.exerciseListCard}>
                                                                                    <div className='row'>
                                                                                        <div className="col-lg-6">
                                                                                            <div className='row'>
                                                                                                <div className='col-lg-5'>
                                                                                                <div className={FormStyle.exerciseListCardPic}>
                                                                                                <Image src={item.images} alt="aboutpic" 
                                                                                                layout='fill' />
                                                                                            </div>
                                                                                                </div>
                                                                                                <div className='col-lg-7'>
                                                                                                 <p className={FormStyle.title}>{item.name}</p>
                                                                                                <p className={FormStyle.howToDo}>{item.how_to_do}</p>
                                                                                                <p className='common-para'>{item.description}</p>
 
                                                                                                </div>
                                                                                            </div>
                                                                                           
                                                                                           
                                                                                        </div>
                                                                                        <div className='col-lg-6'>
                                                                                             <div className={FormStyle.actionBox}>
                                                                                                 <button><BsFillEyeFill/></button>
                                                                                                 <button><MdModeEdit/></button>
                                                                                                 <button><HiTrash/></button>
                                                                                             </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })



                                                            :
                                                            <>
                                                                <p>No data found</p>
                                                            </>}

                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                             <div className='col-md-12'>
                      <div className={FormStyle.formCommonUnderline}></div>
                    </div>
                                                <div className="col-md-6">
                                                    <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor='exerciseName'>
                                                            Exercise Name (English)
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="exerciseName"
                                                            value={exerciseCreatePayload.exerciseName} 
                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor='hi_exerciseName'>
                                                            Exercise Name (Hindi)
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="hi_exerciseName"
                                                            value={exerciseCreatePayload.hi_exerciseName} 
                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor='description'>Description (English)</label>
                                                        <textarea

                                                            type="text"
                                                            id="description"
                                                            value={exerciseCreatePayload.description}
                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}>
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor='hi_description'>Description (Hindi)</label>
                                                        <textarea

                                                            type="text"
                                                            id="hi_description"
                                                            value={exerciseCreatePayload.hi_description}
                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}>
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor='how'>
                                                            How to do it (English)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="exerciseHowToDo"
                                                            value={exerciseCreatePayload.exerciseHowToDo}
                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor='how'>
                                                            How to do it (Hindi)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="hi_exerciseHowToDo"
                                                            value={exerciseCreatePayload.hi_exerciseHowToDo}
                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}

                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className={FormStyle.feildWrapper}>
                                                        <div className="input-group mb-3">
                                                            <label className={`${FormStyle.customGroup} input-group-text mb-0`} for="exerciseGif">Upload GIF Images</label>
                                                            <input
                                                                type="file"
                                                                className="form-control ps-2"
                                                                value={fileUrls.exerciseGif}
                                                                id="exerciseGif"
                                                                accept=".gif"
                                                                onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className={FormStyle.feildWrapper}>
                                                        <div className="input-group mb-3">
                                                            <label className={`${FormStyle.customGroup} input-group-text mb-0`}
                                                                for="exerciseImage">Upload Images</label>
                                                            <input
                                                                type="file"
                                                                className="form-control ps-2"
                                                                id="exerciseImage"
                                                                accept=".jpg,.jpeg,.png,.svg"
                                                                value={fileUrls.exerciseImage}
                                                                onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className={FormStyle.feildWrapper}>
                                                        <div className="input-group mb-3">
                                                            <label className={`${FormStyle.customGroup} input-group-text mb-0`} for="exerciseVideo">
                                                                Upload Videos</label>
                                                            <input type="file" className="form-control ps-2" id="exerciseVideo"
                                                                value={fileUrls.exerciseVideo}
                                                                onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                accept=".mp4,.mkv"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button type="button" className={FormStyle.formButton}
                                                        onClick={() => handleSubmit()}

                                                    >
                                                        Submit
                                                    </button>
                                                    <button type="button" className={`${FormStyle.formButtonPrev} ms-4`}>Cancel</button>
                                                </div>
                                            </>

                                        }

                                    </div>
                                </div>
                            </div>
                        </>

                        <div className="col-lg-4">
                            <div className={FormStyle.sideInfoBox}>
                                <div className={FormStyle.upper}>
                                    <h2 className={FormStyle.sideTitle}>
                                        <BiBody />
                                        Exercises
                                    </h2>
                                </div>
                                <div className={FormStyle.lower}>
                                    <p className="common-para">

                                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                                        It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                        Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                                        looked up one of the more obscure Latin words, consectetur,
                                        from a Lorem Ipsum passage, and going through the cites of the word in classical literature,

                                        discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                                        'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                                        This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..',
                                        comes from a line in section 1.10.32.

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </section>
        </>

    )
}

export default ExerciseCreation