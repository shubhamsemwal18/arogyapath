import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const CreateMedicine = (props) =>{

    let hindiLabels = {
        createMedicine:"दवा बनाएँ",
        medicineName:"दवा का नाम",
        description:"विवरण",
        date_of_manufacturing:"निर्माण की तिथि",
        expire_date:"एक्सपायरी डेट",
        expirable:"एक्सपायर होने योग्य",
        yes:"हां",
        no:"नहीं",
        submit:"सहेजें",
        new_medicine:"नई दवा",
        content:"लोकप्रिय धारणा के विपरीत, लोरेम इप्सम केवल यादृच्छिक पाठ नहीं है। इसकी जड़ें 45 ईसा पूर्व के शास्त्रीय लैटिन साहित्य में हैं, जो इसे 2000 वर्ष से अधिक पुराना बनाती है। वर्जीनिया में हैम्पडेन-सिडनी कॉलेज के एक लैटिन प्रोफेसर रिचर्ड मैकक्लिंटॉक ने लोरेम इप्सम मार्ग से अधिक अस्पष्ट लैटिन शब्दों में से एक को देखा, और शास्त्रीय साहित्य में शब्द के उद्धरणों के माध्यम से जा रहे हैं निस्संदेह स्रोत की खोज की। लोरेम इप्सम 45 ईसा पूर्व में लिखे गए सिसेरो द्वारा 'डी फिनिबस बोनोरम एट मालोरम' (द एक्सट्रीम ऑफ गुड एंड एविल) के खंड 1.10.32 और 1.10.33 से आता है। यह पुस्तक नैतिकता के सिद्धांत पर एक ग्रंथ है, जो पुनर्जागरण के दौरान बहुत लोकप्रिय था। लोरेम इप्सम की पहली पंक्ति, 'लोरेम इप्सम डोलर सिट एमेट ..' खंड 1.10.32 की एक पंक्ति से आती है।",
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