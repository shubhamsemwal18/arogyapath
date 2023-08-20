import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const ConsultationLang = (props) =>{

    let hindiLabels = {
        consultation:"परामर्श",
        consultation_details:"परामर्श विवरण",
        pulse:"नब्ज",
        vata:"वात",
        pitta:"पित",
        kapha:"कफ",
        up:"बढ़ा है",
        down:"कम है",
        normal:"सामान्य",
        tounge:"जीभ",
        color:"रंग",
        black:"काला",
        white:"सफेद",
        red:"लाल",
        brown:"भूरा",
        yellow:"पीला",
        green:"हरा",
        infected_part_of_body:"शरीर का संक्रमित अंग",
        lungs:"फेफड़े मे",
        good_breathe:"सांस सही",
        bad_breathe:"सांस गलत",
        breathing_problem:"सांस लेने मे समस्या",
        stomach:"पेट मे",
        normal_digestion:"पाचन सही",
        digestion_problem:"पाचन ख़राब",
        kidney:"किडनी मे",
        stone:"पथरी",
        soiling:"सूजन",
        infection:"इनफ़ेक्शन",
        head:"सिर मे",
        heaviness:"भारीपन",
        headache_in_right_side:"दाईं ओर",
        headache_in_left_side:"बायीं ओर",
        large_intenstine:"बड़ी आंत",
        bowel_filth:"गन्दगी",
        small_intestine:"छोटी आंत",
        waist:"कमर मे",
        pain:"दर्द",
        above_or_neck:"ऊपर या गर्दन",
        center:"मध्य",
        below_hip:"कूल्हे के नीचे",
        above_hip:"कूल्हे के ऊपर",
        heart:"हृदय मे",
        cholestrol:"कोलेस्ट्रॉल",
        prick:"चुभन",
        anxiety:"घबराहट",
        urine:"पेशाब",
        problem_in_urination:"पेशाब मे समस्या",
        soiling_in_foot:"पेरो मे सुजन",
        pain_in_kidney:"किडनी मे दर्द",
        how_the_urine:"पेशाब कैसा आ रहा है",
        concentrated:"गहरे रंग का",
        foamy:"झाग",
        urine_color:"पेशाब का रंग",
        water_consumption:"पानी कितना ले रहे है",
        low:"कम",
        high:"ज्यादा",
        old_disease_tenure:"पुराने रोग की अवधि",
        year:"साल",
        month:"महीना",
        dialysis:"डायलिसिस",
        yes:"हुई है",
        no:"नहीं",
        in_weeks:"सप्ताह मे",
        one:"एक",
        two:"दो",
        three:"तीन",
        four:"चार",
        five:"पांच",
        six:"छह",
        seven:"सात",
        Nails:"नाखून",
        major_diseases:"मुख्य रोग",
        select_major_disease:"मुख्य रोग चुने",
        no_medicine_mapped_for_this_diseases:"कोई औषधि नहीं मिली है रोग के लिये",
        add_medicine:"औषधि जोड़ें",
        medicine:"औषधि",
        buy_form:"खरीदें",
        consumption_count:"सेवन की मात्रा",
        add:"जोड़ें",
        diseases_based_medicine:"रोग के अनुसार औषधि",
        from_arogyapath:"आरोग्यपथ से",
        from_outside:"बाहर से",
        reason:"कारण",
        prescribed_medicine:" नियत औषधि",
        direct_consultation:"प्रत्यक्ष परामर्श",
        exercises:"व्यायाम",
        general_instructions:"सामान्य निर्देश",
        seq:"क्रम",
        seq_no:"क्रम संख्या",
        medicine_name:"औषधि का नाम",
        time_of_taken:"लेने का समय",
        suggested_time:"सुझाया_समय",
        how_to_take:"लेने के लिए कैसे करें",
        quantity:"मात्रा",
        way_of_taken:"औषधि लेने की विधि",
        medicine_instructions:"औषधि आधारित निर्देश",
        time_of_medicine:"औषधि की अवधि",
        special_medicine_ins:"औषधि के लिए विशेष निर्देश",
        how_to_do:"व्यायाम करने की विधि",
        Physical:"सामान्य",
        Courier:"डाक",
        given_mode:"दिए जाने का तरीका",
        instructions:"निर्देश",
        add_exercise_instruction:"व्यायाम निर्देश जोड़ें"


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