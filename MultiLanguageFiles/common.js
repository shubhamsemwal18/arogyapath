import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const CommonLang = (props) =>{

    let hindiLabelsNew =  {
        name:"नाम",
        firstName:"प्रथम नाम",
        middleName:"मध्य नाम",
        lastName:"उपनाम",
        gender:"लिंग",
        male:"पुरुष",
        female:"महिला",
        other:"अन्य",
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
        submit:"सुनिश्चित करें",
        searching:"खोज हो रही है",
        all_patients:"सभी रोगी",
        add_new:"नया जोड़ें",
        contact_no:"संपर्क नंबर",
        registration_no:"पंजीकरण क्रमांक",
        view:"देखें",
        edit:"ऐडिट",
        delete:"मिटाये",
        contact_information:"संपर्क की जानकारी",
        ok:"ठीक है",
        token_no:"टोकन नंबर",
        update:"अपडेट करें",
        no_data_found:"कोई डेटा नहीं मिला",
        search_here:"यहां तलाश करो....",
        select:"चुनें",
        month:"महीना",
        year:"साल",
        yes:"हां",
        no:"नहीं",
        
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