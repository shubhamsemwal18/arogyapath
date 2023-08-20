import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const LoginPage = (props) =>{

    let hindiLabels = {
        signIn:"साइन इन",
        letStart:"नमस्ते! आएँ शुरू करें",
        userName:"पंजीकरण क्रमांक / मोबाइल नंबर",
        password:"पासवर्ड",
        remeber:"मुझे याद रखें",
        forgotPassword:"पासवर्ड भूल गए ?",
        login:"लॉग इन",
        loginLoader:"लॉग इन ...",
        welcome:"आरोग्यपथ में आपका स्वागत है",
        applicationV:"एप्लिकेशन v1.0",
        backToHome:"मुख्य पृष्ठ पर वापस जाएँ"
    };

    let [languageEnglish,setLanguageEnglish] = useState(false);

    if (typeof window !== 'undefined') {
        const cookies = new Cookies();
        let language = cookies.get('Arogya_Path_Language');
        useEffect(()=>{
            if(language == 'Hindi'){
                setLanguageEnglish(true)
            }
            else{
                setLanguageEnglish(false)
            }
        },[language])
      }


    return <>{languageEnglish ? <>{props.labelContent}</> : hindiLabels[props.keyword]}</>;
}