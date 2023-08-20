import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Cookies from 'universal-cookie';
import headerStyle from '../../css/header.module.css';
import { MdLocationOn } from 'react-icons/md';
import { IoTimer } from 'react-icons/io5';
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagramSquare, FaCommentsDollar } from 'react-icons/fa';
import {RiBarChartHorizontalFill} from 'react-icons/ri'
import { IoMdArrowDropdown } from 'react-icons/io';
import { CommonText } from '../../Multi_Lang';


const Header = () => {
    
  const router = useRouter();

    let [languageEnglish,setLanguageEnglish] = useState(false);  
    const cookies = new Cookies();

    if (typeof window !== 'undefined') {
        let language = cookies.get('Arogya_Path_Language');
        useEffect(()=>{
            if(language == 'Hindi'){
                setLanguageEnglish(false)
            }
            else{
                setLanguageEnglish(true)
            }
        },[language])
      }
      

    let translateHindi = () =>{
        cookies.set('Arogya_Path_Language','Hindi',{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000*365)});
        setLanguageEnglish(false)
        router.replace(router.asPath)
    }

    let translateEnglish = () =>{
        cookies.set('Arogya_Path_Language','English',{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000*365)});
        setLanguageEnglish(true)
        router.replace(router.asPath)
    }


    return (<>
        <header className={headerStyle.header}>
            <div className={`${headerStyle.headerTop} dark-green-bg`}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className={`${headerStyle.wrapper}`}>
                                <div className={headerStyle.left}>
                                    <ul className='d-flex mb-0'>
                                        <li><span><MdLocationOn /></span><CommonText en="Jadi Buti Farms,Kolhupani,Uttarakhand 248007" hi="जडी बूटी फार्म, कोल्हुपानी, उत्तराखंड 248007"/></li>
                                        <li className='ms-lg-4'><span><IoTimer /></span> <CommonText en="Monday to Sunday : 9am to 4pm" hi="सोमवार से शनिवार: सुबह 9 बजे से शाम 4 बजे तक"/></li>
                                    </ul>
                                </div>
                                <div className={headerStyle.right}>
                                    <ul className='list-unstyled d-flex mb-0 me-4 align-items-center'>
                                        <li className='px-2'><Link href="/"><span><FaFacebook /></span></Link></li>
                                        <li className='px-2'><Link href="/"><span><FaYoutube /></span></Link></li>
                                        <li className='px-2'><Link href="/"><span><FaLinkedin /></span></Link></li>
                                        <li className='px-2'><Link href="/"><span><FaInstagramSquare /></span></Link></li>
                                    </ul>
                                    <div>
                                        {languageEnglish ? <span className='filled-btn' onClick={()=>translateHindi()}>अंग्रेज़ी</span> : <span className='filled-btn'  onClick={()=>translateEnglish()}>हिन्दी</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <nav className={`${headerStyle.homeNav} navbar navbar-expand-lg  py-0`}>
                <div className="container">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                          <RiBarChartHorizontalFill/>
                        </span>
                    </button>
                    <div className="collapse navbar-collapse align-items-center justify-content-between" id="navbarSupportedContent">
                        <div >
                            <Link href="/">
                                <Image src="/images/Ayurveda-Book.png" alt="Book Image" width={50} height={50} /> 
                            </Link>
                        </div>
                        <div className='d-flex'>
                            <Link href="/">
                                <a className="navbar-brand m-0 d-flex align-items-center py-0 text-dark">
                                    
                                    <div  className='me-3'>
                                        <Image src="/images/logo.png" alt="aboutpic" width={40} height={40} /> 
                                    </div>
                                    <h1 className='fs-3 mb-0 '><CommonText en="Arogyapath" hi="आरोग्यपथ"/>
                                    </h1>
                                </a>
                            </Link>
                        </div>
                        <ul className={`navbar-nav  mb-2 mb-lg-0 ${headerStyle.mainNav}`}>
                        <li>
                                <Link href="/" >
                                    <span><CommonText en="Home" hi="मुख्य पृष्ठ"/></span>
                                </Link>
                            </li>
                            <li>
                                <div className={headerStyle.dropdown}>
                                   
                                        <span className={headerStyle.dropbtn}><CommonText en="About" hi="परिचय"/><IoMdArrowDropdown /></span>
                                    
                                    <div className={headerStyle.dropdownContent}>
                                        <Link href="/about">
                                            <span><CommonText en="Arogyapath" hi="आरोग्यपथ"/></span>
                                        </Link>
                                        <Link href="/JadiBotiDetail">
                                            <span><CommonText en="Jadi Boti" hi="जड्डी बूटी"/></span>
                                        </Link>
                                        <Link href="/medicinesDetail">
                                            <span><CommonText en="Medicines" hi="औषधियां"/></span>
                                        </Link>
                                        <Link href="/clinicDetail">
                                            <span><CommonText en="Clinic" hi="क्लिनिक"/></span>
                                        </Link>
                                        <Link href="/appointmentDetail">
                                            <span><CommonText en="Appointment" hi="नियुक्ति"/></span>
                                        </Link>
                                        <Link href="/exercises">
                                            <span><CommonText en="Exercises" hi="व्यायाम"/></span>
                                        </Link>
                                        <Link href="/diseasesDetail">
                                            <span><CommonText en="Diseases" hi="रोग"/></span>
                                        </Link>
                                        <Link href="/videoDetail">
                                            <span><CommonText en="Videos" hi="वीडियो"/></span>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                           
                            <li className='d-none'>
                                <Link href="/">
                                    <span><CommonText en="Exercises" hi="अभ्यास"/></span>
                                </Link>
                            </li>
                            <li className='d-none'>
                                <Link href="/">
                                    <span><CommonText en="blog" hi="ब्लॉग"/></span>
                                </Link>
                            </li>
                            <li className='d-none'>
                                <Link href="/">
                                    <span><CommonText en="Videos" hi="वीडियो"/></span>
                                </Link>
                            </li>
                            <li className='d-none'>
                                <Link href="/" className="nav-item">
                                    <span><CommonText en="Contact Us" hi="संपर्क करें"/></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" >
                                    <span><CommonText en="Login" hi="लॉग इन"/></span>
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        </header>
    </>);

}
export default Header;