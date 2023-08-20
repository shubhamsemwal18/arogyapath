import Consultation from "../../Containers/Consultation Management";
import DashboardHeader from "../../layouts/DashboardHeader";
import DashFooter from "../../layouts/DashboradFooter";

const consultation = () =>{
    return (<>
                <DashboardHeader/>
                <Consultation/>
                <DashFooter/>
            </>)
}

export default consultation;