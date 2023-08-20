import FormStyle from '../../../../css/form.module.css';
import customModalStyle from '../../../../css/customModal.module.css'
import { GiMedicines } from 'react-icons/gi';
import { HiDotsVertical } from 'react-icons/hi';
import { BiPlus } from 'react-icons/bi'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import * as ACTIONS from './action'
import * as CommonAction from '../../../../Common Api Calls/commonAction'
import { CommonText } from '../../../../Multi_Lang'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'


function DiseasesAndMedicine() {

  let [haveResponse, setHaveResponse] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [isSubmiting, setIsSubmiting] = useState(false)
  let { addToast } = useToasts();
  let [currentMode, setCurrentMode] = useState('');
  let [listView, setListView] = useState(true);
  let [allMappedDiseasesAndMedicineList, setAllMappedDiseasesAndMedicineList] = useState([]);

  let [allDiseasesList, setAllDiseasesList] = useState([]);
  let [allMedicineList, setAllMedicineList] = useState([]);

  let [preferedTimeError, setPreferedTimeError] = useState(false);

  let [otherWayOfTaken, setOtherWayOfTaken] = useState('')
  let [haveOtherWayOfTaken, setHaveOtherWayOfTaken] = useState(false)

  let [otherWayOfTakenHindi, setOtherWayOfTakenHindi] = useState('')
  let [haveOtherWayOfTakenHindi, setHaveOtherWayOfTakenHindi] = useState(false)

  let [way_of_takenOption, setWay_of_takenOption] = useState([])

  let [diseasesAndMedicinePayload, setDiseasesAndMedicinePayload] = useState({
    diseases: '',
    medicine: '',
    In_Take_Sequence: '',
    consumption_count:'',
    how_to_take: [],
  })

  let [preferedTime, setPreferedTime] = useState({
    time_of_take: "",
    hi_time_of_take: "",
    way_of_taken: "",
    hi_way_of_taken: "",
  })

  let dispatch = useDispatch();

  const state = useSelector((state) => state.DiseasesAndMedicineReducer);
  const CommonState = useSelector((state) => state.commonReducer);


  useEffect(() => {
    dispatch(CommonAction.getAllDiseases())
    dispatch(CommonAction.getAllMedicine())
  }, [])


  useEffect(() => {
    if (CommonState.GetAllDiseasesSuccess) {
      setIsLoading(false)
      setAllDiseasesList(CommonState.GetAllDiseasesSuccess.allDiseases)
      addToast("Success!", {
        appearance: "success",
        content: `Get All diseases Success.`,
      });
    }
    if (CommonState.GetAllDiseasesFailure) {
      setIsLoading(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to get all diseases.`,
      });
    }

    dispatch(CommonAction.resetToInitialState())

  }, [CommonState.GetAllDiseasesSuccess, CommonState.GetAllDiseasesFailure])


  useEffect(() => {
    if (CommonState.getAllMedicineSuccess) {
      setAllMedicineList(CommonState.getAllMedicineSuccess.allMedicine)
      addToast("Success!", {
        appearance: "success",
        content: `Get All medicine Success.`,
      });
    }
    if (CommonState.getAllMedicineFailure) {
      addToast("Error!", {
        appearance: "error",
        content: `Unable to get all medicine.`,
      });
    }

    dispatch(CommonAction.resetToInitialState())

  }, [CommonState.getAllMedicineSuccess, CommonState.getAllMedicineFailure])


  let handleChange = (e) => {

    let diseasesAndMedicinePayloadCopy = { ...diseasesAndMedicinePayload };

    if (e.target.id === 'diseases') {
      setIsLoading(true)
      dispatch(ACTIONS.getDiseaseMappedData({ 'diseases': e.target.value }))
    }

    if (e.target.id === 'diseases' || e.target.id === 'medicine') {
      let wayoftakeMedicine = allMedicineList.find((item) => item.id == e.target.value)
      setWay_of_takenOption(wayoftakeMedicine.all_way_of_taken)
      setOtherWayOfTaken('')
      setOtherWayOfTakenHindi('')
      setHaveOtherWayOfTaken(false)
      setHaveOtherWayOfTakenHindi(false)
      setPreferedTime({
        time_of_take: "",
        hi_time_of_take: "",
        way_of_taken: "",
        hi_way_of_taken: "",
      })
      diseasesAndMedicinePayloadCopy.how_to_take = []
    }

    diseasesAndMedicinePayloadCopy[e.target.id] = e.target.value;
    setDiseasesAndMedicinePayload(diseasesAndMedicinePayloadCopy);
  }


  useEffect(() => {
    if (state.getAllMappedDiseasesAndMedicineSuccess) {

      setIsLoading(false)

      setAllMappedDiseasesAndMedicineList(state.getAllMappedDiseasesAndMedicineSuccess.mappedData)


      addToast("Success!", {
        appearance: "success",
        content: `Get All mapped data Success.`,
      });
    }
    if (state.getAllMappedDiseasesAndMedicineFailure) {

      setIsLoading(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to get mapped data.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.getAllMappedDiseasesAndMedicineSuccess, state.getAllMappedDiseasesAndMedicineFailure])

  useEffect(() => {
    if (state.createDiseasesAndMedicineMapingSuccess) {

      let diseaseAndMedicinePayloadCopy = { ...diseasesAndMedicinePayload }

      setPreferedTime({
        time_of_take: "",
        hi_time_of_take: "",
        way_of_taken: "",
        hi_way_of_taken: ""
      })

      setDiseasesAndMedicinePayload({
        diseases: diseaseAndMedicinePayloadCopy.diseases,
        medicine: '',
        consumption_count:'',
        In_Take_Sequence: '',
        how_to_take: [],
      })

      setHaveResponse(true);
      setCurrentMode('')
      setListView(true)
      setIsSubmiting(false)

      setIsLoading(true)
      dispatch(ACTIONS.getDiseaseMappedData({ 'diseases': diseasesAndMedicinePayload.diseases }))

      addToast("Success!", {
        appearance: "success",
        content: `Disease and Medicine mapped Successfully.`,
      });
    }
    if (state.createDiseasesAndMedicineMapingFailure) {
      setIsSubmiting(false)
      if (state.createDiseasesAndMedicineMapingFailure.error) {
        addToast("Error!", {
          appearance: "error",
          content: state.createDiseasesAndMedicineMapingFailure.error,
        });
      }
      else {
        addToast("Error!", {
          appearance: "error",
          content: `Unable to Map disease and medicine.`,
        });
      }
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.createDiseasesAndMedicineMapingSuccess, state.createDiseasesAndMedicineMapingFailure])

  let handlePreferedTimeChange = (e) => {
    let preferedTimeCopy = { ...preferedTime };

    if (e.target.id == "hi_way_of_taken" && e.target.value == 'other') {
      setHaveOtherWayOfTakenHindi(true)
      setOtherWayOfTakenHindi('')
    }
    if (e.target.id == "hi_way_of_taken" && e.target.value !== 'other') {
      setHaveOtherWayOfTakenHindi(false)
    }
    if (e.target.id == "way_of_taken" && e.target.value == 'other') {
      setHaveOtherWayOfTaken(true)
      setOtherWayOfTaken('')
    }
    if (e.target.id == "way_of_taken" && e.target.value !== 'other') {
      setHaveOtherWayOfTaken(false)
    }
    preferedTimeCopy[e.target.id] = e.target.value;
    setPreferedTime(preferedTimeCopy);
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    let allData = [...allMappedDiseasesAndMedicineList]

    if (currentMode !== '') {
      allData = allData.filter((item) => item.id !== diseasesAndMedicinePayload.id)
    }

    let checkMedicine = allData.filter((item) => item.medicine === diseasesAndMedicinePayload.medicine)
    let checkIntakeSequence = allData.filter((item) => item.In_Take_Sequence === diseasesAndMedicinePayload.In_Take_Sequence)

    if (checkMedicine.length > 0) {
      return addToast("Error!", {
        appearance: "error",
        content: "This medicine is already exist.",
      });
    }

    if (checkIntakeSequence.length > 0) {
      return addToast("Error!", {
        appearance: "error",
        content: "This In Take Sequence No is already exist.",
      });
    }


    if (preferedTime.time_of_take != '' && preferedTime.hi_way_of_taken != '' && preferedTime.way_of_taken != '' && preferedTime.hi_time_of_take != '') {
      diseasesAndMedicinePayload.how_to_take.push(preferedTime)
      setPreferedTime({
        time_of_take: "",
        hi_time_of_take: "",
        way_of_taken: "",
        hi_way_of_taken: "",
      })
    }

    if (currentMode === 'Edit') {

      setIsSubmiting(true)
      dispatch(ACTIONS.updateDiseasesAndMedicineMaping(diseasesAndMedicinePayload))
    }
    else {
      if (currentMode !== 'view') {

        setIsSubmiting(true)
        dispatch(ACTIONS.createDiseasesAndMedicineMaping(diseasesAndMedicinePayload))
      }
    }

  }

  let enableForm = () => {

    setDiseasesAndMedicinePayload({
      diseases: diseasesAndMedicinePayload.diseases,
      medicine: '',
      consumption_count:'',
      In_Take_Sequence: '',
      how_to_take: [],
    })

    setPreferedTime({
      time_of_take: "",
      hi_time_of_take: "",
      way_of_taken: "",
      hi_way_of_taken: "",
    })


    setCurrentMode('')
    setListView(false);
    setIsSubmiting(false)
  }

  let disabledForm = () => {
    setListView(true);
    setCurrentMode('')
  }

  let closeModal = () => {
    setHaveResponse(false);
    setListView(true)
    setCurrentMode('')
  }

  let changeMode = (index, mode) => {
    if (mode == 'Edit') {
      let wayoftakeMedicine = allMedicineList.find((item) => item.id == allMappedDiseasesAndMedicineList[index].medicine)
      setWay_of_takenOption(wayoftakeMedicine.all_way_of_taken)
    }
    setCurrentMode(mode)
    setDiseasesAndMedicinePayload(allMappedDiseasesAndMedicineList[index])
    setListView(false)
    setPreferedTime({
      time_of_take: "",
      hi_time_of_take: "",
      way_of_taken: "",
      hi_way_of_taken: ""
    })
  }

  const addInPreferedTime = () => {
    let diseaseAndMedicinePayloadCopy = { ...diseasesAndMedicinePayload }

    let preferedTimeCopy = { ...preferedTime }

    if (preferedTime.hi_time_of_take != '' && preferedTime.time_of_take != '' && preferedTime.hi_way_of_taken != '' && preferedTime.way_of_taken != '') {
      if (preferedTimeCopy.hi_way_of_taken == 'other') {
        preferedTimeCopy.hi_way_of_taken = otherWayOfTakenHindi
      }

      else {
        preferedTimeCopy.hi_way_of_taken = way_of_takenOption[preferedTime.hi_way_of_taken].hi_way_of_taken
      }

      if (preferedTimeCopy.way_of_taken == 'other') {
        preferedTimeCopy.way_of_taken = otherWayOfTaken
      }
      else {
        preferedTimeCopy.way_of_taken = way_of_takenOption[preferedTime.way_of_taken].way_of_taken
      }

      diseaseAndMedicinePayloadCopy.how_to_take.push(preferedTimeCopy)

      setPreferedTime({
        time_of_take: "",
        hi_time_of_take: "",
        way_of_taken: "",
        hi_way_of_taken: "",
      })

      setOtherWayOfTaken('')
      setOtherWayOfTakenHindi('')
      setHaveOtherWayOfTaken(false)
      setHaveOtherWayOfTakenHindi(false)
    }
    else {
      setPreferedTimeError(true)
      setTimeout(() => { setPreferedTimeError(false); }, 4000);
    }
  }

  const handleRemove = (current) => {
    let diseaseAndMedicinePayloadCopy = { ...diseasesAndMedicinePayload }
    diseaseAndMedicinePayloadCopy.how_to_take = diseaseAndMedicinePayloadCopy.how_to_take.filter((item, index) => index != current)
    setDiseasesAndMedicinePayload(diseaseAndMedicinePayloadCopy)
  }


  function array_move(arr, old_index, new_index) {
    let diseaseAndMedicinePayloadCopy = { ...diseasesAndMedicinePayload }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    diseaseAndMedicinePayloadCopy.how_to_take = arr;
    setDiseasesAndMedicinePayload(diseaseAndMedicinePayloadCopy)
  };


  useEffect(() => {
    if (state.updateDiseasesAndMedicineMapingSuccess) {

      let diseaseAndMedicinePayloadCopy = { ...diseasesAndMedicinePayload }

      setPreferedTime({
        time_of_take: "",
        hi_time_of_take: "",
        way_of_taken: "",
        hi_way_of_taken: "",
      })

      setDiseasesAndMedicinePayload({
        diseases: diseaseAndMedicinePayloadCopy.diseases,
        medicine: '',
        consumption_count:'',
        In_Take_Sequence: '',
        how_to_take: [],
      })

      setCurrentMode('')
      setListView(true)
      setIsSubmiting(false)

      setIsLoading(true)
      dispatch(ACTIONS.getDiseaseMappedData({ 'diseases': diseasesAndMedicinePayload.diseases }))

      addToast("Success!", {
        appearance: "success",
        content: `Disease and Medicine mapping updated Successfully.`,
      });
    }

    if (state.updateDiseasesAndMedicineMapingFailure) {
      setIsSubmiting(false)
      if (state.updateDiseasesAndMedicineMapingFailure.error) {
        addToast("Error!", {
          appearance: "error",
          content: state.updateDiseasesAndMedicineMapingFailure.error,
        });
      }
      else {
        addToast("Error!", {
          appearance: "error",
          content: `Unable to update Map disease and medicine.`,
        });
      }
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.updateDiseasesAndMedicineMapingSuccess, state.updateDiseasesAndMedicineMapingFailure])

  const OtherWayOfTakeChange = (e) => {
    if (e.target.id == "otherWayOfTakenHindi") {
      setOtherWayOfTakenHindi(e.target.value)
    }
    if (e.target.id == "otherWayOfTaken") {
      setOtherWayOfTaken(e.target.value)
    }
  }
  return (
    <section className={FormStyle.commonFormArea}>
      <div className="container">
        <div className="row">
          {haveResponse &&
            <div className={customModalStyle.customModalLayout}>
              <div className={customModalStyle.customModalBox}>
                <p className='text-center text-success'>
                  <CommonText en="Diseases and medicine mapped Successfully." hi="रोग और औषधि सफलतापूर्वक मैप किया गया।" />
                </p>
                <button type='button' className='btn btn-success' onClick={() => closeModal()}>
                  <CommonText en="Ok" hi="ठीक है" />
                </button>
              </div>
            </div>
          }
          <div className="col-lg-12">
            <div className={FormStyle.commonFormWrapper}>
              <div className="row">

                <div className="col-md-8">
                  <h1 className={FormStyle.formTitle}>
                    <span className={FormStyle.formTitlelogo}>
                      <GiMedicines />
                    </span>
                    <CommonText en="Disease Map Medicine " hi="रोग आधारित औषधि " />
                  </h1>
                </div>
                <div className='col-md-12'>
                  <div className={FormStyle.formCommonUnderline}></div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className='row'>

                    {(currentMode === 'view' || currentMode === 'Edit') ?
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='diseases'>
                            <CommonText en="Disease" hi="रोग" />
                          </label>
                          <p className='bg-light p-2'>
                            <CommonText en={diseasesAndMedicinePayload.disease_name} hi={diseasesAndMedicinePayload.disease_hi_name} />
                          </p>
                        </div>
                      </div>
                      :
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='diseases'>
                            <CommonText en="Disease" hi="रोग" />
                          </label>
                          <select id="diseases" value={diseasesAndMedicinePayload.diseases} onChange={(e) => handleChange(e)} required disabled={currentMode === 'view'}>
                            <option value="" hidden disabled>
                              <CommonText en="Select Disease" hi="रोग चुने" />
                            </option>
                            {allDiseasesList.length > 0 ? (allDiseasesList.map((item, index) => {
                              return <option value={item.id} key={index}>{item.name}</option>
                            })) :
                              <option value="" disabled>
                                <CommonText en="No disease found" hi="कोई रोग नहीं मिला" />
                              </option>}
                          </select>
                        </div>
                      </div>
                    }

                    {isLoading ?
                      <div className="search-Loader">
                        <Loader
                          color='#2bbf4f' />
                      </div>
                      : <>
                        {diseasesAndMedicinePayload.diseases !== "" && (listView ?
                          <>
                            <div className='col-lg-6 text-end align-self-end pb-3'>
                              <button type='button' className='common-gradient' onClick={() => enableForm()}><BiPlus />
                                <CommonText en="Add New" hi="नया जोड़े" />
                              </button>
                            </div>
                            <div className='col-md-12'>
                              <div className={FormStyle.formCommonUnderline}></div>
                            </div>
                            <div className="col-md-12">
                              <div className={FormStyle.allListTable}>
                                <table>
                                  <thead>
                                    <tr className={FormStyle.allListTableHeadings}>
                                      <th><CommonText en="Sequence No" hi="क्र.सं." /></th>
                                      <th><CommonText en="Suggested time (English)" hi="सुझाया गया समय (अंग्रेज़ी)" /></th>
                                      <th><CommonText en="Suggested time (Hindi)" hi="सुझाया गया समय (हिंदी)" /></th>
                                      <th><CommonText en="Way of taken (English)" hi="लेने का तरीका (अंग्रेज़ी)" /></th>
                                      <th><CommonText en="Way of taken (Hindi)" hi="लेने का तरीका (हिंदी)" /></th>
                                      <th className={FormStyle.allListTableActionList}></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {allMappedDiseasesAndMedicineList.length > 0 ? allMappedDiseasesAndMedicineList.map((item, index) => {
                                      return (
                                        <tr className={FormStyle.allListTableSingleRow} key={index}>

                                          <td>{item.how_to_take.map((serial, indx) => {
                                            return (<div className='col-lg-12' key={indx}>{item.In_Take_Sequence}.{indx + 1}</div>)
                                          })}</td>
                                          <td>{item.how_to_take.map((takenTime, indx) => {
                                            return (<div className='col-lg-12' key={indx}>{takenTime.time_of_take}</div>)
                                          })}</td>
                                          <td>{item.how_to_take.map((takenTime, indx) => {
                                            return (<div className='col-lg-12' key={indx}>{takenTime.hi_time_of_take}</div>)
                                          })}</td>
                                          <td>{item.how_to_take.map((way_of_taken, indx) => {
                                            return (<div className='col-lg-12' key={indx}>{way_of_taken.way_of_taken}</div>)
                                          })}</td>
                                          <td>{item.how_to_take.map((hi_way_of_taken, indx) => {
                                            return (<div className='col-lg-12' key={indx}>{hi_way_of_taken.hi_way_of_taken}</div>)
                                          })}</td>
                                          <td className={FormStyle.allListTableActionList}>
                                            <ul className={FormStyle.actionList}>
                                              <li className="nav-item dropdown">
                                                <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                  <HiDotsVertical />
                                                </span>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                  <li>
                                                    <div>
                                                      <span className="dropdown-item" onClick={() => changeMode(index, 'view')}>
                                                        <CommonText en="View" hi="देखे" />
                                                      </span>
                                                    </div>
                                                  </li>
                                                  <li>
                                                    <div>
                                                      <span className="dropdown-item" onClick={() => changeMode(index, 'Edit')}>
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
                                      :
                                      <tr><td><CommonText en="No data found" hi="कोई डेटा नहीं मिला" /></td></tr>
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </>
                          :
                          <>

                            {(currentMode === 'view' || currentMode === 'Edit') ?
                              <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                  <label >
                                    <CommonText en="Medicine" hi="औषधि" />
                                  </label>
                                  <p className='bg-light p-2'>
                                    <CommonText en={diseasesAndMedicinePayload.medicine_name} hi={diseasesAndMedicinePayload.medicine_hi_name} />
                                  </p>
                                </div>
                              </div>
                              :
                              <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='medicine'>
                                    <CommonText en="Medicines" hi="औषधियां" />
                                  </label>

                                  <select id="medicine" className='form-select' value={diseasesAndMedicinePayload.medicine} onChange={(e) => handleChange(e)} required disabled={currentMode === 'view'}>
                                    <option value='' disabled>
                                      <CommonText en="select medicine" hi="औषधि चुने" />
                                    </option>
                                    {allMedicineList.length > 0 ? allMedicineList.map((items, index) => { return (<option key={index} value={items.id}>{items.name}</option>) })
                                      :
                                      <option value="" disabled>
                                        <CommonText en="No medicine found" hi="कोई औषधि नहीं मिली" />
                                      </option>
                                    }
                                  </select>
                                </div>
                              </div>
                            }

                            <div className="col-md-6">
                              <div className={FormStyle.feildWrapper}>
                                <label htmlFor='In_Take_Sequence'>
                                  <CommonText en="Intake Sequence" hi="सेवन क्रम" />
                                </label>
                                <input type="text" id="In_Take_Sequence" value={diseasesAndMedicinePayload.In_Take_Sequence} onChange={(e) => handleChange(e)} required disabled={currentMode === 'view'} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className={FormStyle.feildWrapper}>
                                <label htmlFor='In_Take_Sequence'>
                                  <CommonText en="Consumption count" hi="सेवन की मात्रा" />
                                </label>
                                <input type="text" id="consumption_count" value={diseasesAndMedicinePayload.consumption_count} onChange={(e) => handleChange(e)} required disabled={currentMode === 'view'} />
                              </div>
                            </div>
                            

                            {diseasesAndMedicinePayload.medicine && <>
                              <h1 className={`${FormStyle.formTitle} mt-2`}>
                                <CommonText en="How To Take Configuration" hi="औषधि कैसे लें कॉन्फ़िगरेशन " />
                              </h1>
                              <div className='col-md-12'>
                                <div className={FormStyle.formCommonUnderline}></div>
                              </div>
                              {currentMode !== 'view' && <>
                                <div className='col-md-6'>
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='time_of_take'>
                                      <CommonText en="Time of Take (English)" hi="लेने का समय (अंग्रेजी)" />
                                    </label>
                                    <input type="text" id="time_of_take" value={preferedTime.time_of_take} onChange={(e) => handlePreferedTimeChange(e)} disabled={currentMode === 'view'} />
                                  </div>
                                </div>
                                <div className='col-md-6'>
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='hi_time_of_take'>
                                      <CommonText en="Time of Take (Hindi)" hi="लेने का समय (हिंदी)" />
                                    </label>
                                    <input type="text" id="hi_time_of_take" value={preferedTime.hi_time_of_take} onChange={(e) => handlePreferedTimeChange(e)} disabled={currentMode === 'view'} />
                                  </div>
                                </div>
                                <div className='col-md-6'>
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='way_of_taken'>
                                      <CommonText en="Way Of Taken (English)" hi="लेने का तरीका (अंग्रेज़ी)" />
                                    </label>
                                    <select id="way_of_taken" value={preferedTime.way_of_taken} onChange={(e) => handlePreferedTimeChange(e)} disabled={currentMode === 'view'}>
                                      <option value='' hidden>select way of taken</option>

                                      {way_of_takenOption && way_of_takenOption.length > 0 && <>
                                        {way_of_takenOption.map((item, index) => {
                                          return (
                                            <option value={index} key={index}>{item.way_of_taken}</option>
                                          )
                                        })}
                                      </>}
                                      <option value="other">
                                        <CommonText en="Other" hi="अन्य" />
                                      </option>
                                    </select>
                                    {haveOtherWayOfTaken && <>
                                      <input type="text" className='mt-3' id="otherWayOfTaken" value={otherWayOfTaken} onChange={(e) => OtherWayOfTakeChange(e)} />
                                    </>}

                                  </div>
                                </div>
                                <div className='col-md-6'>
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='hi_way_of_taken'>
                                      <CommonText en="Way Of Taken (Hindi)" hi="लेने का तरीका (हिंदी)" />
                                    </label>
                                    <select id="hi_way_of_taken" value={preferedTime.hi_way_of_taken} onChange={(e) => handlePreferedTimeChange(e)} disabled={currentMode === 'view'}>
                                      <option value='' hidden>select way of taken</option>

                                      {way_of_takenOption && way_of_takenOption.length > 0 && <>
                                        {way_of_takenOption.map((item, index) => {
                                          return (
                                            <option value={index} key={index}>{item.hi_way_of_taken}</option>
                                          )
                                        })}
                                      </>}

                                      <option value="other">
                                        <CommonText en="Other" hi="अन्य" />
                                      </option>
                                    </select>

                                    {haveOtherWayOfTakenHindi && <>
                                      <input type="text" className='mt-3' id="otherWayOfTakenHindi" value={otherWayOfTakenHindi} onChange={(e) => OtherWayOfTakeChange(e)} />
                                    </>}

                                  </div>
                                </div>
                                {preferedTimeError && <span className='text-danger fs-6'>Please fill all fields first.</span>}
                                <div className='col-md-12 d-flex align-items-end justify-content-end py-2'>
                                  <button type='button' className='common-gradient' onClick={() => addInPreferedTime()} disabled={currentMode === 'view'}>
                                    <CommonText en="Save and Add" hi="सहेजें और जोड़ें" />
                                  </button>
                                </div>
                              </>}
                              {diseasesAndMedicinePayload.how_to_take.length > 0 &&
                                <div className='col-md-12'>
                                  <div className={FormStyle.feildWrapper}>
                                    <div className={FormStyle.allListTable}>
                                      <table>
                                        <thead>
                                          <tr className={FormStyle.allListTableHeadings}>
                                            <th>
                                              <CommonText en="Sequence" hi="क्रम" />
                                            </th>
                                            <th> <CommonText en="Time of Take (English)" hi="लेने का समय (अंग्रेजी)" /></th>
                                            <th> <CommonText en="Time of Take (Hindi)" hi="लेने का समय (हिंदी)" /></th>
                                            <th><CommonText en="Way Of Taken (English)" hi="लेने का तरीका (अंग्रेज़ी)" /></th>
                                            <th><CommonText en="Way Of Taken (Hindi)" hi="लेने का तरीका (हिंदी)" /></th>
                                            {currentMode !== 'view' &&
                                              <th className={FormStyle.allListTableActionList}></th>
                                            }
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {diseasesAndMedicinePayload.how_to_take.map((item, index) => {
                                            return (<tr className={FormStyle.allListTableSingleRow} key={index}>
                                              <td>{diseasesAndMedicinePayload.In_Take_Sequence}.{index + 1}</td>
                                              <td>{item.time_of_take}</td>
                                              <td>{item.hi_time_of_take}</td>
                                              <td>{item.way_of_taken}</td>
                                              <td>{item.hi_way_of_taken}</td>
                                              {currentMode !== 'view' &&
                                                <td className={FormStyle.allListTableActionList}>
                                                  <ul className={FormStyle.actionList}>
                                                    <li className="nav-item dropdown">
                                                      <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={currentMode === 'view'}>
                                                        <HiDotsVertical />
                                                      </span>
                                                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li>
                                                          <div>
                                                            <span className="dropdown-item" onClick={() => handleRemove(index)} disabled={currentMode === 'view'}>
                                                              <CommonText en="Remove" hi="हटाये" />
                                                            </span>
                                                          </div>
                                                        </li>
                                                        {index > 0 && <li>
                                                          <div>
                                                            <span className="dropdown-item" onClick={() => array_move(diseasesAndMedicinePayload.how_to_take, index, index - 1)} disabled={currentMode === 'view'}>
                                                              <CommonText en="Move Up" hi="ऊपर ले जाएँ" />
                                                            </span>
                                                          </div>
                                                        </li>}
                                                        {index < (diseasesAndMedicinePayload.how_to_take.length - 1) && <li>
                                                          <div>
                                                            <span className="dropdown-item" onClick={() => array_move(diseasesAndMedicinePayload.how_to_take, index, index + 1)} disabled={currentMode === 'view'}>
                                                              <CommonText en="Move Down" hi="नीचे ले जाएँ" />
                                                            </span>
                                                          </div>
                                                        </li>}

                                                      </ul>
                                                    </li>
                                                  </ul>
                                                </td>
                                              }
                                            </tr>
                                            )
                                          })
                                          }
                                        </tbody>
                                      </table>

                                    </div>

                                  </div>

                                </div>

                              }
                            </>}
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


                          </>
                        )
                        }
                      </>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiseasesAndMedicine
