import FormStyle from "../../css/form.module.css";
import customModalStyle from '../../css/customModal.module.css'
import React, { useState, useEffect } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { HiPlus } from "react-icons/hi"
import { IoTrashBin } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Image from "next/image";
import Capture from '../../Common Component/ImageCapture/index'
import * as ACTIONS from './action'
import * as CommonACTIONS from '../../Common Api Calls/commonAction'
import { PreconsultationLang } from "../../MultiLanguageFiles/preConsultation";
import { CommonLang } from "../../MultiLanguageFiles/common";
import LoadingSpin from "react-loading-spin";
import { CommonText } from '../../Multi_Lang';
import { CommonPlainText } from '../../Multi_Lang/text';
import { PatientPrevDetails } from "../../Common Component/PatientPrevDetails";

import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

export const PreConsultation = () => {

    let dispatch = useDispatch();
    let { addToast } = useToasts();
    let state = useSelector((state) => state.PreConsultationReducer);
    let commonState = useSelector((state) => state.commonReducer);
    let [haveResponse, setHaveResponse] = useState(false)
    let [isLoading, setIsLoading] = useState(true);
    let [isSearching, setIsSearching] = useState(false);
    let [isSubmitting, setIsSubmitting] = useState(false)
    let [patientAllPrevData, setPatientAllPrevData] = useState([])
    let [reports, setReports] = useState([])

    let [captureImage, setCaptureImage] = useState(null);

    let [formView, setFormView] = useState(false);
    let [isTodayAnyPatient, setIsTodayAnyPatient] = useState(false);
    let [todayAllTokens, setTodayAllTokens] = useState([])
    let [patientDetails, setPatientDetails] = useState({})
    let [otherReportName, setOtherReportName] = useState(false)

    let [preConsultationPayload, setPreConsultationPayload] = useState({
        'token_id': '',
        'oxymeter_reading': {},
        'time_period': {},
        'report': [],
        'time_period': { time_value: '', time_type: 'Year' },
        'pre_Pulse_Observation': {}
    })

    let [selectedReport, setSelectedReport] = useState('')

    let [allReportList, setAllReportList] = useState([]);
    let [reportsPayload, setreportsPayload] = useState({
        reportName: '',
        report: ''
    })

    let resetToInitialState = () => {
        setIsLoading(false)
        setIsSearching(false)
        setIsSubmitting(false)
        setCaptureImage(null)
        setFormView(false)
        setPatientDetails({})
        setOtherReportName(false)
        setPreConsultationPayload({
            'token_id': '',
            'oxymeter_reading': {},
            'time_period': {},
            'report': [],
            'time_period': { time_value: '', time_type: 'Year' },
            'pre_Pulse_Observation': {}
        })
        setSelectedReport('')
        setAllReportList([])
        setreportsPayload({
            reportName: '',
            report: ''
        })
        setPatientAllPrevData([])
    }

    useEffect(() => {
        dispatch(CommonACTIONS.getAllPreConsultationReport())
    }, [])

    useEffect(() => {
        dispatch(CommonACTIONS.getTodayTokens('Registered'))
    }, [state.RegisterPreConsultaionSuccess])

    useEffect(() => {
        if (commonState.GetTodayTokenSuccess) {
            setIsLoading(false)
            if (commonState.GetTodayTokenSuccess.tokens.length === 0) {
                setIsTodayAnyPatient(false)
            }
            else {
                setIsTodayAnyPatient(true)
                setTodayAllTokens(commonState.GetTodayTokenSuccess.tokens)
            }
        }

        if (commonState.GetTodayTokenFailure) {
            setIsLoading(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get today all tokens.`,
            });
        }

        dispatch(CommonACTIONS.resetToInitialState())
    }, [commonState.GetTodayTokenSuccess, commonState.GetTodayTokenFailure])

    useEffect(() => {
        if (commonState.getPreConsultationResportSuccess) {
            setReports(commonState.getPreConsultationResportSuccess.data)
            addToast("Success!", {
                appearance: "success",
                content: `Get All Reports Success.`,
            });
        }
        if (commonState.getPreConsultationResportFailure) {
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get all Reports.`,
            });
        }

        dispatch(CommonACTIONS.resetToInitialState())

    }, [commonState.getPreConsultationResportSuccess, commonState.getPreConsultationResportFailure])

    let tokenChangeHandler = (e) => {
        if (e.target.value != '') {
            let preConsultationPayloadCopy = { ...preConsultationPayload }
            preConsultationPayloadCopy['token_id'] = e.target.value;
            setPreConsultationPayload(preConsultationPayloadCopy);
            setIsSearching(true)
            dispatch(CommonACTIONS.getPatientByToken({
                'token_id': e.target.value,
            }))
            dispatch(CommonACTIONS.getPatientAllPrevData({
                'token_id': e.target.value,
            }))
        }
    }

    useEffect(() => {
        if (commonState.GetPatientByTokenNoSuccess) {
            let preConsultationPayloadCopy = { ...preConsultationPayload }
            preConsultationPayloadCopy['patient_id'] = commonState.GetPatientByTokenNoSuccess.patientDetails.id
            setPreConsultationPayload(preConsultationPayloadCopy)
            setPatientDetails(commonState.GetPatientByTokenNoSuccess.patientDetails)
            setFormView(true)
        }

        if (commonState.GetPatientByTokenNoFailure) {
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patient details by token no.`,
            });
        }

        dispatch(CommonACTIONS.resetToInitialState())
    }, [commonState.GetPatientByTokenNoSuccess, commonState.GetPatientByTokenNoFailure])

    useEffect(() => {
        if (commonState.getAllPrevDataSuccess) {
            setIsSearching(false)
            setPatientAllPrevData(commonState.getAllPrevDataSuccess.data)
        }

        if (commonState.getAllPrevDataFailure) {
            setIsSearching(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patient previous details.`,
            });
        }

        dispatch(CommonACTIONS.resetToInitialState())
    }, [commonState.getAllPrevDataSuccess, commonState.getAllPrevDataFailure])


    useEffect(() => {
        if (state.RegisterPreConsultaionSuccess) {
            addToast("Success!", {
                appearance: "success",
                content: `Patient preconsultated successfully.`,
            });
            setHaveResponse(true)
            resetToInitialState();
        }

        if (state.RegisterPreConsultaionFailure) {
            addToast("Error!", {
                appearance: "error",
                content: `Unable to preconsultated patient.`,
            });
        }

        dispatch(ACTIONS.resetToInitialState())
    }, [state.RegisterPreConsultaionSuccess, state.RegisterPreConsultaionFailure])


    let onChangeHandler = (e) => {
        let preConsultationPayloadCopy = { ...preConsultationPayload }

        if (e.target.type === 'file') {

            preConsultationPayloadCopy[e.target.id] = e.target.files[0]
            setPreConsultationPayload(preConsultationPayloadCopy)
        }
        else {
            if (e.target.id === 'reportName' || e.target.id === 'report') {

                let reportsPayloadCopy = { ...reportsPayload }
                reportsPayloadCopy[e.target.id] = e.target.value
                setreportsPayload(reportsPayloadCopy)
            } else {
                preConsultationPayloadCopy[e.target.id] = e.target.value;
                setPreConsultationPayload(preConsultationPayloadCopy)
            }

        }
    }

    let ChangePulseObservation = (e) => {
        let preConsultationPayloadCopy = { ...preConsultationPayload }
        preConsultationPayload.pre_Pulse_Observation[e.target.name] = e.target.value
        setPreConsultationPayload(preConsultationPayloadCopy)
    }

    const selectedRports = (e) => {
        let reportsPayloadCopy = { ...reportsPayload }

        if (e.target.value === 'other') {
            setOtherReportName(true)
            reportsPayloadCopy[e.target.id] = ''
            setreportsPayload(reportsPayloadCopy)
            setSelectedReport(e.target.value)
        }
        else {
            setOtherReportName(false)
            reportsPayloadCopy[e.target.id] = e.target.value
            setreportsPayload(reportsPayloadCopy)
            setSelectedReport(e.target.value)
        }
    }

    const addReportList = () => {
        let allReportListCopy = [...allReportList]
        if (reportsPayload.reportName && reportsPayload.report) {

            allReportListCopy.push(reportsPayload);
            setAllReportList(allReportListCopy);
            setreportsPayload({
                reportName: '',
                report: ''
            })
            setSelectedReport('');
            setOtherReportName(false)
        }
        else {
            addToast("Error!", {
                appearance: "error",
                content: `Please fill both feilds`,
            });
        }

        let preConsultationPayloadCopy = { ...preConsultationPayload }
        preConsultationPayloadCopy['report'] = allReportListCopy
        setPreConsultationPayload(preConsultationPayloadCopy)

    }

    let removeReportListItems = (index) => {
        let allReportListCopy = [...allReportList]
        let preConsultationPayloadCopy = { ...preConsultationPayload }
        let result = allReportListCopy.filter((item, i) => i !== index)
        setAllReportList(result);
        preConsultationPayloadCopy['report'] = result
        setPreConsultationPayload(preConsultationPayloadCopy)
    }

    let oxymeterReadingHandleChange = (e) => {
        let preConsultationPayloadCopy = { ...preConsultationPayload }
        let oxymeterReading = { ...preConsultationPayload.oxymeter_reading }
        oxymeterReading[e.target.id] = e.target.value
        preConsultationPayloadCopy['oxymeter_reading'] = oxymeterReading;
        setPreConsultationPayload(preConsultationPayloadCopy)
    }

    let timePeriodHandleChange = (e) => {
        let preConsultationPayloadCopy = { ...preConsultationPayload }
        let diseaseTimePeriod = { ...preConsultationPayloadCopy.time_period }
        diseaseTimePeriod[e.target.id] = e.target.value
        preConsultationPayloadCopy['time_period'] = diseaseTimePeriod
        setPreConsultationPayload(preConsultationPayloadCopy)
    }

    let handleSubmit = () => {

        var form_data = new FormData();
        let preConsultationPayloadCopy = { ...preConsultationPayload }
        let allReportListCopy = [...allReportList]

        if (reportsPayload.reportName && reportsPayload.report) {

            allReportListCopy.push(reportsPayload);
            setAllReportList(allReportListCopy);
            setreportsPayload({
                reportName: '',
                report: ''
            })
            setSelectedReport('');
            setOtherReportName(false)

            preConsultationPayloadCopy['report'] = allReportListCopy
            setPreConsultationPayload(preConsultationPayloadCopy)
        }

        Object.keys(preConsultationPayloadCopy).map(item => {
            if (item === 'oxymeter_reading' || item === 'time_period' || item === 'report' || item === 'pre_Pulse_Observation') {
                form_data.append(item, JSON.stringify(preConsultationPayloadCopy[item]))
            }
            else {
                form_data.append(item, preConsultationPayloadCopy[item])
            }
        })


        setIsSubmitting(true)
        dispatch(ACTIONS.registerPreConsultaion(form_data))
    }

    let closeModal = () => {
        setIsSubmitting(false)
        setHaveResponse(false);
    }

    let captureModel = (data, id) => {
        let preConsultationPayloadCopy = { ...preConsultationPayload }
        preConsultationPayloadCopy[id] = data
        setPreConsultationPayload(preConsultationPayloadCopy)
        setCaptureImage(null)
    }

    return (
        <section className={FormStyle.commonFormArea}>
            <div className="container ">
                <div className="row">
                    <div className="col-lg-12 ">
                        {isLoading ?
                            <div className="custom-loader">
                                <LoadingSpin
                                    size="100px"
                                    primaryColor="#2BBF50" />
                            </div>
                            :
                            <div className={FormStyle.commonFormWrapper}>
                                {isTodayAnyPatient ? <div className="row">
                                    <div className="col-md-12">
                                        <h1 className={FormStyle.formTitle}>
                                            <span className={FormStyle.formTitlelogo}>
                                                <AiOutlineFileDone />
                                            </span>
                                            <PreconsultationLang labelContent='Pre-Consultation' keyword='pre_consultation' />
                                        </h1>
                                    </div>
                                    {haveResponse &&
                                        <div className={customModalStyle.customModalLayout}>
                                            <div className={customModalStyle.customModalBox}>
                                                <p className='text-center text-success'>
                                                    <CommonText en='Pre-Consultation Successfully completed.' hi='पूर्व-परामर्श सफलतापूर्वक पूरा हुआ।' />
                                                    </p>
                                                <button type='button' className='btn btn-success' onClick={() => closeModal()}>
                                                    <CommonLang labelContent='OK' keyword='ok' />
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    {captureImage !== null && <>
                                        <Capture id={captureImage} handleCapture={captureModel} handleCancel={() => { setCaptureImage(null) }} />
                                    </>}
                                    <div className="col-md-3">
                                        <div className={FormStyle.feildWrapper}>
                                            <label htmlFor='token_id' className={FormStyle.customLabelSecond}>
                                                <CommonLang labelContent='Token No' keyword='token_no' />
                                            </label>
                                            <select
                                                className="form-select"
                                                id="token_id"
                                                value={preConsultationPayload.token_id}
                                                onChange={(e) => tokenChangeHandler(e)}>
                                                <option value='' disabled>
                                                    <CommonLang labelContent='Select' keyword='select' />
                                                </option>
                                                {todayAllTokens.length > 0 && <>
                                                    {todayAllTokens.map((item, index) => {
                                                        return (<option value={item.id} key={index}>{item.token_no}</option>)
                                                    })}</>}
                                            </select>
                                        </div>
                                    </div>
                                    {patientDetails?.name &&
                                        <div className="col-md-3">
                                            <div className={FormStyle.feildWrapper}>
                                                <label htmlFor="patient_name"
                                                    className={FormStyle.customLabelSecond}>
                                                    <CommonLang labelContent='Name' keyword='name' />
                                                </label>
                                                <div className="input-group-text">
                                                    {patientDetails?.name}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {patientDetails?.Registration_no &&
                                        <div className="col-md-3">
                                            <div className={FormStyle.feildWrapper}>
                                                <label htmlFor="patient_regNO" className={FormStyle.customLabelSecond}>
                                                    <CommonLang labelContent='Registration No' keyword='registration_no' />
                                                </label>
                                                <div className="input-group-text">
                                                    {patientDetails?.Registration_no}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {patientDetails?.mobile &&
                                        <div className="col-md-3">
                                            <div className={FormStyle.feildWrapper}>
                                                <label htmlFor="patient_mobile" className={FormStyle.customLabelSecond}>
                                                    <CommonLang labelContent='Contact No ' keyword='contact_no' />
                                                </label>
                                                <div className="input-group-text">
                                                    {patientDetails?.mobile}
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    {
                                        isSearching ?
                                            <div className="search-Loader">
                                                <Loader
                                                    color='#2bbf4f' />
                                            </div>
                                            :
                                            <>

                                                {/* Previous Details Are shown here */}
                                                {patientAllPrevData.length > 0 &&
                                                    <PatientPrevDetails patientAllPrevData={patientAllPrevData} patientDateWiseData={patientAllPrevData[0]} />
                                                }
                                                {/* End shown previous details */}

                                                {formView && <div className="col-lg-12">
                                                    <div className="row">
                                                        <div className="col-md-12 mt-5">
                                                            <h1 className={FormStyle.formTitle}>
                                                                <span className={FormStyle.formTitlelogo}>
                                                                    <AiOutlineFileDone />
                                                                </span>
                                                                <PreconsultationLang labelContent='New Pre-Consultation' keyword='pre_consultation' />
                                                            </h1>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className={FormStyle.feildWrapper}>
                                                                <p className={`text-uppercase ${FormStyle.commonFormInnerHeading}`}><PreconsultationLang labelContent='Images' keyword='images' /></p>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    {/* ----start------ */}
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <div className={FormStyle.captureImgCard}>
                                                                            <h5><PreconsultationLang labelContent='Face Image' keyword='face' /></h5>
                                                                            <Image src={preConsultationPayload.faceImg ? URL.createObjectURL(preConsultationPayload.faceImg) : "/images/patientFace.png"} alt="face Img" layout="fill" />
                                                                            <div className={FormStyle.btnBox}>
                                                                                <button type="button" className={`${FormStyle.formButton} ${FormStyle.imageWrapper}`}><PreconsultationLang labelContent='Upload' keyword='upload' />
                                                                                    <input
                                                                                        type="file"
                                                                                        className="form-control ps-2"
                                                                                        id="faceImg"
                                                                                        onChange={(e) => onChangeHandler(e)}
                                                                                    />
                                                                                </button>
                                                                                <p className="m-0"><PreconsultationLang labelContent='OR' keyword='or' /></p>
                                                                                <button type="button" className={FormStyle.formButton} onClick={() => { setCaptureImage("faceImg") }}>
                                                                                    <PreconsultationLang labelContent='Capture' keyword='capture' />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* ------end------- */}
                                                                </div>
                                                                <div className="col-md-3">
                                                                    {/* ----start------ */}
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <div className={FormStyle.captureImgCard}>
                                                                            <h5><PreconsultationLang labelContent='Tounge Image 1' keyword='tounge1' /></h5>
                                                                            <Image src={preConsultationPayload.tounge_img_1 ? URL.createObjectURL(preConsultationPayload.tounge_img_1) : "/images/patientTounge.png"} alt="tounge Img 1" layout="fill" />
                                                                            <div className={FormStyle.btnBox}>
                                                                                <button type="button" className={`${FormStyle.formButton} ${FormStyle.imageWrapper}`}><CommonText en="Upload" hi="अपलोड" />
                                                                                    <input
                                                                                        type="file"
                                                                                        className="form-control ps-2"
                                                                                        id="tounge_img_1"
                                                                                        onChange={(e) => onChangeHandler(e)}
                                                                                    />
                                                                                </button>
                                                                                <p className="m-0"><PreconsultationLang labelContent='OR' keyword='or' /></p>
                                                                                <button type="button" className={FormStyle.formButton} onClick={() => { setCaptureImage("tounge_img_1") }}>
                                                                                    <PreconsultationLang labelContent='Capture' keyword='capture' />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* ------end------- */}
                                                                </div>
                                                                <div className="col-md-3">
                                                                    {/* ----start------ */}
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <div className={FormStyle.captureImgCard}>
                                                                            <h5><PreconsultationLang labelContent='Tounge Image 2' keyword='tounge2' /></h5>
                                                                            <Image src={preConsultationPayload.tounge_img_2 ? URL.createObjectURL(preConsultationPayload.tounge_img_2) : "/images/patientTounge.png"} alt="tounge Img 2" layout="fill" />
                                                                            <div className={FormStyle.btnBox}>
                                                                                <button type="button" className={`${FormStyle.formButton} ${FormStyle.imageWrapper}`}><CommonText en="Upload" hi="अपलोड" />
                                                                                    <input
                                                                                        type="file"
                                                                                        className="form-control ps-2"
                                                                                        id="tounge_img_2"
                                                                                        onChange={(e) => onChangeHandler(e)}
                                                                                    />
                                                                                </button>
                                                                                <p className="m-0">
                                                                                    <PreconsultationLang labelContent='OR' keyword='or' />
                                                                                </p>
                                                                                <button type="button" className={FormStyle.formButton} onClick={() => { setCaptureImage("tounge_img_2") }}>
                                                                                    <PreconsultationLang labelContent='Capture' keyword='capture' />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* ------end------- */}
                                                                </div>
                                                                <div className="col-md-3">
                                                                    {/* ----start------ */}
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <div className={FormStyle.captureImgCard}>
                                                                            <h5><CommonLang labelContent='Other' keyword='other' /></h5>
                                                                            <Image src={preConsultationPayload.other_img ? URL.createObjectURL(preConsultationPayload.other_img) : "/images/patientOther.png"} alt="tounge Img 2" layout="fill" />
                                                                            <div className={FormStyle.btnBox}>
                                                                                <button type="button" className={`${FormStyle.formButton} ${FormStyle.imageWrapper}`}>
                                                                                    <PreconsultationLang labelContent='Upload' keyword='upload' />
                                                                                    <input
                                                                                        type="file"
                                                                                        className="form-control ps-2"
                                                                                        id="other_img"
                                                                                        onChange={(e) => onChangeHandler(e)}
                                                                                    />
                                                                                </button>
                                                                                <p className="m-0"><PreconsultationLang labelContent='OR' keyword='or' /></p>
                                                                                <button type="button" className={FormStyle.formButton} onClick={() => { setCaptureImage("other_img") }}>
                                                                                    <PreconsultationLang labelContent='Capture' keyword='capture' />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* ------end------- */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className={FormStyle.feildWrapper}>
                                                                <p className={`text-uppercase mb-0 ${FormStyle.commonFormInnerHeading}`}>
                                                                    <PreconsultationLang labelContent='Oxymeter Reading' keyword='oxymeter_reading' />
                                                                </p>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor="oxygen_saturation">
                                                                            <PreconsultationLang labelContent='Oxygen Saturation' keyword='oxygen_saturation' /> (Spo2%)
                                                                        </label>
                                                                        <input type="text" id="oxygen_saturation"
                                                                            value={preConsultationPayload.oxymeter_reading.oxygen_saturation}
                                                                            onChange={(e) => oxymeterReadingHandleChange(e)} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor="pulse_rate"><PreconsultationLang labelContent='Pulse rate' keyword='pulse_rate' /> (bpm)</label>
                                                                        <input type="text" id="pulse_rate"
                                                                            value={preConsultationPayload.oxymeter_reading.pulse_rate}
                                                                            onChange={(e) => oxymeterReadingHandleChange(e)} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor="temprature">
                                                                            <PreconsultationLang labelContent='Temprature' keyword='temprature' /> (<span>&#176;</span>C)
                                                                        </label>
                                                                        <input type="text" id="temprature"
                                                                            value={preConsultationPayload.oxymeter_reading.temprature}
                                                                            onChange={(e) => oxymeterReadingHandleChange(e)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* ---copy------ */}

                                                        <div className="col-md-12">
                                                            <div className={FormStyle.feildWrapper}>
                                                                <p className={`text-uppercase ${FormStyle.commonFormInnerHeading}`}>
                                                                    <CommonText en="Add Report" hi="रिपोर्ट जोड़ें"/>
                                                                    {/* <PreconsultationLang labelContent='Add Reports' 
                                                                    keyword='add_reports' /> */}
                                                                </p>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    {/* --------copy select ----- */}
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor="reportName">
                                                                            {/* <PreconsultationLang labelContent='Report Name' keyword='report_name' /> */}
                                                                            <CommonText en = "Report Name" hi="रिपोर्ट का नाम"/>
                                                                        </label>
                                                                        <select id="reportName" name="reportName" className="form-select"
                                                                            value={selectedReport}
                                                                            onChange={(e) => selectedRports(e)}
                                                                        >
                                                                            <option value='' disabled><CommonLang labelContent='Select' keyword='select' /></option>
                                                                            {reports.length > 0 && reports.map((item, index) => {
                                                                                return (<option key={index} value={item.name}>{item.name}</option>)
                                                                            })}
                                                                            <option value="other"><CommonLang labelContent='Other' keyword='other' /></option>
                                                                        </select>
                                                                        {otherReportName &&
                                                                            <input type="text" className="mt-2" id="reportName" value={reportsPayload.reportName} onChange={(e) => onChangeHandler(e)} />
                                                                        }

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    {/* ---------copy------- */}
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label htmlFor="report">
                                                                            {/* <PreconsultationLang 
                                                                              labelContent='Report Value' keyword='report_value' /> */}
                                                                                 <CommonText en = "Report Value" hi="रिपोर्ट वैल्यू"/>
                                                                        </label>
                                                                        <input type="text" 
                                                                        id="report" value={reportsPayload.report}
                                                                        onChange={(e) => onChangeHandler(e)} 
                                                                        placeholder= 
                                                                        { CommonPlainText({
                                                                            en:'Reported Value',
                                                                            hi:'रिपोर्ट वैल्यू'
                                                                         })}
                                                                        />
                                                                    </div>
                                                                    {/* ---------paste---- */}
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label><PreconsultationLang labelContent='Unit' keyword='unit' /></label>
                                                                        <input type="text" value={reports.find((item) => item.name === selectedReport) ? reports.find((item) => item.name === selectedReport).unit : ''} disabled />
                                                                    </div>
                                                                </div><div className="col-md-2">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <label><PreconsultationLang labelContent='Normal Range' keyword='range' /></label>
                                                                        <input type="text" value={reports.find((item) => item.name === selectedReport) ? reports.find((item) => item.name === selectedReport).range : ''} disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-1 d-flex align-items-end justify-content-end">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <button type="button" className="btn light-green-bg text-white" 
                                                                         onClick={() => addReportList()}><HiPlus />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                {allReportList.length > 0 && <>
                                                                    <div className={FormStyle.allListTable}>
                                                                        <table>
                                                                            <tr className={FormStyle.allListTableHeadings}>
                                                                                <th><PreconsultationLang labelContent='Report Name' keyword='report_name' /></th>
                                                                                <th><PreconsultationLang labelContent='Report' keyword='reports' /></th>
                                                                                <th className={FormStyle.allListTableActionList}></th>
                                                                            </tr>
                                                                            {allReportList.map((item, index) => {
                                                                                return (
                                                                                    <tr className={FormStyle.allListTableSingleRow} key={index}>
                                                                                        <td>{item.reportName}</td>
                                                                                        <td>{item.report}</td>
                                                                                        <td className="d-flex justify-content-center">
                                                                                            <button 
                                                                                               type="button" 
                                                                                               className={`${FormStyle.commonDelete} d-flex justify-content-center
                                                                                               align-items-center` }
                                                                                               id={index}
                                                                                               onClick={() => removeReportListItems(index)}>
                                                                                              <IoTrashBin />
                                                                                              
                                                                                            </button>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })}
                                                                        </table>
                                                                    </div>
                                                                </>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <p className={FormStyle.commonFormInnerHeading}>
                                                                            <PreconsultationLang labelContent='Previous Disease' keyword='prev_diseases' />
                                                                        </p>
                                                                        <input type="text"
                                                                            className="form-control"
                                                                            placeholder={ CommonPlainText({
                                                                                en:'Enter Previous diseases',
                                                                                hi:'पिछले रोग दर्ज करें'
                                                                             })}
                                                                            id="mainDiseases"
                                                                            value={preConsultationPayload.mainDiseases}
                                                                            onChange={(e) => onChangeHandler(e)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <p className={FormStyle.commonFormInnerHeading}>
                                                                            <PreconsultationLang labelContent='Duration of Previous Diseases' keyword='duration_of_prev_diseases' />
                                                                        </p>
                                                                        <div className="input-group mb-3">
                                                                            <input type="text"
                                                                                className="form-control"
                                                                                placeholder=
                                                                                { CommonPlainText({
                                                                                    en:'Enter Duration',
                                                                                    hi:'अवधि दर्ज करें'
                                                                                 })}
                                                                                aria-describedby="basic-addon1"
                                                                                id="time_value"
                                                                                value={preConsultationPayload.time_period.time_value}
                                                                                onChange={(e) => timePeriodHandleChange(e)}
                                                                            />
                                                                            <select
                                                                                className="form-select input-group-text bg-white"
                                                                                id="time_type"
                                                                                value={preConsultationPayload.time_period.time_type}
                                                                                onChange={(e) => timePeriodHandleChange(e)}
                                                                            >
                                                                                <option value="Year"><CommonLang labelContent='Year' keyword='year' /></option>
                                                                                <option value="Month">
                                                                                    <CommonText en="Month" hi="माह"/>
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <p className={FormStyle.commonFormInnerHeading}>
                                                                            <PreconsultationLang labelContent='Previous Medication Type' keyword='prev_medication_type' />
                                                                        </p>
                                                                        <input type="text"
                                                                            className="form-control"
                                                                            placeholder=
                                                                            { CommonPlainText({
                                                                                en:"Enter Medication Type",
                                                                                hi:"औषधि का प्रकार दर्ज करें"
                                                                             })}
                                                                            id="previous_medication_type"
                                                                            value={preConsultationPayload.previous_medication_type}
                                                                            onChange={(e) => onChangeHandler(e)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className={FormStyle.feildWrapper}>
                                                                <p className={`text-uppercase ${FormStyle.commonFormInnerHeading}`}>
                                                                    <CommonText en="Pulse observation" hi="नाडी का अवलोकन"/>
                                                                </p>
                                                            </div>
                                                            <div className="row g-0">
                                                                <div className="col-4 border px-4 py-2">
                                                                    <p>
                                                                    <CommonText en="Vata" hi="वात"/>
                                                                    </p>
                                                                    <div className={`ms-0 ${FormStyle.custom_vat_observation}`}>
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="pran_vat">
                                                                            <CommonText en="Prana Vata" hi="प्राण वात"/>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                            <CommonText en="Zonk" hi="जोक"/>
                                                                                <input
                                                                                    id="pran_zonk_vat"
                                                                                    name="pran_vat"
                                                                                    type="radio"
                                                                                    value="zonk"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.pran_vat == 'zonk' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={FormStyle.customRadio} htmlFor="pran_sarp_vat">
                                                                            <CommonText en="Sarp" hi="सर्प"/>
                                                                                <input
                                                                                    id="pran_sarp_vat"
                                                                                    name="pran_vat"
                                                                                    type="radio"
                                                                                    value="sarp"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.pran_vat == 'sarp' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="udan_vat">
                                                                            <CommonText en="Udaan Vata" hi="उदान वात"/>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="udan_zonk_vat">
                                                                            <CommonText en="Zonk" hi="जोक"/>
                                                                                <input
                                                                                    id="udan_zonk_vat"
                                                                                    name="udan_vat"
                                                                                    type="radio"
                                                                                    value="zonk"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.udan_vat == 'zonk' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={FormStyle.customRadio} htmlFor="udan_sarp_vat">
                                                                            <CommonText en="Sarp" hi="सर्प"/>
                                                                                <input
                                                                                    id="udan_sarp_vat"
                                                                                    name="udan_vat"
                                                                                    type="radio"
                                                                                    value="sarp"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.udan_vat == 'sarp' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                     
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="vyan_vat">
                                                                            <CommonText en="Vyaan Vata" hi="व्यान वात"/>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="vyan_zonk_vat">
                                                                            <CommonText en="Zonk" hi="जोक"/>
                                                                                <input
                                                                                    id="vyan_zonk_vat"
                                                                                    name="vyan_vat"
                                                                                    type="radio"
                                                                                    value="zonk"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.vyan_vat == 'zonk' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={FormStyle.customRadio} htmlFor="vyan_sarp_vat">
                                                                            <CommonText en="Sarp" hi="सर्प"/>
                                                                                <input
                                                                                    id="vyan_sarp_vat"
                                                                                    name="vyan_vat"
                                                                                    type="radio"
                                                                                    value="sarp"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.vyan_vat == 'sarp' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                      

                                                                       
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="saman_vat">
                                                                            <CommonText en="Saman Vata" hi="सामान वात"/>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="saman_zonk_vat">
                                                                            <CommonText en="Zonk" hi="जोक"/>
                                                                                <input
                                                                                    id="saman_zonk_vat"
                                                                                    name="saman_vat"
                                                                                    type="radio"
                                                                                    value="zonk"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.saman_vat == 'zonk' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={FormStyle.customRadio} htmlFor="saman_sarp_vat">
                                                                            <CommonText en="Sarp" hi="सर्प"/>
                                                                                <input
                                                                                    id="saman_sarp_vat"
                                                                                    name="saman_vat"
                                                                                    type="radio"
                                                                                    value="sarp"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.saman_vat == 'sarp' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="apan_vat">
                                                                            <CommonText en="Apaan Vata" hi="अपान वात"/>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="apan_zonk_vat">
                                                                            <CommonText en="Zonk" hi="जोक"/>
                                                                                <input
                                                                                    id="apan_zonk_vat"
                                                                                    name="apan_vat"
                                                                                    type="radio"
                                                                                    value="zonk"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.apan_vat == 'zonk' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={FormStyle.customRadio} htmlFor="apan_sarp_vat">
                                                                            <CommonText en="Sarp" hi="सर्प"/>
                                                                                <input
                                                                                    id="apan_sarp_vat"
                                                                                    name="apan_vat"
                                                                                    type="radio"
                                                                                    value="sarp"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.apan_vat == 'sarp' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4 border px-4 py-2">
                                                                    <p>
                                                                    <CommonText en="Pitta" hi="पित्त"/>
                                                                    </p>
                                                                    <div className={`ms-0 ${FormStyle.custom_vat_observation}`}>
                                                                        <div className="d-flex justify-content-between row">
                                                                            <label className={`p-0 ${FormStyle.customRadio} col-md-3 pe-2`} htmlFor="pachak_pitt">
                                                                            <CommonText en="Pachak Pitta" hi="पाचक पित्त"/>
                                                                            </label>
                                                                            <label className={`col-md-3 ${FormStyle.customRadio} `} htmlFor="pachak_goaraya_pitt">
                                                                            <CommonText en="Goaraya" hi="गौरया"/>
                                                                                <input
                                                                                    id="pachak_goaraya_pitt"
                                                                                    name="pachak_pitt"
                                                                                    type="radio"
                                                                                    value="goaraya"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.pachak_pitt == 'goaraya' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={`col-md-3 ${FormStyle.customRadio}`} htmlFor="pachak_kowa_pitt">
                                                                            <CommonText en="Kowa" hi="कौवा"/>
                                                                                <input
                                                                                    id="pachak_kowa_pitt"
                                                                                    name="pachak_pitt"
                                                                                    type="radio"
                                                                                    value="kowa"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.pachak_pitt == 'kowa' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                            <label className={`col-md-3 ${FormStyle.customRadio}`} htmlFor="pachak_mendhak_pitt">
                                                                            <CommonText en="Mendhak" hi="मेंढक"/>
                                                                                <input
                                                                                    id="pachak_mendhak_pitt"
                                                                                    name="pachak_pitt"
                                                                                    type="radio"
                                                                                    value="mendhak"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.pachak_pitt == 'mendhak' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>



                                                                        <div className="d-flex justify-content-between row">
                                                                            <label className={`p-0 ${FormStyle.customRadio} col-md-3 pe-2`} htmlFor="ranjak_pitt">
                                                                            <CommonText en="Ranjak Pitta" hi="रंजक पित्त"/>
                                                                            </label>
                                                                            <label className={`col-md-3 ${FormStyle.customRadio} `} htmlFor="ranjak_goaraya_pitt">
                                                                            <CommonText en="Goaraya" hi="गौरया"/>
                                                                                <input
                                                                                    id="ranjak_goaraya_pitt"
                                                                                    name="ranjak_pitt"
                                                                                    type="radio"
                                                                                    value="goaraya"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.ranjak_pitt == 'goaraya' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={`col-md-3 ${FormStyle.customRadio} `} htmlFor="ranjak_kowa_pitt">
                                                                            <CommonText en="Kowa" hi="कौवा"/>
                                                                                <input
                                                                                    id="ranjak_kowa_pitt"
                                                                                    name="ranjak_pitt"
                                                                                    type="radio"
                                                                                    value="kowa"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.ranjak_pitt == 'kowa' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                            <label className={`col-md-3 ${FormStyle.customRadio} `} htmlFor="ranjak_mendhak_pitt">
                                                                            <CommonText en="Mendhak" hi="मेंढक"/>
                                                                                <input
                                                                                    id="ranjak_mendhak_pitt"
                                                                                    name="ranjak_pitt"
                                                                                    type="radio"
                                                                                    value="mendhak"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.ranjak_pitt == 'mendhak' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                        
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="sandhak_pitt">
                                                                            <CommonText en="Sadhak Pitta" hi="शाधक पित्त"/>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="sandhak_goaraya_pitt">
                                                                            <CommonText en="Goaraya" hi="गौरया"/>
                                                                                <input
                                                                                    id="sandhak_goaraya_pitt"
                                                                                    name="sandhak_pitt"
                                                                                    type="radio"
                                                                                    value="goaraya"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.sandhak_pitt == 'goaraya' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={FormStyle.customRadio} htmlFor="sandhak_kowa_pitt">
                                                                            <CommonText en="Kowa" hi="कौवा"/>
                                                                                <input
                                                                                    id="sandhak_kowa_pitt"
                                                                                    name="sandhak_pitt"
                                                                                    type="radio"
                                                                                    value="kowa"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.sandhak_pitt == 'kowa' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="sandhak_mendhak_pitt">
                                                                            <CommonText en="Mendhak" hi="मेंढक"/>
                                                                                <input
                                                                                    id="sandhak_mendhak_pitt"
                                                                                    name="sandhak_pitt"
                                                                                    type="radio"
                                                                                    value="mendhak"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.sandhak_pitt == 'mendhak' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>


                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="alockak_pitt">
                                                                            <CommonText en="Alochak Pitta" hi="अलोचक पित्त"/>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="alockak_goaraya_pitt">
                                                                            <CommonText en="Goaraya" hi="गौरया"/>
                                                                                <input
                                                                                    id="alockak_goaraya_pitt"
                                                                                    name="alockak_pitt"
                                                                                    type="radio"
                                                                                    value="goaraya"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.alockak_pitt == 'goaraya' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={FormStyle.customRadio} htmlFor="alockak_kowa_pitt">
                                                                            <CommonText en="Kowa" hi="कौवा"/>
                                                                                <input
                                                                                    id="alockak_kowa_pitt"
                                                                                    name="alockak_pitt"
                                                                                    type="radio"
                                                                                    value="kowa"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.alockak_pitt == 'kowa' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="alockak_mendhak_pitt">
                                                                            <CommonText en="Mendhak" hi="मेंढक"/>
                                                                                <input
                                                                                    id="alockak_mendhak_pitt"
                                                                                    name="alockak_pitt"
                                                                                    type="radio"
                                                                                    value="mendhak"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.alockak_pitt == 'mendhak' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="bhrjak_pitt">
                                                                            <CommonText en="Bhrjaak Pitta" hi="भ्रजाक पित्त"/>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="bhrjak_goaraya_pitt">
                                                                            <CommonText en="Goaraya" hi="गौरया"/>
                                                                                <input
                                                                                    id="bhrjak_goaraya_pitt"
                                                                                    name="bhrjak_pitt"
                                                                                    type="radio"
                                                                                    value="goaraya"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.bhrjak_pitt == 'goaraya' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={FormStyle.customRadio} htmlFor="bhrjak_kowa_pitt">
                                                                            <CommonText en="Kowa" hi="कौवा"/>
                                                                                <input
                                                                                    id="bhrjak_kowa_pitt"
                                                                                    name="bhrjak_pitt"
                                                                                    type="radio"
                                                                                    value="kowa"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.bhrjak_pitt == 'kowa' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                            <label className={FormStyle.customRadio} htmlFor="bhrjak_mendhak_pitt">
                                                                            <CommonText en="Mendhak" hi="मेंढक"/>
                                                                                <input
                                                                                    id="bhrjak_mendhak_pitt"
                                                                                    name="bhrjak_pitt"
                                                                                    type="radio"
                                                                                    value="mendhak"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.bhrjak_pitt == 'mendhak' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4 border px-4 py-2">
                                                                    <p>
                                                                    <CommonText en="Kapha" hi="कफ"/>
                                                                    </p>
                                                                    <div className={`ms-0 ${FormStyle.custom_vat_observation}`}>

                                                                        <div className="d-flex justify-content-between row">
                                                                            <label className={`p-0 ${FormStyle.customRadio} col-4 pe-2`} htmlFor="awlambak_kaph">
                                                                            <CommonText en="Awlambak Kapha" hi="अवलम्बक कफ"/>
                                                                            </label>
                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="awlambak_hans_kaph">
                                                                            <CommonText en="Hans" hi="हंस"/>
                                                                                <input
                                                                                    id="awlambak_hans_kaph"
                                                                                    name="awlambak_kaph"
                                                                                    type="radio"
                                                                                    value="hans"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.awlambak_kaph == 'hans' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="awlambak_kabutar_kaph">
                                                                            <CommonText en="Kabutar" hi="कबूतर"/>
                                                                                <input
                                                                                    id="awlambak_kabutar_kaph"
                                                                                    name="awlambak_kaph"
                                                                                    type="radio"
                                                                                    value="kabutar"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.awlambak_kaph == 'kabutar' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>


                                                                        <div className="d-flex justify-content-between row">
                                                                            <label className={`p-0 ${FormStyle.customRadio} col-4 pe-2`} htmlFor="kulendak_kaph">
                                                                            <CommonText en="Kulendak Kapha" hi="कुलेंदक कफ"/>
                                                                            </label>
                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="kulendak_hans_kaph">
                                                                            <CommonText en="Hans" hi="हंस"/>
                                                                                <input
                                                                                    id="kulendak_hans_kaph"
                                                                                    name="kulendak_kaph"
                                                                                    type="radio"
                                                                                    value="hans"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.kulendak_kaph == 'hans' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="kulendak_kabutar_kaph">
                                                                            <CommonText en="Kabutar" hi="कबूतर"/>
                                                                                <input
                                                                                    id="kulendak_kabutar_kaph"
                                                                                    name="kulendak_kaph"
                                                                                    type="radio"
                                                                                    value="kabutar"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.kulendak_kaph == 'kabutar' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>


                                                                        <div className="d-flex justify-content-between row">
                                                                            <label className={`p-0 ${FormStyle.customRadio} col-4 pe-2`} htmlFor="bodhak_kaph">
                                                                            <CommonText en="Bodhak Kapha" hi="बोधक कफ"/>
                                                                            </label>
                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="bodhak_hans_kaph">
                                                                            <CommonText en="Hans" hi="हंस"/>
                                                                                <input
                                                                                    id="bodhak_hans_kaph"
                                                                                    name="bodhak_kaph"
                                                                                    type="radio"
                                                                                    value="hans"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.bodhak_kaph == 'hans' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="bodhak_kabutar_kaph">
                                                                            <CommonText en="Kabutar" hi="कबूतर"/>
                                                                                <input
                                                                                    id="bodhak_kabutar_kaph"
                                                                                    name="bodhak_kaph"
                                                                                    type="radio"
                                                                                    value="kabutar"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.bodhak_kaph == 'kabutar' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>


                                                                        <div className="d-flex justify-content-between row">
                                                                            <label className={`p-0 ${FormStyle.customRadio} col-4 pe-2`} htmlFor="tripak_kaph">
                                                                            <CommonText en="Tripak Kapha" hi="तृपक कफ"/>
                                                                            </label>
                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="tripak_hans_kaph">
                                                                            <CommonText en="Hans" hi="हंस"/>
                                                                                <input
                                                                                    id="tripak_hans_kaph"
                                                                                    name="tripak_kaph"
                                                                                    type="radio"
                                                                                    value="hans"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.tripak_kaph == 'hans' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="tripak_kabutar_kaph">
                                                                            <CommonText en="Kabutar" hi="कबूतर"/>
                                                                                <input
                                                                                    id="tripak_kabutar_kaph"
                                                                                    name="tripak_kaph"
                                                                                    type="radio"
                                                                                    value="kabutar"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.tripak_kaph == 'kabutar' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio} col-4 pe-2`} htmlFor="sleshmak_kaph">
                                                                            <CommonText en="Sleshmak Kapha" hi="स्लेष्मक कफ"/>
                                                                            </label>
                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="sleshmak_hans_kaph">
                                                                            <CommonText en="Hans" hi="हंस"/>
                                                                                <input
                                                                                    id="sleshmak_hans_kaph"
                                                                                    name="sleshmak_kaph"
                                                                                    type="radio"
                                                                                    value="hans"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.sleshmak_kaph == 'hans' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>

                                                                            <label className={`col-4 ${FormStyle.customRadio}`} htmlFor="sleshmak_kabutar_kaph">
                                                                            <CommonText en="Kabutar" hi="कबूतर"/>
                                                                                <input
                                                                                    id="sleshmak_kabutar_kaph"
                                                                                    name="sleshmak_kaph"
                                                                                    type="radio"
                                                                                    value="kabutar"
                                                                                    onChange={(e) => ChangePulseObservation(e)}
                                                                                    checked={preConsultationPayload.pre_Pulse_Observation && preConsultationPayload.pre_Pulse_Observation.sleshmak_kaph == 'kabutar' ? true : false}
                                                                                />
                                                                                <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-12 d-flex  my-4'>
                                                            <button type='button' className={FormStyle.formButton} onClick={() => handleSubmit()} disabled={isSubmitting}><CommonLang labelContent='Submit' keyword='submit' /></button>
                                                        </div>
                                                    </div>
                                                </div>}
                                            </>
                                    }
                                    <div>
                                    </div>
                                </div>
                                    :
                                    <p><CommonText en="Good Morning !.." hi="शुभ प्रभात !.." /><br /><CommonText en="No Patients have registered yet. You can come again here and see the details once the patients are registered." hi="अभी तक कोई मरीज दर्ज नहीं हुआ है। आप यहां फिर से आ सकते हैं और रोगियों के पंजीकरण के बाद विवरण देख सकते हैं।" /> </p>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}