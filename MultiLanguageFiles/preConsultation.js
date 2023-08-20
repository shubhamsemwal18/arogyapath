import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const PreconsultationLang = (props) =>{

    // let hindiLabelsNew =  {
    //     pre_consultation:"",
    //     select_token:"",
    //     last_Consultation_Details:"",
    //     prev_preConsultation_Details:"",
    //     prev_Consultation_Details:"",
    //     pre_consultation_details:"",
    //     oxygen_saturation:"",
    //     pulse_rate:"",
    //     temprature:"",
    //     patient_photograph:"",
    //     tounge1:"",
    //     tounge2:"",
    //     face:"",
    //     main_diseases:"",
    //     prev_diseases:"",
    //     time_period:"",
    //     year:"",
    //     month:"",
    //     prev_medication_type:"",
    //     reports:"",
    //     report_name:"",
    //     report_value:"",
    //     new:"",
    //     images:"",
    //     upload:"",
    //     or:"",
    //     capture:"",
    //     oxymeter_reading:"",
    //     add_reports:"",
    //     unit:"",
    //     range:"",
    //     duration_of_prev_diseases:"",
    //     preConsultation_success:"",
    //     consultation_detail:"",
    // }

    let hindiLabelsNew =  {
        pre_consultation:"पूर्व परामर्श",
        select_token:"टोकन चयन",
        last_preConsultation_Details:"पूर्व परामर्श की जानकारी",
        prev_preConsultation_Details:"पिछले परामर्श की जानकारी",
        pre_consultation_details:"पंजीकरण परामर्श की जानकारी",
        oxygen_saturation:"ऑक्सीजन संतृप्ति",
        pulse_rate:"पल्स दर",
        temprature:"तापमान",
        patient_photograph:"रोगी फोटोग्राफ",
        tounge1:"जीभ 1",
        tounge2:"जीभ 2",
        face:"चेहरा",
        main_diseases:"मुख्य रोग",
        prev_diseases:"पिछला रोग",
        time_period:"समय सीमा",
        year:"साल",
        month:"महीना",
        prev_medication_type:"पिछला दवा का प्रकार",
        reports:"विवरण",
        report_name:"विवरण का नाम",
        report_value:"विवरण का महत्व",
        new:"नया",
        images:"तस्वीर",
        upload:"अपलोड",
        or:"अथवा",
        capture:"कैप्चर",
        oxymeter_reading:"ऑक्सीमीटर रीडिंग",
        add_reports:"विवरण जोड़ें",
        unit:"मात्रा",
        range:"सीमा",
        duration_of_prev_diseases:"पिछले रोग कि अवधि",
        preConsultation_success:"पूर्व परामर्श सफलतापूर्वक किया गया",
        consultation_detail:"परामर्श विवरण",
        oxymeter_reading:"ऑक्सीमीटर रीडिंग",
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