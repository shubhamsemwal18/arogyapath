import Map_Disease_Specific_Questions from "../../../Containers/Configuration/Diseases Mapping Management/Diseases Specific Questions";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const disease_specific_questions = () =>{
    return (<>
                <DashboardHeader/>
                <Map_Disease_Specific_Questions/>
                <DashboradFooter/>
            </>);
}

export default disease_specific_questions;