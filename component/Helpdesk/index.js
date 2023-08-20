import Image from 'next/image';
import FormStyle from "../../css/form.module.css";
import PatientDashboardStyle from '../../css/PatientDashboard.module.css'
import { PreconsultationLang } from '../../MultiLanguageFiles/preConsultation';
import { CommonLang } from '../../MultiLanguageFiles/common';
import { ConsultationLang } from '../../MultiLanguageFiles/consultation';
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md"
import { IoMdContact } from "react-icons/io"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { BiBody } from "react-icons/bi"
import { FaTimes } from "react-icons/fa"
import * as commonAction from '../../Common Api Calls/commonAction'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { CommonText } from '../../Multi_Lang';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const Helpdesk = () => {

  let { addToast } = useToasts();

  let [todayAllTokens, setTodayAllTokens] = useState([])
  let [isTodayAnyPatient, setIsTodayAnyPatient] = useState(false);
  let [patientDateWiseData, setPatientDateWiseData] = useState({})
  let [patientDetails, setPatientDetails] = useState({})
  let [medicinePopUpData, setMedicinePopUpData] = useState({})
  let [formView, setFormView] = useState(false);
  let [exercisePopUpData, setExercisePopUpData] = useState({})
  let [exerciseSequence, setExerciseSequence] = useState()
  let [isLoading,setIsLoading] = useState(true)
  let [isSearching,setIsSearching] = useState(false)

  let dispatch = useDispatch()

  let commonState = useSelector((state) => state.commonReducer)

  useEffect(() => {
    dispatch(commonAction.getTodayTokens('Helpdesk'))
  }, [])

  useEffect(() => {
    if (commonState.GetTodayTokenSuccess) {
        setIsLoading(false)
      if (commonState.GetTodayTokenSuccess.tokens.length === 0) {
        setIsTodayAnyPatient(false)
      }
      else {
        setTodayAllTokens(commonState.GetTodayTokenSuccess.tokens)
        setIsTodayAnyPatient(true)
      }
    }
    if (commonState.GetTodayTokenFailure) {
        setIsLoading(false)
    }

    dispatch(commonAction.resetToInitialState())
  }, [commonState.GetTodayTokenSuccess, commonState.GetTodayTokenFailure])


  let tokenChangeHandler = (e) => {
    if (e.target.value != '') {
      dispatch(commonAction.getPatientByToken({ 'token_id': e.target.value }))
      dispatch(commonAction.getPatientTodayAllData({
        'token_id': e.target.value,
      }))
    }
    setIsSearching(true)
  }

  useEffect(() => {
    if (commonState.GetPatientByTokenNoSuccess) {
      setPatientDetails(commonState.GetPatientByTokenNoSuccess.patientDetails)
      setFormView(true)
      setIsSearching(false)
    }

    if (commonState.GetPatientByTokenNoFailure) {
        setIsSearching(false)
    }

    dispatch(commonAction.resetToInitialState())
  }, [commonState.GetPatientByTokenNoSuccess, commonState.GetPatientByTokenNoSuccess])


  useEffect(() => {
    if (commonState.getPatientTodayAllDataSuccess) {
      setPatientDateWiseData(commonState.getPatientTodayAllDataSuccess.data)
    }

    if (commonState.getPatientTodayAllDataFailure) {
      addToast("Error!", {
        appearance: "error",
        content: `Unable to get patient previous details.`,
      });
    }

    dispatch(commonAction.resetToInitialState())
  }, [commonState.getPatientTodayAllDataSuccess, commonState.getPatientTodayAllDataFailure])


  return (
    <>
      <section className={`${FormStyle.commonFormArea} ${FormStyle.afterConsultationTab}`}>
        <div className="container">
          <div className="row">
            {isTodayAnyPatient ? <>
              <div className="col-lg-12 mb-4">
                <div className={FormStyle.commonFormWrapper}>

                  <div className="row">
                    <div className="col-md-3">
                      <div className={FormStyle.feildWrapper}>
                        <label htmlFor='token_id' className={FormStyle.customLabelSecond}><CommonText en="Token No" hi="टोकन संख्या" /></label>
                        <select
                          className="form-select input-group-text text-start"
                          id="token_id"
                          onChange={(e) => tokenChangeHandler(e)}>
                          <option defaultValue hidden><CommonText en="Select" hi="चयन" /></option>
                          {todayAllTokens.length > 0 && <>
                            {todayAllTokens.map((item) => {
                              return (<option value={item.id}>{item.token_no}</option>)
                            })}</>}
                        </select>

                      </div>
                    </div>
                    
                    {patientDetails && patientDetails.name &&
                                                            <div className="col-md-3">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label className={FormStyle.customLabelSecond}>
                                                                        <CommonLang labelContent='Name' keyword='name' />
                                                                    </label>
                                                                    <div className="input-group-text">
                                                                        {patientDetails?.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {patientDetails && patientDetails.Registration_no &&
                                                            <div className="col-md-3">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label className={FormStyle.customLabelSecond}>
                                                                        <CommonLang labelContent='Registration No' keyword='registration_no' />
                                                                    </label>
                                                                    <div className="input-group-text">
                                                                        {patientDetails?.Registration_no}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {patientDetails && patientDetails.mobile &&
                                                            <div className="col-md-3">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label className={FormStyle.customLabelSecond}>
                                                                        <CommonLang labelContent='Contact No' keyword='contact_no' />
                                                                    </label>
                                                                    <div className="input-group-text">
                                                                        {patientDetails?.mobile}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                  </div>
                </div>
              </div>
              {formView && <>{patientDateWiseData ?
                <section className={PatientDashboardStyle.patientTab}>
                  <ul className="nav nav-pills mb- d-flex justify-content-between"
                    id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                        <CommonText en="Preconsultation" hi="पूर्व परामर्श" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                        <CommonText en="Consultation" hi="परामर्श" /></button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                        <CommonText en="Prescribed Medicine" hi="निर्धारित दवा" /></button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-exercise-tab" data-bs-toggle="pill" data-bs-target="#pills-exercise" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" >
                        <CommonText en="Exercises" hi="अभ्यास" /></button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-general-tab" data-bs-toggle="pill" data-bs-target="#pills-general" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" >
                        <CommonText en="Diets" hi="आहार" /></button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-timeTable-tab" data-bs-toggle="pill" data-bs-target="#pills-timeTable" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" >
                        <CommonText en="Time Table" hi="समय सारणी" /></button>
                    </li>
                  </ul>
                  <div className="tab-content pt-4" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                    <div className="row ">
                                                {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.oxymeter_reading && !Array.isArray(patientDateWiseData.preConsultationDetail.oxymeter_reading) && <>
                                                    <div className="col-md-12 mt-lg-2">
                                                        <h1 className={FormStyle.formTitle}>
                                                            <span className={FormStyle.formTitlelogo}>
                                                                <IoMdContact />
                                                            </span>
                                                            <CommonText en="Oxymeter Reading" hi="Oxymeter Reading" />
                                                        </h1>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <div className="row">
                                                            {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.oxymeter_reading && patientDateWiseData.preConsultationDetail.oxymeter_reading.oxygen_saturation && <>
                                                                <div className="col-md-3 col-lg-3">
                                                                    <div className={PatientDashboardStyle.feildWrapper}>
                                                                        <label htmlFor="oxygen_saturation">
                                                                            <CommonText en="Oxygen Saturation" hi="Oxygen Saturation" /> (Spo2%)
                                                                        </label>
                                                                        <input type="text" id="oxygen_saturation" placeholder="Oxygen Saturation"
                                                                            className="text-start"
                                                                            value={patientDateWiseData.preConsultationDetail.oxymeter_reading.oxygen_saturation} disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>}
                                                            {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.oxymeter_reading && patientDateWiseData.preConsultationDetail.oxymeter_reading.pulse_rate && <>
                                                                <div className="col-md-3 col-lg-3">
                                                                    <div className={PatientDashboardStyle.feildWrapper}>
                                                                        <label htmlFor="pulse_rate"
                                                                        ><CommonText en="Pulse rate" hi="Pulse rate" /> (8bpm)</label>
                                                                        <input type="text" id="pulse_rate"
                                                                            placeholder="PulseRate"
                                                                            className=" text-start"
                                                                            value={patientDateWiseData.preConsultationDetail.oxymeter_reading.pulse_rate} disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>}
                                                            {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.oxymeter_reading && patientDateWiseData.preConsultationDetail.oxymeter_reading.temprature && <>
                                                                <div className="col-md-3 col-lg-3">
                                                                    <div className={PatientDashboardStyle.feildWrapper}>
                                                                        <label htmlFor="temp"
                                                                        ><CommonText en="Temprature" hi="Temprature" /> (<span>&#176;</span>C<span>&#176;</span>F)</label>
                                                                        <input type="text" id="temp"
                                                                            placeholder="temp"
                                                                            className=" text-start"
                                                                            value={patientDateWiseData.preConsultationDetail.oxymeter_reading.temprature} disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>}
                                                        </div>
                                                    </div>
                                                </>}
                                                <div className="col-md-12 mt-lg-5">
                                                    <h1 className={FormStyle.formTitle}>
                                                        <span className={FormStyle.formTitlelogo}>
                                                            <IoMdContact />
                                                        </span>
                                                        <CommonText en="Patient Photograph" hi="Patient Photograph" />
                                                    </h1>
                                                </div>
                                                <div className="col-md-12 ">
                                                    <div className="row">
                                                        <div className="col-md-3 col-lg-3">
                                                            <div className={FormStyle.feildWrapper}>
                                                                <div className={FormStyle.patientPicCard}>
                                                                    <div className={FormStyle.patientUploadPic}>
                                                                        <Image src={patientDateWiseData?.preConsultationDetail?.tounge_img_1 ? (patientDateWiseData?.preConsultationDetail?.tounge_img_1) : '/images/dummy.png'} alt="aboutpic" layout='fill' />

                                                                    </div>
                                                                    <div className={FormStyle.patientUploadTitle}>
                                                                        <p>
                                                                            <CommonText en="Tounge 1" hi="Tounge 1" />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-3 col-lg-3">
                                                            <div className={FormStyle.feildWrapper}>
                                                                <div className={FormStyle.patientPicCard}>
                                                                    <div className={FormStyle.patientUploadPic}>
                                                                        <Image src={patientDateWiseData?.preConsultationDetail?.tounge_img_2 ? (patientDateWiseData?.preConsultationDetail?.tounge_img_2) : '/images/dummy.png'} alt="aboutpic" layout='fill' />
                                                                    </div>
                                                                    <div className={FormStyle.patientUploadTitle}>
                                                                        <p>
                                                                            <CommonText en="Tounge 2" hi="Tounge 2" />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-3 col-lg-3">
                                                            <div className={FormStyle.feildWrapper}>
                                                                <div className={FormStyle.patientPicCard}>
                                                                    <div className={FormStyle.patientUploadPic}>
                                                                        <Image src={patientDateWiseData?.preConsultationDetail?.faceImg ? (patientDateWiseData?.preConsultationDetail?.faceImg) : '/images/dummy.png'} alt="aboutpic" layout='fill' />
                                                                    </div>
                                                                    <div className={FormStyle.patientUploadTitle}>
                                                                        <p>
                                                                            <CommonText en="Face" hi="Face" />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-3 col-lg-3">
                                                            <div className={FormStyle.feildWrapper}>
                                                                <div className={FormStyle.patientPicCard}>
                                                                    <div className={FormStyle.patientUploadPic}>
                                                                        <Image src={patientDateWiseData?.preConsultationDetail?.other_img ? (patientDateWiseData?.preConsultationDetail?.other_img) : '/images/dummy.png'} alt="aboutpic" layout='fill' />
                                                                    </div>
                                                                    <div className={FormStyle.patientUploadTitle}>
                                                                        <p>
                                                                            <CommonText en="Other" hi="Other" />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.main_diseases && <>
                                                    <div className="col-md-12 mt-lg-5">
                                                        <h1 className={FormStyle.formTitle}>
                                                            <span className={FormStyle.formTitlelogo}>
                                                                <MdOutlineLocationOn />
                                                            </span>
                                                            <CommonText en="Previous Disease" hi="Previous Disease" />
                                                        </h1>
                                                    </div>
                                                </>}
                                                <div className="col-md-12 ">
                                                    <div className="row">
                                                        {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.main_diseases &&
                                                            <div className="col-md-3 col-lg-3">
                                                                <div className={PatientDashboardStyle.feildWrapper}>
                                                                    <label htmlFor="country_name"
                                                                    >
                                                                        <CommonText en="Disease Name" hi="Disease Name" />
                                                                    </label>
                                                                    <input type="text"
                                                                        className=" text-start"
                                                                        value={patientDateWiseData.preConsultationDetail.main_diseases} disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                        {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.diseases_time_period && patientDateWiseData.preConsultationDetail.diseases_time_period.time_value && <>
                                                            <div className="col-md-3 col-lg-3">
                                                                <div className={PatientDashboardStyle.feildWrapper}>
                                                                    <label htmlFor="state_name"
                                                                    >
                                                                        <CommonText en="Time Period" hi="Time Period" />
                                                                    </label>
                                                                    <input type="text"
                                                                        className=" text-start"
                                                                        value=
                                                                        {`${patientDateWiseData?.preConsultationDetail?.diseases_time_period?.time_value ? `${patientDateWiseData?.preConsultationDetail?.diseases_time_period?.time_value} ${patientDateWiseData?.preConsultationDetail?.diseases_time_period?.time_type}` :
                                                                            ""}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>}
                                                        {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.prev_medication_type && <>
                                                            <div className="col-md-3 col-lg-3">
                                                                <div className={PatientDashboardStyle.feildWrapper}>
                                                                    <label htmlFor="medication_type" className={FormStyle.customLabelSecond}>
                                                                        <CommonText en="Previous Medication Type" hi="Previous Medication Type" />
                                                                    </label>

                                                                    <input type="text" id="medication_type"

                                                                        className=" text-start"
                                                                        value={patientDateWiseData.preConsultationDetail.prev_medication_type} disabled
                                                                    />

                                                                </div>
                                                            </div>
                                                        </>}
                                                    </div>
                                                </div>

                                                {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.reports && patientDateWiseData.preConsultationDetail.reports.length > 0 && <>
                                                    <div className="col-md-12 mt-lg-5">
                                                        <h1 className={FormStyle.formTitle}>
                                                            <span className={FormStyle.formTitlelogo}>
                                                                <MdOutlineLocationOn />
                                                            </span>
                                                            <CommonText en="Reports" hi="Reports" />
                                                        </h1>
                                                    </div>
                                                    <div className="col-md-12 " >
                                                        <div className="row">
                                                            <div className="col-md-3 col-lg-3">
                                                                <div className={PatientDashboardStyle.feildWrapper}>
                                                                    <label htmlFor="country_name"
                                                                    >
                                                                        <CommonText en="Report Name" hi="Report Name" />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-lg-3">
                                                                <div className={PatientDashboardStyle.feildWrapper}>
                                                                    <label htmlFor="state_name"
                                                                    >
                                                                        <CommonText en="Report Value" hi="Report Value" />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {patientDateWiseData.preConsultationDetail.reports.map((items, ind) => {
                                                        return (<div className="col-md-12 " key={ind}>
                                                            <div className="row">
                                                                <div className="col-md-3 col-lg-3">
                                                                    <div className={PatientDashboardStyle.feildWrapper}>
                                                                        <input type="text" id="main_disease"
                                                                            className=" text-start"
                                                                            value={items.reportName} disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3 col-lg-3">
                                                                    <div className={PatientDashboardStyle.feildWrapper}>
                                                                        <input type="text" id="time_period"
                                                                            className=" text-start"
                                                                            value={items.report} disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>)
                                                    })}
                                                </>
                                                }

                                                {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.pre_pulse_observation && !Array.isArray(patientDateWiseData.preConsultationDetail.pre_pulse_observation) &&<>
                                                    <div className="col-md-12">
                                                        <div className={FormStyle.feildWrapper}>
                                                            <p className={`text-uppercase ${FormStyle.commonFormInnerHeading}`}>
                                                                नाडी का अवलोकन
                                                            </p>
                                                        </div>
                                                        <div className="row g-0 mb-2">
                                                            <div className="col-4 border px-4 py-2">
                                                                <p>वात</p>

                                                                <div className={FormStyle.custom_vat_observation}>
                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.pran_vat &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="pran_vat">
                                                                                प्राण वात
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.pran_vat == 'zonk' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    जोक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.pran_vat == 'sarp' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    सर्प
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }
                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.udan_vat &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="udan_vat">
                                                                                उदान वात
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.udan_vat == 'zonk' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    जोक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.udan_vat == 'sarp' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    सर्प
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }
                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.vyan_vat &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="vyan_vat">
                                                                                व्यान वात
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.vyan_vat == 'zonk' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    जोक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.vyan_vat == 'sarp' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    सर्प
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.saman_vat &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="saman_vat">
                                                                                सामान वात
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.saman_vat == 'zonk' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    जोक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.saman_vat == 'sarp' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    सर्प
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.apan_vat &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="apan_vat">
                                                                                अपान वात
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.apan_vat == 'zonk' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    जोक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.apan_vat == 'sarp' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    सर्प
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-4 border px-4 py-2">
                                                                <p>पित्त</p>
                                                                <div className={FormStyle.custom_vat_observation}>

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.pachak_pitt &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="pachak_pitt">
                                                                                पाचक पित्त
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.pachak_pitt == 'kowa' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कौवा
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.pachak_pitt == 'mendhak' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    मेंढक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.pachak_pitt == 'goaraya' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    गौरया
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.ranjak_pitt &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="ranjak_pitt">
                                                                                रंजक पित्त
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.ranjak_pitt == 'kowa' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कौवा
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.ranjak_pitt == 'mendhak' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    मेंढक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.ranjak_pitt == 'goaraya' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    गौरया
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }


                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.sandhak_pitt &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="sandhak_pitt">
                                                                                शाधक पित्त
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.sandhak_pitt == 'kowa' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कौवा
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.sandhak_pitt == 'mendhak' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    मेंढक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.sandhak_pitt == 'goaraya' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    गौरया
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.alockak_pitt &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="alockak_pitt">
                                                                                अलोचक पित्त
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.alockak_pitt == 'kowa' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कौवा
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.alockak_pitt == 'mendhak' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    मेंढक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.alockak_pitt == 'goaraya' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    गौरया
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.bhrjak_pitt &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="bhrjak_pitt">
                                                                                भ्रजाक पित्त
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.bhrjak_pitt == 'kowa' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कौवा
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.bhrjak_pitt == 'mendhak' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    मेंढक
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.bhrjak_pitt == 'goaraya' &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    गौरया
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div>

                                                            </div>

                                                            <div className="col-4 border px-4 py-2 ">
                                                                <p>कफ</p>
                                                                <div className={FormStyle.custom_vat_observation}>

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.awlambak_kaph &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="awlambak_kaph">
                                                                                अवलम्बक कफ
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.awlambak_kaph == "hans" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    हंस
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.awlambak_kaph == "kabutar" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कबूतर
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.kulendak_kaph &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="kulendak_kaph">
                                                                                कुलेंदक कफ
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.kulendak_kaph == "hans" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    हंस
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.kulendak_kaph == "kabutar" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कबूतर
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.bodhak_kaph &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="bodhak_kaph">
                                                                                बोधक कफ
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.bodhak_kaph == "hans" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    हंस
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.bodhak_kaph == "kabutar" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कबूतर
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.tripak_kaph &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="tripak_kaph">
                                                                                तृपक कफ
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.tripak_kaph == "hans" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    हंस
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.tripak_kaph == "kabutar" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कबूतर
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {patientDateWiseData.preConsultationDetail.pre_pulse_observation.sleshmak_kaph &&
                                                                        <div className="d-flex justify-content-between">
                                                                            <label className={`p-0 ${FormStyle.customRadio}`} htmlFor="sleshmak_kaph">
                                                                                स्लेष्मक कफ
                                                                            </label>
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.sleshmak_kaph == "hans" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    हंस
                                                                                </label>
                                                                            }
                                                                            {patientDateWiseData.preConsultationDetail.pre_pulse_observation.sleshmak_kaph == "kabutar" &&
                                                                                <label className={FormStyle.customRadio} htmlFor="pran_zonk_vat">
                                                                                    कबूतर
                                                                                </label>
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </>}
                                            </div>
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                        {patientDateWiseData && patientDateWiseData.consultationDetail && <>
                            <div className="row ">
                                <div className="col-md-12 mt-lg-2">
                                    <h1 className={FormStyle.formTitle}>
                                        <span className={FormStyle.formTitlelogo}>
                                            <IoMdContact />
                                        </span>
                                        <CommonText en="Consultation" hi="Consultation" />
                                    </h1>
                                </div>
                                <div className='col-md-12 mt-lg-2'>
                                    <div className='row g-0'>
                                        {(patientDateWiseData.consultationDetail.pulse_vata || patientDateWiseData.consultationDetail.pulse_pitta || patientDateWiseData.consultationDetail.pulse_kapha) &&
                                            <div className={`col-md-6 border ${FormStyle.majorDiseasesCard}`} >
                                                <h2 className={FormStyle.formTitle}>
                                                    <CommonText en="Pulse" hi="Pulse" />
                                                </h2>
                                                <ul className={`${FormStyle.consultationpreviewList} border-0 px-3`}>
                                                    {patientDateWiseData.consultationDetail.pulse_vata &&
                                                        <li>
                                                            <div className='row w-100'>
                                                                <div className='col-lg-2'>
                                                                    <div className={FormStyle.consultationpreviewListLeft}>
                                                                        <span>
                                                                            <CommonText en="Vata" hi="Vata" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <input type="text" id=""
                                                                            className="text-start"
                                                                            value={patientDateWiseData.consultationDetail.pulse_vata} disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                    {patientDateWiseData.consultationDetail.pulse_pitta &&
                                                        <li>
                                                            <div className='row w-100'>
                                                                <div className='col-lg-2'>
                                                                    <div className={FormStyle.consultationpreviewListLeft}>
                                                                        <span>
                                                                            <CommonText en="Pitta" hi="Pitta" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <input type="text" id=""
                                                                            className=" text-start"
                                                                            value={patientDateWiseData.consultationDetail.pulse_pitta} disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                    {patientDateWiseData.consultationDetail.pulse_kapha &&
                                                        <li>
                                                            <div className='row w-100'>
                                                                <div className='col-lg-2'>
                                                                    <div className={FormStyle.consultationpreviewListLeft}>
                                                                        <span>
                                                                            <CommonText en="Kapha" hi="Kapha" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <input type="text" id=""
                                                                            className=" text-start"
                                                                            value={patientDateWiseData.consultationDetail.pulse_kapha} disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                </ul>
                                            </div>
                                        }
                                        {(patientDateWiseData.consultationDetail.tounge_color || patientDateWiseData.consultationDetail.tounge_vata || patientDateWiseData.consultationDetail.tounge_pitta || patientDateWiseData.consultationDetail.tounge_kapha) &&
                                            <div className={`col-md-6 border ${FormStyle.majorDiseasesCard}`} >
                                                <h2 className={FormStyle.formTitle}>
                                                    <CommonText en="Tounge" hi="Tounge" />
                                                </h2>
                                                <ul className={`${FormStyle.consultationpreviewList} border-0 px-3`}>
                                                    {patientDateWiseData.consultationDetail.tounge_color &&
                                                        <li>
                                                            <div className='row w-100'>
                                                                <div className='col-lg-2'>
                                                                    <div className={FormStyle.consultationpreviewListLeft}>
                                                                        <span>
                                                                            <CommonText en="Color" hi="Color" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <input type="text" id=""
                                                                            className=" text-start"
                                                                            value={patientDateWiseData.consultationDetail.tounge_color} disabled

                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                    {patientDateWiseData.consultationDetail.tounge_vata &&
                                                        <li>
                                                            <div className='row w-100'>
                                                                <div className='col-lg-2'>
                                                                    <div className={FormStyle.consultationpreviewListLeft}>
                                                                        <span>
                                                                            <CommonText en="Vata" hi="Vata" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <input type="text" id=""
                                                                            className=" text-start"
                                                                            value={patientDateWiseData.consultationDetail.tounge_vata} disabled

                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                    {patientDateWiseData.consultationDetail.tounge_pitta &&
                                                        <li>
                                                            <div className='row w-100'>
                                                                <div className='col-lg-2'>
                                                                    <div className={FormStyle.consultationpreviewListLeft}>
                                                                        <span>
                                                                            <CommonText en="Pitta" hi="Pitta" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <input type="text" id=""
                                                                            className=" text-start"
                                                                            value={patientDateWiseData.consultationDetail.tounge_pitta} disabled

                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                    {patientDateWiseData.consultationDetail.tounge_kapha &&
                                                        <li>
                                                            <div className='row w-100'>
                                                                <div className='col-lg-2'>
                                                                    <div className={FormStyle.consultationpreviewListLeft}>
                                                                        <span>
                                                                            <CommonText en="Kapha" hi="Kapha" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <input type="text" id=""
                                                                            className=" text-start"
                                                                            value={patientDateWiseData.consultationDetail.tounge_kapha} disabled

                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                    <div className='row'>
                                        {patientDateWiseData.consultationDetail.infected_part_of_body && !Array.isArray(patientDateWiseData.consultationDetail.infected_part_of_body) && <>
                                            <div className="col-md-12 mt-lg-5">
                                                <h1 className={FormStyle.formTitle}>
                                                    <span className={FormStyle.formTitlelogo}>
                                                        <BiBody />
                                                    </span>
                                                    <CommonText en="Infected Part Of Body" hi="Infected Part Of Body" />
                                                </h1>
                                            </div>
                                            <div className='col-md-12 mt-lg-5'>
                                                <div className='row'>
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.lungs &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Lungs" hi="Lungs" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.lungs} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.stomach &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Stomach" hi="Stomach" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.stomach} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.kidney &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Kidney" hi="Kidney" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.kidney} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.head &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Head" hi="Head" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.head} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.largeIntestine &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Large Intestine" hi="Large Intestine" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.largeIntestine} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.smallIntestine &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Small Intestine" hi="Small Intestine" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.smallIntestine} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.waist &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Waist" hi="Waist" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.waist} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.above_hip &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Above hip" hi="Above hip" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.above_hip} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.heart &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Heart" hi="Heart" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.heart} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.urine &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Urine" hi="Urine" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.urine} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.soiling_in_foot &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Soiling in foot" hi="Soiling in foot" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.soiling_in_foot} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.pain_in_kidney &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Pain in Kidney" hi="Pain in Kidney" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.pain_in_kidney} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.how_the_urine &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="How's the Urine" hi="How's the Urine" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.how_the_urine} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.urine_color &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Urine Colour" hi="Urine Colour" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.urine_color} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.infected_part_of_body.water_consumption &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Water Consumption" hi="Water Consumption" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.infected_part_of_body.water_consumption} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </>}
                                        {patientDateWiseData.consultationDetail && patientDateWiseData.consultationDetail.dialysis && !Array.isArray(patientDateWiseData.consultationDetail.dialysis) && <>
                                            <div className="col-md-12 mt-lg-5">
                                                <h1 className={FormStyle.formTitle}>
                                                    <span className={FormStyle.formTitlelogo}>
                                                        <BiBody />
                                                    </span>
                                                    <CommonText en="Dialysis Details" hi="Dialysis Details" />
                                                </h1>
                                            </div>
                                            <div className='col-md-12 mt-lg-5'>
                                                <div className='row'>
                                                    {patientDateWiseData.consultationDetail.dialysis.happen &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Happen" hi="Happen" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.dialysis.happen} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.dialysis.inWeeks && patientDateWiseData.consultationDetail.dialysis.happen == 'yes' &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="In Weeks" hi="In Weeks" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.dialysis.inWeeks} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.consultationDetail.dialysis.nailColor &&
                                                        <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} >
                                                            <h2 className='p-3 border-0'><CommonText en="Nails" hi="Nails" /></h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={patientDateWiseData.consultationDetail.dialysis.nailColor} disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </>}

                                        {patientDateWiseData.consultationDetail.major_diseases &&
                                            <div className='col-md-4 mt-lg-5'>
                                                <div className={PatientDashboardStyle.feildWrapper}>
                                                    <label>
                                                        <CommonText en="Major Diseases" hi="Major Diseases" />
                                                    </label>
                                                    <input type="text"
                                                        className=" text-start"
                                                        value={patientDateWiseData.consultationDetail.disease_name} disabled
                                                    />
                                                </div>
                                            </div>
                                        }

                                        {patientDateWiseData.observations && ((patientDateWiseData.observations.pulse_observation && patientDateWiseData.observations.pulse_observation.length > 0) || (patientDateWiseData.observations.tounge_observation && patientDateWiseData.observations.tounge_observation.length > 0)) && <>
                                            <div className="col-md-12 mt-lg-5">
                                                <h1 className={FormStyle.formTitle}>
                                                    <span className={FormStyle.formTitlelogo}>
                                                        <BiBody />
                                                    </span>
                                                    <CommonText en="Observations" hi="Observations" />
                                                </h1>
                                            </div>
                                            <div className='col-md-12 mb-2'>
                                                <div className='row'>
                                                    {patientDateWiseData.observations.pulse_observation && patientDateWiseData.observations.pulse_observation.length > 0 &&
                                                        <div className='col-md-6 border'>
                                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                                <label>
                                                                    <CommonText en="Pulse Observation" hi="Pulse Observation" />
                                                                </label>
                                                                <ol className='border-0'>
                                                                    {patientDateWiseData.observations.pulse_observation.map((item, index) => {
                                                                        return (<li key={index}>{item.observation}</li>)
                                                                    })}
                                                                </ol>
                                                            </div>
                                                        </div>
                                                    }
                                                    {patientDateWiseData.observations.tounge_observation && patientDateWiseData.observations.tounge_observation.length > 0 &&
                                                        <div className='col-md-6 border'>
                                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                                <label>
                                                                    <CommonText en="Tounge Observation" hi="Tounge Observation" />
                                                                </label>
                                                                <ol className='border-0'>
                                                                    {patientDateWiseData.observations.tounge_observation.map((item, index) => {
                                                                        return (<li key={index}>{item.observation}</li>)
                                                                    })}
                                                                </ol>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </>}


                                        {patientDateWiseData.prefered_questions && patientDateWiseData.prefered_questions.length > 0 && <>
                                            <div className="col-md-12 mt-lg-5">
                                                <h1 className={FormStyle.formTitle}>
                                                    <span className={FormStyle.formTitlelogo}>
                                                        <BiBody />
                                                    </span>
                                                    <CommonText en="Disease Prefered Question" hi="Disease Prefered Question" />
                                                </h1>
                                            </div>
                                            <div className='col-md-12 mt-lg-5'>
                                                <div className='row'>
                                                    {patientDateWiseData.prefered_questions.map((item, index) => {
                                                        return (<div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} key={index}>
                                                            <h2 className='p-3 border-0'>
                                                                {item.question}
                                                            </h2>
                                                            <div className={FormStyle.feildWrapper}>
                                                                <input type="text" id=""
                                                                    className=" text-start"
                                                                    value={item.answer.answer} disabled
                                                                />
                                                            </div>
                                                        </div>)
                                                    })}
                                                </div>
                                            </div>
                                        </>}

                                        {patientDateWiseData.instructions && patientDateWiseData.instructions && patientDateWiseData.instructions.special_instruction.length > 0 && <>
                                            <div className="col-md-12 mt-lg-5">
                                                <h1 className={FormStyle.formTitle}>
                                                    <span className={FormStyle.formTitlelogo}>
                                                        <BiBody />
                                                    </span>
                                                    <CommonText en="Special Instruction" hi="Special Instruction" />
                                                </h1>
                                            </div>
                                            <div className='col-md-12 mb-2 border'>
                                                <ol >
                                                    {patientDateWiseData.instructions.special_instruction.map((item, index) => {
                                                        return (<li key={index}>{item.instruction}</li>)
                                                    })}
                                                </ol>
                                            </div>
                                        </>}

                                        {patientDateWiseData.consultationDetail.remark &&
                                            <div className='col-md-4 mt-lg-5'>


                                                <div className={PatientDashboardStyle.feildWrapper}>
                                                    <label>
                                                        <CommonText en="Remark" hi="Remark" />
                                                    </label>
                                                    <input type="text"
                                                        className=" text-start"
                                                        value={patientDateWiseData.consultationDetail.remark} disabled
                                                    />
                                                </div>

                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </>
                        }
                    </div>

                    
                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                    <div className='row'>
                            {patientDateWiseData && patientDateWiseData.medicineDetails && <>
                              {patientDateWiseData.medicineDetails.medicine_duration &&
                                <div className='col-md-4'>
                                  <div className={PatientDashboardStyle.feildWrapper}>
                                    <label>
                                      <CommonText en="Medicine Duration" hi="Medicine Duration" />
                                    </label>
                                    <input type="text"
                                      className=" text-start"
                                      value={`${patientDateWiseData.medicineDetails.medicine_duration} Month`} disabled
                                    />
                                  </div>
                                </div>}
                              {patientDateWiseData.medicineDetails.medicine_given_mode &&
                                <div className='col-md-4'>
                                  <div className={PatientDashboardStyle.feildWrapper}>
                                    <label>
                                      <CommonText en="Medicine given mode" hi="Medicine given mode" />
                                    </label>
                                    <input type="text"
                                      className=" text-start"
                                      value={patientDateWiseData.medicineDetails.medicine_given_mode} disabled
                                    />
                                  </div>
                                </div>}
                              {patientDateWiseData.medicineDetails.medicine_custom_inst &&
                                <div className='col-md-4'>
                                  <div className={PatientDashboardStyle.feildWrapper}>
                                    <label>
                                      <CommonText en="Special Intruction" hi="Special Intruction" />
                                    </label>
                                    <input type="text"
                                      className=" text-start"
                                      value={patientDateWiseData.medicineDetails.medicine_custom_inst} disabled
                                    />
                                  </div>
                                </div>}
                                </>}
                            </div>

                            {patientDateWiseData && patientDateWiseData.prescribedMedicine && patientDateWiseData.prescribedMedicine.length > 0 &&
                                     <>
                            <div className="row ">
                              <div className="col-md-12 ">
                                <h1 className={FormStyle.formTitle}>
                                  <span className={FormStyle.formTitlelogo}>
                                    <BiBody />
                                  </span>
                                  <ConsultationLang labelContent='Prescribed Medicine' keyword='prescribed_medicine' />
                                </h1>
                              </div>
                            </div>
                            {/* --------super responsive table------------------------ */}
                            <div className='col-md-12 '>

                              <Table className={`${FormStyle.customTable} ${PatientDashboardStyle.perscribedTable}
                            ${PatientDashboardStyle.responsiveCustomTable}
                            `}>
                                <Thead>
                                  <Tr>
                                    <Th className="border-end-0">
                                      <ConsultationLang labelContent="Seq" keyword="medicine" />
                                    </Th>
                                    <Th className="border-end-0">
                                      <ConsultationLang
                                      labelContent="Medicine Name"
                                      keyword="medicine_name"
                                    /></Th>
                                    <Th className="border-end-0">
                                      <ConsultationLang labelContent="Seq no" keyword="seq_no" /></Th>
                                    <Th className="border-end-0">
                                      <ConsultationLang
                                      labelContent="Suggested Time"
                                      keyword="suggested_time"
                                    /></Th>
                                    <Th className="border-end-0">
                                      <ConsultationLang
                                      labelContent="How to take"
                                      keyword="consumption_count"
                                    />
                                    </Th>
                                    <Th className="border-end-0">
                                      <ConsultationLang labelContent="Consumption Count" keyword="how_to_take" />
                                    </Th>
                                    <Th></Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {patientDateWiseData.prescribedMedicine.map(
                                      (prevPrescribedMedicine, indx) => {
                                        return (
                                          <Tr key={indx}>
                                            <Td className={`${PatientDashboardStyle.one} border-end-0`}>
                                              <div className={PatientDashboardStyle.feildWrapper}>
                                                <label htmlFor={FormStyle.customLabelSecond}>
                                                  {prevPrescribedMedicine.In_Take_Sequence}
                                                </label>
                                              </div>
                                            </Td>
                                            <Td className={`${PatientDashboardStyle.two} border-end-0`}>
                                              <div className={PatientDashboardStyle.feildWrapper}>
                                                {/* <input
                                                  type="text"
                                                  id=""
                                                  className='input-group-text w-100 d-flex justify-content-center'
                                                  value={prevPrescribedMedicine.medicine_name}
                                                  disabled
                                                /> */}
                                              <p>{prevPrescribedMedicine.medicine_name}</p>
                                              </div>
                                            </Td>
                                            <Td className={`${PatientDashboardStyle.three} border-end-0`}>
                                              <div className={PatientDashboardStyle.feildWrapper}>
                                                {prevPrescribedMedicine.how_to_take?.length > 0 &&
                                                  prevPrescribedMedicine.how_to_take.map((item, index) => {
                                                    return (
                                                      <>
                                                        <p>
                                                          {prevPrescribedMedicine.In_Take_Sequence}.
                                                          {index + 1}
                                                        </p>
                                                      </>
                                                    );
                                                  })
                                                }
                                              </div>
                                            </Td>
                                            <Td className={`${PatientDashboardStyle.four} border-end-0`}>
                                              <div className={PatientDashboardStyle.feildWrapper}>
                                                <div className={PatientDashboardStyle.textWrapper}>
                                                  {
                                                    prevPrescribedMedicine &&
                                                    prevPrescribedMedicine.how_to_take?.length > 0 &&
                                                    prevPrescribedMedicine.how_to_take.map((item, index) => {
                                                      return (
                                                        <>
                                                          <p>{item.time_of_take}</p>
                                                        </>
                                                      );
                                                    })
                                                  }
                                                </div>
                                              </div>
                                            </Td>
                                            <Td className={`${PatientDashboardStyle.four} border-end-0`}>
                                              <div className={PatientDashboardStyle.feildWrapper}>
                                                <div className={PatientDashboardStyle.textWrapper}>
                                                  {prevPrescribedMedicine &&
                                                    prevPrescribedMedicine.how_to_take?.length > 0 &&
                                                    prevPrescribedMedicine.how_to_take.map((item, index) => {
                                                      return (
                                                        <>
                                                          <p>{item.way_of_taken}</p>
                                                        </>
                                                      );
                                                    })
                                                  }
                                                </div>
                                              </div>
                                            </Td>
                                            <Td className={`${PatientDashboardStyle.five} border-end-0`}>
                                              <div className={PatientDashboardStyle.feildWrapper}>
                                                <input
                                                  type="text"
                                                  id=""
                                                  className="input-group-text text-center w-100"
                                                  value={prevPrescribedMedicine.consumption_count}
                                                  disabled
                                                />
                                              </div>
                                            </Td>
                                            <Td className={`${PatientDashboardStyle.seven} border-end-0`}>
                                              <button
                                                className={PatientDashboardStyle.patientView}
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                onClick={() => {
                                                  setMedicinePopUpData(
                                                    patientDateWiseData.prescribedMedicine[indx]
                                                  )
                                                }}
                                              >
                                                View
                                              </button>
                                            </Td>
                                          </Tr>
                                        )
                                      })
                                  }
                                </Tbody>
                              </Table>
                            </div>
                            </>}

                            {patientDateWiseData && patientDateWiseData.instructions && patientDateWiseData.instructions.medicine_instruction && patientDateWiseData.instructions.medicine_instruction.length > 0 && <>
                              <div className="row mt-4">
                                <div className="col-md-12 ">
                                  <h1 className={FormStyle.formTitle}>
                                    <span className={FormStyle.formTitlelogo}>
                                      <BiBody />
                                    </span>
                                    <CommonText en="Medicine Instruction" hi="Medicine Instruction" />
                                  </h1>
                                </div>
                              </div>
                              <ol>
                                {patientDateWiseData && patientDateWiseData.instructions.medicine_instruction.map((item) => {
                                  return (<li className='mb-2'>
                                    {item.instruction}
                                  </li>)
                                })}
                              </ol>
                            </>}
                    </div>
                    
                    <div className="tab-pane fade" id="pills-exercise" role="tabpanel" aria-labelledby="pills-exercise-tab"
                      tabIndex="0">
                        <div className='row'>
                              {patientDateWiseData && patientDateWiseData.preferedExercises && patientDateWiseData.preferedExercises.length > 0 && <>
                              <div className='col-md-12'>
                                <h1 className={FormStyle.formTitle}>
                                  <span className={FormStyle.formTitlelogo}>
                                    <BiBody />
                                  </span>
                                  <CommonText en='Exercises' hi='अभ्यास' />
                                </h1>
                              </div>
                              <div className='col-md-12'>
                                <div className='row'>
                                  {patientDateWiseData.preferedExercises.map((item, i) => {
                                    return (
                                      <div className='col-md-6' key={i}>
                                        <div className={PatientDashboardStyle.patientExerciseCard}>
                                          <div className='row'>
                                            <div className='col-md-3'>
                                              <div className={PatientDashboardStyle.one}>
                                                <Image className={PatientDashboardStyle.onePic} src={item.images ? (item.images) : '/images/dummy.png'}
                                                  alt="exercise image" layout='responsive' width={110} height={80} />
                                              </div></div>
                                            <div className='col-md-9'>
                                              <div className={PatientDashboardStyle.two}>
                                                <h3><CommonText en={item.exercise_name} hi={item.exercise_hi_name} /> </h3>
                                                <p><CommonText en={item.how_to_do} hi={item.hi_how_to_do} /></p></div>


                                            </div>
                                            <div className='d-flex justify-content-end pe-4 mt-2'>
                                              <button className={PatientDashboardStyle.patientView}
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop1"
                                                onClick={() => {
                                                  setExerciseSequence(i + 1)
                                                  setExercisePopUpData(patientDateWiseData.preferedExercises[i])
                                                }}
                                              >View</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }
                                  )
                                  }
                                </div>
                              </div>
                              </>
                            }
                              {patientDateWiseData && patientDateWiseData.instructions && patientDateWiseData.instructions.exercise_instruction && patientDateWiseData.instructions.exercise_instruction.length > 0 && <>
                                <div className="row">
                                  <div className="col-md-12 ">
                                    <h1 className={FormStyle.formTitle}>
                                      <span className={FormStyle.formTitlelogo}>
                                        <BiBody />
                                      </span>
                                      <CommonText en="Exercise Instruction" hi="Exercise Instruction" />
                                    </h1>
                                  </div>
                                </div>
                                <ol>
                                  {patientDateWiseData.instructions.exercise_instruction.map((item) => {
                                    return (<li className='mb-2'>
                                      {item.instruction}
                                    </li>)
                                  })}
                                </ol>
                              </>}
                            </div>
                    </div>
                    <div className="tab-pane fade" id="pills-general" role="tabpanel" aria-labelledby="pills-general-tab" tabIndex="0">
                    {patientDateWiseData.diets && 
                                            <div className='row'>
                                                {patientDateWiseData.diets.diet_to_take && patientDateWiseData.diets.diet_to_take.length > 0 && <>
                                                <div className='col-md-12'>
                                                    <h1 className={FormStyle.formTitle}>
                                                        <span className={FormStyle.formTitlelogo}>
                                                            <BiBody />
                                                        </span>
                                                        <CommonText en="Diet to take" hi="Diet to take" />
                                                    </h1>
                                                </div>
                                                <div className='col-md-12'>
                                                    <ol>
                                                        {patientDateWiseData.diets.diet_to_take.map((item)=>{
                                                            return(<li className='mb-2'>{item.description}</li>)
                                                        })}
                                                    </ol>
                                                </div>
                                                </>}

                                                {patientDateWiseData.diets.diet_not_to_take && patientDateWiseData.diets.diet_not_to_take.length > 0 && <>
                                                <div className='col-md-12 mt-4'>
                                                    <h1 className={FormStyle.formTitle}>
                                                        <span className={FormStyle.formTitlelogo}>
                                                            <BiBody />
                                                        </span>
                                                        <CommonText en="Diet not to take" hi="Diet not to take" />
                                                    </h1>
                                                </div>
                                                <div className='col-md-12'>
                                                    <ol>
                                                        {patientDateWiseData.diets.diet_not_to_take.map((item)=>{
                                                            return(<li className='mb-2'>{item.description}</li>)
                                                        })}
                                                    </ol>
                                                </div>
                                                </>}
                                            </div>
                                        }
                    </div>
                    <div className="tab-pane fade" id="pills-timeTable" role="tabpanel" aria-labelledby="pills-timeTable-tab" tabIndex="0">
                    {patientDateWiseData && patientDateWiseData.time_table &&  patientDateWiseData.time_table.length > 0 && <>
                        <div className="col-md-12 mt-3">
                                    <div className={FormStyle.feildWrapper}>
                                      <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                                        
                                        <CommonText en="Time Table" hi="समय सारणी" />
                                      </h1>
                                    </div>
                                  </div>

                                  <div className='col-md-12 my-2'>
                                    <div className='row g-0'>
                                      <div className='col-md-3 border d-flex justify-content-center align-items-center py-2 light-green-bg text-white'>
                                        
                                        <span className='fw-bold '><CommonText en="Prefered Time" hi="सुविधा-प्राप्त समय"  /></span>
                                      </div>
                                      <div className='col-md-3 border d-flex justify-content-center align-items-center py-2 light-green-bg text-white'>
                                        
                                        
                                      <span className='fw-bold '><CommonText en="Medicine Seq No" hi="मेडिसिन सीक नं" /></span>
                                      </div>
                                      <div className='col-md-6 border d-flex justify-content-center align-items-center py-2 light-green-bg text-white'>
                                        
                                      <span className='fw-bold '><CommonText en="Description" hi="विवरण" /></span>
                                      </div>
                                    </div>
                                    {patientDateWiseData.time_table.map((item) => {
                                      return (<div className='row g-0'>
                                        <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                          {item.startTime} {item.endTime ? '-' : ''} {item.endTime ? item.endTime : ''}
                                        </div>
                                        <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                          {item.medicines && item.medicines.length > 0 && <>
                                            {item.medicines.map((med, indx) => {
                                              return `${med.value} ${indx == (item.medicines.length - 1) ? '' : ','} `
                                            })}</>}
                                        </div>
                                        <div className='col-md-6 border d-flex align-items-center py-2 ps-3'>
                                          {item.description}
                                        </div>
                                      </div>)
                                    })}
                                  </div>
                    </>}
                    </div>
                    
                  </div>
                </section>
                :
                <p>
                  <CommonText en="No data Found" hi="कोई डेटा नहीं मिला" /></p>
              }
              </>
              }</>
              :
              <p><CommonText en="Good Morning !.." hi="शुभ प्रभात !.." /><br />
                <CommonText en="No Patients have registered yet. You can come again here and see the details once the patients are registered." hi="अभी तक कोई मरीज दर्ज नहीं हुआ है। आप यहां फिर से आ सकते हैं और रोगियों के पंजीकरण के बाद विवरण देख सकते हैं।" /></p>
            }

          </div>
        </div>
      </section>
      <div>
      {medicinePopUpData && 
        <div className={`${PatientDashboardStyle.customPopup} modal fade}`}
          id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
          aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered  modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header border-bottom-0">
                <h5 class="modal-title" id="staticBackdropLabel">Detailed Prescribed Medicine info</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <span><FaTimes /></span>
                </button>
              </div>
              <div class="modal-body">
                <div className='row'>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>Seq</h2>
                      <p className={PatientDashboardStyle.modalPara}>{medicinePopUpData.In_Take_Sequence}</p></div>
                  </div>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>Medicine</h2>
                      <p className={PatientDashboardStyle.modalPara}>{medicinePopUpData.medicine_name}</p>
                    </div>
                  </div>
                  {medicinePopUpData && medicinePopUpData.how_to_take && medicinePopUpData.how_to_take.length > 0 && 
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>Suggested Time</h2>
                      <table className={PatientDashboardStyle.modalTable} >
                        <thead>
                          <tr>
                            <th>Seq No</th>
                            <th>Suggested Time</th>
                            <th>Way of taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicinePopUpData.how_to_take.map((item, index) => {
                            return (
                              <>
                                <tr key={index}>
                                  <td>{medicinePopUpData.In_Take_Sequence}.{index + 1}</td>
                                  <td>{item.time_of_take}</td>
                                  <td>{item.way_of_taken}</td>
                                </tr>
                              </>
                            )
                          })}
                        </tbody>
                      </table>

                    </div>
                  </div>
                  }
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>Consumption Count</h2>
                      <p className={PatientDashboardStyle.modalPara}>{medicinePopUpData.consumption_count}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {exercisePopUpData && 
        <div className={`${PatientDashboardStyle.customPopup} modal fade}`}
          id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
          aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered  modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header border-bottom-0">
                <h5 class="modal-title" id="staticBackdropLabel">Detailed Exercise </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <span><FaTimes /></span>
                </button>
              </div>
              <div class="modal-body">
                <div className='row'>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>Seq</h2>
                      <p className={PatientDashboardStyle.modalPara}>
                        {exerciseSequence}
                      </p></div>
                  </div>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>
                        Exercise Name
                      </h2>
                      <p className={PatientDashboardStyle.modalPara}>{exercisePopUpData.exercise_name}</p>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>How to do</h2>
                      <p className={PatientDashboardStyle.modalPara}>
                        {exercisePopUpData.hi_how_to_do}
                      </p>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>Image</h2>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className={PatientDashboardStyle.exerciseSingleCard}>
                            <div className={PatientDashboardStyle.exerciseCardPic}>
                              <Image src={exercisePopUpData.images ? exercisePopUpData.images : "/images/dummy.png"}
                                alt="exercise pic" layout='fill' />
                            </div>
                            <div className={PatientDashboardStyle.exerciseCardContent}>
                              <h6 className='mb-0'>Pic</h6>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className={PatientDashboardStyle.exerciseSingleCard}>
                            <div className={PatientDashboardStyle.exerciseCardPic}>
                              <Image src={exercisePopUpData.gif ? exercisePopUpData.gif : "/images/dummy.png"}
                                alt="exercise pic" layout='fill' />
                            </div>
                            <div className={PatientDashboardStyle.exerciseCardContent}>
                              <h6 className='mb-0'>Gif</h6>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className={PatientDashboardStyle.exerciseSingleCard}>
                            <div className={PatientDashboardStyle.exerciseCardPic}>
                              {exercisePopUpData.videos ?
                                <video width="100%" height="100%" controls>
                                  <source src={exercisePopUpData.videos} type="video/mp4" />
                                </video>
                                :
                                <Image src="/images/dummy.png" alt="exercise video" layout='fill' />
                              }
                            </div>
                            <div className={PatientDashboardStyle.exerciseCardContent}>
                              <h6 className='mb-0'>Video</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      </div>

    </>
  )

}
export default Helpdesk;