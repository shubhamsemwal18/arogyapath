import Link from 'next/link';
import homeStyle from '../../css/home.module.css'
import Image from 'next/image';
import { FaClinicMedical,FaHandHoldingMedical,FaCapsules,FaHospitalUser } from 'react-icons/fa'
import {FaWalking} from 'react-icons/fa'
import {BsFillPlayCircleFill} from "react-icons/bs"
import { CommonText } from '../../Multi_Lang';

const Home = () => {
    return (
        <>
            <section className={`${homeStyle.homeAbout} section-padding d-none`}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-7'>
                            <div className={homeStyle.aboutLeft}>

                                <h1 className='common-heading'>
                                    <CommonText en="About Arogyapath" hi="आरोग्य पथ के बारे में"/>
                                </h1>
                                <p className='common-upper-heading mb-4'>
                                    <CommonText en="MIssion and Vision of Arogyapath" hi="आरोग्य पथ के बारे में"/>
                                </p>
                                <p className='common-para mb-3'>
                                <CommonText en="We provide the most full medical services,
                                    so every person could have the opportunity to receive qualitative medical help.
                                    Our Clinic has grown to provide a world class facility for the treatment of tooth loss,
                                    dental cosmetics and bore advanced restorative dentistry. We are among the most
                                    qualified implant providers in the
                                    USA with over 35 years of quality training and experience." hi="हम सबसे पूर्ण चिकित्सा सेवाएं प्रदान करते हैं,
                                    ताकि प्रत्येक व्यक्ति को गुणात्मक चिकित्सा सहायता प्राप्त करने का अवसर मिल सके।
                                    हमारा क्लिनिक दांतों के नुकसान के इलाज के लिए एक विश्व स्तरीय सुविधा प्रदान करने के लिए विकसित हुआ है,
                                    डेंटल कॉस्मेटिक्स और बोर एडवांस रिस्टोरेटिव डेंटिस्ट्री। हम सबसे अधिक हैं
                                    में योग्य प्रत्यारोपण प्रदाता
                                    35 से अधिक वर्षों के गुणवत्ता प्रशिक्षण और अनुभव के साथ यूएसए"/></p>
                                
                                <div className='mt-4 pt-4'>
                                    <Link href="/">
                                        <span className='filled-btn '><CommonText en="Get An Appointment" hi="अपॉइंटमेंट"/></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-5'>
                            <div className={homeStyle.aboutRight}>
                                <div className={homeStyle.playBox}>
                                   <span data-bs-toggle="modal" data-bs-target="#exampleModal"><BsFillPlayCircleFill/></span> 
                                </div>
                                <Image src="/images/jadi.jpg" alt="aboutpic" layout='fill'/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`${homeStyle.homeService} section-padding `}>
                <div className='container'>
                    <div className='row g-0 '>
                        <div className='col-md-12'>
                        </div>
                        <div className='col-md-3 col-6'>
                        <Link href="/about" >
                            <div className={homeStyle.serviceCard}>
                                <h3 className={homeStyle.title}><CommonText en="About Arogyapath" hi="आरोग्यपथ के बारे में"/></h3>
                                <p className='common-para'>
                                    <CommonText en="For normal & complex disease. subspecialties in  sleep medicine, cancer etc" 
                                    hi="आरोग्य पथ समाज को स्वस्थ बनाने की ओर एक प्रयास है। यह पारंपरिक वैध श्री कामदेव प्रसाद पैन्यूली जी व उनके सुपुत्र..."/></p>
                                <div><FaClinicMedical /></div>
                                <div>
                                  
                                        <span className="read-more"><CommonText en="Read More" hi="आगे पढ़ें"/></span>
                                  
                                </div>
                            </div>
                        </Link>
                        </div>
                        <div className='col-md-3 col-6'>
                        <Link href="/JadiBotiDetail" >
                            <div className={homeStyle.serviceCard}>
                                <h3 className={homeStyle.title}><CommonText en="Jadi Boti" hi="जड्डी बूटी"/></h3>
                                <p className='common-para'><CommonText en="For normal & complex disease. subspecialties in  sleep medicine, cancer etc." hi="यहाँ जीव विज्ञान नाडी परि​​​क्षण, चेहरे के भाव, आधुनिक मैडिकल लैब परि​​​क्षण व अन्न्य विधियो के प्रयोगों से रोगी के शरीर..."/></p>
                                <div><FaHandHoldingMedical/> </div>
                                <div>
                                 
                                        <span className="read-more"><CommonText en="Read More" hi="आगे पढ़ें"/></span>
                                   
                                </div>
                            </div>

                            </Link>
                        </div>
                        <div className='col-md-3 col-6'>
                        <Link href="/medicinesDetail" >
                            <div className={homeStyle.serviceCard}>
                                <h3 className={homeStyle.title}><CommonText en="Medicines" hi="औषधियां"/></h3>
                                <p className='common-para'>
                                    <CommonText en="For normal & complex disease. subspecialties in  sleep medicine, cancer etc." 
                                    hi="यहां सभी औषधियां वैध जी की देख रेख में ही बनाई जाती है। यहाँ एक प्रयास किया जाता है कि सिर्फ रोग को ही ठीक... "/></p>
                                <div><FaCapsules/></div>
                                <div>
                                  
                                        <span className="read-more"><CommonText en="Read More" hi="आगे पढ़ें"/></span>
                                   
                                </div>
                            </div>
                        </Link>
                        </div>
                        <div className='col-md-3 col-6'>
                        <Link href="/clinicDetail" >
                            <div className={homeStyle.serviceCard}>
                                <h3 className={homeStyle.title}><CommonText en="Clinic" hi="क्लिनिक"/></h3>
                                <p className='common-para'><CommonText en="For normal & complex disease. subspecialties in  sleep medicine, cancer etc." hi="
                                 आरोग्य पथ चिकित्सालय जडी बूटी फार्म​, ग्राम कोह्लू पानी, नन्दा की चौकी, चकराता रोड देहरादून में स्थित है..."/></p>
                                <div><FaClinicMedical /></div>
                                <div>
                                    
                                        <span className="read-more"><CommonText en="Read More" hi="आगे पढ़ें"/></span>
                                  
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className='col-md-3 col-6'>
                        <Link href="/appointmentDetail" >
                            <div className={homeStyle.serviceCard}>
                                <h3 className={homeStyle.title}><CommonText en="Appointment" hi="अपॉइंटमेंट"/></h3>
                                <p className='common-para'><CommonText en="For normal & complex disease. subspecialties in  sleep medicine, cancer etc." 
                                hi="रोगियो को टोकन के क्रम अनुसार ही देखा जाता है। पंजीकरण के समय उनकी महत्वपूर्ण जानकारी पूछकर दर्ज की..."/></p>
                                <div><FaHospitalUser /></div>
                                <div>
                                   
                                        <span className="read-more"><CommonText en="Read More" hi="आगे पढ़ें"/></span>
                                   
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className='col-md-3 col-6'>
                        <Link href="/exercises" >
                            <div className={homeStyle.serviceCard}>
                            
                                
                                <h3 className={homeStyle.title}>
                                    <CommonText en="Exercises" hi="व्यायाम"/></h3>
                                <p className='common-para'><CommonText en="For normal & complex disease. subspecialties in  sleep medicine, cancer etc." 
                                hi="रोगी को देखने के बाद वैध जी उसकी औषधियां, उनके प्रयोग ,पथ्य-अपथ्य,व्यायाम व अन्य निर्देश रोगी को देते..."/></p>
                                <div>
                                    <FaWalking/>
                                    </div>
                                <div>
                                    
                                        <span className="read-more"><CommonText en="Read More" hi="आगे पढ़ें"/></span>
                                   
                                </div>
                                
                                
                            </div>
                        </Link>
                        </div>
                        <div className='col-md-3 col-6'>
                        <Link href="/diseasesDetail" >
                            <div className={homeStyle.serviceCard}>
                                <h3 className={homeStyle.title}><CommonText en="Diseases" hi="रोग"/></h3>
                                <p className='common-para'><CommonText en="For normal & complex disease. subspecialties in  sleep medicine, cancer etc." 
                                hi="वैध जी सभी प्रकार के रोगों का उपचार करते है। कुछ रोगों का अगर पूर्ण उपचार नहीं भी है तो उसे लाभ पहुँचाने का प्रयास..."/></p>
                                <div><FaClinicMedical /></div>
                                <div>
                                    
                                        <span className="read-more"><CommonText en="Read More" hi="अधिक पढ़ें"/></span>
                                    
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className='col-md-3 col-6'>
                        <Link href="/videoDetail">
                            <div className={homeStyle.serviceCard}>
                                <h3 className={homeStyle.title}><CommonText en="Videos" hi="वीडियो"/></h3>
                                <p className='common-para'><CommonText en="For normal & complex disease. subspecialties in  sleep medicine, cancer etc." hi="रोगी को देखने के बाद वैध जी उसकी दवाइयां, उनके प्रयोग ,पथ्य-अपथ्य,व्यायाम व अन्य निर्देश रोगी को देते..."/></p>
                                <div><FaClinicMedical /></div>
                                <div>
                                 
                                        <span className="read-more"><CommonText en="Read More" hi="अधिक पढ़ें"/></span>
                                    
                                </div>
                            </div>
                        </Link>
                        </div>
                      
                    </div>
                </div>
            </section>

            
           



<div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><CommonText en="Modal title" hi="मॉडल शीर्षक"/></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" width="100%" height="400px"
            src="https://www.youtube.com/embed/Vpeo-8WFUFU" allowfullscreen>

            </iframe>
          </div>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-danger" data-dismiss="modal"><CommonText en="Close" hi="बंद करना"/></button>
       
      </div>
    </div>
  </div>
</div>
        </>

    )


}

export default Home;