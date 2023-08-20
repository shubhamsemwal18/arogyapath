import Map_Disease_with_special_instructions from "../../../Containers/Configuration/Diseases Mapping Management/Diseases Map Special Instructions";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const disease_map_special_instruction = () =>{
    return (<>
                <DashboardHeader/>
                <Map_Disease_with_special_instructions/>
                <DashboradFooter/>
            </>);
}

export default disease_map_special_instruction;