import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const PatientRegister = (props) =>{

    let hindiLabelsNew =  {
        name:"नाम",
        firstName:"प्रथम नाम",
        middleName:"मध्य नाम",
        lastName:"उपनाम",
        gender:"लिंग",
        male:"पुरुष",
        female:"महिला",
        other:"अन्य",
        select_gender:"लिंग",
        identificationNO:"पहचान क्रमांक",
        occupation:"व्यवसाय",
        referedBy:"रेफर किया गया",
        motherName:"माँ का नाम",
        fatherName:"पिता का नाम",
        dob:"जन्म तिथि",
        pob:"जन्म स्थान",
        tob:"जन्म का समय",
        age:"आयु",
        weight:"वजन",
        height:"ऊंचाई",
        add1:"वर्त्तमान पता",
        add2:"स्थाई पता",
        state:"राज्य",
        city:"नगर",
        pincode:"पिन कोड",
        email:"ईमेल",
        mobile:"मोबाइल नंबर",
        cancel:"रद्द करें",
        previous:"पूर्व",
        submit:"जमा करें",
        searching:"खोज हो रही है",
        all_patients:"सभी रोगी",
        add_new:"नया जोड़ें",
        contact_no:"संपर्क नंबर",
        registration_no:"पंजीकरण क्रमांक",
        view:"देखें",
        edit:"संशोधित करें",
        delete:"हटाये",
        patient_information:"रोगी की जानकारी",
        address_information:"पते की जानकारी",
        physical_information:"शारीरिक जानकारी",
        contact_information:"संपर्क की जानकारी",
        ok:"ठीक है",
        consultation_token_no:"परामर्श टोकन नंबर",
        token_no:"टोकन नंबर",
        patient_created:"रोगी पंजीकरण",
        generate_new_token:"नया टोकन उत्पन्न",
        update:"अपडेट करें",
        no_data_found:"आज के लिए किसी मरीज के पास टोकन नहीं है। कृपया मरीजों को देखने के लिए एक टोकन प्रदान करें।",
        search_here:"यहां तलाश करो....",
        patient_created_success:"पंजीकरण ब्यौरा",
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


    return <>{languageEnglish ? <>{props.labelContent}</> : hindiLabelsNew[props.keyword]}</>;
}