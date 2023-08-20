import {fork, all} from "redux-saga/effects";
import HerbsManagementSaga from '../Containers/Configuration/Herbs Management/saga'
import MedicineManagementSaga from '../Containers/Configuration/Medicine Management/saga'
import DiseasesManagementSaga from "../Containers/Configuration/Diseases Management/saga";
import ExerciseManagementSaga from "../Containers/Configuration/Exercises Management/saga";
import DietsManagementSaga from "../Containers/Configuration/Diets Management/saga";
import DiseaseAndMedicineSaga from "../Containers/Configuration/Diseases Mapping Management/Diseases And Medicine/saga";
import DiseaseAndExerciseMappingSaga from "../Containers/Configuration/Diseases Mapping Management/Diseases And Exercises/saga";
import UserManagementSaga from "../Containers/Configuration/User Management/saga";
import PreConsultationSaga from "../Containers/Pre-Consultation Management/saga";
import ConsultationManagementSaga from "../Containers/Consultation Management/saga";
import DispensaryReportManagementSaga from "../Containers/Reports/Dispensary/saga";
import AccountsReportManagementSaga from "../Containers/Reports/Accounts/saga";


import LoginSaga from "../component/Login/saga";
import DashboardAccessSaga from '../component/Dashboard/saga'
import PatientSaga from "../component/Patient Management/saga";
import commonSaga from "../Common Api Calls/commonSaga";
import CreateDispensarySaga from "../component/Dispensary Management/saga";
import CreateAccountsSaga from "../component/Accounts/saga";
import PatientDashboardSaga from "../Containers/Patient Dashboard/saga";
import QuestionManagementSaga from "../Containers/Configuration/Question Management/saga";
import Pre_ConsultationReportSaga from "../Containers/Configuration/Pre-Consultation Reports/saga";

import InstructionManagementSaga from "../Containers/Configuration/Instruction/saga";
import ObservationManagementSaga from "../Containers/Configuration/Observation/saga";
import DiseaseMapDietToTakeSaga from "../Containers/Configuration/Diseases Mapping Management/Diseases And Diets To Take/saga";
import DiseaseMapDietNotToTakeSaga from "../Containers/Configuration/Diseases Mapping Management/Diseases And Diets Not To Take/saga";
import DiseaseMapMedicineInstructionSaga from "../Containers/Configuration/Diseases Mapping Management/Diseases Map Medicine Instructions/saga";
import DiseaseMapExerciseInstructionSaga from "../Containers/Configuration/Diseases Mapping Management/Diseases Map Exercise Instructions/saga";
import DiseaseMapSpecialInstructionSaga from "../Containers/Configuration/Diseases Mapping Management/Diseases Map Special Instructions/saga";
import DiseaseMapSpecificQuestionsSaga from "../Containers/Configuration/Diseases Mapping Management/Diseases Specific Questions/saga";
import DiseaseMapTimeTableSaga from "../Containers/Configuration/Diseases Mapping Management/Disease Map Time Table/saga";
import InventorySaga from "../Containers/Configuration/Inventory/saga";

export function* rootSaga () {
    yield all([
        fork(ConsultationManagementSaga),
        fork(HerbsManagementSaga),
        fork(MedicineManagementSaga),
        fork(DiseasesManagementSaga),
        fork(QuestionManagementSaga),
        fork(ExerciseManagementSaga),
        fork(DietsManagementSaga),
        fork(DiseaseAndMedicineSaga),
        fork(DiseaseAndExerciseMappingSaga),
        fork(commonSaga),
        fork(UserManagementSaga),
        fork(PatientSaga),
        fork(PreConsultationSaga),
        fork(DispensaryReportManagementSaga),
        fork(AccountsReportManagementSaga),
        fork(CreateAccountsSaga),
        fork(LoginSaga),
        fork(DashboardAccessSaga),
        fork(CreateDispensarySaga),
        fork(PatientDashboardSaga),
        fork(Pre_ConsultationReportSaga),

        fork(InstructionManagementSaga),
        fork(ObservationManagementSaga),
        fork(DiseaseMapDietToTakeSaga),
        fork(DiseaseMapDietNotToTakeSaga),
        fork(DiseaseMapMedicineInstructionSaga),
        fork(DiseaseMapExerciseInstructionSaga),
        fork(DiseaseMapSpecialInstructionSaga),
        fork(DiseaseMapSpecificQuestionsSaga),
        fork(DiseaseMapTimeTableSaga),
        fork(InventorySaga)
    ]);
}