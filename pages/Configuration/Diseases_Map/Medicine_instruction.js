 import Map_Disease_with_medicine_instructions from "../../../Containers/Configuration/Diseases Mapping Management/Diseases Map Medicine Instructions";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const disease_map_medicine_instruction = () =>{
    return (<>
                <DashboardHeader/>
                <Map_Disease_with_medicine_instructions/>
                <DashboradFooter/>
            </>);
}

export default disease_map_medicine_instruction;