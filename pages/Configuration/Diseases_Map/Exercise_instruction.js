import Map_Disease_with_exercise_instructions from "../../../Containers/Configuration/Diseases Mapping Management/Diseases Map Exercise Instructions";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const disease_map_exercise_instruction = () =>{
    return (<>
                <DashboardHeader/>
                <Map_Disease_with_exercise_instructions/>
                <DashboradFooter/>
            </>);
}

export default disease_map_exercise_instruction;