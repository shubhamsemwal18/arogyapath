import FormStyle from '../../css/form.module.css';
import customModalStyle from '../../css/customModal.module.css'
import { AiOutlineFileDone } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commonAction from '../../Common Api Calls/commonAction'
import * as ACTIONS from './action'
import { useToasts } from 'react-toast-notifications';
import LoadingSpin from 'react-loading-spin';
import { CommonText } from '../../Multi_Lang';


function AccountsManagement() {

    let [accountsPayload, setAccountsPayload] = useState({})

    let { addToast } = useToasts();
    let [isSubmitting, setIsSubmitting] = useState(false)
    let [isLoading, setIsLoading] = useState(true);
    let [isSearching, setIsSearching] = useState(false);
    let [medicineGivenMode, setMedicineGivenMode] = useState('');

    let [todayAllTokens, setTodayAllTokens] = useState([])
    let [patientDetails, setPatientDetails] = useState({})
    let [isTodayAnyPatient, setIsTodayAnyPatient] = useState(false);
    let [currentPatientDisease,setCurrentPatientDisease] = useState('')
    let [allDiseases,setAllDiseases] = useState([])
    let [formView,setFormView] = useState(false);
    let [haveResponse, setHaveResponse] = useState(false);

    let dispatch = useDispatch();
    let commonState = useSelector((state) => state.commonReducer)
    let state = useSelector((state)=>state.AccountReducer)

    useEffect(() => {
        dispatch(commonAction.getTodayTokens('Dispensary'))
    }, [state.createAccountsSuccess])

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
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get today token.`,
            });
        }

        dispatch(commonAction.resetToInitialState())
    }, [commonState.GetTodayTokenSuccess, commonState.GetTodayTokenFailure])

    let tokenChangeHandler = (e) => {
        if (e.target.value != '') {
            let accountsPayloadCopy = { ...accountsPayload }
            accountsPayloadCopy['token_id'] = e.target.value;
            setAccountsPayload(accountsPayloadCopy);
            dispatch(commonAction.getPatientByToken({ 'token_id': e.target.value }))
            dispatch(commonAction.getAllDiseases())
            setIsSearching(true)
        }
    }

    useEffect(() => {
        if (commonState.GetPatientByTokenNoSuccess) {
            dispatch(commonAction.getPatientConsultationDetailByToken({ 'token_id': accountsPayload.token_id }))
            let accountsPayloadCopy = {...accountsPayload}
            accountsPayloadCopy['patient_id'] = commonState.GetPatientByTokenNoSuccess.patientDetails.id;
            setAccountsPayload(accountsPayloadCopy)
            setPatientDetails(commonState.GetPatientByTokenNoSuccess.patientDetails)
            setFormView(true)
        }

        if (commonState.GetPatientByTokenNoFailure) {
            dispatch(commonAction.getPatientConsultationDetailByToken({ 'token_id': accountsPayload.token_id }))
            
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patient by token.`,
            });
        }

        dispatch(commonAction.resetToInitialState())
    }, [commonState.GetPatientByTokenNoSuccess, commonState.GetPatientByTokenNoSuccess])

    useEffect(() => {
        if (commonState.getPatientConsultationDetailByTokenSuccess) {
            setIsSearching(false)
            setCurrentPatientDisease(commonState.getPatientConsultationDetailByTokenSuccess.data[0].major_diseases)
            setMedicineGivenMode(commonState.getPatientConsultationDetailByTokenSuccess.data[0].medicine_given_mode)
            
            if(commonState.getPatientConsultationDetailByTokenSuccess.data[0].payment_details){
                let paymentDetailByConsultation = JSON.parse(commonState.getPatientConsultationDetailByTokenSuccess.data[0].payment_details)
                paymentDetailByConsultation['token_id'] = accountsPayload.token_id
                paymentDetailByConsultation['patient_id'] = accountsPayload.patient_id
                setAccountsPayload(paymentDetailByConsultation)
            }

        }

        if (commonState.getPatientConsultationDetailByTokenFailure) {
            setIsSearching(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patient major disease.`,
            });
        }

        dispatch(commonAction.resetToInitialState())
    }, [commonState.getPatientConsultationDetailByTokenSuccess, commonState.getPatientConsultationDetailByTokenFailure])


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

    let handleSubmit = (e) =>{
        e.preventDefault()
        setIsSubmitting(true)
        dispatch(ACTIONS.createAccounts(accountsPayload))
    }

    useEffect(()=>{
        if(state.createAccountsSuccess){
            addToast("Success!", {
                appearance: "success",
                content: `accounts data saved.`,
            });
            setAccountsPayload({
                'token_id':'',
            })
            setIsLoading(false)
            setIsSubmitting(false)
            setPatientDetails({})
            setCurrentPatientDisease('')
            setFormView(false)
            setHaveResponse(true)
            setMedicineGivenMode('')
        }
        if(state.createAccountsFailure){
            setIsSubmitting(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to save data.`,
            });
        }

        dispatch (ACTIONS.resetToInitialState())
    },[state.createAccountsSuccess,state.createAccountsFailure])

    let handleChange = (e) =>{
        let accountsPayloadCopy = {...accountsPayload}
        accountsPayloadCopy[e.target.id] = e.target.value
        setAccountsPayload(accountsPayloadCopy)
    }

    let closeModal = () => {
        setHaveResponse(false);
    }

    let getDiseasesNameById = (diseases_id) =>{
        let diseasesData = allDiseases.find(element  => element.id == diseases_id)
        return diseasesData;
    }

  return (
    <section className={FormStyle.commonFormArea}>
    {medicineGivenMode == 'courier' && 
    <div className='flash'>
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
                    <p className='text-center text-success'><CommonText en="Accounts Data Saved Successfully." hi="खाता डेटा सफलतापूर्वक सहेजा गया।"/></p>
                    <button type='button' className='btn btn-success' onClick={() => closeModal()}><CommonText en="Ok" hi="ओके"/></button>
                </div>
            </div>
        }
        {isLoading ? 
        <div className='container'>
        <div className='row'>
            <div className='col-12 d-flex justify-content-center align-items-center pt-5'>
                <LoadingSpin
                size="100px"
                primaryColor="#2BBF50"/> 
            </div>
        </div>
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
                                        <CommonText en="Accounts" hi="खाता"/>
                                        </h1>
                                </div>
                                <div className="col-md-3">
                                            <div className={FormStyle.feildWrapper}>
                                                <label htmlFor='token_id' className={FormStyle.customLabelSecond}> <CommonText en="Token No" hi="टोकन संख्या"/></label>
                                                <select
                                                    className="form-select text-start"
                                                    id="token_id"
                                                    value={accountsPayload.token_id}
                                                    onChange={(e)=>tokenChangeHandler(e)}>
                                                    <option value='' hidden><CommonText en="Select" hi="चयन"/></option>
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
                                                    value={patientDetails.Registration_no != null ? patientDetails.Registration_no : ''}
                                                    className="input-group-text text-start"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className={FormStyle.feildWrapper}>
                                                <label htmlFor="patient_weight" className={FormStyle.customLabelSecond}><CommonText en="Contact No" hi="संपर्क नंबर"/></label>
                                                <input type="text" id="patient_mobile"
                                                    value={patientDetails.mobile != null ? patientDetails.mobile : ''}
                                                    className="input-group-text text-start"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                  {isSearching ? 
                                  <div className='col-12 d-flex justify-content-center align-items-center pt-5'>
                                    <LoadingSpin
                                    size="100px"
                                    primaryColor="#2BBF50"/> 
                                  </div>
                                  :
                                  <>     
                      {formView && (
                        <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='row'>
                            <div className="col-md-12">
                                                        <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden
                                    position-relative my-4`}>
                                                            <div>
                                                                <p className={FormStyle.customTableHeading}>
                                                                <CommonText en="Accounts Details" hi="लेखा विवरण"/> 
                                                                </p>
                                                            </div>
                                                            <div className={FormStyle.customTableHeadingLine}></div>
                                                        </div>
                                                    </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="patient_diseases" className={FormStyle.customLabelSecond}><CommonText en="Patient Disease" hi="रोगी का रोग"/></label>
                                        <input type="text" id="patient_diseases"
                                                className="input-group-text text-start"
                                                value={currentPatientDisease != '' ? `${getDiseasesNameById(currentPatientDisease) ? getDiseasesNameById(currentPatientDisease).name : ''}` : ''}
                                                disabled
                                                
                                        />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="prev_balance" className={FormStyle.customLabelSecond}><CommonText en="Previous Balance" hi="पिछला बकाया"/></label>
                                        <div className='input-group-text'>
                                            {accountsPayload.prev_balance}
                                        </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="disease_map_amountbalance" className={FormStyle.customLabelSecond}><CommonText en="Disease Map Amount" hi="रोग सम्बंधित राशि"/></label>
                                    <div className='input-group-text'>
                                            {accountsPayload.map_amount}
                                        </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="actual_amount" className={FormStyle.customLabelSecond}><CommonText en="Actual Amount" hi="वास्तविक राशि"/></label>
                                    <div className='input-group-text'>
                                            {accountsPayload.actual_amount}
                                        </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="discount" className={FormStyle.customLabelSecond}><CommonText en="Discount" hi="छूट"/></label>
                                    <div className='input-group-text'>
                                            {accountsPayload.discount}
                                        </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="payable" className={FormStyle.customLabelSecond}><CommonText en="Payable" hi="देय"/></label>
                                    <div className='input-group-text'>
                                            {accountsPayload.actual_amount - accountsPayload.discount}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="paid" className={FormStyle.customLabelSecond}><CommonText en="Paid" hi="भुगतान किया गया"/></label>
                                        <input type="text" id="paid"
                                                className="text-start"
                                                value={accountsPayload.paid}
                                                onChange={(e)=>handleChange(e)}
                                                required
                                        />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="balance" className={FormStyle.customLabelSecond}><CommonText en="Balance" hi="शेष"/></label>
                                    <div className='input-group-text'>
                                            {(accountsPayload.actual_amount - accountsPayload.discount) -  `${accountsPayload.paid ? accountsPayload.paid : 0}`}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="account_head" className={FormStyle.customLabelSecond}><CommonText en="Account Head" hi="खाता प्रमुख"/></label>
                                        <select id="account_head" value={accountsPayload.account_head} onChange={(e)=>handleChange(e)} required>
                                            <option value='' hidden><CommonText en="Select" hi="चयन"/></option>
                                            <option value="KDP"><CommonText en="KDP" hi="केडीपी"/></option>
                                            <option value="BTG"><CommonText en="BTG" hi="बीटीजी"/></option>
                                            <option value="AOH"><CommonText en="AOH" hi="एओएच"/></option>
                                        </select>
                                </div>
                            </div>
                            
                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="payment_mode" className={FormStyle.customLabelSecond}><CommonText en="Payment Mode" hi="भुगतान का प्रकार"/></label>
                                        <select id="payment_mode" 
                                                value={accountsPayload.payment_mode}
                                                onChange={(e)=>handleChange(e)}
                                                required
                                                >
                                            <option value='' hidden><CommonText en="Select" hi="चयन"/></option>
                                            <option value="cash"><CommonText en="Cash" hi="नकद"/></option>
                                            <option value="card"><CommonText en="Card" hi="कार्ड"/></option>
                                            <option value="upi"><CommonText en="Upi" hi="यूपीआई"/></option>
                                            <option value="reference_bank"><CommonText en="Reference Bank" hi="संदर्भ बैंक"/></option>
                                        </select>
                                </div>
                            </div>
                            {accountsPayload.payment_mode == "reference_bank" && 
                            <>
                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="reference_no" className={FormStyle.customLabelSecond}><CommonText en="Reference No" hi="संदर्भ संक्या"/></label>
                                        <input type="text" id="reference_no"
                                                className="text-start"
                                                value={accountsPayload.reference_no}
                                                onChange={(e)=>handleChange(e)}
                                                required
                                        />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="time_of_payment" className={FormStyle.customLabelSecond}><CommonText en="Time Of Payment" hi="भुगतान का समय"/></label>
                                        <input type="time" id="time_of_payment"
                                                className="text-start"
                                                value={accountsPayload.time_of_payment}
                                                onChange={(e)=>handleChange(e)}
                                                required
                                        />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className={FormStyle.feildWrapper}>
                                    <label htmlFor="date_of_payment" className={FormStyle.customLabelSecond}><CommonText en="Day Of Payment" hi="भुगतान का दिन"/></label>
                                        <input type="date" id="date_of_payment"
                                                className="text-start"
                                                value={accountsPayload.date_of_payment}
                                                onChange={(e)=>handleChange(e)}
                                                required
                                        />
                                </div>
                            </div>

                            </>}
                            <div className="col-md-12">
                                <button type="submit" className={FormStyle.formButton}  disabled={isSubmitting}>
                                <CommonText en=" Submit" hi="जमा"/>
                                
                                </button>
                                <button type="button" className={`${FormStyle.formButtonPrev} ms-4`}><CommonText en=" Cancel" hi="रद्द करना"/></button>
                            </div>
                        </div>
                        </form>
                      ) }
                      </>}
                </div>
                : <p><CommonText en=" Good Morning !.." hi="शुभ प्रभात !.."/><br /><CommonText en="No Patients have registered yet. You can come again here and see the details once the patients are registered." hi="अभी तक कोई मरीज दर्ज नहीं हुआ है। आप यहां फिर से आ सकते हैं और रोगियों के पंजीकरण के बाद विवरण देख सकते हैं।"/> </p>}
              </div>
            </div>
          </div>
      </div>
      }
    </section>
  )
}

export default AccountsManagement