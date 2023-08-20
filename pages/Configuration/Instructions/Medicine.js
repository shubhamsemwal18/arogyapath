
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";
import MedicineInstruction from "../../../Containers/Configuration/Instruction/medicine";

const medicine = () =>{
    return (<>
                <DashboardHeader/>
                <MedicineInstruction/>
                <DashboradFooter/>
            </>);
}

export default medicine;