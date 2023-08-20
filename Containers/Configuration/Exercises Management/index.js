import FormStyle from '../../../css/form.module.css';
import exercisesStyle from '../../../css/exercises.module.css'
import { useState, useEffect } from "react";
import { BiPlus } from 'react-icons/bi'
import customModalStyle from '../../../css/customModal.module.css'
import { BsFillEyeFill } from 'react-icons/bs'
import { MdModeEdit } from 'react-icons/md'
import { HiTrash } from 'react-icons/hi'
import Image from 'next/image';
import { BiBody } from 'react-icons/bi'
import * as ACTION from './action'
import * as CommonAction from '../../../Common Api Calls/commonAction'
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import { CommonText } from '../../../Multi_Lang';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'


function ExerciseManagement() {

    let [exerciseManagementPayload, setExerciseManagementPayload] = useState({
        UID: "",
        serial_no: "",
        name: "",
        how_to_do: "",
        description: "",
        hi_name: "",
        hi_how_to_do: "",
        hi_description: "",
        exerciseImage: "",
        exerciseVideo: "",
        exerciseGif: "",
    })

    let [fileUrls, setFileUrls] = useState({
        exerciseImage: "",
        exerciseVideo: "",
        exerciseGif: ""
    })

    let { addToast } = useToasts();

    let [isLoading, setIsLoading] = useState(true)
    let [isSubmiting, setIsSubmiting] = useState(false)
    let [haveResponse, setHaveResponse] = useState(false);
    let [listView, setListView] = useState(true);
    let [allExercisesList, setAllExercisesList] = useState([]);
    let [currentMode, setCurrentMode] = useState('')


    let dispatch = useDispatch();

    let state = useSelector((state) => state.ExerciseManagementReducer);
    let CommonState = useSelector((state) => state.commonReducer);

    useEffect(() => {
        setIsLoading(true)
        dispatch(CommonAction.getAllExercises())
    }, [state.createExerciseSuccess, state.updateExerciseSuccess]);



    useEffect(() => {
        if (CommonState.getAllExercisesSuccess) {
            setAllExercisesList(CommonState.getAllExercisesSuccess.allExercises)
            setIsLoading(false)
            addToast("Success!", {
                appearance: "success",
                content: `Get All Exercises Successfully.`,
            });
        }
        if (CommonState.getAllExercisesFailure) {
            setIsLoading(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get all exercises.`,
            });
        }

        dispatch(CommonAction.resetToInitialState())

    }, [CommonState.getAllExercisesSuccess, CommonState.getAllExercisesFailure])




    useEffect(() => {

        if (state.createExerciseSuccess) {
            setExerciseManagementPayload({
                UID: "",
                serial_no: "",
                name: "",
                how_to_do: "",
                description: "",
                hi_name: "",
                hi_how_to_do: "",
                hi_description: "",
                exerciseImage: "",
                exerciseVideo: "",
                exerciseGif: "",
            })

            setFileUrls({
                exerciseImage: "",
                exerciseVideo: "",
                exerciseGif: ""
            })
            setIsSubmiting(false)
            setHaveResponse(true);
            addToast("Success!", {
                appearance: "success",
                content: `Create diseases successfully.`,
            });


        }

        if (state.createExerciseFailure) {
            setIsSubmiting(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to create exercises.`,
            });
        }

        dispatch(ACTION.resetToInitialState())

    }, [state.createExerciseSuccess, state.createExerciseFailure])


    const exerciseFormOnChangeHandler = (e) => {
        let exerciseManagementPayloadCopy = { ...exerciseManagementPayload }

        if (e.target.type === 'file') {
            let fileUrlsCopy = { ...fileUrls }

            exerciseManagementPayloadCopy[e.target.id] = e.target.files[0]
            setExerciseManagementPayload(exerciseManagementPayloadCopy)

            fileUrlsCopy[e.target.id] = e.target.value
            setFileUrls(fileUrlsCopy)
        }
        else {

            exerciseManagementPayloadCopy[e.target.id] = e.target.value;
            setExerciseManagementPayload(exerciseManagementPayloadCopy)

        }

    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmiting(true)
        var form_data = new FormData();
        for (var key in exerciseManagementPayload) {
            form_data.append(key, exerciseManagementPayload[key]);
        }

        if (currentMode === 'Edit') {
            dispatch(ACTION.updateExercise(form_data))
        }
        else {
            if (currentMode !== 'view') {
                dispatch(ACTION.createExercise(form_data));
            }
        }

    }


    let enableForm = () => {
        setExerciseManagementPayload({
            UID: "",
            serial_no: "",
            name: "",
            how_to_do: "",
            description: "",
            hi_name: "",
            hi_how_to_do: "",
            hi_description: "",
            exerciseImage: "",
            exerciseVideo: "",
            exerciseGif: "",
        })

        setFileUrls({
            exerciseImage: "",
            exerciseVideo: "",
            exerciseGif: ""
        })

        setCurrentMode('')
        setListView(false);
        setIsSubmiting(false)
    }

    let closeModal = () => {
        setHaveResponse(false);
        setCurrentMode('')
        setListView(true);
    }

    let changeMode = (index, mode) => {
        setCurrentMode(mode)
        setExerciseManagementPayload(allExercisesList[index])
        setFileUrls({
            exerciseImage: "",
            exerciseVideo: "",
            exerciseGif: ""
        })
        setListView(false)
    }

    let disabledForm = () => {
        setListView(true);
    }


    useEffect(() => {
        if (state.updateExerciseSuccess) {
            setExerciseManagementPayload({
                UID: "",
                serial_no: "",
                name: "",
                how_to_do: "",
                description: "",
                hi_name: "",
                hi_how_to_do: "",
                hi_description: "",
                exerciseImage: "",
                exerciseVideo: "",
                exerciseGif: "",
            })

            setFileUrls({
                exerciseImage: "",
                exerciseVideo: "",
                exerciseGif: ""
            })
            addToast("Success!", {
                appearance: "success",
                content: `Exercise updated successfully.`,
            });
            setCurrentMode('')
            setListView(true)
            setIsSubmiting(false)
        }
        if (state.updateExerciseFailure) {
            setIsSubmiting(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to update exercises.`,
            });
        }

        dispatch(ACTION.resetToInitialState());

    }, [state.updateExerciseSuccess, state.updateExerciseFailure])

    return (
        <>
            <section className={FormStyle.commonFormArea}>
                <div className="container">
                    <div className="row ">

                        <>
                            {haveResponse &&
                                <div className={customModalStyle.customModalLayout}>
                                    <div className={customModalStyle.customModalBox}>
                                        <p className='text-center text-success'>
                                            <CommonText en="Exercise Created Successfully." hi="व्यायाम सफलतापूर्वक बनाया गया।" />
                                        </p>
                                        <button type='button' className='btn btn-success' onClick={() => closeModal()}>
                                            <CommonText en="Ok" hi="ठीक है" />
                                        </button>
                                    </div>
                                </div>
                            }
                            <div className="col-lg-8 ">
                                <div className={FormStyle.commonFormWrapper}>
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <h1 className={FormStyle.formTitle}>
                                                <span className={FormStyle.formTitlelogo}>
                                                    <BiBody />
                                                </span>
                                                <CommonText en="Exercise Management" hi="व्यायाम प्रबंधन" />
                                            </h1>
                                        </div>
                                        {isLoading ? <div className="search-Loader">
                                            <Loader
                                                color='#2bbf4f' />
                                        </div>
                                            : <>
                                                {listView ?
                                                    <>
                                                        <div className='col-lg-4 text-end'>
                                                            <button type='button' className='common-gradient' onClick={() => enableForm()}>
                                                                <BiPlus />
                                                                <CommonText en="Add New" hi="नया जोड़े" />
                                                            </button>
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
                                                                                <div className={FormStyle.exerciseListCard}>
                                                                                    <div className='row'>
                                                                                        <div className='col-lg-5'>
                                                                                            <div className={`${FormStyle.exerciseListCardPic} w-100 h-100`}>
                                                                                                <Image src={item.images ? item.images : '/images/dummy.png'} alt="aboutpic"
                                                                                                    layout='fill' />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-lg-7'>
                                                                                            <p className={FormStyle.title}><CommonText en={item.name} hi={item.hi_name} /></p>
                                                                                            <p className={`${FormStyle.howToDo} exerpt-text`}>
                                                                                                <CommonText en={item.how_to_do} hi={item.hi_how_to_do} />
                                                                                            </p>
                                                                                            <p className='common-para exerpt-text'>
                                                                                                <CommonText en={item.description} hi={item.hi_description} /></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={FormStyle.actionBox}>
                                                                                        <button type="button" onClick={() => changeMode(index, 'view')}><BsFillEyeFill /></button>
                                                                                        <button type="button" onClick={() => changeMode(index, 'Edit')}><MdModeEdit /></button>
                                                                                        <button><HiTrash /></button>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    })
                                                                    :
                                                                    <>
                                                                        <p>
                                                                            <CommonText en="No data found" hi="कोई डेटा नहीं मिला" />
                                                                        </p>
                                                                    </>}

                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <form onSubmit={(e) => handleSubmit(e)}>
                                                            <div className='row'>
                                                                <div className='col-md-12'>
                                                                    <div className={FormStyle.formCommonUnderline}></div>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor='serial_no'>
                                                                            <CommonText en="Serial No" hi="क्रम संख्या" />
                                                                        </label>

                                                                        <input
                                                                            type="text"
                                                                            id="serial_no"
                                                                            value={exerciseManagementPayload.serial_no}
                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                            disabled={currentMode === 'view'}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor='UID'>
                                                                            <CommonText en="UID" hi="यूआईडी" />
                                                                        </label>
                                                                        <input type="text" id="UID" value={exerciseManagementPayload.UID} onChange={(e) => exerciseFormOnChangeHandler(e)} disabled={currentMode === 'view'} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor='name'>
                                                                            <CommonText en="Exercise Name (English)" hi="व्यायाम का नाम (अंग्रेजी)" />
                                                                        </label>

                                                                        <input
                                                                            type="text"
                                                                            id="name"
                                                                            value={exerciseManagementPayload.name}
                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                            disabled={currentMode === 'view'}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor='hi_name'>
                                                                            <CommonText en="Exercise Name (Hindi)" hi="व्यायाम का नाम (हिंदी)" />
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="hi_name"
                                                                            value={exerciseManagementPayload.hi_name}
                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                            disabled={currentMode === 'view'}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor='how_to_do'>
                                                                            <CommonText en="How to do it (English)" hi="कैसे करें (अंग्रेज़ी)" />
                                                                        </label>
                                                                        <textarea
                                                                            type="text"
                                                                            id="how_to_do"
                                                                            value={exerciseManagementPayload.how_to_do}
                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                            disabled={currentMode === 'view'}
                                                                        >
                                                                        </textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor='hi_how_to_do'>
                                                                            <CommonText en="How to do it (Hindi)" hi="कैसे करें (हिंदी)" />
                                                                        </label>
                                                                        <textarea
                                                                            type="text"
                                                                            id="hi_how_to_do"
                                                                            value={exerciseManagementPayload.hi_how_to_do}
                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                            disabled={currentMode === 'view'}
                                                                        >
                                                                        </textarea>
                                                                    </div>
                                                                </div>

                                                                <div className='col-md-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor='description'>
                                                                            <CommonText en="Description (English)" hi="विवरण (अंग्रेजी)" />
                                                                        </label>
                                                                        <textarea
                                                                            type="text"
                                                                            id="description"
                                                                            value={exerciseManagementPayload.description}
                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                            disabled={currentMode === 'view'}
                                                                        >
                                                                        </textarea>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor='hi_description'>
                                                                            <CommonText en="Description (Hindi)" hi="विवरण (हिंदी)" />
                                                                        </label>
                                                                        <textarea
                                                                            type="text"
                                                                            id="hi_description"
                                                                            value={exerciseManagementPayload.hi_description}
                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                            disabled={currentMode === 'view'}
                                                                        >
                                                                        </textarea>
                                                                    </div>
                                                                </div>
                                                                {(currentMode === 'view' || currentMode === 'Edit') ? <>
                                                                    <section className={`${exercisesStyle.excercisesCards}  mt-5`}>
                                                                        <div className='row'>
                                                                            <div className="col-md-8 mb-3">
                                                                                <div className={`${exercisesStyle.excerciseSingleCard} m-0`}>
                                                                                    <div className={exercisesStyle.excerciseCardPic}>
                                                                                        <Image src={exerciseManagementPayload.images ? exerciseManagementPayload.images : "/images/dummy.png"} alt="exercise Image" layout='fill' />
                                                                                    </div>
                                                                                    <div className={exercisesStyle.excerciseCardContent}>
                                                                                        {currentMode === 'view' ?
                                                                                            <p className={exercisesStyle.title}>
                                                                                                <CommonText en="Image" hi="छवि" />
                                                                                            </p>
                                                                                            :
                                                                                            <div className='col-md-12'>
                                                                                                <div className={FormStyle.feildWrapper}>
                                                                                                    <div className="input-group mb-3">
                                                                                                        <label className={`${FormStyle.customGroup} input-group-text mb-0`}
                                                                                                            for="exerciseImage">
                                                                                                            <CommonText en="Replace Image" hi="छवि बदले" />
                                                                                                        </label>
                                                                                                        <input
                                                                                                            type="file"
                                                                                                            className="form-control ps-2"
                                                                                                            id="exerciseImage"
                                                                                                            accept=".jpg,.jpeg,.png,.svg"
                                                                                                            value={fileUrls.exerciseImage}
                                                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                                                            disabled={currentMode === 'view'}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-8 mb-3">
                                                                                <div className={`${exercisesStyle.excerciseSingleCard} m-0`}>
                                                                                    <div className={exercisesStyle.excerciseCardPic}>
                                                                                        <Image
                                                                                            src={exerciseManagementPayload.gif ? exerciseManagementPayload.gif : "/images/dummy.png"}
                                                                                            alt="exercise gif" layout='fill' />
                                                                                    </div>
                                                                                    <div className={exercisesStyle.excerciseCardContent}>
                                                                                        {currentMode === 'view' ?
                                                                                            <p className={exercisesStyle.title}>
                                                                                                <CommonText en="GIF" hi="जीआईएफ" />
                                                                                            </p>
                                                                                            :
                                                                                            <div className='col-md-12'>
                                                                                                <div className={FormStyle.feildWrapper}>
                                                                                                    <div className="input-group mb-3">
                                                                                                        <label className={`${FormStyle.customGroup} input-group-text mb-0`} for="exerciseGif">
                                                                                                            <CommonText en="Replace GIF" hi="जीआईएफ बदले" />
                                                                                                        </label>
                                                                                                        <input
                                                                                                            type="file"
                                                                                                            className="form-control ps-2"
                                                                                                            value={fileUrls.exerciseGif}
                                                                                                            id="exerciseGif"
                                                                                                            accept=".gif"
                                                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                                                            disabled={currentMode === 'view'}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-8 mb-3">
                                                                                <div className={`${exercisesStyle.excerciseSingleCard} m-0`}>
                                                                                    <div className={exercisesStyle.excerciseCardPic}>
                                                                                        {exerciseManagementPayload.videos ?
                                                                                            <video width="100%" height="100%" controls>
                                                                                                <source src={exerciseManagementPayload.videos} type="video/mp4" />
                                                                                            </video>
                                                                                            :
                                                                                            <Image src="/images/dummy.png" alt="exercise video" layout='fill' />
                                                                                        }
                                                                                    </div>
                                                                                    <div className={exercisesStyle.excerciseCardContent}>
                                                                                        {currentMode === 'view' ?
                                                                                            <p className={exercisesStyle.title}>
                                                                                                <CommonText en="Video" hi="वीडियो" />
                                                                                            </p>
                                                                                            :
                                                                                            <div className='col-md-12'>
                                                                                                <div className={FormStyle.feildWrapper}>
                                                                                                    <div className="input-group mb-3">
                                                                                                        <label className={`${FormStyle.customGroup} input-group-text mb-0`} for="exerciseVideo">
                                                                                                            <CommonText en="Replace Video" hi="वीडियो बदले" />
                                                                                                        </label>
                                                                                                        <input type="file" className="form-control ps-2" id="exerciseVideo"
                                                                                                            value={fileUrls.exerciseVideo}
                                                                                                            onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                                                            accept=".mp4,.mkv"
                                                                                                            disabled={currentMode === 'view'}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </>
                                                                    :
                                                                    <>
                                                                        <div className='col-md-12'>
                                                                            <div className={FormStyle.feildWrapper}>
                                                                                <div className="input-group mb-3">
                                                                                    <label className={`${FormStyle.customGroup} input-group-text mb-0`} for="exerciseGif">
                                                                                        <CommonText en="Upload GIF" hi="जीआईएफ अपलोड करें" />
                                                                                    </label>
                                                                                    <input
                                                                                        type="file"
                                                                                        className="form-control ps-2"
                                                                                        value={fileUrls.exerciseGif}
                                                                                        id="exerciseGif"
                                                                                        accept=".gif"
                                                                                        onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                                        disabled={currentMode === 'view'}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-md-12'>
                                                                            <div className={FormStyle.feildWrapper}>
                                                                                <div className="input-group mb-3">
                                                                                    <label className={`${FormStyle.customGroup} input-group-text mb-0`}
                                                                                        for="exerciseImage">
                                                                                        <CommonText en="Upload Image" hi="छवि अपलोड करें" />
                                                                                    </label>
                                                                                    <input
                                                                                        type="file"
                                                                                        className="form-control ps-2"
                                                                                        id="exerciseImage"
                                                                                        accept=".jpg,.jpeg,.png,.svg"
                                                                                        value={fileUrls.exerciseImage}
                                                                                        onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                                        disabled={currentMode === 'view'}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-md-12'>
                                                                            <div className={FormStyle.feildWrapper}>
                                                                                <div className="input-group mb-3">
                                                                                    <label className={`${FormStyle.customGroup} input-group-text mb-0`} for="exerciseVideo">
                                                                                        <CommonText en="Upload Video" hi="वीडियो अपलोड करें" />
                                                                                    </label>
                                                                                    <input type="file" className="form-control ps-2" id="exerciseVideo"
                                                                                        value={fileUrls.exerciseVideo}
                                                                                        onChange={(e) => exerciseFormOnChangeHandler(e)}
                                                                                        accept=".mp4,.mkv"
                                                                                        disabled={currentMode === 'view'}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }
                                                                <div className="col-md-12">
                                                                    {currentMode !== 'view' &&
                                                                        <button type="submit" className={FormStyle.formButton} disabled={isSubmiting}
                                                                        >
                                                                            {currentMode === 'Edit' ? <CommonText en="Update" hi="अपडेट करें" /> : <CommonText en="Submit" hi="सुनिश्चित करें" />}
                                                                        </button>
                                                                    }
                                                                    <button type="button" className={`${FormStyle.formButtonPrev} ms-4`} onClick={() => disabledForm()}>
                                                                        <CommonText en="Cancel" hi="रद्द करें" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </>
                                                }
                                            </>}
                                    </div>
                                </div>
                            </div>
                        </>
                        <div className="col-lg-4">
                            <div className={FormStyle.sideInfoBox}>
                                <div className={FormStyle.upper}>
                                    <h2 className={FormStyle.sideTitle}>
                                        <BiBody />
                                        <CommonText en="Exercise Management" hi="व्यायाम प्रबंधन" />
                                    </h2>
                                </div>
                                <div className={FormStyle.lower}>
                                    <p className="common-para">
                                        <CommonText en="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.

Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean." hi="आरोग्य पथ समाज को स्वस्थ बनाने की ओर एक प्रयास है। यह पारंपरिक वैध श्री कामदेव प्रसाद पैन्यूली जी व उनके सुपुत्र श्री हरीश पैन्यूली जी, जडी बूटी फार्म​, ग्राम कोह्लू पानी, नन्दा की चौकी, देहरादून मे रोग नीवारसा का कार्य कर रहे है। यहाँ जीव विज्ञान नाडी परि​​​क्षण, चेहरे के भाव, आधुनिक मैडिकल लैब परि​​​क्षण व अन्न्य विधियो के प्रयोगों से रोगी के शरीर में रोग कारण पता कर के उनका उपचार किया जाता है। यहां सभी औषधियां वैध जी की देख रेख में ही बनाई जाती है। यहाँ एक प्रयास किया जाता है कि सिर्फ रोग को ही ठीक नहीं किया जाये परन्तु शरीर को स्वस्थ रखने व रोग प्रतिरोध क्षमता भी बडाई जाये। यह अपने आप में एक अनूठा प्रयास है और यहां सारा कार्य सेवा भाव से किया जाता है।

बहुत दूर, पहाड़ों शब्द के पीछे, वोकालिया और कॉन्सोनेंटिया देशों से दूर, अंधे ग्रंथ रहते हैं। अलग होकर वे सिमेंटिक्स के तट पर बुकमार्क्सग्रोव में रहते हैं, एक बड़ा भाषा महासागर।

बहुत दूर, पहाड़ों शब्द के पीछे, वोकालिया और कॉन्सोनेंटिया देशों से दूर, अंधे ग्रंथ रहते हैं। अलग होकर वे सिमेंटिक्स के तट पर बुकमार्क्सग्रोव में रहते हैं, एक बड़ा भाषा महासागर। बहुत दूर, पहाड़ों शब्द के पीछे, वोकालिया और कॉन्सोनेंटिया देशों से दूर, अंधे ग्रंथ रहते हैं। अलग होकर वे सिमेंटिक्स के तट पर बुकमार्क्सग्रोव में रहते हैं, एक बड़ा भाषा महासागर।

बहुत दूर, पर्वत शब्द के पीछे, वोकालिया और कंसोनेंटिया देशों से दूर, अंधे ग्रंथ रहते हैं। अलग-अलग वे शब्दार्थ के तट पर बुकमार्कग्रोव में रहते हैं, एक बड़ा भाषा महासागर।"/>
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

export default ExerciseManagement