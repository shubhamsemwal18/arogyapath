import DashboardStyle from '../../css/dashboard.module.css'
import { CommonText } from '../../Multi_Lang';


const dashFooter = () => {

    return( <>
        
          <footer className={DashboardStyle.dashCopyrightBox}>
               <div className='container'>
                   <div className='row'>
                       <div className='col-md-12 text-end'>
                           <p className={DashboardStyle.dashCopyright}>
                          <a href='https://giksindia.com/' target="_blank" className='text-decoration-none text-black'>Designed & Developed by GIKS India Pvt Ltd</a></p>
                       </div>
                   </div>
               </div>
         </footer>    
                       
        
        
                 
    </>
    );
}
export default dashFooter;