import { useEffect, useState } from 'react';
import {ImHome} from 'react-icons/im';
import Image from 'next/image';
import {BsGearFill} from 'react-icons/bs';
import {BsFillFileEarmarkPersonFill} from 'react-icons/bs';
import {FaStethoscope} from 'react-icons/fa';
import {MdMedicalServices} from 'react-icons/md';
import userDetail from '../../Utils/userDetails';
import Link from 'next/link';
import DashHeaderStyle from '../../css/DashboardHeader.module.css';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { CommonText } from '../../Multi_Lang';



const DashboardHeader = () => {

    let Router = useRouter()

    let currentRoute = Router.route

    let refreshPage = () =>{
        Router.reload()
    }

    let [DashboardAccess,setDashboardAccess] = useState(false);
    let [ConfigurationAccess,setConfigurationAccess] = useState(false);
    let [ReportAccess,setReportAccess] = useState(false);
    let [PatientManagementAccess,setPatientManagementAccess] = useState(false);
    let [ConsultationAccess,setConsultationAccess] = useState(false);
    let [DispensaryAccess,setDispensaryAccess] = useState(false);
    let [AccountsAccess,setAccountsAccess] = useState(false);
    let [HelpDeskAccess,setHelpDeskAccess] = useState(false);
    let [PreConsultationAccess,setPreConsultationAccess] = useState(false);
    let [userDetails,setUserDetails] = useState(false)
    let [inventoryAccess,setInventoryAccess] = useState(false);
    const cookies = new Cookies();

    useEffect(()=>{
        let result = userDetail();
        setUserDetails(result);
        
    },[])

    let [languageEnglish,setLanguageEnglish] = useState(false);  
    

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
        Router.replace(Router.asPath)
    }

    let translateEnglish = () =>{
        cookies.set('Arogya_Path_Language','English',{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000*365)});
        setLanguageEnglish(true)
        Router.replace(Router.asPath)
    }

    
    let handleLogout = () =>{
        cookies.remove('Arogya_Path_token');
        cookies.remove('Arogya_Path_Role');
        Router.push('/login')
    }


    useEffect(()=>{
        if(userDetails){
            let userRole = userDetails.data.role;
            if(userRole === 'Admin'){
                setDashboardAccess(true);
                setConfigurationAccess(true);
                setReportAccess(true)
                setInventoryAccess(true)
            }
            if(userRole === 'Consultation'){
                setConsultationAccess(true);
            }
            if(userRole === 'Pre-Consultation'){
                setPreConsultationAccess(true);
            }
            if(userRole === 'Reception'){
                setPatientManagementAccess(true);
            }
            if(userRole === 'Dispensary'){
                setDispensaryAccess(true);
            }
            if(userRole === 'Accounts'){
                setAccountsAccess(true);
            }
            if(userRole === 'Helpdesk'){
                setHelpDeskAccess(true);
            }
    }
    },[userDetails])

    return <>
   
        <header className={DashHeaderStyle.dashHeader}>
            <div className={DashHeaderStyle.dashHeaderTop}>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-12'>
                            <div className={DashHeaderStyle.dashTopWrapper}>
                                <div className={DashHeaderStyle.left}>
                                <div>
                                        {languageEnglish ? <span className='filled-btn' onClick={()=>translateHindi()}>अंग्रेज़ी</span> : <span className='filled-btn'  onClick={()=>translateEnglish()}>हिन्दी</span>}
                                    </div>
                                </div>
                                <Link href="/" >
                                <div  className={`${DashHeaderStyle.cursor} d-flex`}>
                                          
                                    <div  className='me-3'>
                                        <Image src="/images/logo.png" alt="aboutpic" width={30} height={30} /> 
                                    </div>
                                    <h1 className='fs-4 mb-0 '><CommonText en="Arogyapath" hi="आरोग्यपथ"/>
                                    
                                    </h1>
                                </div>
                                </Link>

                                <div className={DashHeaderStyle.Right}>
                                    <div className="dropdown">
                                        <span className={`${DashHeaderStyle.userDropdown} btn dropdown-toggle `}
                                            role="button" id="dropdownMenuLink"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            {userDetails && userDetails.data && userDetails.data.userName.firstname}
                                        </span>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuLink">
                                            <li>
                                                <div onClick={()=>handleLogout()}>
                                                    <span className="dropdown-item common-hover" href="#"><CommonText en="Logout" hi="लॉगआउट"/></span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={DashHeaderStyle.dashHeaderNav}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <nav className="navbar navbar-expand-lg navbar-light p-0">
                                <div className="container-fluid">
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className={`navbar-nav mx-auto  mb-2 mb-lg-0 ${DashHeaderStyle.mainNav}`}>
                                            {
                                                DashboardAccess && 
                                                <li className="nav-item">
                                                <Link href="/Dashboard">
                                                    <span className={`nav-link ${DashHeaderStyle.active}`} >
                                                        <ImHome/><CommonText en=" Dashboard" hi="डैशबोर्ड"/>
                                                    </span>
                                                </Link>
                                            </li>
                                            }
                                            {ConfigurationAccess && 
                                            <li className="nav-item dropdown">
                                                <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                   <BsGearFill/><CommonText en=" Configuration" hi="कॉन्फ़िगरेशन"/> 
                                                </span>
                                                <ul className={`dropdown-menu ${DashHeaderStyle.customizeMenuList}`} aria-labelledby="navbarDropdown">
                                                    <li>
                                                        <Link href="/Configuration/Herbs">
                                                            <span className="dropdown-item" href="#"><CommonText en=" Herbs" hi="जड़ीबूटी"/></span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/Medicines">
                                                            <span className="dropdown-item"><CommonText en=" Medicines" hi="औषधियां"/></span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/Diseases">
                                                            <span className="dropdown-item">
                                                            <CommonText en=" Diseases" hi="रोग"/> 
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/Exercises">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Exercises" hi="व्यायाम"/>
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/Questions">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Questions" hi="प्रश्न"/>
                                                            </span>
                                                        </Link>
                                                    </li> 
                                                    <li>
                                                        <Link href="/Configuration/Diets_to_take">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Diets To Take" hi="आहार जो लेना है"/>
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/Diets_not_to_take">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Diets Not To Take" hi="आहार जो नहीं लेना है"/>
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    
                                                    <li>
                                                        <Link href="/Configuration/Instructions/Medicine">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Medicine Instruction" hi="औषधि निर्देश"/>
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link href="/Configuration/Instructions/Exercise">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Exercise Instruction" hi="व्यायाम निर्देश"/>
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link href="/Configuration/Instructions/Special">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Special Instruction" hi="विशेष निर्देश"/>
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link href="/Configuration/Observation/Pulse">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Pulse Observation" hi="नब्ज अवलोकन"/>
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link href="/Configuration/Observation/Tounge">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Tounge Observation" hi="जीभ अवलोकन"/>
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link href="/Configuration/Pre_Consultation_Report">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Consultation Reports" hi="परामर्श रिपोर्ट"/>
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/User_Management">
                                                            <span className="dropdown-item" >
                                                            <CommonText en=" Users" hi="उपयोगकर्ता"/>
                                                            </span>
                                                        </Link>
                                                    </li>
                                                   
                                                    
                                                </ul>
                                            </li>
                                            }
                                            {ConfigurationAccess && <li className="nav-item dropdown">
                                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                   <BsGearFill/><CommonText en="Disease Maping" hi="रोग आधारित"/> 
                                                </span>
                                                <ul className={`dropdown-menu ${DashHeaderStyle.customizeMenuList}`} aria-labelledby="navbarDropdown">
                                            <li>
                                                        <Link href="/Configuration/Diseases_Map/Diseases_And_Medicine">
                                                            <span className="dropdown-item" href="#">
                                                            <CommonText en="Diseases Medicine" hi="रोग आधारित औषधि"/> 
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/Diseases_Map/Diseases_And_Exercises">
                                                            <span className="dropdown-item" href="#">
                                                            <CommonText en="Diseases Exercises" hi="रोग आधारित व्यायाम"/> 
                                                            </span>
                                                        </Link>
                                                    </li>   
                                                    
                                                    <li>
                                                        <Link href="/Configuration/Diseases_Map/Diets_to_take">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Diesease Diets to take" hi="रोग आधारित आहार जो लेना है"/>
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link href="/Configuration/Diseases_Map/Diets_not_to_take">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Diesease Diets not to take" hi="रोग आधारित आहार जो नहीं लेना है"/>
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link href="/Configuration/Diseases_Map/Medicine_instruction">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Diseases Medicine Instruction" hi="रोग आधारित औषधि निर्देश"/>
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/Diseases_Map/Exercise_instruction">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Diseases Exercise Instruction" hi="रोग आधारित व्यायाम निर्देश"/>
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/Diseases_Map/Special_instruction">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Diseases Special Instruction" hi="रोग आधारित विशेष निर्देश"/>
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/Configuration/Diseases_Map/Questions">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Diseases Specific Questions" hi="रोग आधारित प्रश्न"/>
                                                            </span>
                                                        </Link>
                                                    </li> 
                                                    <li>
                                                        <Link href="/Configuration/Diseases_Map/Time_table">
                                                            <span className="dropdown-item" >
                                                            <CommonText en="Diseases Time Table" hi="रोग आधारित समय सारणी"/>
                                                            </span>
                                                        </Link>
                                                    </li> 
                                                    </ul>
                                                </li>}
                                                {inventoryAccess && 
                                            <li className={`${currentRoute == "/Inventory" ? 'light-green-bg text-white' : ''} nav-item`}>
                                            <Link href="/Inventory">
                                                <span className="nav-link " onClick={currentRoute == "/Inventory" ? ()=>refreshPage() : ''}>
                                                <BsFillFileEarmarkPersonFill/> <CommonText en="Inventory" hi="इनवेंटरी"/>  
                                                </span>
                                            </Link>
                                            </li>
                                            }
                                            {PatientManagementAccess && 
                                            <li className={`${currentRoute == "/PatientManagement" ? 'light-green-bg text-white' : ''} nav-item`}>
                                            <Link href="/PatientManagement">
                                                <span className="nav-link text-white" onClick={currentRoute == "/PatientManagement" ? ()=>refreshPage() : ''}>
                                                <BsFillFileEarmarkPersonFill/> <CommonText en="Patient Managment" hi="रोगी प्रबंधन"/>  
                                                </span>
                                            </Link>
                                            </li>
                                            }
                                            {PreConsultationAccess && <li className={`${currentRoute == "/Pre-Consultation" ? 'light-green-bg text-white' : ''} nav-item`}>
                                            <Link href="/Pre-Consultation">
                                                <span className="nav-link text-white"  onClick={currentRoute == "/Pre-Consultation" ? ()=>refreshPage() : ''}>
                                                <FaStethoscope/><CommonText en=" Pre-Consultation" hi="पूर्व परामर्श"/>
                                                </span>
                                            </Link>
                                            </li>}
                                            {ConsultationAccess && 
                                            <li className={`${currentRoute == "/Consultation" ? 'light-green-bg text-white' : ''} nav-item`}>
                                            <Link href="/Consultation">
                                                <span className="nav-link text-white "  onClick={currentRoute == "/Consultation" ? ()=>refreshPage() : ''}>
                                                <FaStethoscope/><CommonText en=" Consultation" hi="परामर्श"/>
                                                </span>
                                            </Link>
                                            </li>
                                            }
                                            
                                            {ReportAccess && 
                                            <li className="nav-item dropdown">
                                            <span className="nav-link dropdown-toggle" 
                                            id="navbarDropdown" role="button" 
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                             <FaStethoscope/> <CommonText en="Reports" hi="रिपोर्ट"/> 
                                            </span>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                
                                                <li>
                                                    <Link href="/Reports/dispensary">
                                                        <span className="dropdown-item" href="#"><CommonText en=" Dispesary" hi="औषधालय"/></span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/Reports/accounts">
                                                        <span className="dropdown-item" href="#">
                                                        <CommonText en=" Accounts" hi="खाता"/>
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                            }
                                            {DispensaryAccess && 
                                            <li className={`${currentRoute == "/Dispensary" ? 'light-green-bg text-white' : ''} nav-item`}>
                                                <Link href="/Dispensary">
                                                    <span className="nav-link text-white"  onClick={currentRoute == "/Dispensary" ? ()=>refreshPage() : ''}>
                                                     <MdMedicalServices/><CommonText en=" Dispensary" hi="औषधालय"/>  
                                                    </span>
                                                </Link>
                                            </li>
                                            }
                                            {AccountsAccess && 
                                            <li className={`${currentRoute == "/Accounts" ? 'light-green-bg text-white' : ''} nav-item`}>
                                                <Link href="/Accounts">
                                                    <span className="nav-link text-white" onClick={currentRoute == "/Accounts" ? ()=>refreshPage() : ''}>
                                                     <MdMedicalServices/><CommonText en=" Accounts" hi="खाता"/>   
                                                    </span>
                                                </Link>
                                            </li>
                                            }
                                            {HelpDeskAccess && 
                                            <li className="nav-item light-green-bg text-white">
                                                <Link href="/Helpdesk">
                                                    <span className="nav-link text-white" >
                                                     <MdMedicalServices/><CommonText en=" Helpdesk" hi="सहायता केंद्र"/>  
                                                    </span>
                                                </Link>
                                            </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>
}

export default DashboardHeader;