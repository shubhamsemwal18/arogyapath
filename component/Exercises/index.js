import exercisesStyle from '../../css/exercises.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { CommonText } from '../../Multi_Lang';
import { useState,useEffect } from 'react';
import LoadingSpin from 'react-loading-spin';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { FaTimes } from 'react-icons/fa'

let url = `${process.env.NEXT_PUBLIC_APIURL}/allOpenExercises`;
function Exercises() {
    let [isLoading,setIsLoading] = useState(true);
    let [allExercisesFront,setAllExercisesFront] = useState([])
    let [exerciseSequence, setExerciseSequence] = useState()
    let [exercisePopUpData, setExercisePopUpData] = useState({})
    const fetchExercises = async () => {
      console.log("inside fetch")
        setIsLoading(true)
        try {
          const response = await fetch(url)
          const exercise = await response.json()
          
          
          
          
          setIsLoading(false)
          exercise.allExercises.sort((a,b) => a.serial_no - b.serial_no)
          

          setAllExercisesFront(exercise)
        
          
         
          
       
     
        } catch (error) {
            setIsLoading(false)
          console.log(error)
        }
      }
  
      
  
      useEffect(() => {
        fetchExercises()
      }, [])
      

      




  return (
     <>
     
     <div className="common-redirect-banner">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12 text-center">
                            <p className="common-redirect-banner-title">
                                <CommonText en="Excersice Detail" hi="व्यायाम विवरण"/> </p>
                            <nav aria-label="breadcrumb"></nav>
                        </div>
                    </div>
                </div>
            </div>
    {isLoading ?  <div className='col-12 pt-5 d-flex align-items-center justify-content-center'>
    <div className="search-Loader">
                                                        <Loader
                                                            color='#2bbf4f' />
                                                    </div>
                    
            </div>: 
      <section className={`${exercisesStyle.excercisesCards} section-padding`}>
           <div className='container'>
               <div className='row'>

               {allExercisesFront.allExercises && allExercisesFront.allExercises.length > 0 && allExercisesFront.allExercises.map((item,i) =>
               {
            
               
                return(
                    <>
               
                   <div className='col-lg-4'  key={i}>
                       <div className={exercisesStyle.excerciseSingleCard}>
                           <div className={exercisesStyle.excerciseCardPic}>
                           <Image src={item.images ? (item.images) : '/images/dummy.png'}  alt="aboutpic" layout='fill' />
                                
                           </div>
                           <div className={exercisesStyle.excerciseCardContent}>
                               <p className={exercisesStyle.title}>
                                
                                <CommonText en={item.name} hi={item.hi_name} />
                                
                                
                                </p>
                                
                               <div>
                               <button  className='filled-btn border-0'
                               data-bs-toggle="modal" data-bs-target="#staticBackdrop1"
                               onClick={() =>{
                                setExerciseSequence(i + 1)
                                setExercisePopUpData(allExercisesFront.allExercises[i])


                               }}
                               >
                                        
                                            <CommonText en="View More" hi="और देखें"/>
                                            
                                    </button>
                                
                               </div>
                                 
                           </div>
                       </div>
                   </div>
                  
                   </>
                   )
                  })
               }

               </div>
           </div>
       </section>
}
        
        
{exercisePopUpData && 
        <div className={`${exercisesStyle.customPopup} modal fade}`}
          id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
          aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered  modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header border-bottom-0">
                <h5 class="modal-title" id="staticBackdropLabel">
                     
                    {/* <CommonText en="Detailed Exercise" hi="विस्तृत व्यायाम" /> */}
                    <CommonText en={exercisePopUpData.name} hi={exercisePopUpData.hi_name} />
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <span><FaTimes /></span>
                </button>
              </div>
              <div class="modal-body">
                <div className='row'>
                  <div className='col-md-12'>
                    <div className={exercisesStyle.modalWrapper}>
                      <h2 className={exercisesStyle.modalHeading}>
                      <CommonText en="Seq" hi="अनुक्रम" />
                      
                      </h2>
                      <p className={exercisesStyle.modalPara}>
                      {exerciseSequence}
                      </p></div>
                  </div>
                  <div className='col-md-12'>
                    <div className={exercisesStyle.modalWrapper}>
                      <h2 className={exercisesStyle.modalHeading}>
                        
                        <CommonText en="Exercise Name" hi="व्यायाम का नाम" />
                      </h2>
                      <p className={exercisesStyle.modalPara}>
                      
                      <CommonText en={exercisePopUpData.name} hi={exercisePopUpData.hi_name} />
                        
                        </p>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className={exercisesStyle.modalWrapper}>
                      <h2 className={exercisesStyle.modalHeading}>
                        
                        <CommonText en="How to do" hi="कैसे करना है" />
                        </h2>
                      <p className={exercisesStyle.modalPara}>
                     
                        <CommonText en={exercisePopUpData.how_to_do} hi={exercisePopUpData.hi_how_to_do} />
                        
                      </p>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className={exercisesStyle.modalWrapper}>
                     
                      <div className='row'>
                        <div className='col-md-4'>
                        <h2 className={exercisesStyle.modalHeading}>
                            
                            <CommonText en="Image" hi="छवि" />
                            
                        </h2>

                          <div >
                            <div >
                              <Image src={exercisePopUpData.images ? exercisePopUpData.images : "/images/dummy.png"}
                            alt="exercise image" layout='responsive' width={110} height={80} />
                                
                            </div>
                            <div >
                              
                            </div>
                          </div>
                        </div>
                        <div className='col-md-4'>
                        <h2 className={exercisesStyle.modalHeading}>
                            
                            <CommonText en="Gif" hi="जीआईएफ" />
                        </h2>
                          <div >
                            <div >
                               <Image src={exercisePopUpData.gif ? exercisePopUpData.gif : "/images/dummy.png"}
                                alt="exercise pic" layout='responsive' width={110} height={80}  /> 
                            
                            </div>
                            <div >
                             
                            </div>
                          </div>
                        </div>
                        <div className='col-md-4'>
                        <h2 className={exercisesStyle.modalHeading}>
                            
                            
                            <CommonText en="Video" hi="वीडियो" />
                            
                            </h2>
                          <div >
                            <div>
                              {exercisePopUpData.videos ?
                                <video width="100%" height="100%" controls>
                                  <source src={exercisePopUpData.videos} type="video/mp4" />
                                </video>
                                :
                                <Image src="/images/dummy.png" alt="exercise video" layout='responsive' width={110} height={80} />
                              }
                            
                            </div>
                            <div >
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}


     </>
  )
  
}


export default Exercises;