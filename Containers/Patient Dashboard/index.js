
import FormStyle from '../../css/form.module.css'

import Image from 'next/image';
import { IoMdContact } from 'react-icons/io'
import { BiBody, BiPlus } from 'react-icons/bi'
import { MdKeyboardArrowDown, MdOutlineLocationOn } from 'react-icons/md'
import { AiOutlineUser, AiFillCaretDown } from 'react-icons/ai'
import { RiBarChartHorizontalFill } from 'react-icons/ri'
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa'
import userDetail from '../../Utils/userDetails';
import { useDispatch, useSelector } from 'react-redux'
import * as ACTIONS from './action'
import { PreconsultationLang } from '../../MultiLanguageFiles/preConsultation';
import { ConsultationLang } from '../../MultiLanguageFiles/consultation';
import { CommonLang } from '../../MultiLanguageFiles/common';
import Cookies from 'universal-cookie';
import Router from 'next/router';
import { CommonText } from '../../Multi_Lang';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import PatientDashboardStyle from '../../css/PatientDashboard.module.css'
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from 'react-loading-spin';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'


function PatientDashboard() {
  let [userDetails, setUserDetails] = useState({})
  let [defaultView, setDefaultView] = useState(true)
  let [allPatientDate, setAllPatientDate] = useState([])
  let [patientDateWiseData, setPatientDateWiseData] = useState()
  let [activeButton, setActiveButton] = useState()
  let [medicinePopUpData, setMedicinePopUpData] = useState({})
  let [exercisePopUpData, setExercisePopUpData] = useState({})
  let [exerciseSequence, setExerciseSequence] = useState()
  let [isLoading,setIsLoading] = useState(true)
  let [isSearching,setIsSearching] = useState(false)
  let { addToast } = useToasts();

  const cookies = new Cookies();

  const state = useSelector((state) => state.PatientDashboardReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    setIsLoading(true)
    dispatch(ACTIONS.getAllPatientDate())
  }, [])

  useEffect(() => {
    if (state.getAllDateSuccess) {
      setIsLoading(false)
      setAllPatientDate(state.getAllDateSuccess.allDates)
    }

    if(state.getAllDateFailure){
      setIsLoading(false)
      addToast("Warning!", {
        appearance: "warning",
        content: `Unable to get patient details.`,
    });
    }

    dispatch(ACTIONS.resetToInitialState())
    
  }, [state.getAllDateSuccess, state.getAllDateFailure])

  useEffect(() => {
    if (state.getPatientDatewiseDataSuccess) {
      setIsSearching(false)
      setPatientDateWiseData(state.getPatientDatewiseDataSuccess.data)
    }
    if (state.getPatientDatewiseDataFaliure) {
      setIsSearching(false)
      addToast("Warning!", {
        appearance: "warning",
        content: `Unable to get patient details.`,
    });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.getPatientDatewiseDataSuccess, state.getPatientDatewiseDataFaliure])

  


  useEffect(() => {
    let result = userDetail();
    setUserDetails(result);
  }, [])

  let handleLogout = () => {
    cookies.remove('Arogya_Path_token');
    cookies.remove('Arogya_Path_Role');
    Router.push('/login')
  }

  let consultationView = (val, date, index) => {
    dispatch(ACTIONS.getAllPatientDateWiseData(date))
    setDefaultView(val)
    setActiveButton(index)
    setIsSearching(true)
  }

  let reverseDate = (date) => {
    let arr = date.split("-");
    let newArr = arr.reverse();
    let newDate = newArr.join("-")
    return newDate;
  }

  const redirectHome = () =>{
    Router.push('/');
}

const redirectProfile = () =>{
  Router.push('/Profile');
}


  //----------translate function copy from header-------
  let [languageEnglish,setLanguageEnglish] = useState(false);  
    

    if (typeof window !== 'undefined') {
        let language = cookies.get('Arogya_Path_Language');
        useEffect(()=>{
            if(language == 'Hindi'){
                setLanguageEnglish(false)
            }
            else{
                setLanguageEnglish(true)
            }
        },[language])
      }

      
    let translateHindi = () =>{
        cookies.set('Arogya_Path_Language','Hindi',{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000*365)});
        setLanguageEnglish(false)
        Router.replace(Router.asPath)
    }

    let translateEnglish = () =>{
        cookies.set('Arogya_Path_Language','English',{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000*365)});
        setLanguageEnglish(true)
        Router.replace(Router.asPath)
    } 
   



  return (

    <>
      <div className={PatientDashboardStyle.dashWrapper}>
        <header className={PatientDashboardStyle.dashboardHeader}>
          <nav className="navbar navbar-expand-lg py-0">
            <div className="container-fluid px-0">
              <button type="button" className='btn' onClick={()=>redirectHome()}>
                <div className='d-flex'>
                  <div className='me-3'>
                    <Image src="/images/logo.png" alt="aboutpic" width={30} height={30} />
                  </div>
                  <h1 className='fs-4 mb-0 text-dark'><CommonText en="Arogyapath" hi="आरोग्यपथ" />
                  </h1>
                </div>
              </button>
              <button
                className="navbar-toggler d-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon">
                  <RiBarChartHorizontalFill />
                </span>
              </button>
              
              <div
                className=" justify-content-between"
                // id="navbarSupportedContent"
              >
                <form className="d-flex w-100 justify-content-md-start justify-content-lg-end  pb-lg-0 pb-md-0 pb-2">
                  <div className="nav-item dropdown">
                    <span
                      className=
                      {`${PatientDashboardStyle.DropdownToggle} text-decoration-none  p-0 `}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className={`${PatientDashboardStyle.UserName} me-2`}>
                        {userDetails && userDetails.data && userDetails.data.userName.name}
                      </span>
                      <span className={PatientDashboardStyle.UserIcon}>
                        <AiOutlineUser />
                      </span>
                      <span className=" me-2 fs-6 text-dark">
                        <AiFillCaretDown />
                      </span>

                    </span>
                    <ul
                      className=
                      {`${PatientDashboardStyle.UserDropdown} dropdown-menu`}

                      aria-labelledby="navbarDropdown"
                    >
                      {/* <li>
                        <button
                        type='button'
                          className="dropdown-item "
                          onClick={()=>redirectProfile()}
                        >
                          Profile
                        </button>
                      </li> */}
                      <li>
                        <button
                          type='button'
                          className="dropdown-item "
                          onClick={() => handleLogout()}
                        >
                          
                          <CommonText en="Logout" hi="लॉग आउट" />
                        </button>
                      </li>
                      <li>
                          <button type='button' className='dropdown-item'>
                          {languageEnglish ? <span className='filled-btn' onClick={()=>translateHindi()}>अंग्रेज़ी</span> : <span className='filled-btn'  onClick={()=>translateEnglish()}>हिन्दी</span>}
                          </button>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </header>
        {isLoading ?
          <div className='d-flex justify-content-center custom-loader-fix-position'>
            <LoadingSpin
              size="100px"
              primaryColor="#2BBF50" />
          </div>
          :
          <section className={`${PatientDashboardStyle.dashBody}`}>
            <div className="container-fluid">
              <div className="row">
                <div className={`${PatientDashboardStyle.leftPart} col-md-3 col-lg-2 px-0 position-relative `}>
                  <span className={PatientDashboardStyle.asideNote}>
               
                    <CommonText en=" Click on date to see Consultations" hi="परामर्श देखने के लिए तिथि पर क्लिक करें"></CommonText>
                  </span>
                  <aside className=''>
                    <p className={PatientDashboardStyle.menuHeading}>Menu</p>
                    <ul className={PatientDashboardStyle.asideLinks}>
                      <li>
                        <div className="accordion" id="accordionExample">
                          <div className="accordion-item border-0">
                            <h2 className="accordion-header" id="headingOne">
                              <button
                                className="accordion-button btn mb-0 "
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="false"
                                aria-controls="collapseOne"
                              >
                                
                                
                                <CommonText en="Consultations" hi="परामर्श" />
                                <span className={PatientDashboardStyle.arrow}><MdKeyboardArrowDown /></span>
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              className="accordion-collapse collapse show"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body p-0 border-top-0">

                                <ul className={`${PatientDashboardStyle.customScroll} 
                              ${PatientDashboardStyle.scorllableList}
                              ps-0 list-unstyled `}>
                                  {
                                    allPatientDate && allPatientDate.length > 0 &&
                                    allPatientDate.map((item, i) => {
                                      return (
                                        <li className="" key={i}>
                                          <button
                                            className={`btn text-start ps-0 ${activeButton == i ? 'light-green-color' : ''}`}
                                            onClick={() => consultationView(false, item, i)}
                                            disabled={activeButton == i}
                                          >
                                            <span className="me-2">
                                              <i className="fa-solid fa-file-export"></i>
                                            </span>
                                            {reverseDate(item)}
                                          </button>
                                        </li>
                                      )
                                    })
                                  }
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </aside>
                </div>
                <div className={`${PatientDashboardStyle.rightPart} col-md-9 col-lg-10 `}>
                  {defaultView ? <section className={PatientDashboardStyle.entryCardArea}>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-md-8 mx-auto'>
                          <div className={PatientDashboardStyle.entryCard}>
                            <h1 className='text-center'>सुमंगल भावना</h1>
                            <h4>स्वस्ति पन्थामनु चरेम सूर्याचन्द्रमसाविव<br />। पुनर्ददताघ्नता जानता संगमेमहि।।</h4>
                            <p>जैसे सूर्य और चन्द्रमा नित्य, नियमित और निरन्तर रूप से अपने कर्मों में लगे रहते हैं, प्राकृतिक नियमों का अनुसरण करते हैं, व निरुपद्रव विचरते हैं, वैसे ही हम भी जीवन क्रम के नित्य - नियमित और निरन्तर नियमों को समझकर कल्याण मार्ग पर ज्ञान पूर्वक आचरण करते रहें ।</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                    : <section className={PatientDashboardStyle.patientTab}>
                      <ul className="nav nav-pills mb- d-flex justify-content-between"
                        id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="true">
                            
                            <CommonText en="Prescribed Medicine" hi="निर्धारित औषधि" />
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="pills-exercise-tab" 
                          data-bs-toggle="pill" data-bs-target="#pills-exercise" type="button" 
                          role="tab" aria-controls="pills-disabled" aria-selected="false" >
                            <CommonText en="Exercises" hi="अभ्यास" />
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="pills-general-tab"
                            data-bs-toggle="pill" data-bs-target="#pills-general"
                            type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">
                              <CommonText en="Diets" hi="आहार" />
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                             <button class="nav-link" id="pills-timeTable-tab" 
                              data-bs-toggle="pill" data-bs-target="#pills-timeTable" 
                              type="button" role="tab" aria-controls="pills-disabled" 
                               aria-selected="false">
                                
                                <CommonText en="Time Table" hi="समय सारणी" />
                                </button>
                          </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="pills-payment-tab" 
                          data-bs-toggle="pill" data-bs-target="#pills-payment" 
                          type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" >
                          <CommonText en="Payments" hi="भुगतान" />
                          </button>
                        </li>
                      </ul>
                      {isSearching ?
                        <div className="search-Loader">
                        <Loader
                            color='#2bbf4f' />
                        </div>
                        :
                        <div className="tab-content pt-4" id="pills-tabContent">
                          <div className="tab-pane fade show active" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                            <div className='row'>
                            {patientDateWiseData && patientDateWiseData.medicineDetails && <>
                              {patientDateWiseData.medicineDetails.medicine_duration &&
                                <div className='col-md-4'>
                                  <div className={PatientDashboardStyle.feildWrapper}>
                                    <label>
                                      <CommonText en="Medicine Duration" hi="औषधि की अवधि" />
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
                                      <CommonText en="Medicine given mode" hi="औषधि दिए जाने का तरीका" />
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
                                      <CommonText en="Special Intruction" hi="विशेष निर्देश" />
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
                                     
                                      <CommonText en="Seq" hi="क्रम" />
                                    </Th>
                                    <Th className="border-end-0">
                                      <ConsultationLang
                                      labelContent="Medicine Name"
                                      keyword="medicine_name"
                                    /></Th>
                                    <Th className="border-end-0"  colspan={3}>
                                      <table className={
                                        PatientDashboardStyle.perscribedTableHeadingRow

                                      }>
                                        <tr>
                                          <td>
                                          
                                          <CommonText en="Seq no" hi="क्रम संख्या" />
                                          </td>
                                          <td>
                                          
                                           <CommonText en="Suggested Time" hi="सुझाया_समय" />
                                          </td>
                                          <td>
                                         
                                          <CommonText en="How to take" hi="लेने के लिए कैसे करें" />
                                          </td>
                                        </tr>
                                      </table>
                                      </Th>
                                    {/* <Th className="border-end-0">
                                      <ConsultationLang
                                      labelContent="Suggested Time"
                                      keyword="suggested_time"
                                    /></Th>
                                    <Th className="border-end-0">
                                      <ConsultationLang
                                      labelContent="How to take"
                                      keyword="consumption_count"
                                    /> */}
                                    {/* </Th> */}
                                    <Th className="border-end-0">
                                      
                                      <CommonText en="Consumption Count" hi="खपत गणना" />
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
                                                <p className='common-input-replaced-para'>
                                                 
                                                  
                                                 <CommonText en= {prevPrescribedMedicine.medicine_name} 
                                                 hi= {prevPrescribedMedicine.medicine_hi_name} />
                                                  </p>
                                              </div>
                                            </Td>
                                            <Td className={`${PatientDashboardStyle.three} border-end-0`} colspan={3}>
                                              <div className={PatientDashboardStyle.feildWrapper}>
                                                {prevPrescribedMedicine.how_to_take?.length > 0 &&
                                                <Table className={PatientDashboardStyle.tableInsidetable}>
                                                
                                                  {prevPrescribedMedicine.how_to_take.map((item, index) => {
                                                    return (
                                                      <>
                                                      <Tr>
                                                          <Td>
                                                            <p>
                                                             <span className={PatientDashboardStyle.mobileTableRowHeading}>
                                                             <CommonText en="Seq no" hi="क्रम संख्या" />
                                                              </span>
                                                             <span className={PatientDashboardStyle.mobileTableRowHeadingSeparator}>-</span> 
                                                             {prevPrescribedMedicine.In_Take_Sequence}.{index + 1}
                                                            </p>
                                                            </Td>
                                                          <Td>
                                                           <p>
                                                           <span className={PatientDashboardStyle.mobileTableRowHeading}>
                                                          
                                                            <CommonText en="Suggested Time" hi="सुझाया_समय" />
                                                            </span>
                                                           <span className={PatientDashboardStyle.mobileTableRowHeadingSeparator}>-</span> 
                                                               
                                                               <CommonText en={item.time_of_take}
                                                 hi= {item.hi_time_of_take}/>
                                                            </p>
                                                            </Td>
                                                          <Td>
                                                           <p>
                                                           <span className={PatientDashboardStyle.mobileTableRowHeading}>
                                                           <CommonText en="How to take" hi="लेने के लिए कैसे करें" /></span> 
                                                           <span className={PatientDashboardStyle.mobileTableRowHeadingSeparator}>-</span>
                                                                
                                                                <CommonText en={item.way_of_taken}
                                                               hi= {item.hi_way_of_taken}/>
                                                            </p>
                                                          </Td>
                                                          </Tr>
                                                      </>
                                                    );
                                                  })}
                                                  
                                                      </Table>
                                                }
                                              </div>
                                            </Td>

                                            <Td className={`${PatientDashboardStyle.five} border-end-0`}>
                                              <div className={PatientDashboardStyle.feildWrapper}>
                                                <p className='common-input-replaced-para'>{prevPrescribedMedicine.consumption_count}</p>
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
                                                
                                                <CommonText en="View" hi="देखें" />
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
                                    <CommonText en="Medicine Instruction" hi="औषधि निर्देश" />
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

                            {/* ----------------super responsive table----------------- */}

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
                                              >
                                              <CommonText en="View" hi="देखें" /></button>
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
                          <div className="tab-pane fade" id="pills-general" role="tabpanel" aria-labelledby="pills-exercise-tab" tabIndex="0">

                              {patientDateWiseData && patientDateWiseData.diets && 
                                            <div className='row'>
                                                {patientDateWiseData.diets.diet_to_take && patientDateWiseData.diets.diet_to_take.length > 0 && <>
                                                <div className='col-md-12'>
                                                    <h1 className={FormStyle.formTitle}>
                                                        <span className={FormStyle.formTitlelogo}>
                                                            <BiBody />
                                                        </span>
                                                        <CommonText en="Diet to take" hi="आहार जो लेना है" />
                                                    </h1>
                                                </div>
                                                <div className='col-md-12'>
                                                    <ol>
                                                        {patientDateWiseData.diets.diet_to_take.map((item)=>{
                                                            return(<li className='mb-2'>
                                                              
                                                              <CommonText  en={item.description} hi={item.hi_description}/>
                                                            </li>)
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
                                                        <CommonText en="Diet not to take" hi="आहार जो नही लेना है" />
                                                    </h1>
                                                </div>
                                                <div className='col-md-12'>
                                                    <ol>
                                                        {patientDateWiseData.diets.diet_not_to_take.map((item)=>{
                                                            return(<li className='mb-2'>
                                                              
                                                              
                                                              <CommonText  en={item.description} hi={item.hi_description}/>
                                                              </li>)
                                                        })}
                                                    </ol>
                                                </div>
                                                </>}
                                            </div>
                                        }
                          </div>

                          {/* -------time table----------- */}
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
                                      <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                        
                                        <CommonText en="Prefered Time" hi="सुझाया_समय" />
                                      </div>
                                      <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                        
                                        
                                        <CommonText en="Medicine Seq No" hi="मेडिसिन सीक नं" />
                                      </div>
                                      <div className='col-md-6 border d-flex justify-content-center align-items-center py-2'>
                                        
                                        
                                        <CommonText en="Description" hi="विवरण" />

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
                                        <div className='col-md-6 border d-flex justify-content-center align-items-center py-2'>
                                          {item.description}
                                        </div>
                                      </div>)
                                    })}
                                  </div>
                    </>}

                    
                    </div>
                          {/* --------time table--------- */}

                          <div className="tab-pane fade" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab" tabIndex="0">
                                        {patientDateWiseData.payment_details && 
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <h1 className={FormStyle.formTitle}>
                                                        <CommonText en="Payment Detail" hi="लेखा विवरण
" />
                                                    </h1>
                                                </div>

                                            <div className='col-md-3'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Previous Balance" hi="पिछला बकाया" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.payment_details.prev_balance} disabled
                                                />
                                                </div>
                                        </div> 
                                            <div className='col-md-3'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Disease map amount" hi="रोग आधारित राशि" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.payment_details.map_amount} disabled
                                                />
                                                </div>
                                        </div>
                                            <div className='col-md-3'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Discount" hi="छूट" />
                                                </label>
                                                <input type="text"
                                                    className=" text-start"
                                                    value={patientDateWiseData.payment_details.discount} disabled
                                                />
                                                </div>
                                        </div>
                                            <div className='col-md-3'>
                                            <div className={PatientDashboardStyle.feildWrapper}>
                                                <label>
                                                    <CommonText en="Actual amount" hi="वास्तविक राशि" />
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
                      }
                    </section>
                  }
                  <div className={PatientDashboardStyle.rightPartFooter}>
                    <div className={PatientDashboardStyle.rightPartFooterLeft}>
                      <span><CommonText en="Jadi Buti Farms,Kolhupani,Uttarakhand 248007" 
                                    hi="जडी बूटी फार्म, कोल्हुपानी, उत्तराखंड 248007"/></span>
                    </div>
                    <div className={PatientDashboardStyle.rightPartFooterRight}>
                      <span>
                        Designed and Developed by <a href='https://giksindia.com/' target="_blank">
                          GIKS Pvt Ltd
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      </div>

      <div>
      {medicinePopUpData && 
        <div className={`${PatientDashboardStyle.customPopup} modal fade}`}
          id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
          aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered  modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header border-bottom-0">
                <h5 class="modal-title" id="staticBackdropLabel">
                  
                  <CommonText en="Detailed Prescribed Medicine info" hi="विस्तृत निर्धारित दवा की जानकारी" />
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <span><FaTimes /></span>
                </button>
              </div>
              <div class="modal-body">
                <div className='row'>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>
                      
                        <CommonText en="Seq" hi="क्रम" />
                      </h2>
                      <p className={PatientDashboardStyle.modalPara}>{medicinePopUpData.In_Take_Sequence}</p></div>
                  </div>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>
                        
                        
                        <CommonText en="Medicine" hi="औषधि" />
                        
                        </h2>
                      <p className={PatientDashboardStyle.modalPara}>{medicinePopUpData.medicine_name}</p>
                    </div>
                  </div>
                  {medicinePopUpData && medicinePopUpData.how_to_take && medicinePopUpData.how_to_take.length > 0 && 
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>
                      <CommonText en="Suggested Time" hi="सुझाया_समय" />
                        </h2>
                      <table className={PatientDashboardStyle.modalTable} >
                        <thead>
                          <tr>
                            <th>

                            <CommonText en="Seq No" hi="क्रम संख्या" />
                            </th>
                            <th>
                            <CommonText en="Suggested Time" hi="सुझाया_समय" />
                            </th>
                            <th>
                            <CommonText en="Way of taken" hi="लेने के लिए कैसे करें" />
                            </th>
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
                      <h2 className={PatientDashboardStyle.modalHeading}>
                        
                        <CommonText en="Consumption Count" hi="खपत गणना" />
                        </h2>
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
                <h5 class="modal-title" id="staticBackdropLabel">
                   
                  <CommonText en="Detailed Exercise" hi="विस्तृत व्यायाम" />
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <span><FaTimes /></span>
                </button>
              </div>
              <div class="modal-body">
                <div className='row'>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>
                      <CommonText en="Seq" hi="क्रम" />
                      </h2>
                      <p className={PatientDashboardStyle.modalPara}>
                        {exerciseSequence}
                      </p></div>
                  </div>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>
                        
                        <CommonText en="Exercise Name" hi="व्यायाम का नाम" />
                      </h2>
                      <p className={PatientDashboardStyle.modalPara}>
                        
                        <CommonText en={exercisePopUpData.exercise_name} hi={exercisePopUpData.exercise_hi_name} />
                        
                        </p>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>
                        
                        <CommonText en="How to do" hi="कैसे करना है" />
                      </h2>
                      <p className={PatientDashboardStyle.modalPara}>
                        {exercisePopUpData.hi_how_to_do}
                      </p>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className={PatientDashboardStyle.modalWrapper}>
                      <h2 className={PatientDashboardStyle.modalHeading}>
                        
                        

                      </h2>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className={PatientDashboardStyle.exerciseSingleCard}>
                            <div className={PatientDashboardStyle.exerciseCardPic}>
                              <Image src={exercisePopUpData.images ? exercisePopUpData.images : "/images/dummy.png"}
                                alt="exercise pic" layout='fill' />
                            </div>
                            <div className={PatientDashboardStyle.exerciseCardContent}>
                              <h6 className='mb-0'>
                              <CommonText en="Image" hi="प्रतिरूप" />
                              </h6>
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
                              <h6 className='mb-0'>
                                
                                <CommonText en="Gif" hi="जीआईएफ" />
                                </h6>
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
                              <h6 className='mb-0'>
                                
                                <CommonText en="Video" hi="वीडियो" />
                                
                              </h6>
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

export default PatientDashboard
