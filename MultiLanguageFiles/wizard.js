import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const WizardLang = (props) =>{

    let hindiLabelsNew =  {
        cancel:"रद्द करें",
        previous:"पूर्व",
        submit:"सुनिश्चित करें",
        next:"अगला",
        update:"अपडेट",
    }

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


    return <>{languageEnglish ? <>{props.labelContent}</> : hindiLabelsNew[props.keyword]}</>;
}