import FormStyle from '../../css/form.module.css';
import customModalStyle from '../../css/customModal.module.css'
import {ImProfile} from 'react-icons/im';
import { HiDotsVertical } from 'react-icons/hi';
import { BiPlus } from 'react-icons/bi'
import { FiEdit2 } from 'react-icons/fi'
import {VscSearch} from 'react-icons/vsc'
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _, {debounce} from 'lodash';
import { Wizard, WizardStep } from '../../Common Component/Wizard/WizardFields';
import { useToasts } from "react-toast-notifications";
import * as ACTIONS from './action'
import { PatientRegister } from '../../MultiLanguageFiles/patientRegister';
import LoadingSpin from "react-loading-spin";
import { Pagination } from '../../Common Component/Pagination';
import { CommonText } from '../../Multi_Lang';
import { States } from '../../All_Common_Data';
import { CommonPlainText } from '../../Multi_Lang/text';

export default function Patient() {


    let intialValue = {
        address_1: "",
        address_2: "",
        city: "",
        date_of_birth: "",
        email: "",
        father_name: "",
        name: "",
        gender: "",
        height: "",
        identification_number: "",
        mobile: "",
        mother_name: "",
        occupation: "",
        pincode: "",
        place_of_birth: "",
        refered_by: "",
        state: "",
        time_of_birth: "",
        weight: "",
    }

    let [paginationData,setPaginationData] = useState({
        currentPage:1,
        recordFrom:'',
        recordTo:'',
        lastPage:'',
        record_per_page:20,
        total:'',
        searchValue:'',
    })
    
    let [isSubmitting, setIsSubmitting] = useState(false)
    let [currentMode, setCurrentMode] = useState('')
    let [haveResponse, setHaveResponse] = useState(false)
    let [responseData, setResponseData] = useState({})
    let [updatePayload, setUpdatePayload] = useState({
        patient_id:'',
    })
    let [regAndTokenPayload, setRegAndTokenPayload] = useState({
        patientId:'',
        tokenId:'',
    })
    let [isLoading,setIsLoading] = useState(true);
    let [isSearching, setIsSearching] = useState(true);
    let [patientAge,setPatientAge] = useState('');
    let [listView,setListView] = useState(true)
    let [patientPayload, setPatientPayload] = useState(intialValue);
    let [allPatients, setAllPatients] = useState([])

    let dispatch = useDispatch();
    let state = useSelector((state) => state.PatientReducer);
    let { addToast } = useToasts();

    let resetToInitialPayload = () =>{
        
        setHaveResponse(false)
        setPatientPayload(intialValue)
        setResponseData({})
        setPatientAge('')
        setUpdatePayload({
            patient_id:'',
        })
        setRegAndTokenPayload({
            patientId:'',
            tokenId:'',
        })
    }

      
    useEffect(() => {
        dispatch(ACTIONS.getAllPatient({
            currentPage:paginationData.currentPage,
            count:paginationData.record_per_page,
            search:paginationData.searchValue,
        }))
    }, [state.createPatientSuccess, state.updatePatientSuccess, state.generateNewTokenSuccess, state.changeResponseSuccess])

    useEffect(()=>{
        
        if(state.getAllPatientSuccess){

            let paginationDataCopy = {...paginationData}
            let allReceivedData = state.getAllPatientSuccess.allPatientData

            setAllPatients(allReceivedData.data)

            paginationDataCopy['currentPage'] = allReceivedData.current_page;
            paginationDataCopy['recordFrom'] = allReceivedData.from;
            paginationDataCopy['recordTo'] = allReceivedData.to;
            paginationDataCopy['lastPage'] = allReceivedData.last_page;
            paginationDataCopy['total'] = allReceivedData.total;

            setPaginationData(paginationDataCopy)

            setIsLoading(false)
            setIsSearching(false)
        }

        if(state.getAllPatientFailure){
            setIsLoading(false)
            setIsSearching(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patients.`,
              });
        }

        dispatch(ACTIONS.resetToInitialState())
        
    },[state.getAllPatientSuccess,state.getAllPatientFailure])

    let enableForm = () =>{
        setIsSubmitting(false)
        setListView(false)
    }

    let handleOnChange = (e) =>{
        let patientPayloadCopy = {...patientPayload}
        if(e.target.id == "mobile"){
            let regex = /^[0-9\b]+$/;
            if(e.target.value == "" || regex.test(e.target.value)){
                patientPayloadCopy[e.target.id] = e.target.value
                setPatientPayload(patientPayloadCopy)
            }
            else{
                return;
            }
        }
        patientPayloadCopy[e.target.id] = e.target.value
        setPatientPayload(patientPayloadCopy)
    }

    let handleOnSubmit = () =>{
        if(currentMode == 'Edit'){
            setIsSubmitting(true)
            dispatch(ACTIONS.updatePatient(updatePayload))
        }
        else{
            setIsSubmitting(true)
            dispatch(ACTIONS.createNewPatient(patientPayload))
        }
    }

    let maxAge = () =>{
        let globalDate = new Date();
        let currentDate = globalDate.getDate();
        let currentYear = globalDate.getFullYear()-1;
        let currentMonth = globalDate.getMonth();

        if(currentMonth <10){
        currentMonth = "0"+globalDate.getMonth();
        }
        if(currentDate <10){
        currentDate = "0"+globalDate.getDate();
        }

        let maxDate = `${currentYear}-${currentMonth}-${currentDate}`;

        return maxDate;
    }


    let handleSearchChange = (e) =>{
        
        
        let paginationDataCopy = {...paginationData}

            let regex = /^[0-9\b]+$/;

            if(e.target.value == "" || regex.test(e.target.value)){
                paginationDataCopy[e.target.name] = e.target.value
                setPaginationData(paginationDataCopy)
            }
    }

    let handlePaginationDataChange = (e) =>{
        e.preventDefault();

        let paginationDataCopy = {...paginationData}
        paginationDataCopy[e.target.name] = e.target.value
        setPaginationData(paginationDataCopy)

            dispatch(ACTIONS.getAllPatient({
                currentPage:paginationDataCopy.currentPage,
                count:paginationDataCopy.record_per_page,
                search:paginationDataCopy.searchValue,
            }))

            setIsSearching(true)
        
        
    }


    let viewPatient = (index) =>{
        setPatientPayload(allPatients[index])
        setListView(false)
        setCurrentMode('View')
    }

    useEffect(()=>{
        if(patientPayload.date_of_birth){
            var today = new Date();
            var birthDate = new Date(patientPayload.date_of_birth);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age--;
            }
            setPatientAge(age) 
        }
    },[patientPayload.date_of_birth])

    let editPatient = (index,id) =>{
        setPatientPayload(allPatients[index])
        updatePayload['patient_id'] = id;
        setListView(false)
        setCurrentMode('Edit')
    }

    let handleEditDetail = (e) =>{
        
        let updatePayloadCopy = {...updatePayload}
        updatePayloadCopy[e.target.id] = e.target.value
        let patientPayloadCopy = {...patientPayload}
        patientPayloadCopy[e.target.id] = e.target.value
        setUpdatePayload(updatePayloadCopy)
        setPatientPayload(patientPayloadCopy)
    }

    let disableForm = () =>{
        setIsSubmitting(false)
        setListView(true)
        setCurrentMode('')
        resetToInitialPayload()
    }

    useEffect(()=>{
        if(state.createPatientSuccess){
            setIsSubmitting(false)
            setHaveResponse(true)
            setResponseData(state.createPatientSuccess)
            setRegAndTokenPayload({
                patientId:state.createPatientSuccess.patientId,
                tokenId:state.createPatientSuccess.tokenId,
            })
            addToast("Success!", {
                appearance: "success",
                content: `Patient created successfully.`,
              });
        }

        if(state.createPatientFailure){
            setIsSubmitting(false)
            if(state.createPatientFailure?.message){
                addToast("Warning!", {
                    appearance: "warning",
                    content: `${state.createPatientFailure?.message}`,
                  });
            }
            else{
                addToast("Error!", {
                    appearance: "error",
                    content: `Unable to create patient.`,
                  });
                
            }
                    
            
        }

        dispatch(ACTIONS.resetToInitialState())
        
    },[state.createPatientSuccess,state.createPatientFailure])


    useEffect(()=>{
        if(state.updatePatientSuccess){
            setIsSubmitting(false)
            disableForm();
            addToast("Success!", {
                appearance: "success",
                content: `Patient updated successfully.`,
              });
        }

        if(state.updatePatientFailure){
            setIsSubmitting(false)
            addToast("Error!", {
                appearance: "error",
                content: state.updatePatientFailure.message,
              });
        }

        dispatch(ACTIONS.resetToInitialState())
        
    },[state.updatePatientSuccess,state.updatePatientFailure])


    let handleGenerateNewToken = (patient_id) =>{
        setIsSubmitting(true)
        dispatch(ACTIONS.generateNewToken({'patient_id':patient_id }))
    }

    useEffect(()=>{
        if(state.generateNewTokenSuccess){
            setIsSubmitting(false)
            setHaveResponse(true)
            setResponseData(state.generateNewTokenSuccess)
            setRegAndTokenPayload({
                tokenId:state.generateNewTokenSuccess.tokenId,
            })
            addToast("Success!", {
                appearance: "success",
                content: `New token created successfully.`,
              });
        }

        if(state.generateNewTokenFailure){
            setIsSubmitting(false)
            if(state.generateNewTokenFailure?.message){
                 addToast("Warning!", {
                    appearance: "warning",
                    content: `${state.generateNewTokenFailure?.message}`,
                  });
            }
            else{
            addToast("Error!", {
                appearance: "error",
                content: `Unable to create token.`,
              });
            }
        }

        dispatch(ACTIONS.resetToInitialState())
        
    },[state.generateNewTokenSuccess,state.generateNewTokenFailure])


    let handleTokenAndRegChange = (e) =>{
        let regAndTokenPayloadCopy = {...regAndTokenPayload}
        let responseDataCopy = {...responseData}
        responseDataCopy[e.target.id] = e.target.value
        regAndTokenPayloadCopy[e.target.id] = e.target.value
        setRegAndTokenPayload(regAndTokenPayloadCopy)
        setResponseData(responseDataCopy)
    }

    let handleResponseEditClick = (tagId) =>{
        if(tagId === 'registrationNo'){
            if(regAndTokenPayload.patientId !== ''){
                let tag = document.getElementById(tagId);
                tag.removeAttribute('disabled');
                tag.focus();
            }
            else{
                addToast("Error!", {
                    appearance: "error",
                    content: `Bad request.`,
                  });
            }
        }
        else{
            if(regAndTokenPayload.tokenId !== ''){
                let tag = document.getElementById(tagId);
                tag.removeAttribute('disabled');
                tag.focus();
            }
            else{
                addToast("Error!", {
                    appearance: "error",
                    content: `Bad request.`,
                  });
            }
        }
    }

    let handleResponseSubmit = () =>{
        if(regAndTokenPayload.tokenNo || regAndTokenPayload.registrationNo){
            if(!isSubmitting){
            setIsSubmitting(true)
            dispatch(ACTIONS.changeResponse(regAndTokenPayload))
            }
        }
        else{
            disableForm()
        }
    }

    useEffect(()=>{
        if(state.changeResponseSuccess){
            setIsSubmitting(false)
            setListView(true)
            resetToInitialPayload()
            addToast("Success!", {
                appearance: "success",
                content: `Your Data updated successfully.`,
              });
        }
        if(state.changeResponseFailure){
            setIsSubmitting(false)
            if(state.changeResponseFailure?.message){
                addToast("Warning!", {
                    appearance: "warning",
                    content: `${state.changeResponseFailure?.message}`,
                  });
            }
            else{
            addToast("Error!", {
                appearance: "error",
                content: 'Unable to update registration or token no.',
              });
            }
        }
        dispatch(ACTIONS.resetToInitialState())
    },[state.changeResponseSuccess,state.changeResponseFailure])

    let [addressCheck,setAddressCheck] = useState(false)

    let handleSameAddress = (e) =>{
        if(e.target.checked == true){
            let patietnPayloadCopy = {...patientPayload}
            patietnPayloadCopy.address_2 = patietnPayloadCopy.address_1;
            setPatientPayload(patietnPayloadCopy)
        }

        setAddressCheck(e.target.checked)
        
    }

    return (<>
    {haveResponse && 
    <div className={customModalStyle.customModalLayout}>
        <div className={customModalStyle.customModalBox}>
            <p className='text-center text-success'>
                <PatientRegister labelContent='Patient Created Successfully.' keyword='patient_created_success'/>
                </p>
            <div className='container'>
                <div className='row'>
                    {responseData.registrationNo !== undefined && 
                    <div className='col-12 d-flex justify-content-between align-items-center'>
                        <h6 className='mb-0'>
                            <PatientRegister labelContent='Registration Number' keyword='registration_no'/>
                        </h6>
                        <div className='d-flex'>
                            <input id="registrationNo" type="text" className={customModalStyle.customResponseBox} value={responseData.registrationNo} onChange={(e)=>handleTokenAndRegChange(e)} disabled/><div className={customModalStyle.customEditBox} onClick={()=>handleResponseEditClick('registrationNo')}><FiEdit2/></div>
                        </div>
                    </div>
                    }
                    {responseData.tokenNo !== undefined && 
                    <div className='col-12 d-flex justify-content-between align-items-center mt-3'>
                        <h6 className='mb-0'>
                            <PatientRegister labelContent='Consultation token number' keyword='consultation_token_no'/>
                        </h6>
                        <div className='d-flex'>
                            <input id="tokenNo" type="text" className={customModalStyle.customResponseBox} value={responseData.tokenNo} onChange={(e)=>handleTokenAndRegChange(e)} disabled/><div className={customModalStyle.customEditBox} onClick={()=>handleResponseEditClick('tokenNo')}><FiEdit2/></div>
                        </div>
                    </div>
                    }
                    <div className='col-12 d-flex justify-content-center mt-4'>
                    <button type='button' className={`${FormStyle.formButton} me-5`} onClick={()=>disableForm()}>
                        <PatientRegister labelContent='Cancel' keyword='cancel'/>
                    </button>
                        <button type="button"  className={FormStyle.formButton} onClick={()=>handleResponseSubmit()}>
                        <PatientRegister labelContent='OK' keyword='ok'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
        
        <section className={FormStyle.commonFormArea}>
                
                    {isLoading ? 
                    <div className={FormStyle.customLoader}>
                    <LoadingSpin
                    size="100px"
                    primaryColor="#2BBF50"/>
                    </div>
                    : 
                    <div className="container">
                    <div className="row">
                        {listView ? 
                        <div className="col-lg-12 ">
                            <div className={FormStyle.commonFormWrapper}>
                                <div className='row'>
                                <div className="col-md-4">
                                    <h1 className={FormStyle.formTitle}>
                                        <span className={FormStyle.formTitlelogo}>
                                            <ImProfile />
                                        </span>
                                        <PatientRegister labelContent='Today Patients' keyword='all_patients'/> 
                                    </h1>
                                </div>
                                <div className="col-md-5">
                                    
                                </div>
                                <div className="col-md-3 text-end">
                                <button type='button' className='common-gradient' 
                                onClick={() => enableForm()}><BiPlus /> <PatientRegister labelContent='Add New' keyword='add_new'/></button>
                                </div>
                                </div>
                                <div className='row justify-content-end'>
                                    <div className='col-md-7 d-flex justify-content-end'>
                                           <form 
                                           className={FormStyle.patientSearch}
                                           onSubmit={handlePaginationDataChange}
                                           >
                                            <input type="text" 
                                              id='search-box'
                                            className= {`${FormStyle.patientSearchInput} common-searchBox`}
                                            name='searchValue' 
                                            onChange={(e) => handleSearchChange(e)} 
                                            value={paginationData.searchValue} 
                                             placeholder={ CommonPlainText({
                                                en:'search with Regno/Mob no...',
                                                hi:'पंजीकरण सं./मोबाइल नं. से खोजें ..'
                                             })}
                                             maxLength="10"
                                            />
                                            <button 
                                            type='submit'
                                              className={FormStyle.patientSearchBtn}>
                                                <VscSearch/>
                                            </button>
                                            </form>
                                    </div>
                                </div>
                                {isSearching ? 
                                <div className='row justify-content-center'>
                                <LoadingSpin
                                size="100px"
                                primaryColor="#2BBF50"/>
                                </div>
                                :
                                <div className="col-md-12">
                                    {allPatients.length > 0 ?
                                    <div className={FormStyle.allListTable}>
                                        <table>
                                            <thead>
                                            <tr className={FormStyle.allListTableHeadings}>
                                                <th><PatientRegister labelContent='Token No' keyword='token_no'/></th>
                                                <th><PatientRegister labelContent='Name' keyword='name'/></th>
                                                <th><PatientRegister labelContent='Email' keyword='email'/></th>
                                                <th><PatientRegister labelContent='Contact Number' keyword='contact_no'/></th>
                                                <th><PatientRegister labelContent='Registration No' keyword='registration_no'/></th>
                                                <th className={FormStyle.allListTableActionList}></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                allPatients.map((item,index) => {
                                                    return (
                                                        <tr className={FormStyle.allListTableSingleRow} key={index}>
                                                            <td>{item.token_no}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.mobile}</td>
                                                            <td>{item.Registration_no}</td>
                                                            <td className={FormStyle.allListTableActionList}>
                                                                <ul className={FormStyle.actionList}>
                                                                    <li className="nav-item dropdown">
                                                                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <HiDotsVertical />
                                                                        </span>
                                                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                                        <li>
                                                                            <span className="dropdown-item" onClick={()=>viewPatient(index)} ><PatientRegister labelContent='View' keyword='view'/></span>
                                                                                </li>
                                                                                <li>
                                                                                    <span className="dropdown-item" onClick={()=>editPatient(index,item.id)}><PatientRegister labelContent='Edit' keyword='edit'/></span>
                                                                                </li>
                                                                                {item.token_no ? "" : 
                                                                                <li>
                                                                                    <span className='dropdown-item' onClick={()=>handleGenerateNewToken(item.id)}><PatientRegister labelContent='Generate New Token' keyword='generate_new_token'/></span>
                                                                                </li>
                                                                                } 
                                                                                <li>
                                                                                    <span className="dropdown-item"><PatientRegister labelContent='Delete' keyword='delete'/></span>
                                                                                </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                        <div className='d-flex justify-content-between mt-lg-3'>
                                            <div className='d-flex'>
                                                <button type='button' 
                                                className='btn common-prev-pagination-btn' 
                                                name='currentPage' 
                                                 value={paginationData.currentPage - 1 == 0 ? 1 : paginationData.currentPage - 1 } 
                                                  onClick={(e)=>handlePaginationDataChange(e)} disabled={paginationData.currentPage - 1 == 0}>
                                                    
                                                    <CommonText en="Prev" hi="पिछला"/>
                                                </button>

                                                <Pagination from={1} to={paginationData.lastPage} current={paginationData.currentPage} onclick={handlePaginationDataChange}/>

                                                <button type='button' 
                                                className='btn common-next-pagination-btn' 
                                                name='currentPage' 
                                                value={paginationData.currentPage + 1 >  paginationData.lastPage ? paginationData.lastPage : 
                                                      paginationData.currentPage + 1 } 
                                                onClick={(e)=>handlePaginationDataChange(e)} 
                                                disabled={paginationData.currentPage + 1 >  paginationData.lastPage}>
                                                      <CommonText en="Prev" hi="अगला"/></button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <p><PatientRegister labelContent='No patient have token for today. Please provide a token to see patients.' keyword='no_data_found'/></p>}
                                </div>
                                }
                            </div>
                        </div>
                         : 
                         ( currentMode !== 'View' ?
                         <div className="col-lg-12">
                         <div className={FormStyle.commonFormWrapper}>
                                 <Wizard handleSubmit={handleOnSubmit} wizardMode={currentMode} hideForm={disableForm} progressStatus={isSubmitting}>              
                                 <WizardStep>
                                     <div className="col-lg-12">
                                             <div className="row">
                                                 <div className="col-md-12">
                                                     <h1 className={FormStyle.formTitle}>
                                                         <span className={FormStyle.formTitlelogo}>
                                                         <ImProfile/>
                                                         </span>
                                                         रोगी की जानकारी 
                                                     </h1>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="name">नाम</label>
                                                        <input type="text" id="name" value={patientPayload.name} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}  required/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                         <label htmlFor="gender">
                                                         <PatientRegister labelContent='Gender' keyword='gender'/>
                                                         </label>
                                                         <select
                                                         id="gender"
                                                         value={patientPayload.gender}
                                                         onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)} 
                                                         >
                                                             <option value='' hidden defaultChecked><PatientRegister labelContent='Select your gender' keyword='select_gender'/></option>
                                                             <option value="male"><PatientRegister labelContent='Male' keyword='male'/></option>
                                                             <option value="female"><PatientRegister labelContent='Female' keyword='female'/></option>
                                                             <option value="others"><PatientRegister labelContent='Others' keyword='other'/></option>
                                                         </select>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                     <label htmlFor="identification_number">
                                                            <PatientRegister labelContent='Identification NO' keyword='identificationNO'/>
                                                        </label>
                                                        <input type="text" id="identification_number" value={patientPayload.identification_number} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="occupation">
                                                            <PatientRegister labelContent='Occupation' keyword='occupation'/>
                                                        </label>
                                                        <input type="text" id="occupation" value={patientPayload.occupation} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                     <label htmlFor="refered_by">
                                                            <PatientRegister labelContent='Refered By' keyword='referedBy'/>
                                                        </label>
                                                        <input type="text" id="refered_by" value={patientPayload.refered_by} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                     <label htmlFor="mother_name">
                                                            <PatientRegister labelContent='Mother Name' keyword='motherName'/>
                                                        </label>
                                                        <input type="text" id="mother_name" value={patientPayload.mother_name} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="father_name">
                                                            <PatientRegister labelContent='Father Name' keyword='fatherName'/>
                                                        </label>
                                                        <input type="text" id="father_name" value={patientPayload.father_name} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>

                                                 {/* next step add on first */}
                                                 <div className="col-lg-12">
                                             <div className="row">
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="date_of_birth">
                                                            <PatientRegister labelContent='Date Of Birth' keyword='dob'/>
                                                        </label>
                                                        <input type="date" id="date_of_birth" value={patientPayload.date_of_birth} max={maxAge()} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)} />
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="place_of_birth">
                                                            <PatientRegister labelContent='Place Of Birth' keyword='pob'/>
                                                        </label>
                                                        <input type="text" id="place_of_birth" value={patientPayload.place_of_birth} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="time_of_birth">
                                                            <PatientRegister labelContent='Time Of Birth' keyword='tob'/>
                                                        </label>
                                                        <input type="time" id="time_of_birth" value={patientPayload.time_of_birth} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                         <label>
                                                            <PatientRegister labelContent='Age' keyword='age'/>
                                                        </label>
                                                        <div className='input-group'>
                                                         <input
                                                             type="text"
                                                             id="age"
                                                             value={patientAge}
                                                             disabled={true}
                                                             aria-describedby="basic-addon2"
                                                             className='form-control bg-white'
                                                            
                                                         />
                                                         <span className='input-group-text'
                                                         id="basic-addon2"
                                                         >
                                                           <CommonText en="Year" hi="साल"/></span>
                                                         
                                                         </div>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="weight">
                                                            <PatientRegister labelContent='Weight' keyword='weight'/>
                                                        </label>
                                                        <div className='input-group'>
                                                        <input type="text" id="weight" 
                                                        value={patientPayload.weight} 
                                                        aria-describedby="basic-addon3"
                                                             className='form-control bg-white'
                                                       
                                                        onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                         <span className='input-group-text'
                                                         id="basic-addon3"
                                                         >
                                                           <CommonText en="kg" hi="कि. ग्रा."/></span>
                                                        </div>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                     
                                                        <label htmlFor="height">
                                                            <PatientRegister labelContent='Height' keyword='height'/>
                                                        </label>
                                                        <div className='input-group'>
                                                        <input 
                                                        type="text" 
                                                        id="height" 
                                                        value={patientPayload.height} 
                                                        className='form-control bg-white'
                                                        aria-describedby="basic-addon4"
                                                        onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                        <span className='input-group-text'
                                                         id="basic-addon4"
                                                         >
                                                           <CommonText en="cm" hi="से. मी."/></span>

                                                        </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                         {/* end add data */}
                                             </div>
                                     </div>
                                 </WizardStep>
                                 <WizardStep>
                                     <div className="col-lg-12">
                                             <div className="row">
                                                 <div className="col-md-12">
                                                     <h1 className={FormStyle.formTitle}>
                                                         <span className={FormStyle.formTitlelogo}>
                                                         <ImProfile/>
                                                         </span>
                                                         <PatientRegister labelContent='Address Information' keyword='address_information'/>
                                                     </h1>
                                                 </div>
                                                 <div className="col-md-6">
                                                     <div className={FormStyle.feildWrapper}>
                                                         <label htmlFor="address_1">
                                                            <PatientRegister labelContent='Current Address' keyword='add1'/>
                                                         </label>
                                                         <textarea
                                                         id="address_1"
                                                         rows="3"
                                                         value={patientPayload.address_1}
                                                         onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)} 
                                                         />
                                                     </div>
                                                 </div>
                                                 
                                                 <div className="col-md-6">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <div className='d-flex justify-content-between'>
                                                         <label htmlFor="address_2">
                                                            <PatientRegister labelContent='Permanent Address' keyword='add2'/>
                                                         </label>
                                                         {currentMode != 'view' && 
                                                         <div className=''>
                                                            <input id="same_as_permanent" type='checkbox' className='w-auto me-2' onChange={(e)=>handleSameAddress(e)} checked={addressCheck}/>
                                                         <label className='m-0' htmlFor="same_as_permanent">
                                                            <CommonText en="Same as Current Address" hi="वर्तमान पते के समान"/>
                                                         </label>
                                                         </div>} 
                                                         </div>
                                                         <textarea
                                                         id="address_2"
                                                         value={patientPayload.address_2}
                                                         rows="3"
                                                         onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)} 
                                                         />
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="state">
                                                            <PatientRegister labelContent='State' keyword='state'/>
                                                        </label>
                                                        <select
                                                         id="state"
                                                         value={patientPayload.state}
                                                         onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)} 
                                                         >
                                                             <option value='' hidden defaultChecked>
                                                                <CommonText en="Select State" hi="राज्य चुनें"/>
                                                                </option>
                                                             {States.map((state,index)=>{
                                                                return(
                                                                    <option value={state.en} key={index}>
                                                                         <CommonText en={state.en} hi={state.hi}/>
                                                                    </option>
                                                                )
                                                             })}
                                                         </select>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="city">
                                                            <PatientRegister labelContent='City' keyword='city'/>
                                                        </label>
                                                        <input type="text" id="city" value={patientPayload.city} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="pincode">
                                                            <PatientRegister labelContent='Pincode' keyword='pincode'/>
                                                        </label>
                                                        <input type="text" id="pincode" value={patientPayload.pincode} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-12 mt-3">
                                                     <h1 className={FormStyle.formTitle}>
                                                         <span className={FormStyle.formTitlelogo}>
                                                         <ImProfile/>
                                                         </span>
                                                         <PatientRegister labelContent='Contact Information' keyword='contact_information'/>
                                                     </h1>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="email">
                                                            <PatientRegister labelContent='Email' keyword='email'/>
                                                        </label>
                                                        <input type="email" id="email" value={patientPayload.email} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)}/>
                                                     </div>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <div className={FormStyle.feildWrapper}>
                                                        <label htmlFor="mobile">
                                                            <PatientRegister labelContent='Mobile' keyword='mobile'/>
                                                        </label>
                                                        <input type="mobile" id="mobile" 
                                                         minLength="10"
                                                         maxLength="10"
                                                        value={patientPayload.mobile} onChange={currentMode === 'Edit' ? (e)=>handleEditDetail(e) : (e)=>handleOnChange(e)} required/>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                 </WizardStep>
                             </Wizard>
                         </div>
                         </div>
                         :
                         <div className="col-lg-12">
                         <div className={`row ${FormStyle.commonFormWrapper}`}>            
                            <div className="col-md-12">
                                <h1 className={FormStyle.formTitle}>
                                    <span className={FormStyle.formTitlelogo}>
                                        <ImProfile/>
                                    </span>
                                    <PatientRegister labelContent='Patient Information' keyword='patient_information'/>
                                </h1>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='name'>नाम</label>
                                    <input type="text" id="name" name="name" value={patientPayload.name} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='gender'>
                                    <PatientRegister labelContent='Gender' keyword='gender'/>
                                    </label>
                                    <select
                                    id="gender"
                                    value={patientPayload.gender}
                                    disabled
                                    >
                                    <option value=''  hidden defaultChecked></option>
                                    <option value="male" disabled><PatientRegister labelContent='Male' keyword='male'/></option>
                                    <option value="female" disabled><PatientRegister labelContent='Female' keyword='female'/></option>
                                    <option value="others" disabled><PatientRegister labelContent='Others' keyword='other'/></option>
                                    </select>
                                    {/* <input type="text" id="gender" name="gender" value={patientPayload.gender} readOnly/> */}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='identification_number'>
                                        <PatientRegister labelContent='Identification NO' keyword='identificationNO'/>
                                    </label>
                                    <input type="text" id="identification_number" name="identification_number" value={patientPayload.identification_number} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='occupation'>
                                    <PatientRegister labelContent='Occupation' keyword='occupation'/>
                                    </label>
                                    <input type="text" id="occupation" name="occupation" value={patientPayload.occupation} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='refered_by'><PatientRegister labelContent='Refered By' keyword='referedBy'/></label>
                                    <input type="text" id="refered_by" name="refered_by" value={patientPayload.refered_by} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='mother_name'>
                                        <PatientRegister labelContent='Mother Name' keyword='motherName'/>
                                    </label>
                                    <input type="text" id="mother_name" name="mother_name" value={patientPayload.mother_name} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='father_name'>
                                        <PatientRegister labelContent='Father Name' keyword='fatherName'/>
                                    </label>
                                    <input type="text" id="father_name" name="father_name" value={patientPayload.father_name} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='date_of_birth'>
                                        <PatientRegister labelContent='Date Of Birth' keyword='dob'/>
                                    </label>
                                    <input type="date" id="date_of_birth" name="date_of_birth" value={patientPayload.date_of_birth} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='place_of_birth'>
                                        <PatientRegister labelContent='Place Of Birth' keyword='pob'/>
                                    </label>
                                    <input type="text" id="place_of_birth" name="place_of_birth" value={patientPayload.place_of_birth} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='time_of_birth'>
                                        <PatientRegister labelContent='Time Of Birth' keyword='tob'/>
                                    </label>
                                    <input type="time" id="time_of_birth" name="time_of_birth" value={patientPayload.time_of_birth} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label>
                                        <PatientRegister labelContent='Age' keyword='age'/>
                                    </label>
                                    <div className='input-group'>
                                    <input
                                        type="text"
                                        id="age"
                                        value={patientAge}
                                        className='form-control bg-white'
                                        aria-describedby="basic-addon2"
                                        readOnly
                                    />
                                    <span className='input-group-text'   id="basic-addon2">
                                                           <CommonText en="Year" hi="साल"/></span>
                                         </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <h1 className={FormStyle.formTitle}>
                                    <span className={FormStyle.formTitlelogo}>
                                    <ImProfile/>
                                    </span>
                                    <PatientRegister labelContent='Physical Information' keyword='physical_information'/>
                                </h1>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='weight'>
                                        <PatientRegister labelContent='Weight' keyword='weight'/>
                                    </label>
                                    <div className='input-group'>
                                    <input type="text" id="weight" 
                                      className='form-control bg-white'
                                      aria-describedby="basic-addon2"
                                    name="weight" value={patientPayload.weight} readOnly/>
                                    <span className='input-group-text'   id="basic-addon2">
                                            <CommonText en="kg" hi="कि. ग्रा."/>
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='height'>
                                        <PatientRegister labelContent='Height' keyword='height'/>
                                    </label>
                                    <div className='input-group'>
                                    <input type="text" 
                                    id="height" 
                                    className='form-control bg-white'
                                      aria-describedby="basic-addon2"
                                    name="height" 
                                    value={patientPayload.height} readOnly
                                    />
                                     <span className='input-group-text'   id="basic-addon2">
                                                           <CommonText en="cm" hi="से. मी."/></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <h1 className={FormStyle.formTitle}>
                                    <span className={FormStyle.formTitlelogo}>
                                        <ImProfile/>
                                    </span>
                                    <PatientRegister labelContent='Address Information' keyword='address_information'/>
                                </h1>
                            </div>
                            <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="address_1">
                                        <PatientRegister labelContent='Address 1' keyword='add1'/>
                                    </label>
                                        <textarea
                                            id="address_1"
                                            rows="3"
                                            >{patientPayload.address_1}
                                        </textarea>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="address_2">
                                        <PatientRegister labelContent='Address 2' keyword='add2'/>
                                    </label>
                                    <textarea
                                        id="address_2"
                                        rows="3"
                                        >{patientPayload.address_2}
                                    </textarea>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='city'>
                                        <PatientRegister labelContent='City' keyword='city'/>
                                    </label>
                                    <input type="text" id="city" name="city" value={patientPayload.city} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='state'>
                                        <PatientRegister labelContent='State' keyword='state'/>
                                    </label>
                                    <input type="text" id="state" name="state" value={patientPayload.state} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='pincode'>
                                        <PatientRegister labelContent='Pincode' keyword='pincode'/>
                                    </label>
                                    <input type="text" id="pincode" name="pincode" value={patientPayload.pincode} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <h1 className={FormStyle.formTitle}>
                                    <span className={FormStyle.formTitlelogo}>
                                    <ImProfile/>
                                    </span>
                                    <PatientRegister labelContent='Contact Information' keyword='contact_information'/>
                                </h1>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='email'>
                                        <PatientRegister labelContent='Email' keyword='email'/>
                                    </label>
                                    <input type="text" id="email" name="email" value={patientPayload.email} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='mobile'>
                                        <PatientRegister labelContent='Mobile' keyword='mobile'/>
                                    </label>
                                    <input type="text" id="mobile" name="mobile" value={patientPayload.mobile} readOnly/>
                                </div>
                            </div>
                            <div className='col-md-12 d-flex justify-content-between'>
                            <button type='button' className={FormStyle.formButtonPrev} onClick={()=>disableForm()}>
                                <PatientRegister labelContent='Cancel' keyword='cancel'/>
                            </button>
                                <div>
                                    <button type='button' className={`${FormStyle.formButtonPrev} ms-4`} onClick={function(){setCurrentMode('Edit'); updatePayload['patient_id'] = patientPayload.id }}>
                                        <PatientRegister labelContent='Edit' keyword='edit'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                         </div> 
                         )
                         }
                    </div>
                    </div>
                    }
                
            </section>
    </>)
}