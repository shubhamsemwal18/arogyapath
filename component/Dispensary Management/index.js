import FormStyle from '../../css/form.module.css';
import customModalStyle from '../../css/customModal.module.css'
import { AiOutlineFileDone } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import * as commonAction from '../../Common Api Calls/commonAction'
import * as ACTIONS from './action'
import LoadingSpin from 'react-loading-spin';
import { CommonText } from '../../Multi_Lang';


function DispensaryManagement() {

    let [dispensaryPayload, setDispensaryPayload] = useState({
        token_id : '',
    })
    let [todayAllTokens, setTodayAllTokens] = useState([])
    let [patientDetails, setPatientDetails] = useState({})
    let [isTodayAnyPatient, setIsTodayAnyPatient] = useState(false);
    let [isLoading, setIsLoading] = useState(true);
    let [isSearching, setIsSearching] = useState(false);

    let { addToast } = useToasts();
    let [isSubmitting, setIsSubmitting] = useState(false)

    let [formView, setFormView] = useState(false);
    let [haveResponse, setHaveResponse] = useState(false);

    let dispatch = useDispatch();
    let commonState = useSelector((state) => state.commonReducer)
    let State = useSelector((state) => state.dispensaryReducer)
    
    let [allDiseases, setAllDiseases] = useState([])
    let [allMedicine, setAllMedicine] = useState([])

    useEffect(() => {
        setIsLoading(true)
        dispatch(commonAction.getTodayTokens('Consultated'))
    }, [State.createDispensarySuccess])

    useEffect(() => {
        dispatch(commonAction.getAllDiseases())
        dispatch(commonAction.getAllMedicine())
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
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get tokens.`,
            });
        }

        dispatch(commonAction.resetToInitialState())
    }, [commonState.GetTodayTokenSuccess, commonState.GetTodayTokenFailure])

    useEffect(() => {
        if (commonState.GetPatientByTokenNoSuccess) {
            let dispensaryPayloadCopy = {...dispensaryPayload}
            dispensaryPayloadCopy['patient_id'] = commonState.GetPatientByTokenNoSuccess.patientDetails.id;
            setDispensaryPayload(dispensaryPayloadCopy)
            setPatientDetails(commonState.GetPatientByTokenNoSuccess.patientDetails)
        }

        if (commonState.GetPatientByTokenNoFailure) {
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patient by token no.`,
            });
        }

        dispatch(commonAction.resetToInitialState())
    }, [commonState.GetPatientByTokenNoSuccess, commonState.GetPatientByTokenNoSuccess])

    let tokenChangeHandler = (e) => {
        if (e.target.value != '') {
            let dispensaryPayloadCopy = { ...dispensaryPayload }
            dispensaryPayloadCopy['token_id'] = e.target.value;
            setDispensaryPayload(dispensaryPayloadCopy);
            dispatch(commonAction.getPatientByToken({ 'token_id': e.target.value }))
            dispatch(commonAction.getPatientConsultationDetailByToken({ 'token_id': e.target.value }))
            setIsSearching(true)
        }
    }

    useEffect(()=>{
        if(commonState.getAllMedicineSuccess){
            setAllMedicine(commonState.getAllMedicineSuccess.allMedicine)
        }
        if(commonState.getAllMedicineFailure){
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get all medicine.`,
            });
        }

    },[commonState.getAllMedicineSuccess,commonState.getAllMedicineFailure])
    
    useEffect(() => {
        if (commonState.GetAllDiseasesSuccess) {
            setAllDiseases(commonState.GetAllDiseasesSuccess.allDiseases)
        }
        if (commonState.GetAllDiseasesFailure) {
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get all disease.`,
            });
        }

        dispatch(commonAction.resetToInitialState())
    }, [commonState.GetAllDiseasesSuccess, commonState.GetAllDiseasesFailure])

    useEffect(() => {
        if (commonState.getPatientConsultationDetailByTokenSuccess) {
            setIsSearching(false)
            let dispensaryPayloadCopy = { ...dispensaryPayload }
            let patientPrescribeData = commonState.getPatientConsultationDetailByTokenSuccess.data[0]

            dispensaryPayloadCopy['duration'] = patientPrescribeData.medicine_duration;
            dispensaryPayloadCopy['given_mode'] = patientPrescribeData.medicine_given_mode;
            dispensaryPayloadCopy['disease'] = patientPrescribeData.major_diseases;

            let prescribedMedicineData = [];
            let prescribedData = JSON.parse(patientPrescribeData.prescribed_medicine);

            if(prescribedData.length > 0){
                prescribedData.map((item,index)=>{
                    let obj = {}
                    obj.medicine = item.medicine;
                    obj.buy_from = item.buy_from;
                    obj.quantity = item.quantity;
                    obj.given_count = item.quantity * `${patientPrescribeData.medicine_duration ? patientPrescribeData.medicine_duration : 1}`
                    prescribedMedicineData[index] = obj;
                })
                
            }

            dispensaryPayloadCopy['prescribedMedicine'] = prescribedMedicineData
            setDispensaryPayload(dispensaryPayloadCopy)
            setFormView(true)
        }

        if (commonState.getPatientConsultationDetailByTokenFailure) {
            setIsSearching(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patient prescribed medicine by token.`,
            });
        }

        dispatch(commonAction.resetToInitialState())
    }, [commonState.getPatientConsultationDetailByTokenSuccess, commonState.getPatientConsultationDetailByTokenFailure])

    let handleChange = (e,index) =>{
        let dispensaryPayloadCopy = {...dispensaryPayload}
        let prescribedMedicineCopy = dispensaryPayloadCopy.prescribedMedicine
        prescribedMedicineCopy[index][e.target.id] = e.target.value
        dispensaryPayloadCopy.prescribedMedicine = prescribedMedicineCopy
        setDispensaryPayload(dispensaryPayloadCopy)
    }

    useEffect(() => {
        if (State.createDispensarySuccess) {
            setDispensaryPayload({
                token_id : '',
            })
            setPatientDetails({})
            setIsSubmitting(false)
            setHaveResponse(true)
            addToast("Success!", {
                appearance: "success",
                content: `Dispensary created successfully.`,
            });
        }
        if (State.createDispensaryFailure) {
            setIsSubmitting(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to create dispensary.`,
            });
        }

        dispatch(ACTIONS.resetToInitialState())
    }, [State.createDispensarySuccess, State.createDispensaryFailure])

    let handleSubmit = () =>{

        var date = new Date();

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
    
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
    
        var today = year + "-" + month + "-" + day; 


        let dispensaryPayloadCopy = {...dispensaryPayload}
        dispensaryPayloadCopy.date = today;
        
        setIsSubmitting(true)
        dispatch(ACTIONS.createDispansary(dispensaryPayloadCopy))
    }

    let closeModal = () => {
        setIsSubmitting(false)
        setHaveResponse(false);
        setFormView(false);
    }

    let getMedicineNameById = (medicine) =>{
        let medicineData = allMedicine.find(element  => element.id == medicine)
        return medicineData;
    }

    let getDiseasesNameById = (diseases_id) =>{
        let diseasesData = allDiseases.find(element  => element.id == diseases_id)
        return diseasesData;
    }
    
  return (
    <section className={FormStyle.commonFormArea}>
        {dispensaryPayload?.given_mode && <div className='flash'>
        <h1>
            <span>C</span>
            <span>o</span>
            <span>u</span>
            <span>r</span>
            <span>i</span>
            <span>e</span>
            <span>r</span>
           
        </h1>
     </div>
            
        }
     

        {haveResponse &&
            <div className={customModalStyle.customModalLayout}>
                <div className={customModalStyle.customModalBox}>
                    <p className='text-center text-success'><CommonText en="Dispensary Data Saved Successfully." hi="डिस्पेंसरी डेटा सफलतापूर्वक सहेजा गया।"/></p>
                    <button type='button' className='btn btn-success' onClick={() => closeModal()}>Ok</button>
                </div>
            </div>
        }
        {isLoading ? 
            <div className='col-12 pt-5 d-flex align-items-center justify-content-center'>
                <LoadingSpin
                    size="100px"
                    primaryColor="#2BBF50"/> 
            </div>
        :
      <div className="container">
        <div className="row">
            <div className="col-lg-12">
              <div className={FormStyle.commonFormWrapper}>
                {isTodayAnyPatient ? 
                <div className="row">
                  
                <div className="col-md-12">
                                    <h1 className={FormStyle.formTitle}>
                                        <span className={FormStyle.formTitlelogo}>
                                            <AiOutlineFileDone />
                                        </span>
                                        <CommonText en=" Dispensary" hi="औषधालय"/>
                                       </h1>
                                </div>
                                <div className="col-md-3">
                                            <div className={FormStyle.feildWrapper}>
                                                <label htmlFor='token_id' 
                                                className={FormStyle.customLabelSecond}>
                                                    <CommonText en=" Token No" hi="टोकन क्रमांक"/>
                                                   </label>
                                                <select
                                                    className="form-select text-start"
                                                    id="token_id"
                                                    value={dispensaryPayload.token_id}
                                                    onChange={(e)=>tokenChangeHandler(e)}>
                                                    <option value='' disabled hidden><CommonText en=" Select" hi="चयन"/></option>
                                                    {todayAllTokens.length > 0 && <>
                                                    {todayAllTokens.map((item)=>{
                                                        return(<option value={item.id}>{item.token_no}</option>)
                                                    })}</>}
                                                    </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className={FormStyle.feildWrapper}>
                                                <label htmlFor="patient_name"
                                                    className={FormStyle.customLabelSecond}>
                                                        <CommonText en=" Name" hi="नाम"/>
                                                    
                                                </label>
                                                <input type="text" id="patient_name" 
                                                placeholder="Patient name"
                                                    className="input-group-text text-start"
                                                    value={patientDetails.name != null ? patientDetails.name : ''}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className={FormStyle.feildWrapper}>
                                                <label htmlFor="reg_no" className={FormStyle.customLabelSecond}><CommonText en=" Registration No" hi="पंजीकरण क्रमांक"/></label>
                                                <input type="text" id="reg_no"
                                                    placeholder="Register Number"
                                                    value={patientDetails.Registration_no != null ? patientDetails.Registration_no : ''}
                                                    className="input-group-text text-start"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className={FormStyle.feildWrapper}>
                                                <label htmlFor="mobile_no" className={FormStyle.customLabelSecond}><CommonText en="Mobile No" hi="मोबाइल नम्बर"/></label>
                                                <input type="text" id="mobile_no"
                                                    placeholder="Mobile No"
                                                    value={patientDetails.mobile != null ? patientDetails.mobile : ''}
                                                    className="input-group-text text-start"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                       {isSearching ?
                       <div className='col-12 pt-2 d-flex align-items-center justify-content-center'>
                            <LoadingSpin
                           size="100px"
                           primaryColor="#2BBF50"/> 
                        </div>
                       :
                       <>                 
                      {formView && (
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='diseases' className={FormStyle.customLabelSecond}><CommonText en="Diseases" hi="बीमारी"/></label>
                                    <input type="text" placeholder="" id="diseases" value={getDiseasesNameById(dispensaryPayload.disease) ? getDiseasesNameById(dispensaryPayload.disease).hi_name : ''} disabled className="input-group-text text-center"/>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='duration' className={FormStyle.customLabelSecond}><CommonText en="Medicine Duration" hi="चिकित्सा अवधि"/></label>
                                    <input type="text" placeholder="" id="duration" 
                                    value={dispensaryPayload.duration}
                                    disabled className="input-group-text text-center"/>
                                </div>
                            </div>
                            <div className='col-md-12'>
                            <div className='row '>
                                <div className="col-md-12">
                                    <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                        <div>
                                            <p className={FormStyle.customTableHeading}>
                                            <CommonText en="Prescribed Medicine" hi="निर्धारित दवा"/>
                                            
                                            </p>
                                        </div>
                                        <div className={FormStyle.customTableHeadingLine}></div>
                                    </div>
                                </div>
                                <div className={FormStyle.diseasesWiseMedicineWrapper}>
                                    <div className="row mt-lg-2">
                                        <div className='col-md-3'>
                                        <p className={FormStyle.diseasesWiseMedicineWrapperHeading}><CommonText en="Medicine" hi="दवा"/></p>
                                        </div>
                                            <div className='col-md-5'>
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <p className={FormStyle.diseasesWiseMedicineWrapperHeading}><CommonText en="Buy From Arogyapath" hi="आरोग्यपथ से खरीदें"/></p>
                                                    </div>
                                                    <div className='col-md-6 '>
                                                        <p className={FormStyle.diseasesWiseMedicineWrapperHeading}><CommonText en="Buy From outside" hi="बाहर से खरीदें"/> </p>
                                                    </div>
                                                </div>  
                                            </div>
                                            <div className='col-md-2 text-center'><p className={FormStyle.diseasesWiseMedicineWrapperHeading}><CommonText en="Quantity" hi="मात्रा"/></p></div>
                                            <div className='col-md-2 text-center'><p className={FormStyle.diseasesWiseMedicineWrapperHeading}><CommonText en="Given Count" hi="दी गई गणना"/></p></div>
                                            <div className="col-md-12">
                                                <div className={FormStyle.majorDiseasesCard}>
                                                {dispensaryPayload.prescribedMedicine && dispensaryPayload.prescribedMedicine.map((item,index) => {
                                                    return (
                                                            <div className='row'>
                                                                <div className='col-md-3'>
                                                                    <ol className='ps-0 list-unstyled'>
                                                                        <li className='d-flex'>{getMedicineNameById(item.medicine) ? getMedicineNameById(item.medicine).hi_name : ''}</li>
                                                                    </ol>
                                                                </div>
                                                                <div className='col-md-5'>
                                                                    <div className='row'>
                                                                        <div className='col-md-6'>
                                                                            <div>
                                                                            <label className={FormStyle.customRadio}>
                                                                            <input type="radio" id="buy_from" name={item.medicine} value='arogyapath' 
                                                                            onChange={(e)=>handleChange(e,index)} defaultChecked={item.buy_from == 'arogyapath'} />
                                                                            <span className={FormStyle.checkmark}></span>
                                                                            </label></div>
                                                                            {/* <p>{item.buy_from}</p> */}
                                                                        </div>
                                                                        <div className='col-md-6'> <div><label className={FormStyle.customRadio}>
                                                                            <input type="radio" id="buy_from" name={item.medicine} value='outside' onChange={(e)=>handleChange(e,index)} defaultChecked={item.buy_from == 'outside'} />
                                                                                        <span className={FormStyle.checkmark}></span>
                                                                            </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-2 text-center'>
                                                                    <input type="text" placeholder="" id="consumption_count" name={item.medicine} className="input-group-text text-center" value={`${dispensaryPayload.duration ? item.quantity * dispensaryPayload.duration : item.quantity}`} disabled/>
                                                                </div>
                                                                {item.buy_from == 'arogyapath' &&
                                                                <div className='col-md-2 text-center'>
                                                                    <input type="text" placeholder="" id="given_count" name={item.medicine} value={item.given_count} onChange={(e)=>handleChange(e,index)} className="form-control text-center"/>
                                                                </div>
                                                                } 
                                                            </div>)
                                                        })}
                                                    </div>
                                                    </div>        
                                                    </div>
                                                    </div>
                            </div>
                            <div className="col-md-12">
                                <button type="button" className={FormStyle.formButton} onClick={() => handleSubmit()} disabled={isSubmitting}>
                                सुनिश्चित करें 
                                </button>
                                <button type="button" className={`${FormStyle.formButtonPrev} ms-4`}>रद्द करें</button>
                            </div>
                            </div>
                      </div>
                      ) }
                      </>}
                </div>
                : <p><CommonText en="Good Morning !.." hi="शुभ प्रभात !.."/><br />
                <CommonText en="No Patients have registered yet. You can come again here and see the details once the patients are registered." hi="अभी तक कोई मरीज दर्ज नहीं हुआ है। आप यहां फिर से आ सकते हैं और रोगियों के पंजीकरण के बाद विवरण देख सकते हैं।"/> </p>}
              </div>
            </div>
          </div>
      </div>
      }
    </section>
  )
}

export default DispensaryManagement