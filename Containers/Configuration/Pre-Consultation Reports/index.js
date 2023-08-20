import FormStyle from '../../../css/form.module.css';
import Link from 'next/link';
import customModalStyle from '../../../css/customModal.module.css'
import { GiMedicines } from 'react-icons/gi';
import { HiDotsVertical } from 'react-icons/hi';
import { BiPlus } from 'react-icons/bi'
import { AiFillMedicineBox } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import * as ACTIONS from './action'
import * as CommonAction from '../../../Common Api Calls/commonAction'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { CommonText } from '../../../Multi_Lang';


function Pre_ConsultationReport() {

  let [haveResponse, setHaveResponse] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [isSubmiting, setIsSubmiting] = useState(false)
  let { addToast } = useToasts();
  let [listView, setListView] = useState(true);
  let [currentMode, setCurrentMode] = useState('');

  let [allReportList, setAllReportList] = useState([]);

  let [reportPayload, setReportPayload] = useState({
    UID: "",
    name: '',
    hi_name: '',
    range: '',
    hi_range: '',
    unit: '',
    hi_unit: '',
  })


  let dispatch = useDispatch();

  const state = useSelector((state) => state.Pre_ConsultationReportReducer);
  const CommonState = useSelector((state) => state.commonReducer);


  useEffect(() => {
    setIsLoading(true)
    dispatch(CommonAction.getAllPreConsultationReport())
  }, [state.addReportSuccess, state.updateReportSuccess])

  useEffect(() => {
    if (CommonState.getPreConsultationResportSuccess) {
      setIsLoading(false)
      setAllReportList(CommonState.getPreConsultationResportSuccess.data)
      addToast("Success!", {
        appearance: "success",
        content: `Get All Reports Success.`,
      });
    }
    if (CommonState.getPreConsultationResportFailure) {
      setIsLoading(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to get all Reports.`,
      });
    }

    dispatch(CommonAction.resetToInitialState())

  }, [CommonState.getPreConsultationResportSuccess, CommonState.getPreConsultationResportFailure])


  useEffect(() => {
    if (state.addReportSuccess) {
      setReportPayload({
        UID: "",
        name: '',
        hi_name: '',
        range: '',
        hi_range: '',
        unit: '',
        hi_unit: '',
      })
      setIsSubmiting(false)
      setHaveResponse(true);
      setIsLoading(true)

      addToast("Success!", {
        appearance: "success",
        content: `add report Successfully.`,
      });
    }

    if (state.addReportFailure) {
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to addd report.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.addReportSuccess, state.addReportFailure])

  let handleChange = (e) => {
    let reportPayloadCopy = { ...reportPayload };
    reportPayloadCopy[e.target.id] = e.target.value;
    setReportPayload(reportPayloadCopy);
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmiting(true)

    if (currentMode === 'Edit') {
      dispatch(ACTIONS.updateReport(reportPayload))
    }
    else {
      if (currentMode !== 'view') {
        dispatch(ACTIONS.addReport(reportPayload))
      }
    }

  }

  let enableForm = () => {

    setReportPayload({
      UID: "",
      name: '',
      hi_name: '',
      range: '',
      hi_range: '',
      unit: '',
      hi_unit: '',
    })
    setCurrentMode('')
    setListView(false);
    setIsSubmiting(false)
  }

  let disabledForm = () => {
    setListView(true);
  }

  let closeModal = () => {
    setHaveResponse(false);
    setListView(true)
    setCurrentMode('')
  }

  let changeMode = (index, mode) => {
    setCurrentMode(mode)
    setReportPayload(allReportList[index])
    setListView(false)
  }


  useEffect(() => {
    if (state.updateReportSuccess) {
      setReportPayload({
        UID: "",
        name: '',
        hi_name: '',
        range: '',
        hi_range: '',
        unit: '',
        hi_unit: '',
      })
      setIsLoading(true)
      setCurrentMode('')
      setListView(true)
      setIsSubmiting(false)

      addToast("Success!", {
        appearance: "success",
        content: `report updated Successfully.`,
      });
    }
    if (state.updateReportFailure) {
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to update report.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.updateReportSuccess, state.updateReportFailure])

  return (
    <section className={FormStyle.commonFormArea}>
      <div className="container">
        <div className="row">
          <>
            {haveResponse &&
              <div className={customModalStyle.customModalLayout}>
                <div className={customModalStyle.customModalBox}>
                  <p className='text-center text-success'>
                    <CommonText en="report Created Successfully." hi="रिपोर्ट सफलतापूर्वक बनाई गई।" />
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
                      <CommonText en="Consultation Reports" hi="परामर्श रिपोर्ट" />
                    </h1>
                  </div>
                  {isLoading ?
                    <div className="search-Loader">
                      <Loader
                        color='#2bbf4f' />
                    </div>
                    :
                    <>
                      {listView ? <>

                        <div className='col-lg-4 text-end'>
                          <button type='button' className='common-gradient' onClick={() => enableForm()}><BiPlus />
                            <CommonText en="Add New" hi="नया जोड़े" />
                          </button>
                        </div>
                        <div className='col-md-12'>
                          <div className={FormStyle.formCommonUnderline}></div>
                        </div>
                        <div className="col-md-12">
                          <div className={FormStyle.allListTable}>
                            {allReportList.length > 0 ? <table>
                              <tr className={FormStyle.allListTableHeadings}>
                                <th>
                                  <CommonText en="S.N." hi="क्र.सं." />
                                </th>
                                <th>
                                  <CommonText en="Report S.N." hi="रिपोर्ट क्र.सं." />
                                </th>
                                <th><CommonText en="Name" hi="नाम" /></th>
                                <th><CommonText en="Hindi Name" hi="हिंदी नाम" /></th>

                                <th className={FormStyle.allListTableActionList}></th>
                              </tr>
                              {
                                allReportList.map((item, index) => {
                                  return (
                                    <tr className={FormStyle.allListTableSingleRow}>
                                      <td>{index + 1}</td>
                                      <td>{item.UID}</td>
                                      <td>{item.name}</td>
                                      <td>{item.hi_name}</td>
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
                      </>
                        : <>
                          <form onSubmit={(e) => handleSubmit(e)}>
                            <div className='row'>
                              <div className='col-md-12'>
                                <div className={FormStyle.formCommonUnderline}></div>
                              </div>
                              <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='herbsName'>
                                    <CommonText en="Report Name (English)" hi="रिपोर्ट का नाम (अंग्रेज़ी)" />
                                  </label>
                                  <input type="text" id="name" value={reportPayload.name} onChange={(e) => handleChange(e)} required disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='herbsName'>
                                    <CommonText en="Report Name (Hindi)" hi="रिपोर्ट का नाम (हिंदी)" />

                                  </label>
                                  <input type="text" id="hi_name" value={reportPayload.hi_name} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='UID'>
                                    <CommonText en="UID" hi="यूआईडी" />
                                  </label>
                                  <input
                                    type="text"
                                    id="UID"
                                    value={reportPayload.UID}
                                    onChange={(e) => handleChange(e)}
                                    disabled={currentMode === "view"}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='range'>
                                    <CommonText en="Range (English)" hi="रेंज (अंग्रेजी)" />

                                  </label>
                                  <input type="text" id="range" value={reportPayload.range} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='part_used'>
                                    <CommonText en="Range (Hindi)" hi="रेंज (हिंदी)" />
                                  </label>
                                  <input type="text" id="hi_range" value={reportPayload.hi_range} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='unit'>
                                    <CommonText en="Unit (English)" hi="यूनिट (अंग्रेजी)" />

                                  </label>
                                  <input type="text" id="unit" value={reportPayload.unit} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='hi_unit'>
                                    <CommonText en="Unit (Hindi)" hi="यूनिट (हिंदी)" />
                                  </label>
                                  <input type="text" id="hi_unit" value={reportPayload.hi_unit} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
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
                          </form>
                        </>
                      }
                    </>
                  }
                </div>
              </div>
            </div>

          </>

          <div className="col-lg-4">
            <div className={FormStyle.sideInfoBox}>
              <div className={FormStyle.upper}>
                <h2 className={FormStyle.sideTitle}>
                  <AiFillMedicineBox />
                  <CommonText en="Consultation Reports" hi="परामर्श रिपोर्ट" />
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

export default Pre_ConsultationReport