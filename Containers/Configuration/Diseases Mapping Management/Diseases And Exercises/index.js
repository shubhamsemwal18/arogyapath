import FormStyle from '../../../../css/form.module.css';
import customModalStyle from '../../../../css/customModal.module.css'
import { GiMedicines } from 'react-icons/gi';
import { AiFillMedicineBox } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi'
import { HiDotsVertical } from 'react-icons/hi'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import Select from 'react-select'

import * as commonAction from '../../../../Common Api Calls/commonAction'
import * as ACTIONS from './action'
import { CommonText } from '../../../../Multi_Lang'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'


function DiseasesAndExercises() {

  let [allDiseases, setAllDiseases] = useState([])
  let [allExercises, setAllExercises] = useState([])
  let [allDiseasesMappedExercises, setAllDiseasesMappedExercises] = useState([])

  let [selectedExercises, setSelectedExercises] = useState([])
  let [haveResponse,setHaveResponse] = useState(false);
  let [diseasesExercisePayload, setDiseasesExercisePayload] = useState({
    diseases_id : "",
    exercises : [],
    instructions : "",
    hi_instructions : "",
  })

  let { addToast } = useToasts();
  let [listView, setListView] = useState(true);
  let [isLoading, setIsLoading] = useState(false)
  let [isSubmiting,setIsSubmiting] = useState(false)
  let [currentMode, setCurrentMode] = useState('')

  let dispatch = useDispatch()
  let commonState = useSelector((state) => state.commonReducer)
  let state = useSelector((state) => state.diseasesExerciseReducer)

  useEffect(()=>{
    dispatch(commonAction.getAllExercises())
  },[])

  useEffect(()=>{
    setIsLoading(true)
    dispatch(commonAction.getDataNotMappedWithDiseaseByParam('exercise'))
    dispatch(commonAction.getAllDiseasesExercises())
  },[state.diseasesExercisesMapSuccess,state.updateDiseasesExercisesMapSuccess])

  useEffect(()=>{
    if(commonState.getAllExercisesSuccess){
      let exerciseOption = []
      
      commonState.getAllExercisesSuccess.allExercises.map((item,index)=>{
        exerciseOption.push({value : `${item.id}`,
        label:`${item.serial_no}. ${item.name}`})
      })
      
      setAllExercises(exerciseOption)

      addToast("Success!", {
        appearance: "success",
        content: `Get All exerises Success.`,
      });
    }
    if(commonState.getAllExercisesFailure){
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get all exercises.`,
              });
    }

    dispatch(commonAction.resetToInitialState())
  },[commonState.getAllExercisesSuccess,commonState.getAllExercisesFailure])

  
  useEffect(() => {
    if (commonState.getDataNotMappedWIthDiseaseByParamSuccess) {
      setAllDiseases(commonState.getDataNotMappedWIthDiseaseByParamSuccess.data)
    }
    if (commonState.getDataNotMappedWIthDiseaseByParamFailure) {
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get unmapped data.`,
              });
    }

    dispatch(commonAction.resetToInitialState())

  }, [commonState.getDataNotMappedWIthDiseaseByParamSuccess, commonState.getDataNotMappedWIthDiseaseByParamFailure])

  useEffect(()=>{
    if(commonState.diseasesExercisesSuccess){
      setIsLoading(false)
        setAllDiseasesMappedExercises(commonState.diseasesExercisesSuccess.mappedData)
    }
    if(commonState.diseasesExercisesFailure){
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get all diseases mapped exercises.`,
              });
    }

    dispatch(commonAction.resetToInitialState())
  },[commonState.diseasesExercisesSuccess,commonState.diseasesExercisesFailure])

  let handleChange = (e) =>{
    let diseasesExercisePayloadCopy = {...diseasesExercisePayload}
    diseasesExercisePayloadCopy[e.target.id] = e.target.value
    setDiseasesExercisePayload(diseasesExercisePayloadCopy)
  }

  let handleExerciseChange = (e) =>{
    setSelectedExercises(e)
    let exercises = [] 
    e.map((item)=> exercises.push(item.value))

    let diseasesExercisePayloadCopy = {...diseasesExercisePayload}
    diseasesExercisePayloadCopy['exercises'] = exercises
    setDiseasesExercisePayload(diseasesExercisePayloadCopy)
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    

    if(diseasesExercisePayload.exercises.length == 0){
      return addToast("Error!", {
        appearance: "error",
        content: `Exercise field is required.`,
      });
    }

    if(currentMode === 'Edit'){
      setIsSubmiting(true)
      dispatch(ACTIONS.updateDiseasesExercises(diseasesExercisePayload))
    }
    else{
      if(currentMode !== 'view'){
        setIsSubmiting(true)
        dispatch(ACTIONS.diseasesExercises(diseasesExercisePayload))
      }
    }
  }

  useEffect(()=>{
    if(state.diseasesExercisesMapSuccess){
      
      setDiseasesExercisePayload({
        diseases_id : "",
        exercises : [],
        instructions : "",
        hi_instructions : "",
      })

      setSelectedExercises([])

      setHaveResponse(true);
      setIsSubmiting(false)

      addToast("Success!", {
        appearance: "success",
        content: `Map Disease and Exercises successfully.`,
      });
    }
    if(state.diseasesExercisesMapFailure){
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to Map Disease and exercises.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  },[state.diseasesExercisesMapSuccess,state.diseasesExercisesMapFailure])


  let enableForm = () => {
    setDiseasesExercisePayload({
      diseases_id : "",
      exercises : [],
      instructions : "",
      hi_instructions : "",
    })

    setSelectedExercises([])
    
    setCurrentMode('')
    setListView(false);
    setIsSubmiting(false)
  }

  let closeModal = () => {
        setHaveResponse(false);
        setListView(true);
        setCurrentMode('')
  }

  let changeMode = (index,mode)=>{
    setCurrentMode(mode)
  
    let exercisess = allExercises.filter((item) => {
        for(let result of allDiseasesMappedExercises[index].exercises){
          if(item.value == result){
            return item
          }
        }
    })

    setSelectedExercises(exercisess)
    
    setDiseasesExercisePayload(allDiseasesMappedExercises[index])
    setListView(false)
  }

  let disabledForm = () =>{
    setListView(true);
  }


useEffect(()=>{
  if(state.updateDiseasesExercisesMapSuccess){
    setDiseasesExercisePayload({
      diseases_id : "",
      exercises : [],
      instructions : "",
      hi_instructions : "",
    })
  
    setSelectedExercises([])

    setListView(true)
    setIsSubmiting(false)

    addToast("Success!", {
      appearance: "success",
      content: `Map Disease and Exercises updated successfully.`,
    });
  }
  if(state.updateDiseasesExercisesMapFailure){
    setIsSubmiting(false)
    addToast("Error!", {
      appearance: "error",
      content: `Unable to update Map Disease and exercises.`,
    });
  }

  dispatch(ACTIONS.resetToInitialState())

},[state.updateDiseasesExercisesMapSuccess,state.updateDiseasesExercisesMapFailure])

  return (
    <section className={FormStyle.commonFormArea}>
      {haveResponse &&
      <div className={customModalStyle.customModalLayout}>
          <div className={customModalStyle.customModalBox}>
              <p className='text-center text-success'> 
              <CommonText en="Diseases and Exercises Maped Successfully." hi="रोग और व्यायाम सफलतापूर्वक मैप किया गया।"/>
              </p>
              <button type='button' className='btn btn-success' onClick={() => closeModal()}>
              <CommonText en="Ok" hi="ठीक है" />
              </button>
          </div>
      </div>
      }
      <div className="container">
        <div className="row">
            <div className="col-lg-8 ">
              <div className={FormStyle.commonFormWrapper}>
                <div className="row">
                  
                  <div className="col-md-8">
                    <h1 className={FormStyle.formTitle}>
                      <span className={FormStyle.formTitlelogo}>
                        <GiMedicines />
                      </span>
                      <CommonText en="Disease Map Exercise " hi="रोग आधारित व्यायाम " />
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
                            {allDiseasesMappedExercises.length > 0 ?
                              <table>
                                <tr className={FormStyle.allListTableHeadings}>
                                <th><CommonText en="S.N." hi="क्र.सं." /></th>
                                <th><CommonText en="Disease" hi="रोग" /></th>
                                <th><CommonText en="Description" hi="विवरण" /></th>
                                  <th className={FormStyle.allListTableActionList}></th>
                                </tr>
                                {
                                  allDiseasesMappedExercises.map((item, index) => {
                                    return (
                                      <tr className={FormStyle.allListTableSingleRow}>
                                        <td>{index + 1}</td>
                                        <td>{item.disease_name}</td>
                                        <td>{item.instructions}</td>
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
                  <form onSubmit={(e)=>handleSubmit(e)}>
                  <div className='col-md-12'>
                    <div className='row'>
                    {(currentMode === 'view' || currentMode === 'Edit') ?
                    <div className='col-lg-6'>
                    <div className={FormStyle.feildWrapper}>
                      <label htmlFor='diseases_id'>
                      <CommonText en="Disease" hi="रोग" />
                      </label>
                      <div className='bg-light p-2'>{diseasesExercisePayload.disease_name}</div>

                    </div>
                  </div>
                   :
                      <div className='col-lg-6'>
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='diseases_id'>
                          <CommonText en="Disease" hi="रोग" />
                          </label>
                          <select className='form-select' 
                            id="diseases_id" 
                            value={diseasesExercisePayload.diseases_id}
                            onChange={(e)=>handleChange(e)}
                            disabled={currentMode === 'view'}
                            required
                            >
                            <option value='' hidden disabled>
                            <CommonText en="Select" hi="चुने" />
                            </option>
                            {allDiseases.length > 0 ? (allDiseases.map((item,index)=>{
                              return <option value={item.id} key={index}>{item.name}</option>
                            })) :
                            <option value='' disabled>
                             <CommonText en="No data found" hi="कोई डेटा नहीं मिला" /> 
                              </option>}
                          </select>

                        </div>
                      </div>
                    }
                      {currentMode === 'view' ? 
                      <div className='col-lg-12'>
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='exercises'>
                          <CommonText en="Exercise" hi="व्यायाम" />
                          </label>
                          <div className='bg-light p-2'>
                            <div className='row'>
                          {selectedExercises.map((item,index)=>{
                            return(<div className='col-md-4'>
                            <p key={index}>{item.label}</p>
                            </div>)
                          })}
                          </div>
                          </div>
                        </div>
                      </div>
                      :
                      <div className='col-lg-6'>
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='exercises'>
                          <CommonText en="Exercise" hi="व्यायाम" />
                          </label>
                          <Select
                            isMulti
                            name="exercises"
                            id="exercises"
                            value={selectedExercises}
                            options={allExercises}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(e)=>handleExerciseChange(e)}
                            required
                          />
                        </div>
                      </div>
                      }
                    {currentMode === 'view' ? 
                    <>
                    <div className="col-md-6">
                          <div className={FormStyle.feildWrapper}>
                            <label htmlFor='take'>
                            <CommonText en="Description (English)" hi="विवरण (अंग्रेजी)" />
                            </label>
                            <div className="p-3 bg-light">
                              {diseasesExercisePayload.instructions}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={FormStyle.feildWrapper}>
                            <label htmlFor='hi_instructions'>
                            <CommonText en="Description (Hindi)" hi="विवरण (हिंदी)" />
                            </label>
                            <div className="p-3 bg-light">
                              {diseasesExercisePayload.hi_instructions}
                            </div>
                          </div>
                        </div>
                    </> 
                    : 
                    <>
                    <div className='col-lg-12'>
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='instructions'>
                          <CommonText en="Description (English)" hi="विवरण (अंग्रेजी)" />
                          </label>
                          <textarea id="instructions" rows='3' value={diseasesExercisePayload.instructions} onChange={(e)=>handleChange(e)}/>
                      </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='instructions'>
                          <CommonText en="Description (Hindi)" hi="विवरण (हिंदी)" />
                          </label>
                          <textarea id="hi_instructions" rows='3' value={diseasesExercisePayload.hi_instructions} onChange={(e)=>handleChange(e)}/>
                      </div>
                      </div>
                      </>}

                    </div>
                  </div>
                  <div className="col-md-12">
                        {currentMode !== 'view' &&
                          <button type="submit" className={FormStyle.formButton} disabled={isSubmiting}>
                            {currentMode === 'Edit' ? <CommonText en="Update" hi="अपडेट करें"/> : <CommonText en="Submit" hi="सुनिश्चित करें"/>}
                          </button>
                        }
                          <button type="button" className={`${FormStyle.formButtonPrev} ms-4`} onClick={()=>disabledForm()}>
                          <CommonText en="Cancel" hi="रद्द करें" />
                          </button>
                        </div>
                  </form>
                  </>
                  }
                  </>}
                      </div>
                    </div>
                      
                </div>

          <div className="col-lg-4">
            <div className={FormStyle.sideInfoBox}>
              <div className={FormStyle.upper}>
                <h2 className={FormStyle.sideTitle}>
                  <AiFillMedicineBox />
                  <CommonText en="Disease Map Exercise " hi="रोग आधारित व्यायाम " />
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

export default DiseasesAndExercises