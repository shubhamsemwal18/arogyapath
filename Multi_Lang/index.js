import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const CommonText = (props) =>{

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

    return <>{languageEnglish ? <>{props.en}</> : <>{props.hi}</>}</>;
}