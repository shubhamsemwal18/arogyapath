import FormStyle from '../../../css/form.module.css';
import customModalStyle from '../../../css/customModal.module.css'
import { GiMedicines } from 'react-icons/gi';
import { BiPlus } from 'react-icons/bi'
import { HiDotsVertical } from 'react-icons/hi';
import { AiFillMedicineBox } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import * as ACTIONS from './action'
import * as CommonAction from '../../../Common Api Calls/commonAction'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { CommonText } from '../../../Multi_Lang';


function PulseObservation() {

  let [observationPayload, setObservationPayload] = useState({
    UID: "",
    observation: "",
  })

  let dispatch = useDispatch();
  let { addToast } = useToasts();
  let [haveResponse, setHaveResponse] = useState(false);
  let [listView, setListView] = useState(true);
  let [allObservation, setAllObservation] = useState([]);
  let [isLoading, setIsLoading] = useState(true)
  let [isSubmiting, setIsSubmiting] = useState(false)
  let [currentMode, setCurrentMode] = useState('')

  let state = useSelector((state) => state.ObservationManagementReducer);
  const CommonState = useSelector((state) => state.commonReducer);

  useEffect(() => {
    setIsLoading(true)
    dispatch(CommonAction.getPulseObservation())
  }, [state.createPulseObservationSuccess, state.updatePulseObservationSuccess])


  useEffect(() => {
    if (CommonState.getPulseObservationSuccess) {
      setIsLoading(false)
      setAllObservation(CommonState.getPulseObservationSuccess.observations)
      addToast("Success!", {
        appearance: "success",
        content: `Get All observation Success.`,
      });
    }
    if (CommonState.getPulseObservationFailure) {
      setIsLoading(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to observation.`,
      });
    }

    dispatch(CommonAction.resetToInitialState())

  }, [CommonState.getPulseObservationSuccess, CommonState.getPulseObservationFailure])


  useEffect(() => {

    if (state.createPulseObservationSuccess) {

      setObservationPayload({
        UID: "",
        observation: "",
      })
      setHaveResponse(true);
      addToast("Success!", {
        appearance: "success",
        content: `Create observation successfully.`,
      });
      setIsSubmiting(false)
    }
    if (state.createPulseObservationFailure) {
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to create instruction.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState());

  }, [state.createPulseObservationSuccess, state.createPulseObservationFailure])

  let handleChange = (e) => {
    let observationPayloadCopy = { ...observationPayload };
    observationPayloadCopy[e.target.id] = e.target.value;
    setObservationPayload(observationPayloadCopy);
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmiting(true)

    if (currentMode === 'Edit') {
      dispatch(ACTIONS.updatePulseObservation(observationPayload))
    }
    else {
      if (currentMode !== 'view') {
        dispatch(ACTIONS.createPulseObservation(observationPayload));
      }
    }
  }

  let enableForm = () => {
    setObservationPayload({
      UID: "",
      observation: "",
    })
    setCurrentMode('')
    setListView(false);
    setIsSubmiting(false)
  }

  let closeModal = () => {
    setHaveResponse(false);
    setCurrentMode('')
    setListView(true);
  }

  let changeMode = (index, mode) => {
    setCurrentMode(mode)
    setObservationPayload(allObservation[index])
    setListView(false)
  }

  let disabledForm = () => {
    setListView(true);
  }

  useEffect(() => {
    if (state.updatePulseObservationSuccess) {
      setObservationPayload({
        observation: "",
      })
      addToast("Success!", {
        appearance: "success",
        content: `Observation updated successfully.`,
      });
      setListView(true)
      setCurrentMode('')
      setIsSubmiting(false)
    }
    if (state.updatePulseObservationFailure) {
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to update observation.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState());

  }, [state.updatePulseObservationSuccess, state.updatePulseObservationFailure])


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
                      <CommonText en="Observation Created Successfully." hi="अवलोकन सफलतापूर्वक बनाया गया।" />
                      </p>
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
                        <CommonText en="Pulse Observation" hi="नब्ज अवलोकन" />
                      </h1>
                    </div>
                    {isLoading ?
                      <div className="search-Loader">
                        <Loader
                          color='#2bbf4f' />
                      </div>
                      :
                      <>
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
                                {allObservation.length > 0 ?
                                  <table>
                                    <tr className={FormStyle.allListTableHeadings}>
                                      <th>
                                        <CommonText en="S.N." hi="क्र.सं." />
                                      </th>
                                      <th>
                                        <CommonText en="Observation S.N." hi="अवलोकन क्र.सं." />
                                      </th>
                                      <th><CommonText en="Observation" hi="अवलोकन" /></th>
                                      <th className={FormStyle.allListTableActionList}></th>
                                    </tr>
                                    {
                                      allObservation.map((item, index) => {
                                        return (
                                          <tr className={FormStyle.allListTableSingleRow}>
                                            <td>{index + 1}</td>
                                            <td>{item.UID}</td>
                                            <td>{item.observation}</td>
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

                            <form onSubmit={(e) => handleSubmit(e)}>
                              <div className='row'>
                                <div className='col-md-12'>
                                  <div className={FormStyle.formCommonUnderline}></div>
                                </div>

                                <div className="col-md-6">
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='UID'>
                                      <CommonText en="UID" hi="यूआईडी" />
                                    </label>
                                    <input
                                      type="text"
                                      id="UID"
                                      value={observationPayload.UID}
                                      onChange={(e) => handleChange(e)}
                                      disabled={currentMode === "view"}
                                    />
                                  </div>
                                </div>
                                <div className='col-md-12'>
                                  <div className='row'>
                                    <div className="col-md-12">
                                      <div className={FormStyle.feildWrapper}>
                                        <label htmlFor='observation'>
                                          <CommonText en="Observation" hi="अवलोकन" />
                                        </label>
                                        <textarea id="observation" value={observationPayload.observation} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                      </div>
                                    </div>
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
                                  </div>
                                </div>

                              </div>
                            </form>
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
                    <CommonText en="Pulse Observation" hi="नब्ज अवलोकन" />
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

export default PulseObservation