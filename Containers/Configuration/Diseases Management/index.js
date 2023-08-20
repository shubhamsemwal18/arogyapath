import FormStyle from '../../../css/form.module.css';
import Link from 'next/link';
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
import { CommonText } from '../../../Multi_Lang';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

function DiseasesManagement() {

  let [diseasesPayload, setDiseasesPayload] = useState({
    UID: "",
    name: "",
    hi_name: "",
    billing_amount: "",
    symptoms: "",
    description: "",
    hi_symptoms: "",
    hi_description: "",
  })

  let dispatch = useDispatch();
  let { addToast } = useToasts();
  let [haveResponse, setHaveResponse] = useState(false);
  let [listView, setListView] = useState(true);
  let [allDiseasesList, setAllDiseasesList] = useState([]);
  let [isLoading, setIsLoading] = useState(true)
  let [isSubmiting, setIsSubmiting] = useState(false)
  let [currentMode, setCurrentMode] = useState('')

  let state = useSelector((state) => state.DiseasesManagementReducer);
  const CommonState = useSelector((state) => state.commonReducer);

  useEffect(() => {
    setIsLoading(true)
    dispatch(CommonAction.getAllDiseases())
  }, [state.createDiseasesSuccess, state.updateDiseasesSuccess])


  useEffect(() => {
    if (CommonState.GetAllDiseasesSuccess) {
      setAllDiseasesList(CommonState.GetAllDiseasesSuccess.allDiseases)
      setIsLoading(false)
      addToast("Success!", {
        appearance: "success",
        content: `Get All Diseases Success.`,
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

    if (state.createDiseasesSuccess) {
      setDiseasesPayload({
        UID: "",
        name: "",
        symptoms: "",
        billing_amount: "",
        description: "",
        hi_name: "",
        hi_symptoms: "",
        hi_description: ""
      })
      setIsSubmiting(false)
      setHaveResponse(true);
      addToast("Success!", {
        appearance: "success",
        content: `Create diseases successfully.`,
      });
      setIsLoading(true)
    }
    if (state.createDiseasesFailure) {
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to create diseases.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState());

  }, [state.createDiseasesSuccess, state.createDiseasesFailure])

  let handleChange = (e) => {
    let diseasesPayloadCopy = { ...diseasesPayload };
    diseasesPayloadCopy[e.target.id] = e.target.value;
    setDiseasesPayload(diseasesPayloadCopy);
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmiting(true)

    if (currentMode === 'Edit') {
      dispatch(ACTIONS.updateDiseases(diseasesPayload))
    }
    else {
      if (currentMode !== 'view') {
        dispatch(ACTIONS.createDiseases(diseasesPayload));
      }
    }
  }

  let enableForm = () => {
    setDiseasesPayload({
      UID: "",
      name: "",
      symptoms: "",
      billing_amount: "",
      description: "",
      hi_name: "",
      hi_symptoms: "",
      hi_description: ""
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
    setDiseasesPayload(allDiseasesList[index])
    setListView(false)
  }

  let disabledForm = () => {
    setListView(true);
  }

  useEffect(() => {
    if (state.updateDiseasesSuccess) {
      setDiseasesPayload({
        UID: "",
        name: "",
        symptoms: "",
        billing_amount: "",
        description: "",
        hi_name: "",
        hi_symptoms: "",
        hi_description: ""
      })
      setCurrentMode('')
      setIsSubmiting(false)
      setListView(true)
      addToast("Success!", {
        appearance: "success",
        content: `Diseases updated successfully.`,
      });



    }
    if (state.updateDiseasesFailure) {
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to update diseases.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState());

  }, [state.updateDiseasesSuccess, state.updateDiseasesFailure])


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
                      <CommonText en="Disease Created Successfully." hi="रोग सफलतापूर्वक सहेजा गया" />
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
                        <CommonText en="Diseases Management" hi="रोग प्रबंधन" />
                      </h1>
                    </div>
                    {isLoading ? <div className="search-Loader">
                      <Loader
                        color='#2bbf4f' />
                    </div> : <>
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
                              {allDiseasesList.length > 0 ?
                                <table>
                                  <tr className={FormStyle.allListTableHeadings}>
                                    <th>
                                      <CommonText en="S.N." hi="क्र.सं." />
                                    </th>
                                    <th>
                                      <CommonText en="Disease S.N." hi="रोग क्र.सं." />
                                    </th>
                                    <th>
                                      <CommonText en="Name" hi="नाम" />
                                    </th>
                                    <th>
                                      <CommonText en="Hindi Name" hi="हिंदी नाम" />
                                    </th>
                                    <th className={FormStyle.allListTableActionList}></th>
                                  </tr>
                                  {
                                    allDiseasesList.map((item, index) => {
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
                                                    <Link href="/Configuration/CreateMedicine">
                                                      <span className="dropdown-item">
                                                        <CommonText en="Delete" hi="हटाये" />
                                                      </span>
                                                    </Link>
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
                              <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='name'>
                                    <CommonText en="Diseses Name (English)" hi="रोग नाम (अंग्रेजी)" />
                                  </label>
                                  <input type="text" id="name" value={diseasesPayload.name} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='hi_name'>
                                    <CommonText en="Diseses Name (Hindi)" hi="रोग नाम (हिंदी)" />
                                  </label>
                                  <input type="text" id="hi_name" value={diseasesPayload.hi_name} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='UID'>
                                    <CommonText en="UID" hi="यूआईडी" />
                                  </label>
                                  <input type="text" id="UID" value={diseasesPayload.UID} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='symptoms'>
                                    <CommonText en="Symptoms (English)" hi="लक्षण (अंग्रेजी)" />
                                  </label>
                                  <input type="text"
                                    id="symptoms" value={diseasesPayload.symptoms} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='hi_symptoms'>
                                    <CommonText en="Symptoms (Hindi)" hi="लक्षण (हिंदी)" />
                                  </label>
                                  <input type="text"
                                    id="hi_symptoms" value={diseasesPayload.hi_symptoms} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='billing_amount'>
                                    <CommonText en="Billing Amount" hi="बिलिंग राशि" />
                                  </label>
                                  <input type="text"
                                    id="billing_amount" value={diseasesPayload.billing_amount} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='description'>
                                    <CommonText en="Description (English)" hi="विवरण (अंग्रेजी)" />
                                  </label>
                                  <textarea id="description" value={diseasesPayload.description} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'}></textarea></div>
                              </div>
                              <div className='col-md-6'>
                                <div className={FormStyle.feildWrapper}>
                                  <label htmlFor='hi_description'>
                                    <CommonText en="Description (Hindi)" hi="विवरण (हिंदी)" />
                                  </label>
                                  <textarea id="hi_description" value={diseasesPayload.hi_description} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'}></textarea></div>
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
                    <CommonText en="Diseases Management" hi="रोग प्रबंधन" />
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

export default DiseasesManagement