import ErrorStyle from '../../css/error.module.css';
import {AiOutlineWarning} from 'react-icons/ai'
import { CommonText } from '../../Multi_Lang';

function ErrorMessage() {
  return (
    <>
       <section className={ErrorStyle.errorArea}>
           <div className='container'>
               <div className='row'>
                 <div className='col-lg-5 mx-auto'>
                    <div className={ErrorStyle.errorCard}>
                         <div className={ErrorStyle.one}>
                           <span><AiOutlineWarning/></span>
                         </div>
                         <div className={ErrorStyle.two}>
                           <p className={ErrorStyle.errorTitle}>Oops!</p>
                           <p className={ErrorStyle.errorContent}>
                           <CommonText en="Something went wrong please try again" hi="कुछ गलत हो गया, कृपया फिर से प्रयास करें"/>
                           </p>
                         </div>
                         <div className={ErrorStyle.errorBtnBox}>
                             <button className={`${ErrorStyle.errorBtn} `} type="button"><CommonText en="Close" hi="बंद"/></button>
                         </div>
                    </div>

                 </div>
               </div>
           </div>
       </section>
    </>
  )
}

export default ErrorMessage