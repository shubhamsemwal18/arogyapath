import FormStyle from '../../../../css/form.module.css';
import customModalStyle from '../../../../css/customModal.module.css'
import { GiMedicines } from 'react-icons/gi';
import { BiPlus } from 'react-icons/bi'
import { HiDotsVertical } from 'react-icons/hi';
import { AiFillMedicineBox } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import * as ACTIONS from './action'
import * as CommonAction from '../../../../Common Api Calls/commonAction'
import { CommonText } from '../../../../Multi_Lang'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'


function Map_Disease_with_diets_to_take() {

  let [requestPayload,setRequestPayload] = useState({})
  let dispatch = useDispatch();
  let { addToast } = useToasts();
  let [haveResponse, setHaveResponse] = useState(false);
  let [listView, setListView] = useState(true);
  let [allDiets,setAllDiets] = useState([])
  let [diseaseNotMapped, setDiseaseNotMapped] = useState([]);
  let [allMappedData,setAllMappedData] = useState([])
  let [isLoading, setIsLoading] = useState(false)
  let [isSubmiting,setIsSubmiting] = useState(false)
  let [currentMode, setCurrentMode] = useState('')

  let state = useSelector((state) => state.DiseaseMapDietToTakeReducer);
  const CommonState = useSelector((state) => state.commonReducer);

  useEffect(() => {
    setIsLoading(true)
    dispatch(ACTIONS.GetDiseaseDietToTake())
    dispatch(CommonAction.getDataNotMappedWithDiseaseByParam('diets_take'))
    
  }, [state.createDiseaseDietToTakeSuccess,state.updateDiseaseDietToTakeSuccess])

  useEffect(()=>{
    dispatch(CommonAction.getDietsToTake())
  },[])

  useEffect(() => {
    if (CommonState.getDietsToTakeSuccess) {
      setAllDiets(CommonState.getDietsToTakeSuccess.allDiets)
      addToast("Success!", {
                appearance: "success",
                content: `Get All Diets to take Success.`,
              });
    }
    if (CommonState.getDietsToTakeFailure) {
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get all diets to take.`,
              });
    }

    dispatch(CommonAction.resetToInitialState())

  }, [CommonState.getDietsToTakeSuccess, CommonState.getDietsToTakeFailure])

  useEffect(() => {
    if (CommonState.getDataNotMappedWIthDiseaseByParamSuccess) {
      setDiseaseNotMapped(CommonState.getDataNotMappedWIthDiseaseByParamSuccess.data)
    }
    if (CommonState.getDataNotMappedWIthDiseaseByParamFailure) {
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get unmapped data.`,
              });
    }

    dispatch(CommonAction.resetToInitialState())

  }, [CommonState.getDataNotMappedWIthDiseaseByParamSuccess, CommonState.getDataNotMappedWIthDiseaseByParamFailure])

  useEffect(() => {
    if (state.getDiseaseDietToTakeSuccess) {
      setIsLoading(false)
      setAllMappedData(state.getDiseaseDietToTakeSuccess.data)
      addToast("Success!", {
                appearance: "success",
                content: `Get All data Success.`,
              });
    }
    if (state.getDiseaseDietToTakeFailure) {
      setIsLoading(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get data.`,
              });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.getDiseaseDietToTakeSuccess, state.getDiseaseDietToTakeFailure])


  useEffect(() => {

    if (state.createDiseaseDietToTakeSuccess) {
      setIsSubmiting(false)
      setHaveResponse(true);
      addToast("Success!", {
        appearance: "success",
        content: `Create mapping successfully.`,
      });
    }
    if (state.createDiseaseDietToTakeFailure) {
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to map data.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.createDiseaseDietToTakeSuccess, state.createDiseaseDietToTakeFailure])


  let handleUpdate = (e) =>{
    e.preventDefault()

    let allDietsChecked = []

    if((e.target.diets && e.target.diets[0] != undefined)){
      for(let i = 0; i < e.target.diets.length ; i++){
        if(e.target.diets[i].checked === true){
              allDietsChecked.push(e.target.diets[i].value)
            }
      }
    }
    else{
      if(e.target.diets.checked === true){
        allDietsChecked.push(e.target.diets.value)
      }
    }

    if(allDietsChecked.length > 0  && requestPayload.id && requestPayload.disease_id){
      setIsSubmiting(true)
      dispatch(ACTIONS.upateDiseaseDietToTake({
        'id':requestPayload.id,
        'disease_id':requestPayload.disease_id,
        'diets':allDietsChecked,
      }));
    }else{
      addToast("Warning!", {
                    appearance: "warning",
                    content: `Please select atleast One Diet.`,
                  });
    }

  }

  let handleSubmit = (e) => {
    e.preventDefault()
    

    let allDiseasesChecked = []
    let allDietsChecked = []

   
    if((e.target.diseases && e.target.diseases[0] != undefined)){
      for(let i = 0; i < e.target.diseases.length ; i++){
        if(e.target.diseases[i].checked === true){
              allDiseasesChecked.push(e.target.diseases[i].value)
            }
      }
    }
    else{
      if(e.target.diseases.checked === true){
        allDiseasesChecked.push(e.target.diseases.value)
      }
    }



    if((e.target.diets && e.target.diets[0] != undefined)){
      for(let i = 0; i < e.target.diets.length ; i++){
        if(e.target.diets[i].checked === true){
              allDietsChecked.push(e.target.diets[i].value)
            }
      }
    }
    else{
      if(e.target.diets.checked === true){
        allDietsChecked.push(e.target.diets.value)
      }
    }
    

    if(allDiseasesChecked.length > 0 && allDietsChecked.length > 0){
      setIsSubmiting(true)
      dispatch(ACTIONS.createDiseaseDietToTake({
        'diseases':allDiseasesChecked,
        'diets':allDietsChecked,
      }));
    }else{
      addToast("Warning!", {
                    appearance: "warning",
                    content: `Please select atleast One Disease & one Diet.`,
                  });
    }


  }

  let enableForm = () => {
    setCurrentMode('')
    setListView(false);
    setIsSubmiting(false)
  }

  let closeModal = () => {
        setHaveResponse(false);
        setCurrentMode('')
        setListView(true);
  }

  let changeMode = (index,mode)=>{
    setCurrentMode(mode)
    setRequestPayload(allMappedData[index])
    setListView(false)
  }

  let disabledForm = () =>{
    setListView(true);
  }

  useEffect(() => {
    if (state.updateDiseaseDietToTakeSuccess) {
      setRequestPayload({
      })
        addToast("Success!", {
            appearance: "success",
            content: `Mapping updated successfully.`,
          });
        setListView(true)
        setCurrentMode('')
        setIsSubmiting(false)
    }
    if (state.updateDiseaseDietToTakeFailure) {
      setIsSubmiting(false)
        addToast("Error!", {
            appearance: "error",
            content: `Unable to update mapping.`,
          });
    }

    dispatch(ACTIONS.resetToInitialState());

}, [state.updateDiseaseDietToTakeSuccess, state.updateDiseaseDietToTakeFailure])


  return (
    <>
      <section className={FormStyle.commonFormArea}>
        <div className="container">
          <div className="row">
            <>
              {haveResponse &&
                <div className={customModalStyle.customModalLayout}>
                  <div className={customModalStyle.customModalBox}>
                    <p className='text-center text-success'> 
                    <CommonText en="Diet Mapped Successfully." hi="आहार सफलतापूर्वक मैप किया गया।"/></p>
                    <button type='button' className='btn btn-success' onClick={() => closeModal()}>
                    <CommonText en="Ok" hi="ठीक है" />
                    </button>
                  </div>
                </div>
              }
              <div className="col-lg-8 ">
                <div className={FormStyle.commonFormWrapper}>
                  <div className="row">
                    <div className="col-md-8">
                      <h1 className={FormStyle.formTitle}>
                        <span className={FormStyle.formTitlelogo}>
                          <GiMedicines />
                        </span>
                        <CommonText en="Disease Map Diet To Take" hi="रोग आधारित आहार जो लेना है" />
                      </h1>
                    </div>
                    {isLoading ?
                      <div className="search-Loader">
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
                            {allMappedData.length > 0 ?
                              <table>
                                <tr className={FormStyle.allListTableHeadings}>
                                <th><CommonText en="S.N." hi="क्र.सं." /></th>
                                <th><CommonText en="Disease" hi="रोग" /></th>
                                  <th className={FormStyle.allListTableActionList}></th>
                                </tr>
                                {
                                  allMappedData.map((item, index) => {
                                    return (
                                      <tr className={FormStyle.allListTableSingleRow}>
                                        <td>{index + 1}</td>
                                        <td>{item.disease_name}</td>
                                        <td className={FormStyle.allListTableActionList}>
                                          <ul className={FormStyle.actionList}>
                                            <li className="nav-item dropdown">
                                              <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <HiDotsVertical />
                                              </span>
                                              <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                                                <li>
                                                  <div onClick={()=>changeMode(index,'view')}>
                                                    <span className="dropdown-item">
                                                    <CommonText en="View" hi="देखे" />
                                                    </span>
                                                  </div>
                                                </li>
                                                <li>
                                                  <div  onClick={()=>changeMode(index,'Edit')}>
                                                    <span className="dropdown-item">
                                                    <CommonText en="Edit" hi="संशोधित करे" />
                                                    </span>
                                                  </div>
                                                </li>
                                                <li>
                                                    <span className="dropdown-item">
                                                    <CommonText en="Delete" hi="हटाये" />
                                                    </span>
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
                                <p><CommonText en="No data found" hi="कोई डेटा नहीं मिला" /></p>
                              </>}

                          </div>
                        </div>
                      </> :
                      <>
                      {(currentMode == 'view' || currentMode == 'Edit') ?
                    <>
                    
                    <form onSubmit={(e)=>handleUpdate(e)}>
                        <div className='row'>
                        <div className='col-md-12'>
                      <div className={FormStyle.formCommonUnderline}></div>
                    </div>
                        <div className='col-md-12'>
                          <div className='row'>
                        <div className="col-md-12">
                          <div className={FormStyle.feildWrapper}>
                          <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                          <GiMedicines className='me-2'/>
                          <CommonText en="Disease" hi="रोग" />
                      </h1>
                          </div>
                        </div>
                        <p className='ms-3'>{requestPayload.disease_name}</p>

                      <div className="col-md-12">
                          <div className={FormStyle.feildWrapper}>
                          <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                          <GiMedicines className='me-2'/>
                          <CommonText en="Diets to take" hi="आहार जो लेना है" />
                      </h1>
                          </div>
                        </div>

                        {currentMode == 'Edit' ? <>
                        {allDiets.map((item,i)=>{
                          return (<div className='col-md-12' key={i}>
                            <div className={`d-flex ${FormStyle.customizeCheckbox} mb-3`}>
                            {currentMode == 'Edit' &&  <input type='checkbox' name="diets" id={`diets${i}`} value={item.id} defaultChecked={requestPayload.diets && requestPayload.diets.length > 0 && requestPayload.diets.filter((diet) => diet == item.id).length > 0 ? true : false}/>}
                            <label className='ps-3' htmlFor={`diets${i}`}>{item.description}</label>
                            </div>
                          </div>)
                        })}
                        </>
                        :
                        <>
                        <div className='col-md-12 mb-2' >
                          <ol>
                        {requestPayload.diets_data && requestPayload.diets_data.map((item,i)=>{
                          return (
                            <li className='ps-3' key={i}>{item.description}</li>
                          )
                        })}
                        </ol>
                        </div>
                        </>}


                        <div className="col-md-12">
                        {currentMode == 'Edit' && 
                          <button type="submit" className={FormStyle.formButton}  disabled={isSubmiting}>
                            <CommonText en="Update" hi="अपडेट करें" />
                          </button>

                      }
                        
                          <button type="button" className={`${FormStyle.formButtonPrev} ${currentMode == 'Edit' && 'ms-4'}`} 
                          onClick={()=>disabledForm()}>
                            <CommonText en="Cancel" hi="रद्द करें" />
                          </button>
                        </div>
                      </div>                      
                      </div>
                      
                        </div>
                        </form>
                    </>
                    :
                      <>
                      {diseaseNotMapped.length > 0 ? <>{ allDiets.length > 0 ?  
                      <form onSubmit={(e)=>handleSubmit(e)}>
                        <div className='row'>
                        <div className='col-md-12'>
                      <div className={FormStyle.formCommonUnderline}></div>
                    </div>
                        <div className='col-md-12'>
                          <div className='row'>
                        <div className="col-md-12">
                          <div className={FormStyle.feildWrapper}>
                          <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                          <GiMedicines className='me-2'/>
                          <CommonText en="Disease" hi="रोग" />
                      </h1>
                          </div>
                        </div>
                        {diseaseNotMapped.map((item,i)=>{
                          return (<div className='col-md-3' key={i}>
                            <div className={`d-flex ${FormStyle.customizeCheckbox} mb-3`}>
                            <input type='checkbox' name={`diseases`} id={`disease${i}`} value={item.id}/>
                            <label className='ps-2' htmlFor={`disease${i}`}>{item.name}</label>
                            </div>
                          </div>)
                        })}

                      <div className="col-md-12">
                          <div className={FormStyle.feildWrapper}>
                          <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                          <GiMedicines className='me-2'/>
                          <CommonText en="Diets to take" hi="आहार जो लेना है" />
                      </h1>
                          </div>
                        </div>

                        {allDiets.map((item,i)=>{
                          return (<div className='col-md-12' key={i}>
                            <div className={`d-flex ${FormStyle.customizeCheckbox} mb-3`}>
                            <input type='checkbox' name="diets" id={`diets${i}`} value={item.id}/>
                            <label className='ps-2' htmlFor={`diets${i}`}>{item.description}</label>
                            </div>
                          </div>)
                        })}


                        <div className="col-md-12">
                          <button type="submit" className={FormStyle.formButton} disabled={isSubmiting}>
                          <CommonText en="Submit" hi="सुनिश्चित करें" />
                          </button>
                        
                          <button type="button" className={`${FormStyle.formButtonPrev} ms-4`} onClick={()=>disabledForm()}>
                          <CommonText en="Cancel" hi="रद्द करें" />
                          </button>
                        </div>
                      </div>                      
                      </div>
                      
                        </div>
                        </form>
                        :
                        <>
                        <p><CommonText en="No Diets found please add any Diet." hi="कोई आहार नहीं मिला कृपया कोई आहार जोड़ें।" /></p>
                        <div className='col-md-12'>
                        <button type="button" className={`${FormStyle.formButtonPrev}`} onClick={()=>disabledForm()}>
                        <CommonText en="Cancel" hi="रद्द करें" />
                        </button>
                        </div>
                        </>
                        
                        }
                        </>
                        :
                        <>
                        <p><CommonText en="All Disease are mapped please update or add more disease to add." hi="सभी रोग मैप हो चुके हैं कृपया अपडेट करें या और जोड़ने के लिए और रोग जोड़ें।" /></p>
                        <div className='col-md-12'>
                        <button type="button" className={`${FormStyle.formButtonPrev}`} onClick={()=>disabledForm()}>
                        <CommonText en="Cancel" hi="रद्द करें" />
                        </button>
                        </div>
                        </>}
                      </>
                    }
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
                    <CommonText en="Disease Map Diet To Take" hi="रोग आधारित आहार जो लेना है" />
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

export default Map_Disease_with_diets_to_take