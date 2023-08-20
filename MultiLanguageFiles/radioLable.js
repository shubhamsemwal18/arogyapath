import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const RadioLableLang = (props) =>{

    let hindiLabelsNew =  {
        up:"ऊपर",
        down:"नीचे",
        normal:"सामान्य",
        black:"काला",
        white:"सफेद",
        red:"लाल",
        brown:"भूरा",
        yellow:"पीला",
        green:"हरा",
        good_breath:"सांस सही",
        bad_breath:"सांस गलत",
        breathing_problem:"सांस लेने में समस्या",
        normal_digestion:"पाचन सही",
        stone:"स्टोन",
        digestion_problem:"पाचन खराब",
        soiling:"सूजन",
        infection:"इनफ़ेक्शन",
        bowel_filth:"गन्दगी",
        heaviness:"भारीपन",
        headach_in_right:"दायीं ओर",
        headach_in_left:"बांयी ओर", 
        pain:"दर्द",
        Cholesterol:"कोलेस्ट्रॉल",
        above_neck:"ऊपर या गर्दन",
        prick:"चुभन",
        center:"मध्य में",
        below_hip:"नीचे हिप के ऊपर",
        anxiety:"घबराहट",
        yes:"हां",
        problem_in_urination:"पेशाब में समस्या",
        no:"नहीं",
        low:"कम",
        concentrated:"गाढ़ा",
        high:"ज्यादा",
        foamy:"झाग",
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