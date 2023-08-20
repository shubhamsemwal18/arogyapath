import Cookies from "universal-cookie";

export const CommonPlainText = (props) =>{

    const cookies = new Cookies();
    let language = cookies.get('Arogya_Path_Language');

    if(language == 'Hindi'){
            return props.en;
          }
          else{
           return props.hi; 
          }

}