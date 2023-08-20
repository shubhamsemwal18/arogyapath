
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";
import SpecialInstruction from "../../../Containers/Configuration/Instruction/special";

const special = () =>{
    return (<>
                <DashboardHeader/>
                <SpecialInstruction/>
                <DashboradFooter/>
            </>);
}

export default special;