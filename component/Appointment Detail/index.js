import aboutStyle from '../../css/about.module.css'
// import { AboutPage } from '../../MultiLanguageFiles/aboutePage';
import Image from 'next/image';
import { CommonText } from '../../Multi_Lang';


const AppointmentDetail = () => {

    return (
        <>
            <div className="common-redirect-banner">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12 text-center">
                            <p className="common-redirect-banner-title"><CommonText en="Appointment Detail" hi="नियुक्ति विवरण"/> </p>
                            <nav aria-label="breadcrumb"></nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className={`${aboutStyle.aboutSingle} section-padding`}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-lg-7'>
                            <div className={aboutStyle.aboutSingleLeft}>
                                <h1 className='common-heading'>
                               
                                <CommonText en="Appointment Detail" hi="नियुक्ति विवरण"/> 
                                    </h1>
                                <p className='common-para my-3 d-none'>
                                  
                                </p>
                                <p className='common-para my-3'>
                                <CommonText en="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, 
                                a large language ocean." hi="बहुत दूर, पहाड़ों शब्द के पीछे, वोकालिया और कॉन्सोनेंटिया देशों से दूर, अंधे ग्रंथ रहते हैं। अलग होकर वे सिमेंटिक्स के तट पर बुकमार्क्सग्रोव में रहते हैं,
                                एक बड़ा भाषा महासागर।"/>
                                
                                </p>
                                <p className='common-para my-3'>
                                <CommonText en=" Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, 
                                a large language ocean.
                                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, 
                                a large language ocean." hi="बहुत दूर, पहाड़ों शब्द के पीछे, वोकालिया और कॉन्सोनेंटिया देशों से दूर, अंधे ग्रंथ रहते हैं। अलग होकर वे सिमेंटिक्स के तट पर बुकमार्क्सग्रोव में रहते हैं,
                                एक बड़ा भाषा महासागर।
                                बहुत दूर, पहाड़ों शब्द के पीछे, वोकालिया और कॉन्सोनेंटिया देशों से दूर, अंधे ग्रंथ रहते हैं। अलग होकर वे सिमेंटिक्स के तट पर बुकमार्क्सग्रोव में रहते हैं,
                                एक बड़ा भाषा महासागर।"/>
                               
                                </p>
                                <p className='common-para my-3'>
                                <CommonText en="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, 
                                a large language ocean." hi="बहुत दूर, पहाड़ों शब्द के पीछे, वोकालिया और कॉन्सोनेंटिया देशों से दूर, अंधे ग्रंथ रहते हैं। अलग होकर वे सिमेंटिक्स के तट पर बुकमार्क्सग्रोव में रहते हैं,
                                एक बड़ा भाषा महासागर।"/>
                                
                                </p>

                            </div>
                        </div>
                        <div className='col-md-6 col-lg-5'>
                          <div className={aboutStyle.aboutSingleRight}>
                          <Image src="/images/appointment.jpg" alt="aboutpic" layout='fill'/>
                          </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )


}

export default AppointmentDetail;