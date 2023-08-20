import FormStyle from '../../../css/form.module.css';
import customModalStyle from '../../../css/customModal.module.css'
import { GiMedicines } from 'react-icons/gi';
import { IoTrashBin } from 'react-icons/io5';
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


function InventoryManagement() {

  let [currentDate,setCurrentDate] = useState();
  let [haveResponse, setHaveResponse] = useState(false);
  let [isSubmiting, setIsSubmiting] = useState(false)
  let { addToast } = useToasts();
  let [allMedicines,setAllMedicines] = useState([])
  let [isLoading,setIsLoading] = useState(true);
  let [inventoryPayload,setInventoryPayload] = useState({
   date:currentDate,
   medicines:[], 
  })

  let [medicinesData,setMedicinesData] = useState({
    medicine:'',
    quantity:'',
  })

  let dispatch = useDispatch();

  const state = useSelector((state) => state.InventoryReducer);
  const CommonState = useSelector((state) => state.commonReducer);


  useEffect(() => {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day; 
    setCurrentDate[today]

    let inventoryPayloadCopy = {...inventoryPayload}
    inventoryPayloadCopy.date = today;
    setInventoryPayload(inventoryPayloadCopy)

    setIsLoading(true)
    dispatch(CommonAction.getAllMedicine())
  }, [])


  useEffect(()=>{
    if(CommonState.getAllMedicineSuccess){
        setAllMedicines(CommonState.getAllMedicineSuccess.allMedicine)
        setIsLoading(false)
    }
    if(CommonState.getAllMedicineFailure){
      setIsLoading(false)
        addToast("Error!", {
            appearance: "error",
            content: `Unable to get all medicine.`,
        });
    }

},[CommonState.getAllMedicineSuccess,CommonState.getAllMedicineFailure])


  useEffect(() => {
    if (state.addInventorySuccess) {
      setInventoryPayload({
        date:currentDate,
        medicines:[], 
       })

       setMedicinesData({
        medicine:'',
        quantity:'',
      })

      setIsSubmiting(false)
      setHaveResponse(true);
      addToast("Success!", {
        appearance: "success",
        content: `Medicine added in inventory.`,
      });
    }
    if (state.addInventoryFailure) {
      setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to create herbs.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.addInventorySuccess, state.addInventoryFailure])

  let handleChange = (e) => {

    if(e.target.id == 'date'){
      let inventoryPayloadCopy = {...inventoryPayload}
      inventoryPayloadCopy.date = e.target.value
      return setInventoryPayload(inventoryPayloadCopy)
    }

    if(e.target.id == 'date'){
      let inventoryPayloadCopy = {...inventoryPayload}
      inventoryPayloadCopy.date = e.target.value
      return setInventoryPayload(inventoryPayloadCopy)
    }

    let medicinesDataCopy = { ...medicinesData };
    medicinesDataCopy[e.target.id] = e.target.value;
    setMedicinesData(medicinesDataCopy);
  }

  let addData = () =>{
    let inventoryPayloadCopy = {...inventoryPayload}
    if(medicinesData.medicine && medicinesData.medicine != '' && medicinesData.quantity && medicinesData.quantity != ''){
      
      let medicinesDataCopy = {...medicinesData}
      medicinesDataCopy.medicine_data = allMedicines.find((item) => item.id == medicinesDataCopy.medicine)
      
      inventoryPayloadCopy.medicines = inventoryPayloadCopy.medicines.push(medicinesDataCopy)

      setMedicinesData({
        medicine:'',
        quantity:'',
      })
    }
    else{
      addToast("Warning!", {
        appearance: "warning",
        content: `Select medicine and enter quantity.`,
      });
    }
    
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    if(inventoryPayload.date && inventoryPayload.date != '' && inventoryPayload.medicines && inventoryPayload.medicines.length > 0){
      setIsSubmiting(true)
      dispatch(ACTIONS.addInventory(inventoryPayload))
    }
    else{
      addToast("Warning!", {
        appearance: "warning",
        content: `Please add medicine or select date.`,
      });
    }
  }

  let removeData = (index) =>{
    let inventoryPayloadCopy = {...inventoryPayload}
    inventoryPayloadCopy.medicines = inventoryPayloadCopy.medicines.filter((item,ind) => ind != index)
    setInventoryPayload(inventoryPayloadCopy)
  }

  return (
    <section className={FormStyle.commonFormArea}>
      <div className="container">
        <div className="row">
            {haveResponse &&
              <div className={customModalStyle.customModalLayout}>
                <div className={customModalStyle.customModalBox}>
                  <p className='text-center text-success'>
                  <CommonText en="Inventory created successfully." hi="इनवेंटरी सफलतापूर्वक सहेजी गई"/>
                  </p>
                  <button type='button' className='btn btn-success' onClick={() =>{setHaveResponse(false)}}>
                    <CommonText en="Ok" hi="ठीक है"/>
                  </button>
                </div>
              </div>
            }
            <div className="col-lg-8 ">
              <div className={FormStyle.commonFormWrapper}>
                <div className="row">
                <div className='col-lg-12'>
                        <h1 className={FormStyle.formTitle}>
                          <span className={FormStyle.formTitlelogo}>
                            <GiMedicines />
                          </span>
                          <CommonText en="Inventory Management" hi="इनवेंटरी प्रबंधन"/>
                        </h1>
                        </div>
                    {isLoading ?
                      <div className="search-Loader">
                        <Loader
                          color='#2bbf4f' />
                      </div> : 
                      <>
                            <form onSubmit={(e) => handleSubmit(e)}>
                              <div className='row'>
                                <div className='col-md-12'>
                                  <div className={FormStyle.formCommonUnderline}></div>
                                </div>
                                <div className="col-md-4">
                                  <div className={FormStyle.feildWrapper}>
                                    <label htmlFor='date'>
                                    <CommonText en="Date" hi="दिनांक"/>
                                    </label>
                                    <input type="date" id="date" value={inventoryPayload.date} onChange={(e) => handleChange(e)} required  />
                                  </div>
                                </div>
                                <div className='col-md-12'>
                                  {inventoryPayload && inventoryPayload.medicines && inventoryPayload.medicines.length > 0 && 
                                  <div className='row'>
                                    <div className='col-md-12'>
                                    <div className={FormStyle.allListTable}>
                                                                    <table>
                                                                        <tr className={FormStyle.allListTableHeadings}>
                                                                            <th>
                                                                                <CommonText en="S.N." hi="क्र.सं." />
                                                                            </th>
                                                                            <th>
                                                                                <CommonText en="Medicine" hi="औषधि" />
                                                                            </th>
                                                                            <th>
                                                                                <CommonText en="Quantity" hi="मात्रा" />
                                                                            </th>
                                                                                <th className={FormStyle.allListTableActionList}></th>
                                                                            
                                                                        </tr>
                                                                        {inventoryPayload.medicines.map((item, index) => {
                                                                            return (
                                                                                <tr className={FormStyle.allListTableSingleRow} key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>
                                                                                    <CommonText en={item.medicine_data.name} hi={item.medicine_data.hi_name} />
                                                                                    </td>
                                                                                    <td>{item.quantity}</td>
                                                                                        <td>
                                                                                            <button type="button" className={FormStyle.commonDelete}
                                                                                                onClick={() => removeData(index)}>
                                                                                                <IoTrashBin />
                                                                                            </button>
                                                                                        </td>
                                                                                    
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </table>
                                                                </div>
                                    </div>
                                    </div>}
                                  <div className='row'>
                                  <div className='col-md-4'>
                                    <div className={FormStyle.feildWrapper}>
                                      <label htmlFor='medicine'>
                                      <CommonText en="Medicine" hi="औषधि"/>
                                      </label>
                                      <select id="medicine" value={medicinesData.medicine} onChange={(e)=>handleChange(e)}>
                                        <option value='' defaultChecked hidden> 
                                        <CommonText en="Select medicine" hi="औषधि चुने"/>
                                        </option>
                                        {(allMedicines && allMedicines.length > 0 ) ? <>
                                        {allMedicines.map((item,index)=>{
                                          return(<option value={item.id} key={index}>
                                            <CommonText en={item.name} hi={item.hi_name}/>
                                          </option>)
                                        })}
                                        </>
                                        :
                                        <option disabled>
                                          <CommonText en="No medicine found" hi="कोई औषधि नही मिली"/>
                                          </option>}
                                      </select>
                                  </div>
                                  </div>
                                  <div className='col-md-4'>
                                    <div className={FormStyle.feildWrapper}>
                                      <label htmlFor='quantity'>
                                      <CommonText en="Quantity" hi="मात्रा"/>
                                      </label>
                                      <input type='text' id="quantity" value={medicinesData.quantity} onChange={(e) => handleChange(e)} />
                                    </div>
                                  </div>
                                  <div className='col-md-4 d-flex align-items-end'>
                                                                    <div className={FormStyle.feildWrapper}>
                                                                        <button type='button' className='common-gradient' onClick={() => addData()}><BiPlus />
                                                                            <CommonText en="Add & Save" hi="जोड़ें और सहेजें" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                </div>
                                
                                <div className="col-md-12">
                                    <button type="submit" className={FormStyle.formButton} disabled={isSubmiting}>
                                       <CommonText en="Submit" hi="सुनिश्चित करें"/>
                                    </button>
                                </div>
                              </div>
                              </div>
                            </form>
                            
                            </>}
                </div>
              </div>
            </div>

          <div className="col-lg-4">
            <div className={FormStyle.sideInfoBox}>
              <div className={FormStyle.upper}>
                <h2 className={FormStyle.sideTitle}>
                  <AiFillMedicineBox />
                  <CommonText en="Inventory Management" hi="इनवेंटरी प्रबंधन"/>
                </h2>
              </div>
              <div className={FormStyle.lower}>
                <p className="common-para">
                <CommonText en="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.

Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean." hi="आरोग्य पथ समाज को स्वस्थ बनाने की ओर एक प्रयास है। यह पारंपरिक वैध श्री कामदेव प्रसाद पैन्यूली जी व उनके सुपुत्र श्री हरीश पैन्यूली जी, जडी बूटी फार्म​, ग्राम कोह्लू पानी, नन्दा की चौकी, देहरादून मे रोग नीवारसा का कार्य कर रहे है। यहाँ जीव विज्ञान नाडी परि​​​क्षण, चेहरे के भाव, आधुनिक मैडिकल लैब परि​​​क्षण व अन्न्य विधियो के प्रयोगों से रोगी के शरीर में रोग कारण पता कर के उनका उपचार किया जाता है। यहां सभी औषधियां वैध जी की देख रेख में ही बनाई जाती है। यहाँ एक प्रयास किया जाता है कि सिर्फ रोग को ही ठीक नहीं किया जाये परन्तु शरीर को स्वस्थ रखने व रोग प्रतिरोध क्षमता भी बडाई जाये। यह अपने आप में एक अनूठा प्रयास है और यहां सारा कार्य सेवा भाव से किया जाता है।

बहुत दूर, पहाड़ों शब्द के पीछे, वोकालिया और कॉन्सोनेंटिया देशों से दूर, अंधे ग्रंथ रहते हैं। अलग होकर वे सिमेंटिक्स के तट पर बुकमार्क्सग्रोव में रहते हैं, एक बड़ा भाषा महासागर।"/>
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section>
  )
  
}

export default InventoryManagement