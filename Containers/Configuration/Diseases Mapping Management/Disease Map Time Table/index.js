import FormStyle from '../../../../css/form.module.css';
import customModalStyle from '../../../../css/customModal.module.css'
import { GiMedicines } from 'react-icons/gi';
import { BiPlus } from 'react-icons/bi'
import { HiDotsVertical } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import * as ACTIONS from './action'
import * as CommonAction from '../../../../Common Api Calls/commonAction'
import Select from 'react-select'
import { CommonText } from '../../../../Multi_Lang'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

function Map_Disease_with_Time_Table() {

  let [timeTablePayload, setTimeTablePayload] = useState({})

  let [requestPayload, setRequestPayload] = useState({})
  let dispatch = useDispatch();
  let { addToast } = useToasts();
  let [haveResponse, setHaveResponse] = useState(false);
  let [listView, setListView] = useState(true);

  let [allMedicineOption, setAllMedicineOption] = useState([])
  let [diseaseNotMapped, setDiseaseNotMapped] = useState([]);

  let [allMappedData, setAllMappedData] = useState([])
  let [isLoading, setIsLoading] = useState(true)
  let [isSubmiting, setIsSubmiting] = useState(false)
  let [currentMode, setCurrentMode] = useState('')

  let state = useSelector((state) => state.DiseasesMapTimeTableReducer);
  const CommonState = useSelector((state) => state.commonReducer);


  let resetToInitialValue = () => {
    setTimeTablePayload({})
    setRequestPayload({
      'description': '',
      'endTime': "",
      'medicines': [],
      'startTime': ""
    })
    setHaveResponse(false)
    setListView(true)
    setAllMedicineOption([])
    setIsSubmiting(false)
    setCurrentMode('')
  }

  useEffect(() => {
    setIsLoading(true)
    dispatch(ACTIONS.getDiseaseTimeTable())
    dispatch(CommonAction.getDataNotMappedWithDiseaseByParam('time_table'))
  }, [state.createDiseaseTimeTableSuccess, state.updateDiseaseTimeTableSuccess])


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
    if (state.getDiseaseTimeTableSuccess) {
      setIsLoading(false)
      setAllMappedData(state.getDiseaseTimeTableSuccess.data)
      addToast("Success!", {
        appearance: "success",
        content: `Get All data Success.`,
      });
    }
    if (state.getDiseaseTimeTableFailure) {
      setIsLoading(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to get data.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.getDiseaseTimeTableSuccess, state.getDiseaseTimeTableFailure])


  let handleSubmit = (e) => {
    e.preventDefault()

    if (timeTablePayload && timeTablePayload.time_table && timeTablePayload.time_table.length > 0 && timeTablePayload.disease && timeTablePayload.disease != '') {
      setIsSubmiting(true)
      dispatch(ACTIONS.createDiseaseTimeTable(timeTablePayload));
    } else {
      addToast("Warning!", {
        appearance: "warning",
        content: `Please select atleast One Disease &  prered time.`,
      });
    }

  }

  useEffect(() => {

    if (state.createDiseaseTimeTableSuccess) {
      setIsSubmiting(false)
      setHaveResponse(true);
      addToast("Success!", {
        appearance: "success",
        content: `Create mapping successfully.`,
      });
    }
    if (state.createDiseaseTimeTableFailure) {
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to map data.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.createDiseaseTimeTableSuccess, state.createDiseaseTimeTableFailure])

  let enableForm = () => {
    setCurrentMode('')
    setListView(false);
    setIsSubmiting(false)
  }

  let closeModal = () => {
    resetToInitialValue()
  }

  let changeMode = (index, mode) => {
    setCurrentMode(mode)
    dispatch(ACTIONS.getDiseaseBasedMedicine(allMappedData[index].disease_id))
    setTimeTablePayload(allMappedData[index])
    setListView(false)
  }

  let disabledForm = () => {
    setListView(true);
  }

  let handleUpdate = (e) => {
    e.preventDefault()

    if (timeTablePayload && timeTablePayload.time_table && timeTablePayload.time_table.length > 0 ){
      setIsSubmiting(true)
      dispatch(ACTIONS.updateDiseaseTimeTable(timeTablePayload));
    } else {
      addToast("Warning!", {
        appearance: "warning",
        content: `Please select atleast One Disease &  prered time.`,
      });
    }

  }

    useEffect(() => {
      if (state.updateDiseaseTimeTableSuccess) {
          setIsSubmiting(false)
          setHaveResponse(true);
          addToast("Success!", {
              appearance: "success",
              content: `Mapping updated successfully.`,
            });
      }
      if (state.updateDiseaseTimeTableFailure) {
        setIsSubmiting(false)
          addToast("Error!", {
              appearance: "error",
              content: `Unable to update mapping.`,
            });
      }

      dispatch(ACTIONS.resetToInitialState());

  }, [state.updateDiseaseTimeTableSuccess, state.updateDiseaseTimeTableFailure])

  let handleChange = (e) => {
    let requestPayloadCopy = { ...requestPayload }

    if (e.target.id == 'disease') {
      dispatch(ACTIONS.getDiseaseBasedMedicine(e.target.value))
      setTimeTablePayload({
        'disease': e.target.value,
      })
      return setRequestPayload({
        'description': '',
        'endTime': "",
        'medicines': [],
        'startTime': ""
      })
    }

    requestPayloadCopy[e.target.id] = e.target.value
    setRequestPayload(requestPayloadCopy)
  }

  let handleSequenceChange = (e) => {
    let requestPayloadCopy = { ...requestPayload }
    requestPayloadCopy['medicines'] = e
    setRequestPayload(requestPayloadCopy)
  }

  let addConfiguration = () => {
    let timeTablePayloadCopy = { ...timeTablePayload }
    let requestPayloadCopy = { ...requestPayload }

    if (timeTablePayloadCopy && timeTablePayloadCopy.time_table && timeTablePayloadCopy.time_table.length > 0) {
      timeTablePayloadCopy.time_table.push(requestPayloadCopy)
      setRequestPayload({
        'description': '',
        'endTime': "",
        'medicines': [],
        'startTime': ""
      })
      return setTimeTablePayload(timeTablePayloadCopy)
    }

    timeTablePayloadCopy['time_table'] = [requestPayloadCopy]
    setRequestPayload({
      'description': '',
      'endTime': "",
      'medicines': [],
      'startTime': ""
    })
    setTimeTablePayload(timeTablePayloadCopy)
  }

  const handleRemove = (current) => {
    let timeTablePayloadCopy = { ...timeTablePayload }
    timeTablePayloadCopy.time_table = timeTablePayloadCopy.time_table.filter((item, index) => index != current)
    setTimeTablePayload(timeTablePayloadCopy)
  }

  function array_move(arr, old_index, new_index) {
    let timeTablePayloadCopy = { ...timeTablePayload}
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    timeTablePayloadCopy.time_table = arr;
    setTimeTablePayload(timeTablePayloadCopy)
  };

  useEffect(() => {
    if (state.getDiseaseMedicineSuccess) {
      let response = state.getDiseaseMedicineSuccess.data
      let medicineOptionCopy = []

      if (response && response.length > 0) {
        response.map((item, index) => {
          if (item.In_Take_Sequence && item.how_to_take && item.how_to_take.length > 0) {
            item.how_to_take.map((way_of_taken, ind) => {
              return medicineOptionCopy.push({
                'value': `${item.In_Take_Sequence}.${ind + 1}`,
                'label': `${item.In_Take_Sequence}.${ind + 1}`,
                'medicine': item.medicine
              })
            })
          }
        })
      }

      setAllMedicineOption(medicineOptionCopy)
    }
    if (state.getDiseaseMedicineFailure) {
      addToast("Error!", {
        appearance: "error",
        content: `Unable to update mapping.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState());

  }, [state.getDiseaseMedicineSuccess, state.getDiseaseMedicineFailure])

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
                    <CommonText en="Time Table Mapped Successfully." hi="समय सारणी सफलतापूर्वक सहेजी गयी" />
                    </p>
                    <button type='button' className='btn btn-success' onClick={() => closeModal()}>
                    <CommonText en="Ok" hi="ठीक है" />
                    </button>
                  </div>
                </div>
              }
              <div className="col-lg-12 ">
                <div className={FormStyle.commonFormWrapper}>
                  <div className="row">
                    <div className="col-md-8">
                      <h1 className={FormStyle.formTitle}>
                        <span className={FormStyle.formTitlelogo}>
                          <GiMedicines />
                        </span>
                        <CommonText en="Disease Map Time Table" hi="रोग आधारित समय सारणी" />
                        
                      </h1>
                    </div>
                    {isLoading ?
                                        <div className="search-Loader">
                                            <Loader
                                                color='#2bbf4f' />
                                        </div>
                                        :<>
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
                                  <th>
                                    <CommonText en="S.N." hi="क्र.सं." /></th>
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
                                                  <div onClick={() => changeMode(index, 'view')}>
                                                    <span className="dropdown-item">
                                                    <CommonText en="View" hi="देखे" />
                                                    </span>
                                                  </div>
                                                </li>
                                                <li>
                                                  <div onClick={() => changeMode(index, 'Edit')}>
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
                                <p>
                                <CommonText en="No data found" hi="कोई डेटा नहीं मिला" />
                                </p>
                              </>}

                          </div>
                        </div>
                      </> :
                      <>
                        {(currentMode !== 'view' && currentMode !== 'Edit') ? <>
                          {diseaseNotMapped.length > 0 ?
                            <form onSubmit={(e) => handleSubmit(e)}>
                              <div className='row'>
                                <div className='col-md-6'>
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='disease'>
                                    <CommonText en="Disease" hi="रोग" />
                                    </label>
                                    <select id="disease" className='form-select' value={timeTablePayload.disease} onChange={(e) => handleChange(e)}>
                                      <option value='' hidden defaultChecked>
                                      <CommonText en="Select Disease." hi="रोग चुने" />
                                      </option>
                                      {diseaseNotMapped.map((items, index) => {
                                        return (
                                          <option key={index} value={items.id}>{items.name}</option>
                                        )
                                      })
                                      }
                                    </select>
                                  </div>
                                </div>
                                {timeTablePayload && timeTablePayload.disease && timeTablePayload.disease != '' && <>
                                  <div className="col-md-12 mt-3">
                                    <div className={FormStyle.feildWrapper}>
                                      <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                                        <GiMedicines className='me-2' />
                                        <CommonText en="Time Table" hi="समय सारणी" />
                                      </h1>
                                    </div>
                                  </div>

                                  {timeTablePayload && timeTablePayload.time_table && timeTablePayload.time_table.length > 0 && <>
                                    <div className='col-md-12 my-2'>
                                      <div className='row g-0 light-green-bg text-white'>
                                        <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                        <CommonText en="Prefered Time" hi="सुझाया समय" />
                                        </div>
                                        <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                        <CommonText en="Medicine Seq No" hi="औषधि क्र.सं." />
                                        </div>
                                        <div className='col-md-6 border d-flex justify-content-center align-items-center py-2'>
                                        <CommonText en="Description" hi="विवरण" />
                                        </div>
                                      </div>
                                      {timeTablePayload.time_table.map((item, index) => {
                                        return (<div className='row g-0' key={index}>
                                          <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                            {item.startTime} {item.endTime ? '-' : ''} {item.endTime ? item.endTime : ''}
                                          </div>
                                          <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                            {item.medicines && item.medicines.length > 0 && <>
                                              {item.medicines.map((med, indx) => {
                                                return `${med.value} ${indx == (item.medicines.length - 1) ? '' : ','} `
                                              })}</>}
                                          </div>
                                          <div className='col-md-6 border d-flex justify-content-center align-items-center py-2 position-relative'>
                                            {item.description}
                                            <>
                                            <ul className={`${FormStyle.actionList} position-absolute end-0`}>
                                                <li className="nav-item dropdown">
                                                  <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <HiDotsVertical />
                                                  </span>
                                                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li>
                                                      <div>
                                                        <span className="dropdown-item" onClick={() => handleRemove(index)}>
                                                        <CommonText en="Remove" hi="हटाये" />
                                                        </span>
                                                      </div>
                                                    </li>
                                                    {index > 0 && <li>
                                                      <div>
                                                        <span className="dropdown-item" onClick={() => array_move(timeTablePayload.time_table, index, index - 1)}>
                                                        <CommonText en="Move Up" hi="ऊपर ले जाएँ" />
                                                        </span>
                                                      </div>
                                                    </li>}
                                                    {index < (timeTablePayload.time_table.length - 1) && <li>
                                                      <div>
                                                        <span className="dropdown-item" onClick={() => array_move(timeTablePayload.time_table, index, index + 1)}>
                                                        <CommonText en="Move Down" hi="नीचे ले जाएँ" />
                                                        </span>
                                                      </div>
                                                    </li>}
                                                  </ul>
                                                </li>
                                              </ul>
                                              </>
                                          </div>
                                        </div>)
                                      })}
                                    </div>
                                  </>}
                                  <div className='col-md-12'>
                                    <div className='row'>
                                      <div className='col-md-2'>
                                        <div className={FormStyle.feildWrapper}>
                                          <label >
                                          <CommonText en="Prefered Start Time" hi="सुझाया शुरु समय" />
                                          </label>
                                          <input type='time' id='startTime' value={requestPayload.startTime} onChange={(e) => handleChange(e)} />
                                        </div>
                                      </div>
                                      <div className='col-md-2'>
                                        <div className={FormStyle.feildWrapper}>
                                          <label >
                                          <CommonText en="Prefered end Time" hi="सुझाया आखरी समय" />
                                          </label>
                                          <input type='time' id='endTime' value={requestPayload.endTime} onChange={(e) => handleChange(e)} />
                                        </div>
                                      </div>
                                      <div className='col-md-3'>
                                        <div className={FormStyle.feildWrapper}>
                                          <label >
                                          <CommonText en="Medicine Seq No" hi="औषधि क्र.सं." />
                                          </label>
                                          <Select
                                            isMulti
                                            name="medicines"
                                            id="medicines"
                                            value={requestPayload.medicines}
                                            options={allMedicineOption}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={(e) => handleSequenceChange(e)}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <div className='col-md-3'>
                                        <div className={FormStyle.feildWrapper}>
                                          <label >
                                            <CommonText en="Description" hi="विवरण" />
                                          </label>
                                          <textarea rows='2' id='description' value={requestPayload.description} onChange={(e) => handleChange(e)} />
                                        </div>
                                      </div>
                                      <div className='col-md-2 d-flex align-items-end justify-content-end py-2'>
                                        <button type='button' className='common-gradient' onClick={() => addConfiguration()}>
                                        <CommonText en="Add & Save" hi="जोड़ें और सहेजें" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>}
                                <div className="col-md-12">
                                  <button type="submit" className={FormStyle.formButton} disabled={isSubmiting}>
                                  <CommonText en="Submit" hi="सुनिश्चित करें" />
                                  </button>

                                  <button type="button" className={`${FormStyle.formButtonPrev} ms-4`} onClick={() => disabledForm()}>
                                  <CommonText en="Cancel" hi="रद्द करें" />
                                  </button>
                                </div>
                              </div>
                            </form>
                            :
                            <>
                              <p>
                              <CommonText en="All Disease are mapped please update or add more disease to add." hi="सभी रोग मैप हो चुके हैं कृपया अपडेट करें या और जोड़ने के लिए और रोग जोड़ें।"/> </p>
                              <div className='col-md-12'>
                                <button type="button" className={`${FormStyle.formButtonPrev}`} onClick={() => disabledForm()}>
                                <CommonText en="Cancel" hi="रद्द करें" />
                                </button>
                              </div>
                            </>}
                        </> :
                          <>
                            {currentMode === 'view' ? <>
                              <div className='row'>
                                <div className='col-md-6'>
                                  <div className={FormStyle.feildWrapper}>
                                    <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                                      <GiMedicines className='me-2' />
                                      <CommonText en="Disease" hi="रोग" />
                                    </h1>
                                    <p>{timeTablePayload.disease_name}</p>
                                  </div>
                                </div>
                                {timeTablePayload && timeTablePayload.time_table && timeTablePayload.time_table.length > 0 && <>
                                  <div className="col-md-12 mt-3">
                                    <div className={FormStyle.feildWrapper}>
                                      <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                                        <GiMedicines className='me-2' />
                                        <CommonText en="Time Table" hi="समय सारणी" />
                                      </h1>
                                    </div>
                                  </div>
                                  <div className='col-md-12 my-2'>
                                    <div className='row g-0 light-green-bg text-white'>
                                      <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                      <CommonText en="Prefered Time" hi="सुझाया समय" />
                                      </div>
                                      <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                      <CommonText en="Medicine Seq No" hi="औषधि क्र.सं." />
                                      </div>
                                      <div className='col-md-6 border d-flex justify-content-center align-items-center py-2'>
                                      <CommonText en="Description" hi="विवरण" />
                                      </div>
                                    </div>
                                    {timeTablePayload.time_table.map((item) => {
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
                                <div className="col-md-12">
                                  <button type="button" className={`${FormStyle.formButtonPrev} ms-4`} onClick={() => disabledForm()}>
                                  <CommonText en="Cancel" hi="रद्द करें" />
                                  </button>
                                </div>

                              </div>
                            </> : <>
                            <form onSubmit={(e) => handleUpdate(e)}>
                              <div className='row'>

                              <div className='col-md-6'>
                                  <div className={FormStyle.feildWrapper}>
                                    <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                                      <GiMedicines className='me-2' />
                                      <CommonText en="Disease" hi="रोग" />
                                    </h1>
                                    <p>{timeTablePayload.disease_name}</p>
                                  </div>
                                </div>
                                
                                  <div className="col-md-12 mt-3">
                                    <div className={FormStyle.feildWrapper}>
                                      <h1 className={`d-flex align-items-center ${FormStyle.formTitle}`}>
                                        <GiMedicines className='me-2' />
                                        <CommonText en="Time Table" hi="समय सारणी" />
                                      </h1>
                                    </div>
                                  </div>

                                  {timeTablePayload && timeTablePayload.time_table && timeTablePayload.time_table.length > 0 && <>
                                    <div className='col-md-12 my-2'>
                                      <div className='row g-0 light-green-bg text-white'>
                                        <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                        <CommonText en="Prefered Time" hi="सुझाया समय" />
                                        </div>
                                        <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                        <CommonText en="Medicine Seq No" hi="औषधि क्र.सं." />
                                        </div>
                                        <div className='col-md-6 border d-flex justify-content-center align-items-center py-2'>
                                        <CommonText en="Description" hi="विवरण" />
                                        </div>
                                      </div>
                                      {timeTablePayload.time_table.map((item, index) => {
                                        return (<div className='row g-0' key={index}>
                                          <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                            {item.startTime} {item.endTime ? '-' : ''} {item.endTime ? item.endTime : ''}
                                          </div>
                                          <div className='col-md-3 border d-flex justify-content-center align-items-center py-2'>
                                            {item.medicines && item.medicines.length > 0 && <>
                                              {item.medicines.map((med, indx) => {
                                                return `${med.value} ${indx == (item.medicines.length - 1) ? '' : ','} `
                                              })}</>}
                                          </div>
                                          <div className='col-md-6 border d-flex justify-content-center align-items-center py-2 position-relative'>
                                            {item.description}
                                            <>
                                            <ul className={`${FormStyle.actionList} position-absolute end-0`}>
                                                <li className="nav-item dropdown">
                                                  <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <HiDotsVertical />
                                                  </span>
                                                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li>
                                                      <div>
                                                        <span className="dropdown-item" onClick={() => handleRemove(index)}>Remove</span>
                                                      </div>
                                                    </li>
                                                    {index > 0 && <li>
                                                      <div>
                                                        <span className="dropdown-item" onClick={() => array_move(timeTablePayload.time_table, index, index - 1)}>Move Up</span>
                                                      </div>
                                                    </li>}
                                                    {index < (timeTablePayload.time_table.length - 1) && <li>
                                                      <div>
                                                        <span className="dropdown-item" onClick={() => array_move(timeTablePayload.time_table, index, index + 1)}>Move Down</span>
                                                      </div>
                                                    </li>}
                                                  </ul>
                                                </li>
                                              </ul>
                                              </>
                                          </div>
                                        </div>)
                                      })}
                                    </div>
                                  </>}
                                  <div className='col-md-12'>
                                    <div className='row'>
                                      <div className='col-md-2'>
                                        <div className={FormStyle.feildWrapper}>
                                          <label >
                                          <CommonText en="Prefered Start Time" hi="सुझाया शुरु समय" />
                                          </label>
                                          <input type='time' id='startTime' value={requestPayload.startTime} onChange={(e) => handleChange(e)} />
                                        </div>
                                      </div>
                                      <div className='col-md-2'>
                                        <div className={FormStyle.feildWrapper}>
                                          <label >
                                          <CommonText en="Prefered end Time" hi="सुझाया आखरी समय" />
                                          </label>
                                          <input type='time' id='endTime' value={requestPayload.endTime} onChange={(e) => handleChange(e)} />
                                        </div>
                                      </div>
                                      <div className='col-md-3'>
                                        <div className={FormStyle.feildWrapper}>
                                          <label >
                                          <CommonText en="Medicine Seq No" hi="औषधि क्र.सं." />
                                          </label>
                                          <Select
                                            isMulti
                                            name="medicines"
                                            id="medicines"
                                            value={requestPayload.medicines}
                                            options={allMedicineOption}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={(e) => handleSequenceChange(e)}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <div className='col-md-3'>
                                        <div className={FormStyle.feildWrapper}>
                                          <label >
                                          <CommonText en="Description" hi="विवरण" />
                                          </label>
                                          <textarea rows='2' id='description' value={requestPayload.description} onChange={(e) => handleChange(e)} />
                                        </div>
                                      </div>
                                      <div className='col-md-2 d-flex align-items-end justify-content-end py-2'>
                                        <button type='button' className='common-gradient' onClick={() => addConfiguration()}>
                                        <CommonText en="Add & Save" hi="जोड़ें और सहेजें" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                
                                <div className="col-md-12">
                                  <button type="submit" className={FormStyle.formButton} disabled={isSubmiting}>
                                  <CommonText en="Update" hi="अपडेट करें" />
                                  </button>

                                  <button type="button" className={`${FormStyle.formButtonPrev} ms-4`} onClick={() => disabledForm()}>
                                  <CommonText en="Cancel" hi="रद्द करें" />
                                  </button>
                                </div>

                              </div>
                            </form>
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
          </div>
        </div>
      </section>
    </>

  )
}

export default Map_Disease_with_Time_Table