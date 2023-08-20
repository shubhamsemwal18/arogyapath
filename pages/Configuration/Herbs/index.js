import HerbsManagement from "../../../Containers/Configuration/Herbs Management";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const herbs = () =>{
    return (<>
                <DashboardHeader/>
                <HerbsManagement/>
                <DashboradFooter/>
            </>);
}

export default herbs;