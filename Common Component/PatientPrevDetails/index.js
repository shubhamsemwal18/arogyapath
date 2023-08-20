import FormStyle from '../../css/form.module.css';
import PatientDashboardStyle from '../../css/PatientDashboard.module.css'
import { CommonText } from '../../Multi_Lang';
import { useState } from 'react';
import { IoMdContact } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import { BiBody } from 'react-icons/bi'
import Image from 'next/image';

export const PatientPrevDetails = (props) => {
    const { patientAllPrevData } = props

    let [currentTab, setCurrentTab] = useState(0)
    let [patientDateWiseData, setPatientDateWiseData] = useState(props.patientDateWiseData)

    let changeTabData = (index) => {
        setPatientDateWiseData(patientAllPrevData[index])
        setCurrentTab(index)
    }

    console.log(patientDateWiseData, 'patient date wise data')

    return (<>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button py-lg-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" 
                    aria-expanded="false" aria-controls="collapseOne">
                        <CommonText en="Previous Details" hi="पिछला पूर्व परामर्श विवरण" />
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body p-0">
                        <div className="row g-0">
                            <div className="col-md-2 col-lg-2">
                                <ul className={`list-unstyled ${FormStyle.customRightBox} ${FormStyle.scorllable}`}>
                                    {patientAllPrevData.map((item, index) => {
                                        return (
                                            <li>
                                                <button
                                                    className={`btn w-100 text-start ${currentTab == index ? FormStyle.activeTab : ''}`}
                                                    onClick={() => changeTabData(index)}
                                                    disabled={currentTab == index}
                                                >
                                                    <span className="me-2">
                                                        <i className="fa-solid fa-file-export"></i>
                                                    </span>
                                                    {item.date}
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className={`col-md-10 col-lg-10 `}>
                                <section className={`${PatientDashboardStyle.patientTab} ${FormStyle.customLeftBox} ${FormStyle.scorllable} py-0`}>
                                    <ul className="nav nav-pills mb- d-flex justify-content-between"
                                        id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" disabled={patientDateWiseData.preConsultationDetail ? false : true} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                                <CommonText en="Preconsultation" hi="पूर्व परामर्श" />
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" disabled={patientDateWiseData.consultationDetail ? false : true} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                                <CommonText en="Consultation" hi="परामर्श" /></button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" disabled={patientDateWiseData.consultationDetail ? false : true} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                                                <CommonText en="Prescribed Medicine" hi="निर्धारित औषधि" /></button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-exercise-tab" disabled={patientDateWiseData.consultationDetail ? false : true} data-bs-toggle="pill" data-bs-target="#pills-exercise" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" >
                                                <CommonText en="Exercises" hi="अभ्यास" />
                                                </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-general-tab" disabled={patientDateWiseData.consultationDetail ? false : true} data-bs-toggle="pill" data-bs-target="#pills-general" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" >
                                                <CommonText en="Diets" hi="आहार" />
                                                </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-payment-tab" disabled={patientDateWiseData.payment_details ? false : true} data-bs-toggle="pill" data-bs-target="#pills-payment" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" >
                                                <CommonText en="Payments" hi="भुगतान" />
                                                </button>
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
                                                            <CommonText en="Oxymeter Reading" hi="ऑक्सीमीटर पढ़ना" />
                                                        </h1>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <div className="row">
                                                            {patientDateWiseData && patientDateWiseData.preConsultationDetail && patientDateWiseData.preConsultationDetail.oxymeter_reading && patientDateWiseData.preConsultationDetail.oxymeter_reading.oxygen_saturation && <>
                                                                <div className="col-md-3 col-lg-3">
                                                                    <div className={PatientDashboardStyle.feildWrapper}>
                                                                        <label htmlFor="oxygen_saturation">
                                                                            <CommonText en="Oxygen Saturation" hi="ऑक्सीजन संतृप्ति" /> (Spo2%)
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
                                                                        ><CommonText en="Pulse rate" hi="नब्ज़ दर" /> (bpm)</label>
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
                                                                        ><CommonText en="Temprature" hi="तापमान" /> (<span>&#176;</span>C)</label>
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
                                                        <CommonText en="Patient Photograph" hi="रोगी फोटो" />
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
                                                                            <CommonText en="Tounge 1" hi="जीभ 1" />
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
                                                                            <CommonText en="Tounge 2" hi="जीभ 2" />
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
                                                                            <CommonText en="Face" hi="चेहरा" />
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
                                                                            <CommonText en="Other" hi="अन्य" />
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
                                                            <CommonText en="Previous Disease" hi="पिछला रोग" />
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
                                                                        <CommonText en="Disease Name" hi="रोग का नाम" />
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
                                                                        <CommonText en="Time Period" hi="समय सीमा" />
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
                                                                        <CommonText en="Previous Medication Type" hi="पिछला औषधि प्रकार" />
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
                                                            <CommonText en="Reports" hi="विवरण" />
                                                        </h1>
                                                    </div>
                                                    <div className="col-md-12 " >
                                                        <div className="row">
                                                            <div className="col-md-3 col-lg-3">
                                                                <div className={PatientDashboardStyle.feildWrapper}>
                                                                    <label htmlFor="country_name"
                                                                    >
                                                                        <CommonText en="Report Name" hi="विवरण का नाम" />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-lg-3">
                                                                <div className={PatientDashboardStyle.feildWrapper}>
                                                                    <label htmlFor="state_name"
                                                                    >
                                                                        <CommonText en="Report Value" hi="विवरण का महत्व" />
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
                                                                            {patientDateWiseData.observations.pulse_observation.map((item,index)=>{
                                                                                return(<li key={index}>{item.observation}</li>)
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
                                                                            {patientDateWiseData.observations.tounge_observation.map((item,index)=>{
                                                                                return(<li key={index}>{item.observation}</li>)
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
                                                                    {patientDateWiseData.prefered_questions.map((item,index)=>{
                                                                        return(<div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} key={index}>
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
                                                                    {patientDateWiseData.instructions.special_instruction.map((item,index)=>{
                                                                        return(<li key={index}>{item.instruction}</li>)
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
                                            {patientDateWiseData.consultationDetail && patientDateWiseData.consultationDetail.medicine_duration && 
                                            <div className='col-md-4'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Medicine Duration" hi="Medicine Duration" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.consultationDetail.medicine_duration} disabled
                                                />
                                                </div>
                                        </div>}
                                        {patientDateWiseData.consultationDetail && patientDateWiseData.consultationDetail.medicine_given_mode && 
                                            <div className='col-md-4'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Medicine given mode" hi="Medicine given mode" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.consultationDetail.medicine_given_mode} disabled
                                                />
                                                </div>
                                        </div>}
                                        {patientDateWiseData.consultationDetail && patientDateWiseData.consultationDetail.medicine_custom_inst && 
                                            <div className='col-md-4'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Special Intruction" hi="Special Intruction" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.consultationDetail.medicine_custom_inst} disabled
                                                />
                                                </div>
                                        </div>}
                                        </div>

                                            {patientDateWiseData.prescribedMedicine && patientDateWiseData.prescribedMedicine.length > 0 && <>
                                            <div className="row mt-3">
                                                <div className="col-md-12 ">
                                                    <h1 className={FormStyle.formTitle}>
                                                        <span className={FormStyle.formTitlelogo}>
                                                            <BiBody />
                                                        </span>
                                                        <CommonText en="Prescribed Medicine" hi="Prescribed Medicine" />
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <table className={`${FormStyle.customTable}  w-100`}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="border-end-0">
                                                            <CommonText en="Medicine" hi="Medicine" />
                                                            </th>
                                                            <th scope="col" className="border-end-0">
                                                            <CommonText en="Buy From" hi="Buy From" />
                                                            </th>
                                                            <th scope="col" className='border-end-0'>
                                                            <CommonText en="Consumption Count" hi="Consumption Count" />
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        {patientDateWiseData.prescribedMedicine.map((prevPrescribedMedicine, indx) => {
                                                            return (
                                                                <tr key={indx}>
                                                                    <td className="border-end-0 ">
                                                                        <div className={PatientDashboardStyle.feildWrapper}>
                                                                            <label htmlFor={FormStyle.customLabelSecond}>{prevPrescribedMedicine.medicine_name}
                                                                            </label></div>
                                                                    </td>
                                                                    <td className="border-end-0">
                                                                        <div className={PatientDashboardStyle.feildWrapper}>
                                                                            <input type="text" id=""
                                                                                className=" text-start w-100"
                                                                                value={prevPrescribedMedicine.buy_from} disabled
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td className="border-end-0">
                                                                        <div className={PatientDashboardStyle.feildWrapper}>
                                                                            <input type="text" id=""
                                                                                className=" text-start w-100"
                                                                                value={prevPrescribedMedicine.consumption_count} disabled
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            </>}

                                            {patientDateWiseData.instructions && patientDateWiseData.instructions.medicine_instruction && patientDateWiseData.instructions.medicine_instruction.length > 0 && <>
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
                                                {patientDateWiseData.instructions.medicine_instruction.map((item)=>{
                                                    return(<li className='mb-2'>
                                                        {item.instruction}
                                                    </li>)
                                                })}
                                            </ol>
                                            </>}
                                            
                                        </div>
                                        <div className="tab-pane fade" id="pills-exercise" role="tabpanel" aria-labelledby="pills-exercise-tab"
                                            tabIndex="0">
                                                {patientDateWiseData.preferedExercises && patientDateWiseData.preferedExercises.length > 0 && 
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <h1 className={FormStyle.formTitle}>
                                                        <span className={FormStyle.formTitlelogo}>
                                                            <BiBody />
                                                        </span>
                                                        <CommonText en="Exercises" hi="Exercises" />
                                                    </h1>
                                                </div>
                                                <div className='col-md-12 border mb-3'>
                                                    <div className='row'>
                                                        {patientDateWiseData.preferedExercises.map((item, i) => {
                                                            return (
                                                                <div className='col-md-4'>
                                                                    <div className={PatientDashboardStyle.two}>
                                                                        <p>{item.exercise_name}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            {patientDateWiseData.instructions && patientDateWiseData.instructions.exercise_instruction && patientDateWiseData.instructions.exercise_instruction.length > 0 && <>
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
                                                {patientDateWiseData.instructions.exercise_instruction.map((item)=>{
                                                    return(<li className='mb-2'>
                                                        {item.instruction}
                                                    </li>)
                                                })}
                                            </ol>
                                            </>}
                                        </div>
                                        <div className="tab-pane fade" id="pills-general" role="tabpanel" aria-labelledby="pills-exercise-tab" tabIndex="0">
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
                                        <div className="tab-pane fade" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab" tabIndex="0">
                                        {patientDateWiseData.payment_details && 
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <h1 className={FormStyle.formTitle}>
                                                        <CommonText en="Payment Detail" hi="Payment Detail" />
                                                    </h1>
                                                </div>

                                            <div className='col-md-3 col-3'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Previous Balance" hi="Previous Balance" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.payment_details.prev_balance} disabled
                                                />
                                                </div>
                                        </div> 
                                            <div className='col-md-3 col-3'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Disease map amount" hi="Disease map amount" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.payment_details.map_amount} disabled
                                                />
                                                </div>
                                        </div>
                                            <div className='col-md-3 col-3'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Discount" hi="Discount" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.payment_details.discount} disabled
                                                />
                                                </div>
                                        </div>
                                            <div className='col-md-3 col-3'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Actual amount" hi="Actual amount" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.payment_details.actual_amount} disabled
                                                />
                                                </div>
                                        </div>
                                            </div>}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}