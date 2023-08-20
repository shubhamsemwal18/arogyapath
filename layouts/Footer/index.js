import Link from 'next/link';
import footerStyle from '../../css/footer.module.css'
import { FaLocationArrow } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { IoTime } from 'react-icons/io5'
import { CommonText } from '../../Multi_Lang';



const Footer = () => {

    return( <>
        <footer className={footerStyle.footer}>
            <div className={`${footerStyle.upper}`}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-4 col-6 d-flex justify-content-md-center'>
                            <div className={footerStyle.contactBox}>
                                <div className={footerStyle.left}>
                                    <span><FaLocationArrow /></span>
                                </div>
                                <div className={footerStyle.left}>
                                    <p className={footerStyle.contactBoxTitle}><CommonText en="Address" hi="पता"/></p>
                                    <p className={footerStyle.contactBoxDesc}>
                                    <CommonText en="Jadi Buti Farms,Kolhupani,Uttarakhand 248007" 
                                    hi="जडी बूटी फार्म, कोल्हुपानी, उत्तराखंड 248007"/>
                                       
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4  col-6 d-flex justify-content-md-center'>
                            <div className={footerStyle.contactBox}>
                                <div className={footerStyle.left}>
                                    <span><HiMail /></span>
                                </div>
                                <div className={footerStyle.left}>
                                    <p className={footerStyle.contactBoxTitle}><CommonText en="Email" hi="ईमेल"/></p>
                                    <p className={footerStyle.contactBoxDesc}>
                                    <CommonText en="info@arogyapath.org" hi="info@arogyapath.org"/>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4  col-6 d-flex justify-content-md-center'>
                            <div className={footerStyle.contactBox}>
                                <div className={footerStyle.left}>
                                    <span><IoTime /></span>
                                </div>
                                <div className={footerStyle.left}>
                                    <p className={footerStyle.contactBoxTitle}><CommonText en="Timing" hi="समय"/></p>
                                    <p className={footerStyle.contactBoxDesc}>
                                    <CommonText en="Monday to Sunday : 9am to 4pm" hi="सोमवार से शनिवार: सुबह 9 बजे से शाम 4 बजे तक"/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={footerStyle.middle}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-4 d-flex justify-content-md-center col-12'>
                            <div>
                                <p className={footerStyle.footerTitle}><CommonText en="About Arogayapath" hi="आरोग्यपथ के बारे में"/></p>
                                <p className='common-para'>
                                <CommonText en="
Arogya Path is an effort towards making the society healthy. This traditional lawmaker Mr. Kamdev Prasad Panuli and his son Mr. Harish Panuli are doing the work of curing diseases in Herb Farm, Kohlu Pani Village, Nanda Ki Chowki, Dehradun. Here, by the use of biology pulse test, facial expression, modern medical lab test and other methods, the patient's body is treated after finding out the cause of the disease." 
                                hi="आरोग्य पथ समाज को स्वस्थ बनाने की ओर एक प्रयास है। यह पारंपरिक वैध श्री कामदेव प्रसाद पैन्यूली जी व उनके सुपुत्र श्री हरीश पैन्यूली जी, जडी बूटी फार्म​, ग्राम कोह्लू पानी, नन्दा की चौकी, देहरादून मे रोग नीवारसा का कार्य कर रहे है। यहाँ जीव विज्ञान नाडी परि​​​क्षण, चेहरे के भाव, आधुनिक मैडिकल लैब परि​​​क्षण व अन्न्य विधियो के प्रयोगों से रोगी के शरीर में रोग कारण पता कर के उनका उपचार किया जाता है।"/>
                                    
                                </p>
                                
                            </div>
                        </div>
                        <div className='col-lg-4 d-flex justify-content-md-center col-12'>
                            <div className={footerStyle.middleWrapper}>
                                <p className={footerStyle.footerTitle}><CommonText en="Quick Links" hi="लिंक"/></p>
                                <ul className='list-unstyled d-flex d-md-block flex-wrap '>
                                    <li>
                                        <Link href="/">
                                            <span className='common-para'><CommonText en="Home" hi="मुख्य पृष्ठ"/></span>
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link href="/">
                                            <span className='common-para'><CommonText en="Services" hi="सेवाएं"/></span>
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link href="/about">
                                            <span className='common-para'><CommonText en="About" hi="परिचय"/></span>
                                        </Link>
                                    </li> */}
                                    <li>  
                                        <Link href="/login">
                                            <span className='common-para'><CommonText en="Contact" hi="संपर्क"/></span>
                                        </Link>
                                    </li>
                                 
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-4 d-flex justify-content-md-center col-12'>
                            <div>
                                <p className={footerStyle.footerTitle}><CommonText en="Connect Us" hi="संपर्क"/></p>
                               
                                <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13772.760557904798!2d77.9578985!3d30.3455457!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x11d1f985317cedb4!2sJadi%20Buti%20Farms!5e0!3m2!1sen!2sin!4v1655875522402!5m2!1sen!2sin"  
                                height="200" 
                                
                                allowfullscreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade">
                                    
                                </iframe>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={footerStyle.copyright}>
                <div className='container'>
                    <div className={footerStyle.text}>
                        <p className='common-para mb-0'>Copyright © 2023 Designed and Developed By
                            <Link href="/">
                                <a href='https://giksindia.com/' target="_blank" className='text-decoration-none'>
                                <span className='read-more ms-1'>Giks</span>
                                    </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </>
    );
}
export default Footer;