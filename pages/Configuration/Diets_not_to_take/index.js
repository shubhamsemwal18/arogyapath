import DietsNotToTakeManagement from "../../../Containers/Configuration/Diets Management/diets_not_to_take";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const diets = () =>{
    return (<>
                <DashboardHeader/>
                <DietsNotToTakeManagement/>
                <DashboradFooter/>
            </>);
}

export default diets;