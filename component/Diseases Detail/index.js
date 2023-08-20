import aboutStyle from '../../css/about.module.css'
// import { AboutPage } from '../../MultiLanguageFiles/aboutePage';
import Image from 'next/image';
import { CommonText } from '../../Multi_Lang';


const DiseasesDetail = () => {

    return (
        <>
            <div className="common-redirect-banner">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12 text-center">
                            <p className="common-redirect-banner-title"><CommonText en="Diseases Detail" hi="रोग विवरण"/> </p>
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
                               
                                रोग: 
                                    </h1>
                               
                                <p className='common-para my-3'>
                                वैध जी सभी प्रकार के रोगों का उपचार करते है। कुछ रोगों का अगर पूर्ण उपचार नहीं भी है तो उसे 
लाभ पहुँचाने का प्रयास तो किया ही जाता है। 
                                </p>
                                <h2 className='h2'> रोग जिनका उपचार किया जाता है :</h2>
                                <h3 className='h4'>वृक्क रोग:  </h3>
                                <p className='common-para my-3'>
                                किडनी में पत्थर , पेशाब की समस्या, सिस्ट किडनी का सिकुडना, डाईलेसिस्, किडनी का फ़ेल 
होना, किडनी कैन्सर इत्यादि। 
                                </p>
                                <h3 className='h4'>मधुमेह:</h3>
<p className='common-para my-3'>हाईपर व हाइपो मधुमेह रोग, टाइप 1, टाइप 2, डाइबटीज  </p>
<p className='common-para '>कर्क रोग(कैन्सर या टयूमर): हर प्रकार का कैन्सर या टयूमर   </p>
<p className='common-para'>दिल के रोग: ब्लड प्रैशर,ब्लोकेगज, कमजोर दिल व अन्य रोग  </p>

<h3 className='h4'>माईग्रेन :</h3>
<h3 className='h4'>मोटापा:</h3>
<h3 className='h4'>जोडो का दर्द:</h3>
<h3 className='h4'>लकवा:</h3>
<h3 className='h4'>पेट के रोग : </h3>
<p className='common-para'>व अन्य छाती के रोग, यकृत रोग , फैटी लीवर, लीवर सोयरसिस</p>
<h3 className='h4'>त्वचा रोग:  </h3>
<h3 className='h4'>नाक कान व आँखो के रोग :  </h3>
                              

                            </div>
                        </div>
                        <div className='col-md-6 col-lg-5'>
                          <div className={aboutStyle.aboutSingleRight}>
                          <Image src="/images/aboutSingle.jpeg" alt="aboutpic" layout='fill'/>
                          </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )


}

export default DiseasesDetail;