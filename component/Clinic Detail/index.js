import aboutStyle from '../../css/about.module.css'
// import { AboutPage } from '../../MultiLanguageFiles/aboutePage';
import Image from 'next/image';
import { CommonText } from '../../Multi_Lang';


const ClinicDetail = () => {

    return (
        <>
            <div className="common-redirect-banner">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12 text-center">
                            <p className="common-redirect-banner-title"><CommonText en="ClinicDetail" hi="क्लिनिक विवरण"/> </p>
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
                               
                                चिकित्सालय:
                                    </h1>
                                
                                <p className='common-para my-3'>
                                आरोग्य पथ चिकित्सालय जडी बूटी फार्म​, ग्राम कोह्लू पानी, नन्दा की चौकी, चकराता रोड देहरादून 
में स्थित है । यह सभी रोगियो व उनके सहयोगियो के लिये  विश्राम कक्ष, चाय पानी, निशुल्क 
भोजन, की  व्यवस्था है। रोगी के आने पर उसका पंजीकरण किया जाता है, व टोकन नम्बर दिया 
जाता है। 
                                </p>
                                <p className='common-para my-3 '>
                                रोगियो को टोकन के क्रम अनुसार ही देखा जाता है। पंजीकरण के समय उनकी महत्वपूर्ण जानकारी 
पूछकर दर्ज की जाती है, ताकी जब वैध्य जी रोगी को देखें तो कोई जानकारी रह न जाये।
                                </p>
                                <p className='common-para my-3'>रोगी को देखने के बाद वैध जी उसकी दवाइयां, उनके प्रयोग ,पथ्य-अपथ्य,व्यायाम व अन्य निर्देश 
रोगी को देते है अगर रोगी को उपचार नहीं करवाना है तो वह बिना दवाई लिये जा सकता है। इसका 
कोई शुल्क नहीं है।</p>
<p className='common-para my-3'>अगर रोगी उपचार करवाना चाहता है, तो वो दवाइयां ले सकता है। एक दफ़ा में एक महीने की ही 
दवाई दी जाती हैं। दवाइयां ले कर रोगी उनकी उपयोग विधि समझता है। हर रोगी से निवेदन किया 
जाता है कि वह दवाइयां का उपयोग,समय सारणी व अन्य निर्देश अच्छी तरह से समझ ले व उन्हें 
कौन कौन से व्यायाम कब और कैसे करने है अच्छी तरह समझ ले।</p>
<p>सब समझने के बाद ही शुल्क लिया जाता है। शुल्क नकद ,क्रैडिट कार्ड या पे.टी.म आदि से भी कर 
सकते है।</p>

                                

                            </div>
                        </div>
                        <div className='col-md-6 col-lg-5'>
                          <div className={aboutStyle.aboutSingleRight}>
                          <Image src="/images/clinicDetail.jpg" alt="aboutpic" layout='fill'/>
                          </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )


}

export default ClinicDetail ;