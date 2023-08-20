
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";
import ExerciseInstruction from "../../../Containers/Configuration/Instruction/exercise";

const exercise = () =>{
    return (<>
                <DashboardHeader/>
                <ExerciseInstruction/>
                <DashboradFooter/>
            </>);
}

export default exercise;