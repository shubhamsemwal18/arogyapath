import DietsToTakeManagement from "../../../Containers/Configuration/Diets Management/diets_to_take";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const diets = () =>{
    return (<>
                <DashboardHeader/>
                <DietsToTakeManagement/>
                <DashboradFooter/>
            </>);
}

export default diets;