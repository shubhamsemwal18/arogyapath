import DashboardStyle from '../../css/dashboard.module.css'
import FormStyle from '../../css/form.module.css';
import { HiDotsVertical } from "react-icons/hi"
import Link from 'next/link';
import Image from 'next/image';
import { FiUserPlus } from 'react-icons/fi'
import { FaUserInjured, FaMedkit } from 'react-icons/fa'
import { GrYoga } from 'react-icons/gr'
import { GiMedicines, GiFruitBowl, GiHeartOrgan, GiLiver, GiLungs, GiStomach } from 'react-icons/gi'
import { RiFileListLine } from 'react-icons/ri'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDeliveredProcedure } from 'react-icons/ai'
import { GoFile } from 'react-icons/go'
import { BsFileEarmarkBarGraph } from 'react-icons/bs'
import { TiLocationArrowOutline } from 'react-icons/ti'
import * as commonAction from '../../Common Api Calls/commonAction'
import reactStars from 'react-rating-stars-component';
import { CommonText } from '../../Multi_Lang';


import Router from 'next/router'
import * as ACTIONS from './action'
import ReactStars from 'react-rating-stars-component';

const ratingChanged = {
   size: 25,
   count: 5,
   isHalf: true,
   value: 4,
   color: "#525252",
   activeColor: "#E89005"

}

export default function Dashboard() {
   let [allRecentPatients, setAllRecentPatients] = useState([])
   let [ifNoData, setIfNoData] = useState(true);
   let [allCounterList, setAllCounterList] = useState({});

   const state = useSelector((state) => state.DashboardAccessReducer);
   let commonState = useSelector((state) => state.commonReducer)


   const dispatch = useDispatch();
   

   useEffect(() => {
      dispatch(ACTIONS.getAllDashboardCounter())
   }, [])

   useEffect(() => {
      if (state.getAllCountersSuccess) {
         setAllCounterList(state.getAllCountersSuccess)
         setIfNoData(false)
      }
      if (state.getAllDiseasesFailure) {
         setIfNoData(true)
      }

      dispatch(ACTIONS.resetToInitialState())

   }, [state.getAllCountersSuccess, state.getAllCountersFailure])

   useEffect(() => {
      dispatch(commonAction.getRecentPatients(5))
   }, [])

   
   useEffect(() => {
      if (commonState.getRecentPatientsSuccess) {
         setAllRecentPatients(commonState.getRecentPatientsSuccess.recentPatient)
      }
      if (commonState.getRecentPatientsFailure) {
         console.log(commonState.getRecentPatientsFailure, 'sare Recent patient nahi aaye')
      }

      dispatch(commonAction.resetToInitialState())

   }, [commonState.getRecentPatientsSuccess, commonState.getRecentPatientsFailure])



   useEffect(() => {
      let i = 0;
      const slider = document.getElementsByClassName(DashboardStyle.rangeInputRed);
      for (i; i < slider.length; i++) {
         const min = slider[i].min
         const max = slider[i].max
         const value = slider[i].value

         slider[i].style.background = `linear-gradient(to right, #2BBF50 0%, #2BBF50 ${(value - min) / (max - min) * 100}%, #FFF ${(value - min) / (max - min) * 100}%, #FFF 100%)`;

      }

   }, []);

   const inputRangeHandler = () => {

      this.style.background = `linear-gradient(to right, #2BBF50 0%, #2BBF50 ${(this.value - this.min) / (this.max - this.min) * 100}%, #FFF ${(this.value - this.min) / (this.max - this.min) * 100}%, #FFF 100%)`;

   }







   return (
      <>
         <section className={DashboardStyle.dashboardArea}>
            <div className={`container ${DashboardStyle.customHorizontalPadding}`}>
               <div className="row">
                  <div className="col-md-12">

                     <ul className={DashboardStyle.dashboardCounter}>
                        <li>
                           <div className={DashboardStyle.listWrapper}>
                              <div className="row no-gutters">
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.left}>
                                       <a><CommonText en="Tokens." hi="टोकन"/></a>
                                       <p className={DashboardStyle.number}>{allCounterList.tokens}</p>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.right}>
                                       <span className={` fs-2 text-white ${DashboardStyle.iconCircle}`}>
                                          <FiUserPlus />
                                          {/* <Image src="/images/img/client.png" alt="" className="img-fluid" layout='fixed' width={50} height={50}/> */}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li>
                           <div className={DashboardStyle.listWrapper}>
                              <div className="row no-gutters">
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.left}>
                                       <a><CommonText en="Patient." hi="मरीज़"/></a>
                                       <p className=
                                          {DashboardStyle.number}>{allCounterList.patients > 1000 ? <>{parseInt(allCounterList.patients / 1000)}K</>
                                             : <>{allCounterList.patients}</>}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.right}>
                                       <span className={` fs-2 text-white ${DashboardStyle.iconCircle}`}>
                                          <FaUserInjured />
                                          {/* <Image src="/images/img/products.png" alt="" className="img-fluid" layout='fixed' width={50} height={50}/> */}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li>
                           <div className={DashboardStyle.listWrapper}>
                              <div className="row no-gutters">
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.left}>
                                       <a><CommonText en="Exercises." hi="व्यायाम"/></a>
                                       <p className=
                                          {DashboardStyle.number}>{allCounterList.exercises > 1000 ? <>{parseInt(allCounterList.exercises / 1000)}K</>
                                             : <>{allCounterList.exercises}</>}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.right}>
                                       <span className={` fs-2 text-white ${DashboardStyle.iconCircle}`}>
                                          <GrYoga />
                                          {/* <Image src="/images/img/purchase.png" alt="" className="img-fluid" layout='fixed' width={50} height={50}/> */}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li>
                           <div className={DashboardStyle.listWrapper}>
                              <div className="row no-gutters">
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.left}>
                                       <a><CommonText en="Medicines" hi="औषधियां"/></a>
                                       <p className=
                                          {DashboardStyle.number}>{allCounterList.medicines > 1000 ? <>{parseInt(allCounterList.medicines / 1000)}K</>
                                             : <>{allCounterList.medicines}</>}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.right}>
                                       <span className={` fs-2 text-white ${DashboardStyle.iconCircle}`}>
                                          <GiMedicines />
                                          {/* <Image src="/images/img/batches.png" alt="" className="img-fluid" layout='fixed' width={50} height={50} /> */}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li>
                           <div className={DashboardStyle.listWrapper}>
                              <div className="row no-gutters">
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.left}>
                                       <a><CommonText en="Herbs" hi="जड़ी बूटी"/></a>
                                       <p className=
                                          {DashboardStyle.number}>{allCounterList.herbs > 1000 ? <>{parseInt(allCounterList.herbs / 1000)}K</>
                                             : <>{allCounterList.herbs}</>}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className={DashboardStyle.right}>
                                       <span className={` fs-2 text-white ${DashboardStyle.iconCircle}`}>
                                          <GiFruitBowl />
                                          {/* <Image src="/images/img/request.png" alt="" className="img-fluid" layout='fixed' width={50} height={50} /> */}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
               {/* ------Recent Patient-------- */}
               {ifNoData ?
                  <p><CommonText en="No Data Found" hi="कोई डेटा नहीं"/></p> :
                  <div className="row py-4">
                     <div className='col-md-12'>
                        <div className='row'>
                           <div className={DashboardStyle.repeatedCard}>
                              <div className="col-md-12">
                                 <div className={DashboardStyle.dropBox}>
                                    <p className={DashboardStyle.dashCardHeading}><CommonText en="Recent patient" hi="रोगी"/></p>

                                 </div>
                              </div>
                              
                              <div className="col-md-12">
                                 <div className={FormStyle.allListTable}>
                                    <table>
                                       <tr className={FormStyle.allListTableHeadings}>
                                          <th className='text-start'><CommonText en="Name" hi="नाम"/> </th>
                                          <th className='text-start'><CommonText en="Email" hi="ईमेल"/></th>
                                          <th className='text-start'><CommonText en="Contact Number" hi="संपर्क नम्बर"/></th>
                                          <th className='text-start'><CommonText en="Registration No" hi="पंजीकरण क्रमांक"/></th>
                                          <th className={FormStyle.allListTableActionList}></th>
                                       </tr>
                                       {
                                          allRecentPatients.map((item) => {
                                             return (
                                                <tr className={FormStyle.allListTableSingleRow}>
                                                   <td className='text-start'>{item.name}</td>
                                                   <td className='text-start'>{item.email}</td>
                                                   <td className='text-start'>{item.mobile}</td>
                                                   <td className='text-start'>{item.Registration_no}</td>
                                                   <td className={FormStyle.allListTableActionList}>
                                                      <ul className={FormStyle.actionList}>
                                                         <li className="nav-item dropdown">
                                                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                               <HiDotsVertical />
                                                            </span>
                                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                               <li>
                                                                  <Link href="">
                                                                     <span className="dropdown-item" href="#"><CommonText en="View" hi="देखना"/></span>
                                                                  </Link>
                                                               </li>
                                                               <li>
                                                                  <Link href="">
                                                                     <span className="dropdown-item"><CommonText en="Edit" hi="संपादन करना"/></span>
                                                                  </Link>
                                                               </li>
                                                               <li>
                                                                  <Link href="">
                                                                     <span className="dropdown-item"><CommonText en="Delete" hi="मिटाना"/></span>
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
                                 </div>
                              
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>}

               {/* ------Recent Patient--------- */}
               <div className="row py-4 ">
                  <div className="col-md-12">
                     <div className={DashboardStyle.dropBox}>
                        <p className={DashboardStyle.dashCardHeading}><CommonText en="Disease wise patients stats" hi="रोग अनुसार रोगियों के आँकड़े"/></p>

                     </div>
                  </div>
                  <div className='col-md-12'>
                     <div className={DashboardStyle.repeatedCard}>
                        <div className='row'>
                           <div className='col-lg-11 mx-auto'>
                              <div className='row'>
                                 <div className='col-lg-1'>

                                 </div>
                                 <div className='col-lg-3'>
                                    <div className={DashboardStyle.sliderWrapper}>
                                       <div className='row'>
                                          <div className='col-lg-9'>
                                             <div className={DashboardStyle.organPicContent}>
                                                <div className={DashboardStyle.organWraper}>
                                                   <div className={DashboardStyle.organName}>
                                                   <CommonText en="Heart" hi="हृदय"/>
                                                      
                                                   </div>
                                                   <div className={DashboardStyle.organPercentage}>
                                                      15%
                                                   </div>
                                                </div>

                                                <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                                   type="range" min="0" value="125" max="200" disabled />
                                             </div>
                                          </div>
                                          <div className='col-lg-3 d-flex align-items-end'>
                                             <div className={DashboardStyle.organPic}>
                                                <span>
                                                   <GiHeartOrgan />
                                                </span>
                                             </div>
                                          </div>
                                       </div>


                                    </div>
                                    <div className={DashboardStyle.sliderWrapper}>
                                       <div className='row'>
                                          <div className='col-lg-9'>
                                             <div className={DashboardStyle.organPicContent}>
                                                <div className={DashboardStyle.organWraper}>
                                                   <div className={DashboardStyle.organName}>
                                                   <CommonText en="Stomach" hi="पेट"/>
                                                      
                                                   </div>
                                                   <div className={DashboardStyle.organPercentage}>
                                                      15%
                                                   </div>
                                                </div>

                                                <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                                   type="range" min="0" value="125" max="200" disabled />
                                             </div>
                                          </div>
                                          <div className='col-lg-3 d-flex align-items-end'>
                                             <div className={DashboardStyle.organPic}>
                                                <span>
                                                   <GiStomach />
                                                </span>
                                             </div>
                                          </div>
                                       </div>


                                    </div>
                                    <div className={DashboardStyle.sliderWrapper}>
                                       <div className='row'>
                                          <div className='col-lg-9'>
                                             <div className={DashboardStyle.organPicContent}>
                                                <div className={DashboardStyle.organWraper}>
                                                   <div className={DashboardStyle.organName}>
                                                   <CommonText en="Diabetes" hi="मधुमेह"/>
                                                      
                                                   </div>
                                                   <div className={DashboardStyle.organPercentage}>
                                                      15%
                                                   </div>
                                                </div>

                                                <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                                   type="range" min="0" value="125" max="200" disabled />
                                             </div>
                                          </div>
                                          <div className='col-lg-3 d-flex align-items-end'>
                                             <div className={DashboardStyle.organPic}>
                                                <span>
                                                   <FaMedkit />
                                                </span>
                                             </div>
                                          </div>
                                       </div>


                                    </div>

                                 </div>
                                 <div className='col-lg-4'>
                                    <div className={DashboardStyle.humanBox}>
                                       <Image src="/images/human-body.png" alt="aboutpic" layout='fill' />
                                    </div>

                                 </div>
                                 <div className='col-lg-3'>
                                    <div className={DashboardStyle.rightIconWrapper}>
                                       <div className={DashboardStyle.sliderWrapper}>
                                          <div className='row'>
                                             <div className='col-lg-3 d-flex align-items-end'>
                                                <div className={DashboardStyle.organPic}>
                                                   <GiLungs />
                                                </div>
                                             </div>
                                             <div className='col-lg-9'>
                                                <div className={DashboardStyle.organPicContent}>
                                                   <div className={DashboardStyle.organWraper}>
                                                      <div className={DashboardStyle.organName}>
                                                      <CommonText en="Lungs" hi="फेफड़े"/>
                                                         
                                                      </div>
                                                      <div className={DashboardStyle.organPercentage}>
                                                         15%
                                                      </div>
                                                   </div>

                                                   <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                                      type="range" min="0" value="125" max="200" disabled />
                                                </div>
                                             </div>

                                          </div>


                                       </div>
                                       <div className={DashboardStyle.sliderWrapper}>
                                          <div className='row'>
                                             <div className='col-lg-3 d-flex align-items-end'>
                                                <div className={DashboardStyle.organPic}>
                                                   <span>

                                                      <GiLiver />
                                                   </span>
                                                </div>
                                             </div>
                                             <div className='col-lg-9'>
                                                <div className={DashboardStyle.organPicContent}>
                                                   <div className={DashboardStyle.organWraper}>
                                                      <div className={DashboardStyle.organName}>
                                                      <CommonText en="Liver" hi="यकृत"/>
                                                         
                                                      </div>
                                                      <div className={DashboardStyle.organPercentage}>
                                                         15%
                                                      </div>
                                                   </div>

                                                   <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                                      type="range" min="0" value="125" max="200" disabled />
                                                </div>
                                             </div>

                                          </div>


                                       </div>
                                    </div>
                                 </div>
                                 <div className='col-lg-1'>

                                 </div>
                              </div>

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* ------Recent Patient-------- */}
               <div className="row py-3 d-none">
                  <div className="col-md-12">
                     <div className={DashboardStyle.dropBox}>
                        <p className={DashboardStyle.dashCardHeading}><CommonText en="Recent patient" hi="रोगी"/></p>

                     </div>
                  </div>
                  <div className='col-md-12'>
                     <div className={DashboardStyle.repeatedCard}>
                        <div className='row'>
                           <div className='col-lg-11 mx-auto'>


                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* ------Recent Patient--------- */}





               <div className="row py-3 d-none">
                  <div className="col-md-7">
                     <div className={DashboardStyle.dropBox}>
                        <p className={DashboardStyle.dashCardHeading}><CommonText en="Patient Chart" hi="रोगी चार्ट"/></p>

                     </div>
                     <div className={DashboardStyle.repeatedCard}></div>

                  </div>
                  <div className="col-md-5">
                     <div className={DashboardStyle.dropBox}>
                        <p className={DashboardStyle.dashCardHeading}><CommonText en="Disease wise Patients" hi="रोग अनुसार रोगी"/></p>

                     </div>
                     <div className={DashboardStyle.repeatedCard}></div>

                  </div>
               </div>
               {/* ------order------- */}
               <div className="row py-4">
                  <div className="col-md-6">
                     <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.totalCard} `}>
                        <div className={DashboardStyle.UpperLeft}>
                           <span className="{`${DashboardStyle.totalIcon} d-block`}">

                              <RiFileListLine />
                           </span>
                           <p className={DashboardStyle.totalTitle}><CommonText en="Total Order" hi="कुल आदेश"/></p>
                           <span className={`${DashboardStyle.two} ${DashboardStyle.dashCardInnerHeading} d-block my-2`}>
                              50,000</span>
                           <span className={`${DashboardStyle.three} ${DashboardStyle.highlight} d-block`}>
                           <CommonText en="Over last month 2.5" hi="पिछले महीने 2.5 से अधिक"/>
                              
                              {/* <i className="fal fa-angle-up ml-2 mr-1"></i> */}
                              <MdKeyboardArrowUp className='ml-2 mr-1' />
                           </span>
                        </div>
                        <div className={DashboardStyle.totalRight}>
                           <div class="total-card-pic">

                              <div className={DashboardStyle.tOrderBox}>

                                 <Image src="/images/t-sales.png"
                                    alt="order" layout='fill' />
                              </div>



                           </div>
                        </div>

                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.totalCard} ${DashboardStyle.tSales
                        } `}>
                        <div className={DashboardStyle.UpperLeft}>
                           <span className="{`${DashboardStyle.totalIcon} d-block`}">

                              <RiFileListLine />
                           </span>
                           <p className={DashboardStyle.totalTitle}>Sales</p>
                           <span className={`${DashboardStyle.two} ${DashboardStyle.dashCardInnerHeading} d-block my-2`}>
                              10,000</span>
                           <span className={`${DashboardStyle.three} ${DashboardStyle.highlight} d-block`}>
                           <CommonText en="Over last month 2.5" hi="पिछले महीने 2.5 से अधिक"/>
                              {/* <i className="fal fa-angle-up ml-2 mr-1"></i> */}
                              <MdKeyboardArrowDown className='ml-2 mr-1' />
                           </span>
                        </div>
                        <div className={DashboardStyle.totalRight}>
                           <div class="total-card-pic">

                              <div className={DashboardStyle.tOrderBox}>
                                 <Image src="/images/t-order.png"
                                    alt="order" layout='fill' />
                              </div>



                           </div>
                        </div>

                     </div>
                  </div>

               </div>
               {/* -------sales------- */}
               {/* --------rating------- */}
               <div class="row py-4 ">
                  <div class="col-md-6">
                     <div class={`${DashboardStyle.repeatedCard} ${DashboardStyle.customerRating} h-100`}>

                        <div class={DashboardStyle.dropBox}>

                           <p class={`${DashboardStyle.dashCardHeading} ${DashboardStyle.customerRating} mb-0`}><CommonText en="Customer Rating" hi="ग्राहक रेटिंग"/></p>


                        </div>
                        <div class={`${DashboardStyle.customerRatingSecond} text-center`}>

                           <p className={DashboardStyle.ratingNumber}>4.5</p>
                           <div className='d-flex justify-content-center'>
                              <ReactStars {...ratingChanged}>
                                 <p><CommonText en="star" hi="स्टार"/></p>
                                 <p><CommonText en="45dollar" hi="45 डॉलर"/></p>

                              </ReactStars></div>
                           <div className='d-flex justify-content-center'>
                              <div className={DashboardStyle.tOrderBox}>

                                 <Image src="/images/t-rating.png"
                                    alt="rating" layout='fill' />
                              </div>
                           </div>

                           <span class={`${DashboardStyle.three} ${DashboardStyle.highlight} d-block`}>
                              <i class="fal fa-angle-up ml-2 mr-1"></i>
                              <CommonText en="+ 25% from last one month" hi="+ पिछले महीने से एक 25%"/>
                              
                           </span>

                           <div class="mt-4 d-flex justify-content-center">
                              <button class={DashboardStyle.downloadReport}><CommonText en="Download Report" hi="रिपोर्ट डाउनलोड करें"/></button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-6">
                     <div class={`${DashboardStyle.repeatedCard} h-100 d-none`}>
                        <div class={DashboardStyle.dropBox}>

                           <p class={`${DashboardStyle.dashCardHeading} ${DashboardStyle.customerRating} mb-0`}><CommonText en="Average Patient Visit" hi="औसत रोगी का दौरा"/></p>


                        </div>


                     </div>
                     {/* ---copy----- */}
                     <p className={`${DashboardStyle.dashCardHeading} mb-3`}>
                     <CommonText en="Purchase Orders" hi="खरीद समान"/>
                        
                     </p>
                     <div className="col-md-12">
                        <div className="row">
                           <div className="col-md-6 px-0">
                              <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.purchaseOrderBox} me-2`}>
                                 <div className="icon">
                                    {/* <i className="fal fa-check-circle"></i> */}
                                    <AiOutlineDeliveredProcedure />
                                 </div>
                                 <p className={DashboardStyle.dashCardHeading}><CommonText en="Delivered" hi="पहुंचा दिया"/></p>
                                 <p className={DashboardStyle.purchaseOrderSubheading}><CommonText en="20 New Packages" hi="20 नए पैकेज"/></p>
                                 <div className={DashboardStyle.progressBarParent}>
                                    <div className={`${DashboardStyle.progressBarChild} ${DashboardStyle.one}`}>

                                    </div>
                                 </div>
                                 <div>
                                    <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                       type="range" min="0" value="125" max="200" disabled />
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6 px-0">
                              <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.purchaseOrderBox} me-2`}>
                                 <div className="icon">
                                    {/* <i className="fal fa-check-circle"></i> */}
                                    <GoFile />
                                 </div>
                                 <p className={DashboardStyle.dashCardHeading}><CommonText en="Ordered" hi="आदेश दिया"/></p>
                                 <p className={DashboardStyle.purchaseOrderSubheading}><CommonText en="20 New Packages" hi="20 नए पैकेज"/></p>
                                 <div className={DashboardStyle.progressBarParent}>
                                    <div className={`${DashboardStyle.progressBarChild} ${DashboardStyle.one}`}>

                                    </div>
                                 </div>
                                 <div>
                                    <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                       type="range" min="0" value="125" max="200" disabled />
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6 px-0">
                              <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.purchaseOrderBox} me-2`}>
                                 <div className="icon">
                                    {/* <i className="fal fa-check-circle"></i> */}
                                    <BsFileEarmarkBarGraph />
                                 </div>
                                 <p className={DashboardStyle.dashCardHeading}><CommonText en="Reported" hi="सूचना दी"/></p>
                                 <p className={DashboardStyle.purchaseOrderSubheading}><CommonText en="20 New Packages" hi="20 नए पैकेज"/></p>
                                 <div className={DashboardStyle.progressBarParent}>
                                    <div className={`${DashboardStyle.progressBarChild} ${DashboardStyle.one}`}>

                                    </div>
                                 </div>
                                 <div>
                                    <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                       type="range" min="0" value="125" max="200" disabled />
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6 px-0">
                              <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.purchaseOrderBox} me-2`}>
                                 <div className="icon">
                                    {/* <i className="fal fa-check-circle"></i> */}
                                    <TiLocationArrowOutline />
                                 </div>
                                 <p className={DashboardStyle.dashCardHeading}><CommonText en="Arrived" hi="पहुंच गए"/></p>
                                 <p className={DashboardStyle.purchaseOrderSubheading}><CommonText en="20 New Packages" hi="20 नए पैकेज"/></p>
                                 <div className={DashboardStyle.progressBarParent}>
                                    <div className={`${DashboardStyle.progressBarChild} ${DashboardStyle.one}`}>

                                    </div>
                                 </div>
                                 <div>
                                    <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                       type="range" min="0" value="125" max="200" disabled />
                                 </div>
                              </div>
                           </div>







                        </div>
                     </div>
                     {/* ----paset----- */}

                  </div>
               </div>
               {/* ----------rating------- */}
               {/* -----last row  ------ */}
               <div className="row py-5 d-none">
                  <div className="col-md-6">
                     <p className={`${DashboardStyle.dashCardHeading} mb-3 d-none`}>
                     <CommonText en="Purchase Orders" hi="खरीद आदेश"/>
                        
                     </p>
                     <div className="col-md-12 d-none">
                        <div className="row">
                           <div className="col-md-6 px-0">
                              <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.purchaseOrderBox} me-2`}>
                                 <div className="icon">
                                    {/* <i className="fal fa-check-circle"></i> */}
                                    <AiOutlineDeliveredProcedure />
                                 </div>
                                 <p className={DashboardStyle.dashCardHeading}><CommonText en="Delivered" hi="पहुंचा दिया"/></p>
                                 <p className={DashboardStyle.purchaseOrderSubheading}><CommonText en="20 New Packages" hi="20 नए पैकेज"/></p>
                                 <div className={DashboardStyle.progressBarParent}>
                                    <div className={`${DashboardStyle.progressBarChild} ${DashboardStyle.one}`}>

                                    </div>
                                 </div>
                                 <div>
                                    <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                       type="range" min="0" value="125" max="200" disabled />
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6 px-0">
                              <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.purchaseOrderBox} me-2`}>
                                 <div className="icon">
                                    {/* <i className="fal fa-check-circle"></i> */}
                                    <GoFile />
                                 </div>
                                 <p className={DashboardStyle.dashCardHeading}><CommonText en="Ordered" hi="आदेशित"/></p>
                                 <p className={DashboardStyle.purchaseOrderSubheading}><CommonText en="20 New Packages" hi="20 नए पैकेज"/></p>
                                 <div className={DashboardStyle.progressBarParent}>
                                    <div className={`${DashboardStyle.progressBarChild} ${DashboardStyle.one}`}>

                                    </div>
                                 </div>
                                 <div>
                                    <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                       type="range" min="0" value="125" max="200" disabled />
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6 px-0">
                              <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.purchaseOrderBox} me-2`}>
                                 <div className="icon">
                                    {/* <i className="fal fa-check-circle"></i> */}
                                    <BsFileEarmarkBarGraph />
                                 </div>
                                 <p className={DashboardStyle.dashCardHeading}><CommonText en="Reported" hi="सूचना दी"/></p>
                                 <p className={DashboardStyle.purchaseOrderSubheading}><CommonText en="20 New Packages" hi="20 नए पैकेज"/></p>
                                 <div className={DashboardStyle.progressBarParent}>
                                    <div className={`${DashboardStyle.progressBarChild} ${DashboardStyle.one}`}>

                                    </div>
                                 </div>
                                 <div>
                                    <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                       type="range" min="0" value="125" max="200" disabled />
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6 px-0">
                              <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.purchaseOrderBox} me-2`}>
                                 <div className="icon">
                                    {/* <i className="fal fa-check-circle"></i> */}
                                    <TiLocationArrowOutline />
                                 </div>
                                 <p className={DashboardStyle.dashCardHeading}><CommonText en="Arrived" hi="पहुंच गए"/></p>
                                 <p className={DashboardStyle.purchaseOrderSubheading}><CommonText en="20 New Packages" hi="20 नए पैकेज"/></p>
                                 <div className={DashboardStyle.progressBarParent}>
                                    <div className={`${DashboardStyle.progressBarChild} ${DashboardStyle.one}`}>

                                    </div>
                                 </div>
                                 <div>
                                    <input id="myinput" onChange={() => inputRangeHandler()} class={DashboardStyle.rangeInputRed}
                                       type="range" min="0" value="125" max="200" disabled />
                                 </div>
                              </div>
                           </div>







                        </div>
                     </div>
                     <div class={`${DashboardStyle.repeatedCard} h-100 `}>
                        <div class={DashboardStyle.dropBox}>

                           <p class={`${DashboardStyle.dashCardHeading} ${DashboardStyle.customerRating} mb-0`}><CommonText en="Average Patient Visit" hi="औसत रोगी का दौरा"/></p>


                        </div>


                     </div>
                  </div>
                  <div className="col-md-6">
                     <p className={`${DashboardStyle.dashCardHeading} mb-3`}><CommonText en="Average Patient Visit" hi="औसत रोगी का दौरा"/></p>
                     <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.purchaseOrderBox} py-2`}>
                        <div className={`${DashboardStyle.dropBox} mb-2 mt-2`}>
                           <p className={DashboardStyle.purchaseOrderSubheading}><CommonText en="Products added today" hi="उत्पाद आज जोड़े गए"/></p>

                        </div>
                        <div className={DashboardStyle.tableWrapper}>
                           <table className={DashboardStyle.table}>
                              <thead>
                                 <tr>
                                    <th scope="col"><CommonText en="Image" hi="छवि"/></th>
                                    <th scope="col"><CommonText en="Name" hi="नाम"/></th>
                                    <th scope="col"><CommonText en="Stock" hi="भंडार"/></th>
                                    <th scope="col"><CommonText en="Price" hi="कीमत"/></th>
                                    <th scope="col"><CommonText en="Action" hi="गतिविधि"/></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <th scope="row">
                                       <div className={DashboardStyle.productBox}>

                                          <Image src="/images/add1.jpeg"
                                             alt="product" layout='fill' />
                                       </div>
                                    </th>
                                    <td><CommonText en="Mark" hi="निशान"/></td>
                                    <td><CommonText en="Otto" hi="ओटो"/></td>
                                    <td><CommonText en="@mdo" hi="@mdo"/></td>
                                    <td>
                                       <div className="dropdown">
                                          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                             <i className="fas fa-ellipsis-h"></i>
                                          </button>
                                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                             <a className="dropdown-item" href="#"><CommonText en="View Detail" hi="विस्तार से देखें"/></a>
                                             <a className="dropdown-item" href="#"><CommonText en="Download" hi="डाउनलोड"/></a>

                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <th scope="row">
                                       <img src="img/add2.jpg" className="img-fluid" alt="" />
                                    </th>
                                    <td><CommonText en="Jacob" hi="जाकूब"/></td>
                                    <td><CommonText en="Thornton" hi="थार्नटन"/></td>
                                    <td><CommonText en="@fat" hi="@वसा"/></td>
                                    <td>
                                       <div className="dropdown">
                                          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                             <i className="fas fa-ellipsis-h"></i>
                                          </button>
                                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                             <a className="dropdown-item" href="#"><CommonText en="View Detail" hi="विस्तार से देखें"/></a>
                                             <a className="dropdown-item" href="#"><CommonText en="Download" hi="डाउनलोड"/></a>

                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <th scope="row">
                                       <img src="img/add3.jpg" className="img-fluid" alt="" />
                                    </th>
                                    <td><CommonText en="Larry" hi="पक्षी"/></td>
                                    <td><CommonText en="the Bird" hi="लैरी"/></td>
                                    <td><CommonText en="@twitter" hi="@ट्विटर"/></td>
                                    <td>
                                       <div className="dropdown">
                                          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                             <i className="fas fa-ellipsis-h"></i>
                                          </button>
                                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                             <a className="dropdown-item" href="#"><CommonText en="View Detail" hi="विस्तार से देखें"/></a>
                                             <a className="dropdown-item" href="#"><CommonText en="Download" hi="डाउनलोड"/></a>

                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <th scope="row">
                                       <img src="img/add4.jpg" className="img-fluid" alt="" />
                                    </th>
                                    <td><CommonText en="Larry" hi="लैरी"/></td>
                                    <td><CommonText en="the Bird" hi="पक्षी"/></td>
                                    <td><CommonText en="@twitter" hi="@ट्विटर"/></td>
                                    <td>
                                       <div className="dropdown">
                                          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                             <i className="fas fa-ellipsis-h"></i>
                                          </button>
                                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                             <a className="dropdown-item" href="#"><CommonText en="View Detail" hi="विस्तार से देखें"/></a>
                                             <a className="dropdown-item" href="#"><CommonText en="Download" hi="डाउनलोड"/></a>

                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

               </div>
               {/* --------copyright------ */}
             
             
                
             
            </div>


         </section>


         {/* <div className="row py-3">
            <div className="col-md-7">
               <div className={DashboardStyle.dropBox}>
                  <p className={DashboardStyle.dashCardHeading}>Sales Chart</p>
                  <div className="dropdown">
                     <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"> */}
         {/* <i className="fas fa-ellipsis-h"></i> */}
         {/* </button>
                     <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton">
                        <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                        <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>

                     </div>
                  </div>
               </div>

               <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.customHeight}`}>
                  <div className="upper d-flex  justify-content-between align-items-center">
                     <div className="upper-left">
                        <span className={DashboardStyle.one}></span>
                        <span className={`${DashboardStyle.two} ${DashboardStyle.dashCardInnerHeading}`}> */}
         {/* <i className="fas fa-rupee-sign"></i> */}
         {/* 50,000</span>
                        <span className="three highlight"> */}
         {/* <i className="fal fa-angle-up ml-2 mr-1"></i> */}
         {/* 5.30%</span>
                     </div>
                     <div className="upper-right">
                        <div className="form-group mb-0">
                           <select className="form-control" id="exampleFormControlSelect1">
                              <option>Select</option>
                              <option>Jan</option>
                              <option>Feb</option>
                              <option>Mar</option>
                              <option>Apr</option>
                              <option>May</option>
                              <option>Jun</option>
                              <option>Jul</option>
                              <option>Aug</option>
                              <option>Sep</option>
                              <option>Oct</option>
                              <option>Nov</option>
                              <option>Dec</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="lower">
                     <div id="chart"></div>
                  </div>
               </div>
            </div>
            <div className="col-md-5">
               <div className={DashboardStyle.dropBox}>
                  <p className={DashboardStyle.dashCardHeading}>Sales Chart</p>
                  <div className="dropdown">
                     <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"> */}
         {/* <i className="fas fa-ellipsis-h"></i> */}
         {/* </button>
                     <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton">
                        <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                        <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>
                     </div>
                  </div>
               </div>
               <div className={`${DashboardStyle.repeatedCard} ${DashboardStyle.customHeight}`}>
                  <div id="chart1">

                  </div>
                  <div className="mt-4 d-flex justify-content-center">
                     <button className="download-report">Download Report</button>
                  </div>

               </div>
            </div>
         </div>
         <div className="row py-3">
            <div className="col-md-6">
               <div className="repeated-card  total-card">
                  <div className="upper-left">
                     <span className="d-block total-icon"> */}

         {/* <i className="fal fa-file-alt"></i> */}
         {/* </span>
                     <p className="total-title">Total Order</p>
                     <span className="two dash-card-inner-heading d-block my-2">
                        50,000</span>
                     <span className="three highlight d-block">Over last month 2.5 */}
         {/* <i className="fal fa-angle-up ml-2 mr-1"></i> */}
         {/* </span>
                  </div>
                  <div className="total-right">

                     <div className="dropdown">
                        <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false"> */}
         {/* <i className="fas fa-ellipsis-h"></i> */}
         {/* </button>
                        <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton">
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>
                        </div>
                     </div>
                     <div className="total-card-pic">
                        <Image src="/images/img/t-order.png" alt="" className="img-fluid" layout='fixed' width={50} height={50}/>

                     </div>
                  </div>
               </div>
            </div>
            <div className="col-md-6">
               <div className="repeated-card  total-card t-sales">
                  <div className="upper-left">
                     <span className="d-block total-icon">
 */}
         {/* <i className="fal fa-chart-bar"></i> */}
         {/* </span>
                     <p className="total-title">Sales</p> */}
         {/* <span className="two dash-card-inner-heading d-block my-2"> */}
         {/* <i className="fas fa-rupee-sign"></i>  */}
         {/* 10,000</span> */}
         {/* <span className="three highlight d-block">Over last month 2.5 */}
         {/* <i className="fal fa-angle-down ml-2 mr-1"></i> */}
         {/* </span>
                  </div>
                  <div className="total-right">

                     <div className="dropdown">
                        <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false"> */}
         {/* <i className="fas fa-ellipsis-h"></i> */}
         {/* </button>
                        <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton">
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>
                        </div>
                     </div>
                     <div className="total-card-pic">
                        <Image src="/images/img/t-sales.png" alt="" className="img-fluid" layout='fixed' width={50} height={50}/>

                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="row py-3">
            <div className="col-md-6">
               <div className="repeated-card customer-rating h-100">
                  <div className={DashboardStyle.dropBox}>
                     <p className="dash-card-heading mb-0">Customer Rating</p>
                     <div className="dropdown">
                        <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                           <svg className="svg-inline--fa fa-ellipsis-h fa-w-16" aria-hidden="true" focusable="false"
                              data-prefix="fas" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512" data-fa-i2svg="">
                              <path fill="currentColor"
                                 d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z">
                              </path>
                           </svg>
                        </button>
                        <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton" >
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>

                        </div>
                     </div>
                  </div>
                  <div className="customer-rating-second text-center">
                     <p className="rating-number">4.5</p> */}
         {/* <ul>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star-half-alt"></i></li>
                     </ul> */}
         {/* <span className="three highlight d-block"> */}
         {/* <i className="fal fa-angle-up ml-2 mr-1"></i> */}
         {/* + 25% from last month</span>
                     <div className="total-card-pic my-2">
                        <Image src="/images/img/r-arrow.png" alt="" className="img-fluid" layout='fixed' width={50} height={50}/>

                     </div>
                     <div className="mt-4 d-flex justify-content-center">
                        <button className="download-report">Download Report</button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-md-6">
               <div className="repeated-card customer-rating">
                  <div className={DashboardStyle.dropBox}>
                     <p className="dash-card-heading mb-0">Product Sold</p>
                     <div className="dropdown">
                        <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                           <svg className="svg-inline--fa fa-ellipsis-h fa-w-16" aria-hidden="true" focusable="false"
                              data-prefix="fas" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512" data-fa-i2svg="">
                              <path fill="currentColor"
                                 d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z">
                              </path>
                           </svg>
                        </button>
                        <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton" >
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>

                        </div>
                     </div>
                  </div>
                  <div id="chart2"></div>

               </div>
            </div>
         </div> */}
         {/* <div className="row py-3">
            <div className="col-md-6">
               <p className="dash-card-heading mb-3">Purchase Orders</p>
               <div className="col-md-12">
                  <div className="row">
                     <div className="col-md-6 px-0">
                        <div className="repeated-card purchase-order-box mr-2">
                           <div className="icon"> */}
         {/* <i className="fal fa-check-circle"></i> */}
         {/* </div>
                           <p className={DashboardStyle.dashCardHeading}>Delivered</p>
                           <p className="purchase-order-subheading">20 New Packages</p>
                           <div className="progress-bar-parent">
                              <div className="progress-bar-child one"></div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6 px-0">
                        <div className="repeated-card purchase-order-box ml-2">
                           <div className="icon">  */}
         {/* <i className="fal fa-file-alt"></i> */}
         {/* </div>
                           <p className={DashboardStyle.dashCardHeading}>Ordered</p>
                           <p className="purchase-order-subheading">85 New Items</p>
                           <div className="progress-bar-parent">
                              <div className="progress-bar-child two"></div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6 px-0">
                        <div className="repeated-card purchase-order-box mr-2">
                           <div className="icon">  */}
         {/* <i className="fal fa-chart-bar"></i> */}
         {/* </div>
                           <p className={DashboardStyle.dashCardHeading}>Reported</p>
                           <p className="purchase-order-subheading">30 Support New Cases</p>
                           <div className="progress-bar-parent">
                              <div className="progress-bar-child three"></div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6 px-0">
                        <div className="repeated-card purchase-order-box ml-2">
                           <div className="icon"> */}
         {/* <i className="fal fa-location-arrow"></i> */}
         {/* </div>
                           <p className={DashboardStyle.dashCardHeading}>Arrived</p>
                           <p className="purchase-order-subheading">24 Upgraded Boxed</p>
                           <div className="progress-bar-parent">
                              <div className="progress-bar-child four"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-md-6">
               <p className="dash-card-heading mb-3">Recent Products</p>
               <div className="repeated-card purchase-order-box py-2">
                  <div className="drop-box drop-box mb-2 mt-2">
                     <p className="purchase-order-subheading">Products added today</p>
                     <div className="dropdown">
                        <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false"> */}
         {/* <i className="fas fa-ellipsis-h"></i> */}
         {/* </button>
                        <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton">
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                           <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>

                        </div>
                     </div>
                  </div>
                  <div className="table-wrapper">
                     <table className="table">
                        <thead>
                           <tr>
                              <th scope="col">Image</th>
                              <th scope="col">Name</th>
                              <th scope="col">Stock</th>
                              <th scope="col">Price</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <th scope="row">
                                 <Image src="/images/img/add1.jpg" className="img-fluid" alt="" layout='fixed' width={50} height={50}/>
                              </th>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                              <td>
                                 <div className="dropdown">
                                    <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
         {/* <i className="fas fa-ellipsis-h"></i> */}
         {/* </button>
                                    <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton">
                                       <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                                       <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>

                                    </div>
                                 </div>
                              </td>
                           </tr>
                           <tr>
                              <th scope="row">
                                 <Image src="/images/img/add2.jpg" className="img-fluid" alt="" layout='fixed' width={50} height={50}/>
                              </th>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                              <td>
                                 <div className="dropdown">
                                    <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
         {/* <i className="fas fa-ellipsis-h"></i> */}
         {/* </button>
                                    <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton">
                                       <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                                       <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>

                                    </div>
                                 </div>
                              </td>
                           </tr>
                           <tr>
                              <th scope="row">
                                 <Image src="/images/img/add3.jpg" className="img-fluid" alt="" layout='fixed' width={50} height={50}/>
                              </th>
                              <td>Larry</td>
                              <td>the Bird</td>
                              <td>@twitter</td>
                              <td>
                                 <div className="dropdown">
                                    <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
         {/* <i className="fas fa-ellipsis-h"></i> */}
         {/* </button>
                                    <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton">
                                       <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a>
                                       <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a>

                                    </div>
                                 </div>
                              </td>
                           </tr> */}
         {/* <tr> */}
         {/* <th scope="row">
                                 <Image src="/images/img/add4.jpg" className="img-fluid" alt="" layout='fixed' width={50} height={50} />
                              </th>
                              <td>Larry</td>
                              <td>the Bird</td>
                              <td>@twitter</td>
                              <td> */}
         {/* <div className="dropdown">
                                    <button className={`btn dropdown-toggle ${DashboardStyle.dropDownToggle}`} type="button" id="dropdownMenuButton"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
         {/* <i className="fas fa-ellipsis-h"></i> */}
         {/* </button>
                                    <div className={`dropdown-menu ${DashboardStyle.dropDownMenu}`} aria-labelledby="dropdownMenuButton">
                                       <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>View Detail</a> */}
         {/* <a className={`dropdown-item ${DashboardStyle.dropDownItems}`}>Download</a> */}
         {/* </div>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div> */}

      </>
   )
}
