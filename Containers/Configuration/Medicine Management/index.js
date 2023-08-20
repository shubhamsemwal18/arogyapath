import FormStyle from '../../../css/form.module.css';
import customModalStyle from '../../../css/customModal.module.css'
import { GiMedicines } from 'react-icons/gi';
import { IoTrashBin } from 'react-icons/io5';
import { AiFillMedicineBox } from 'react-icons/ai';
import { CreateMedicine } from '../../../MultiLanguageFiles/createMedicine';
import { useEffect, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi'
import { BiPlus } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from './action'
import { useToasts } from "react-toast-notifications";
import * as CommonAction from '../../../Common Api Calls/commonAction'
import exercisesStyle from '../../../css/exercises.module.css'
import Image from 'next/image';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { CommonText } from '../../../Multi_Lang';

function MedicineManagement() {

    let [medicineManagementPayload, setMedicineManagementPayload] = useState({
        UID: '',
        name: "",
        hi_name: "",
        video: "",
        yt_video: "",
        date_of_manufacturing: "",
        expirable: "",
        date_of_expiry: "",
        all_way_of_taken: [],
    })

    let [way_of_taken, setWay_of_taken] = useState({})

    let [fileUrls, setFileUrls] = useState({
        video: "",
    })

    let { addToast } = useToasts();
    let [listView, setListView] = useState(true);
    let [allMedicineList, setAllMedicineList] = useState([]);


    const CommonState = useSelector((state) => state.commonReducer);
    const state = useSelector((state) => state.MedicineManagementReducer);
    let dispatch = useDispatch();
    let [isLoading, setIsLoading] = useState(true)
    let [isSubmiting, setIsSubmiting] = useState(false)
    let [haveResponse, setHaveResponse] = useState(false);
    let [currentMode, setCurrentMode] = useState('')

    useEffect(() => {
        setIsLoading(true)
        dispatch(CommonAction.getAllMedicine())
    }, [state.createMedicineSuccess, state.updateMedicineSuccess])


    useEffect(() => {
        if (CommonState.getAllMedicineSuccess) {
            setIsLoading(false)
            setAllMedicineList(CommonState.getAllMedicineSuccess.allMedicine)
            addToast("Success!", {
                appearance: "success",
                content: `Get All Medicine Success.`,
            });
        }
        if (CommonState.getAllMedicineFailure) {
            setIsLoading(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get all medicines.`,
            });
        }

        dispatch(CommonAction.resetToInitialState())

    }, [CommonState.getAllMedicineSuccess, CommonState.getAllMedicineFailure])

    let onDeleteHandler = (index) => {
        let medicineManagementPayloadCopy = { ...medicineManagementPayload };
        medicineManagementPayloadCopy.all_way_of_taken = medicineManagementPayloadCopy.all_way_of_taken.filter((item, ind) => index != ind);
        setMedicineManagementPayload(medicineManagementPayloadCopy)
    }

    useEffect(() => {
        if (state.createMedicineSuccess) {
            setMedicineManagementPayload({
                UID: '',
                name: "",
                hi_name: "",
                video: "",
                yt_video: "",
                date_of_manufacturing: "",
                expirable: "",
                date_of_expiry: "",
                all_way_of_taken: [],
            })

            setWay_of_taken({})
            setFileUrls({
                video: "",
            })

            setIsSubmiting(false)
            setHaveResponse(true);
            addToast("Success!", {
                appearance: "success",
                content: `Create medicine successfully.`,
            });
            setIsLoading(true)
        }
        if (state.createMedicineFailure) {
            setIsSubmiting(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to create medicine.`,
            });
        }

        dispatch(ACTIONS.resetToInitialState());

    }, [state.createMedicineSuccess, state.createMedicineFailure])

    let medicineFormOnChangeHandler = (e) => {
        let medicineManagementPayloadopy = { ...medicineManagementPayload }

        if (e.target.type === 'file') {
            let fileUrlsCopy = { ...fileUrls }

            medicineManagementPayloadopy[e.target.id] = e.target.files[0]
            setMedicineManagementPayload(medicineManagementPayloadopy)

            fileUrlsCopy[e.target.id] = e.target.value
            setFileUrls(fileUrlsCopy)
        }
        else {

            medicineManagementPayloadopy[e.target.id] = e.target.value;
            setMedicineManagementPayload(medicineManagementPayloadopy);
        }
    }

    let addWayofTaken = () => {
        let way_of_takenCopy = { ...way_of_taken };
        let medicineManagementPayloadCopy = { ...medicineManagementPayload }

        if (way_of_takenCopy.way_of_taken && way_of_takenCopy.way_of_taken !== '') {

            medicineManagementPayloadCopy.all_way_of_taken.push(way_of_takenCopy);

            setMedicineManagementPayload(medicineManagementPayloadCopy);
            setWay_of_taken({
                'way_of_taken': "",
                'hi_way_of_taken': ""
            })
        }
        else {
            return alert("Please Fill the way of taken")
        }
    };

    let changewayoftaken = (e) => {
        let way_of_takenCopy = { ...way_of_taken }
        way_of_takenCopy[e.target.id] = e.target.value;
        setWay_of_taken(way_of_takenCopy);
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        setIsSubmiting(true)

        let medicineManagementPayloadCopy = { ...medicineManagementPayload }
        medicineManagementPayloadCopy.all_way_of_taken = JSON.stringify(medicineManagementPayloadCopy.all_way_of_taken)

        var form_data = new FormData();
        for (var key in medicineManagementPayloadCopy) {
            form_data.append(key, medicineManagementPayloadCopy[key]);
        }

        if (currentMode === 'Edit') {
            dispatch(ACTIONS.updateMedicine(form_data))
        }
        else {
            if (currentMode !== 'view') {
                dispatch(ACTIONS.createMedicine(form_data));
            }
        }

    }


    let enableForm = () => {
        setMedicineManagementPayload({
            UID: '',
            name: "",
            hi_name: "",
            video: "",
            yt_video: "",
            date_of_manufacturing: "",
            expirable: "",
            date_of_expiry: "",
            all_way_of_taken: [],
        })
        setWay_of_taken({})
        setFileUrls({
            video: "",
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
        setMedicineManagementPayload(allMedicineList[index])

        setWay_of_taken({})
        setFileUrls({
            video: "",
        })
        setListView(false)
    }

    let disabledForm = () => {
        setListView(true);
    }

    useEffect(() => {
        if (state.updateMedicineSuccess) {
            setMedicineManagementPayload({
                UID: '',
                name: "",
                hi_name: "",
                video: "",
                yt_video: "",
                date_of_manufacturing: "",
                expirable: "",
                date_of_expiry: "",
                all_way_of_taken: [],
            })
            setWay_of_taken({})
            setFileUrls({
                video: "",
            })
            setIsLoading(true)
            setCurrentMode('')
            setListView(true)
            setIsSubmiting(false)
            dispatch(CommonAction.getAllMedicine())

            addToast("Success!", {
                appearance: "success",
                content: `Medicine updated successfully.`,
            });

        }
        if (state.updateMedicineFailure) {
            setIsSubmiting(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to update medicine.`,
            });
        }

        dispatch(ACTIONS.resetToInitialState());

    }, [state.updateMedicineSuccess, state.updateMedicineFailure])

    return (
        <section className={FormStyle.commonFormArea}>
            <div className="container ">
                <div className="row">
                    <>
                        {haveResponse &&
                            <div className={customModalStyle.customModalLayout}>
                                <div className={customModalStyle.customModalBox}>
                                    <p className='text-center text-success'>
                                        <CommonText en="medicine Created Successfully." hi="दवा सफलतापूर्वक बनाई गई।" />
                                    </p>
                                    <button type='button' className='btn btn-success' onClick={() => closeModal()}>
                                        <CommonText en="Ok" hi="ठीक है" />
                                    </button>
                                </div>
                            </div>
                        }

                        <div className="col-lg-8 ">
                            <div className={FormStyle.commonFormWrapper}>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <h1 className={FormStyle.formTitle}>
                                            <span className={FormStyle.formTitlelogo}>
                                                <GiMedicines />
                                            </span>
                                            <CommonText en="Medicine Management" hi="औषधि प्रबंधन" />
                                        </h1>
                                    </div>
                                    {isLoading ?
                                        <div className="search-Loader">
                                            <Loader
                                                color='#2bbf4f' />
                                        </div>
                                        : <>
                                            {listView ? <>
                                                <div className='col-lg-4 text-end'>
                                                    <button type='button' className='common-gradient' onClick={() => enableForm()}><BiPlus />
                                                        <CommonText en="Add New" hi="नया जोड़े" />
                                                    </button>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className={FormStyle.formCommonUnderline}></div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className={FormStyle.allListTable}>
                                                        {allMedicineList.length > 0 ? <table>
                                                            <tr className={FormStyle.allListTableHeadings}>
                                                                <th>
                                                                    <CommonText en="S.N." hi="क्र.सं." />
                                                                </th>
                                                                <th>
                                                                    <CommonText en="Medicine S.N." hi="औषधि क्र.सं." />
                                                                </th>
                                                                <th>
                                                                    <CommonText en="Name" hi="नाम" />
                                                                </th>
                                                                <th>
                                                                    <CommonText en="Hindi Name" hi="हिंदी नाम" />
                                                                </th>
                                                                <th className={FormStyle.allListTableActionList}></th>
                                                            </tr>
                                                            {
                                                                allMedicineList.map((item, index) => {
                                                                    return (
                                                                        <tr className={FormStyle.allListTableSingleRow}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{item.UID}</td>
                                                                            <td>{item.name}</td>
                                                                            <td>{item.hi_name}</td>
                                                                            <td className={FormStyle.allListTableActionList}>
                                                                                <ul className={FormStyle.actionList}>
                                                                                    <li className="nav-item dropdown">
                                                                                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                            <HiDotsVertical />
                                                                                        </span>
                                                                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                                                            <li>
                                                                                                <div onClick={() => changeMode(index, 'view')}>
                                                                                                    <span className="dropdown-item">
                                                                                                        <CommonText en="View" hi="देखे" />
                                                                                                    </span>
                                                                                                </div>
                                                                                            </li>
                                                                                            <li>
                                                                                                <div onClick={() => changeMode(index, 'Edit')}>
                                                                                                    <span className="dropdown-item">
                                                                                                        <CommonText en="Edit" hi="संशोधित करे" />
                                                                                                    </span>
                                                                                                </div>
                                                                                            </li>
                                                                                            <li>
                                                                                                <div>
                                                                                                    <span className="dropdown-item">
                                                                                                        <CommonText en="Delete" hi="हटाये" />
                                                                                                    </span>
                                                                                                </div>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </li>
                                                                                </ul>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </table>
                                                            :
                                                            <>
                                                                <p>
                                                                    <CommonText en="No data found" hi="कोई डेटा नहीं मिला" />
                                                                </p>
                                                            </>}

                                                    </div>
                                                </div>


                                            </>
                                                : <>
                                                    <form onSubmit={(e) => handleSubmit(e)}>
                                                        <div className='row'>
                                                            <div className="col-md-4">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label>
                                                                        <CommonText en="Medicine Name (English)" hi="औषधि नाम (अंग्रेजी)" />
                                                                    </label>
                                                                    <input type="text"
                                                                        id="name"
                                                                        value={medicineManagementPayload.name}
                                                                        onChange={(e) => medicineFormOnChangeHandler(e)}
                                                                        disabled={currentMode === 'view'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label>
                                                                        <CommonText en="Medicine Name (Hindi)" hi="औषधि नाम (हिंदी)" />
                                                                    </label>
                                                                    <input type="text"
                                                                        id="hi_name"
                                                                        value={medicineManagementPayload.hi_name}
                                                                        onChange={(e) => medicineFormOnChangeHandler(e)}
                                                                        disabled={currentMode === 'view'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label htmlFor='UID'>
                                                                        <CommonText en="UID" hi="यूआईडी" />
                                                                    </label>
                                                                    <input type="text"
                                                                        id="UID"
                                                                        value={medicineManagementPayload.UID}
                                                                        onChange={(e) => medicineFormOnChangeHandler(e)}
                                                                        disabled={currentMode === 'view'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {currentMode !== 'view' && <>
                                                                <div className="col-md-5">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label>
                                                                            <CommonText en="Way Of Taken (English)" hi="लेने की विधि (अंग्रेजी)" />
                                                                        </label>
                                                                        <textarea
                                                                            id="way_of_taken"
                                                                            value={way_of_taken.way_of_taken}
                                                                            onChange={(e) => changewayoftaken(e)}
                                                                        >
                                                                        </textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-5">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label>
                                                                            <CommonText en="Way Of Taken (Hindi)" hi="लेने की विधि (हिंदी)" />
                                                                        </label>
                                                                        <textarea
                                                                            id="hi_way_of_taken"
                                                                            value={way_of_taken.hi_way_of_taken}
                                                                            onChange={(e) => changewayoftaken(e)}
                                                                            disabled={currentMode === 'view'}
                                                                        >
                                                                        </textarea>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-2 d-flex align-items-center'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <button type='button' className='common-gradient' onClick={() => addWayofTaken()}><BiPlus />
                                                                            <CommonText en="Add & Save" hi="जोड़ें और सहेजें" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </>}
                                                            {medicineManagementPayload.all_way_of_taken && medicineManagementPayload.all_way_of_taken.length > 0 && <>
                                                                <div className={FormStyle.allListTable}>
                                                                    <table>
                                                                        <tr className={FormStyle.allListTableHeadings}>
                                                                            <th>
                                                                                <CommonText en="S.N." hi="क्र.सं." />
                                                                            </th>
                                                                            <th>
                                                                                <CommonText en="Way of taken" hi="लेने की विधि (अंग्रेजी)" />
                                                                            </th>
                                                                            <th>
                                                                                <CommonText en="Way of taken Hindi" hi="लेने की विधि (हिंदी)" />
                                                                            </th>
                                                                            {currentMode !== "view" &&
                                                                                <th className={FormStyle.allListTableActionList}></th>
                                                                            }
                                                                        </tr>
                                                                        {medicineManagementPayload.all_way_of_taken.map((item, index) => {
                                                                            return (
                                                                                <tr className={FormStyle.allListTableSingleRow} key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{item.way_of_taken}</td>
                                                                                    <td>{item.hi_way_of_taken}</td>
                                                                                    {currentMode !== "view" &&
                                                                                        <td>
                                                                                            <button type="button" className={FormStyle.commonDelete}
                                                                                                onClick={() => onDeleteHandler(index)}>
                                                                                                <IoTrashBin />
                                                                                            </button>
                                                                                        </td>
                                                                                    }
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </table>
                                                                </div>
                                                            </>}
                                                            <div className="col-md-6">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label>
                                                                        <CommonText en="Date Of Manufacturing" hi="निर्माण की तिथि" />
                                                                    </label>
                                                                    <input type="date"
                                                                        id="date_of_manufacturing"
                                                                        value={medicineManagementPayload.date_of_manufacturing}
                                                                        onChange={(e) => medicineFormOnChangeHandler(e)}
                                                                        disabled={currentMode === 'view'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label >
                                                                        <CommonText en="Expirable" hi="एक्सपायर होने योग्य" />
                                                                    </label>
                                                                    <div className="d-flex align-items-center">

                                                                        <div className="me-3">
                                                                            <input
                                                                                type="radio"
                                                                                id="expirable"
                                                                                name="fav_language"
                                                                                value='1'
                                                                                checked={medicineManagementPayload.expirable === '1' || medicineManagementPayload.expirable === 1}
                                                                                onChange={(e) => medicineFormOnChangeHandler(e)}
                                                                                disabled={currentMode === 'view'}
                                                                            />
                                                                            <label htmlFor="html" className="ps-2">
                                                                                <CommonText en="Yes" hi="हां" />
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type="radio"
                                                                                id="expirable"
                                                                                name="fav_language"
                                                                                value='0'
                                                                                checked={medicineManagementPayload.expirable === '0' || medicineManagementPayload.expirable === 0}
                                                                                onChange={(e) => medicineFormOnChangeHandler(e)}
                                                                                disabled={currentMode === 'view'}
                                                                            />
                                                                            <label htmlFor="css" className="ps-2">
                                                                                <CommonText en="No" hi="नहीं" />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {(medicineManagementPayload.expirable === '1' || medicineManagementPayload.expirable === 1) &&
                                                                <div className="col-md-6">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label>
                                                                            <CommonText en="Date Of Expiry" hi="एक्सपायरी तिथि" />
                                                                        </label>
                                                                        <input type="date"
                                                                            id="date_of_expiry"
                                                                            value={medicineManagementPayload.date_of_expiry}
                                                                            onChange={(e) => medicineFormOnChangeHandler(e)}
                                                                            disabled={currentMode === 'view'}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }


                                                            <div className='col-md-8'>
                                                                <h1 className={` p-0 mb-0 mt-3 ${FormStyle.formTitle}`}>
                                                                    <CommonText en="Custom Video" hi="कस्टम वीडियो" />
                                                                </h1>
                                                            </div>
                                                            {(currentMode === 'view' || currentMode === 'Edit') ? <>
                                                                <section className={`${exercisesStyle.excercisesCards}`}>
                                                                    <div className='row'>
                                                                        <div className="col-md-8 mb-3">
                                                                            <div className={`${exercisesStyle.excerciseSingleCard} m-0`}>
                                                                                <div className={exercisesStyle.excerciseCardPic}>
                                                                                    {medicineManagementPayload.video ?
                                                                                        <video width="100%" height="100%" controls>
                                                                                            <source src={medicineManagementPayload.video} type="video/mp4" />
                                                                                        </video>
                                                                                        :
                                                                                        <Image src="/images/dummy.png" alt="video" layout='fill' />
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
                                                                                                    <label className={`${FormStyle.customGroup} input-group-text mb-0`} for="video">
                                                                                                        <CommonText en="Replace Video" hi="वीडियो बदलें" />
                                                                                                    </label>
                                                                                                    <input type="file" className="form-control ps-2" id="medicinevideo"
                                                                                                        value={fileUrls.medicinevideo}
                                                                                                        onChange={(e) => medicineFormOnChangeHandler(e)}
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
                                                                                <label className={`${FormStyle.customGroup} input-group-text mb-0`} for="video">
                                                                                    <CommonText en="Upload Video" hi="वीडियो डालें" />
                                                                                </label>
                                                                                <input type="file" className="form-control ps-2" id="video"
                                                                                    value={fileUrls.video}
                                                                                    onChange={(e) => medicineFormOnChangeHandler(e)}
                                                                                    accept=".mp4,.mkv"
                                                                                    disabled={currentMode === 'view'}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }

                                                            <div className='col-md-8'>
                                                                <h1 className={FormStyle.formTitle}>
                                                                    <CommonText en="YOUTUBE Video" hi="यूट्यूब वीडियो" />
                                                                </h1>
                                                            </div>
                                                            <div className='col-lg-6 '>
                                                                <div className={exercisesStyle.excerciseSingleCard}>
                                                                    <div className={exercisesStyle.excerciseCardPic}>
                                                                        <div className={exercisesStyle.videoBox}>
                                                                            <iframe width="100%" height="100%" className='bg-secondary'
                                                                                src={medicineManagementPayload.yt_video}>
                                                                            </iframe>
                                                                        </div>
                                                                        {currentMode !== 'view' &&
                                                                            <div className={`${exercisesStyle.excerciseCardContent}`}>
                                                                                <div class="input-group mb-3">
                                                                                    <div class="input-group-prepend">
                                                                                        <span class="input-group-text rounded-0" id="basic-addon">
                                                                                            <CommonText en="URL" hi="यूआरएल" />
                                                                                        </span>
                                                                                    </div>
                                                                                    <input type="text" className="form-control ps-2" aria-describedby="basic-addon" id="yt_video"
                                                                                        value={medicineManagementPayload.yt_video}
                                                                                        onChange={(e) => medicineFormOnChangeHandler(e)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                {currentMode !== 'view' &&
                                                                    <button type="submit" className={FormStyle.formButton} disabled={isSubmiting}>

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
                                    <AiFillMedicineBox />
                                    <CommonText en="Medicine Management" hi="औषधि प्रबंधन" />
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

    )
}

export default MedicineManagement