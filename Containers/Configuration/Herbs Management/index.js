import FormStyle from '../../../css/form.module.css';
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


function HerbsManagement() {

  let [haveResponse, setHaveResponse] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [isSubmiting, setIsSubmiting] = useState(false)
  let { addToast } = useToasts();
  let [listView, setListView] = useState(true);
  let [currentMode, setCurrentMode] = useState('');

  let [allHerbsList, setAllHerbsList] = useState([]);

  let [herbsPayload, setHerbsPayload] = useState({
    UID:'',
    name: '',
    hi_name: '',
    part_used: '',
    description: '',
    hi_part_used: '',
    hi_description: '',
  })

  let [herbsNameFromResponse, setHerbsNameFromResponse] = useState('');

  let dispatch = useDispatch();

  const state = useSelector((state) => state.HerbsManagementReducer);
  const CommonState = useSelector((state) => state.commonReducer);


  useEffect(() => {
    setIsLoading(true)
    dispatch(CommonAction.getAllHerbs())
  }, [state.createHerbsSuccess])

  useEffect(() => {
    if (CommonState.getAllHerbsSuccess) {
      setIsLoading(false)
      setAllHerbsList(CommonState.getAllHerbsSuccess.allHerbs)
      addToast("Success!", {
        appearance: "success",
        content: `Get All Herbs Success.`,
      });
    }
    if (CommonState.getAllHerbsFailure) {
      setIsLoading(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to get all herbs.`,
      });
    }

    dispatch(CommonAction.resetToInitialState())

  }, [CommonState.getAllHerbsSuccess, CommonState.getAllHerbsFailure])


  useEffect(() => {
    if (state.createHerbsSuccess) {
      setHerbsPayload({
        UID:'',
        herbsName: '',
        hi_herbsName: '',
        part_used: '',
        description: '',
        hi_part_used: '',
        hi_description: '',
      })
      setIsSubmiting(false)
      setHerbsNameFromResponse(state.createHerbsSuccess.name)
      setHaveResponse(true);
      setIsLoading(true)
      dispatch(CommonAction.getAllHerbs())
      addToast("Success!", {
        appearance: "success",
        content: `Herb created Successfully.`,
      });
    }
    if (state.createHerbsFailure) {
      setIsSubmiting(false)
      setIsLoading(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to create herbs.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.createHerbsSuccess, state.createHerbsFailure])

  let handleChange = (e) => {
    let herbsPayloadCopy = { ...herbsPayload };
    herbsPayloadCopy[e.target.id] = e.target.value;
    setHerbsPayload(herbsPayloadCopy);
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmiting(true)

    if (currentMode === 'Edit') {
      dispatch(ACTIONS.updateHerbs(herbsPayload))
    }
    else {
      if (currentMode !== 'view') {
        dispatch(ACTIONS.createHerbs(herbsPayload))
      }
    }

  }

  let enableForm = () => {

    setHerbsPayload({
      UID:'',
      name: '',
      hi_name: '',
      part_used: '',
      description: '',
      hi_part_used: '',
      hi_description: '',
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
    setHerbsPayload(allHerbsList[index])
    setListView(false)
  }


  useEffect(() => {
    if (state.updateHerbsSuccess) {
      setHerbsPayload({
        UID:'',
        herbsName: '',
        hi_herbsName: '',
        part_used: '',
        description: '',
        hi_part_used: '',
        hi_description: '',
      })
      setIsLoading(true)
      setCurrentMode('')
      setListView(true)
      setIsSubmiting(false)
      dispatch(CommonAction.getAllHerbs())
      addToast("Success!", {
        appearance: "success",
        content: `Herb updated Successfully.`,
      });
    }
    if (state.updateHerbsFailure) {
      setIsSubmiting(false)
      setIsLoading(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to update herb.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.updateHerbsSuccess, state.updateHerbsFailure])

  return (
    <section className={FormStyle.commonFormArea}>
      <div className="container">
        <div className="row">
          <>
            {haveResponse &&
              <div className={customModalStyle.customModalLayout}>
                <div className={customModalStyle.customModalBox}>
                  <p className='text-center text-success'>
                  <CommonText en="Herb Created Successfully." hi="जड़ीबूटी सफलतापूर्वक बनाई गई"/>
                  </p>
                  <button type='button' className='btn btn-success' onClick={() => closeModal()}>
                    <CommonText en="Ok" hi="ठीक है"/>
                  </button>
                </div>
              </div>
            }
            <div className="col-lg-8 ">
              <div className={FormStyle.commonFormWrapper}>
                <div className="row">
                    {isLoading ?
                      <div className="search-Loader">
                        <Loader
                          color='#2bbf4f' />
                      </div> : <>
                      <div className='col-lg-8'>
                        <h1 className={FormStyle.formTitle}>
                          <span className={FormStyle.formTitlelogo}>
                            <GiMedicines />
                          </span>
                          <CommonText en="Herbs Management" hi="जड़ीबूटी प्रबंधन"/>
                        </h1>
                        </div>
                        {listView ? <>
                          <div className='col-lg-4 text-end'>
                            <button type='button' className='common-gradient' onClick={() => enableForm()}><BiPlus />
                            <CommonText en="Add New" hi="नया जोड़े"/>
                            </button>
                          </div>
                          <div className='col-md-12'>
                            <div className={FormStyle.formCommonUnderline}></div>
                          </div>
                          <div className="col-md-12">
                            <div className={FormStyle.allListTable}>
                              {allHerbsList.length > 0 ? <table>
                                <tr className={FormStyle.allListTableHeadings}>
                                  <th>
                                    <CommonText en="S.N." hi="क्र.सं."/>
                                  </th>
                                  <th>
                                  <CommonText en="Herb S.N." hi="जड़ीबूटी क्र.सं."/>
                                  </th>
                                  <th>
                                  <CommonText en="Name" hi="नाम"/>
                                  </th>
                                  <th>
                                  <CommonText en="Hindi Name" hi="हिंदी नाम"/>
                                  </th>
                                  <th className={FormStyle.allListTableActionList}></th>
                                </tr>
                                {
                                  allHerbsList.map((item, index) => {
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
                                                    <CommonText en="View" hi="देखे"/>
                                                    </span>
                                                  </div>
                                                </li>
                                                <li>
                                                  <div>
                                                    <span className="dropdown-item" onClick={() => changeMode(index, 'Edit')}>
                                                    <CommonText en="Edit" hi="संशोधित करे"/>
                                                    </span>
                                                  </div>
                                                </li>
                                                <li>
                                                  <div>
                                                    <span className="dropdown-item">
                                                    <CommonText en="Delete" hi="हटाये"/>
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
                                  <CommonText en="No data found" hi="कोई डेटा नहीं मिला"/>
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
                                    <CommonText en="Herb Name (English)" hi="जड़ीबूटी नाम (अंग्रेजी)"/>
                                    </label>
                                    <input type="text" id="name" value={herbsPayload.name} onChange={(e) => handleChange(e)} required disabled={currentMode === 'view'} />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='herbsName'>
                                    <CommonText en="Herb Name (Hindi)" hi="जड़ीबूटी नाम (हिंदी)"/>
                                    </label>
                                    <input type="text" id="hi_name" value={herbsPayload.hi_name} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='UID'>
                                    <CommonText en="UID" hi="यूआईडी"/>
                                    </label>
                                    <input type="text" id="UID" value={herbsPayload.UID} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='part_used'>
                                    <CommonText en=" Part used (English)" hi="प्रयुक्त भाग (अंग्रेज़ी)"/>
                                    </label>
                                    <input type="text" id="part_used" value={herbsPayload.part_used} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='part_used'>
                                    <CommonText en=" Part used (Hindi)" hi="प्रयुक्त भाग (हिंदी)"/>
                                    </label>
                                    <input type="text" id="hi_part_used" value={herbsPayload.hi_part_used} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'} />
                                  </div>
                                </div>
                                <div className='col-md-6'>
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='description'>
                                    <CommonText en="Description (English)" hi="विवरण (अंग्रेजी)"/>
                                    </label>
                                    <textarea id="description" value={herbsPayload.description} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'}></textarea></div>
                                </div>
                                <div className='col-md-6'>
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='description'>
                                    <CommonText en="Description (Hindi)" hi="विवरण (हिंदी)"/>
                                    </label>
                                    <textarea id="hi_description" value={herbsPayload.hi_description} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'}></textarea></div>
                                </div>
                                <div className="col-md-12">
                                  {currentMode !== 'view' &&
                                    <button type="submit" className={FormStyle.formButton} disabled={isSubmiting}>
                                      {currentMode === 'Edit' ? <CommonText en="Update" hi="अपडेट करें"/> : <CommonText en="Submit" hi="सुनिश्चित करें"/>}
                                    </button>
                                  }
                                  <button type="button" className={`${FormStyle.formButtonPrev} ms-4`} onClick={() => disabledForm()}>
                                    <CommonText en="Cancel" hi="रद्द करें"/>
                                  </button>
                                </div>
                              </div>
                            </form>
                          </>
                        }</>}
                </div>
              </div>
            </div>

          </>

          <div className="col-lg-4">
            <div className={FormStyle.sideInfoBox}>
              <div className={FormStyle.upper}>
                <h2 className={FormStyle.sideTitle}>
                  <AiFillMedicineBox />
                  <CommonText en="Herbs" hi="जड़ीबूटी"/>
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

export default HerbsManagement