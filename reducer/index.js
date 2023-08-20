import { combineReducers } from "redux";

import HerbsManagementReducer from '../Containers/Configuration/Herbs Management/reducer'
import MedicineManagementReducer from '../Containers/Configuration/Medicine Management/reducer'
import DiseasesManagementReducer from '../Containers/Configuration/Diseases Management/reducer'
import ExerciseManagementReducer from '../Containers/Configuration/Exercises Management/reducer'
import DietsManagementReducer from '../Containers/Configuration/Diets Management/reducer'
import DiseasesAndMedicineReducer from '../Containers/Configuration/Diseases Mapping Management/Diseases And Medicine/reducer'
import diseasesExerciseReducer from '../Containers/Configuration/Diseases Mapping Management/Diseases And Exercises/reducer'
import UserManagementReducer from '../Containers/Configuration/User Management/reducer'
import PatientReducer from '../component/Patient Management/reducer'
import PreConsultationReducer from '../Containers/Pre-Consultation Management/reducer'

import LoginReducer from '../component/Login/reducer'
import DashboardAccessReducer from '../component/Dashboard/reducer'


import commonReducer from '../Common Api Calls/commonReducer'
import dispensaryReducer from '../component/Dispensary Management/reducer'
import AccountReducer from '../component/Accounts/reducer'
import PatientDashboardReducer from '../Containers/Patient Dashboard/reducer'

import ConsultationReducer from '../Containers/Consultation Management/reducer'

import DispensaryReportManagementReducer from '../Containers/Reports/Dispensary/reducer'
import AccountsReportManagementReducer from '../Containers/Reports/Accounts/reducer'
import QuestionsManagementReducer from '../Containers/Configuration/Question Management/reducer'

import Pre_ConsultationReportReducer from '../Containers/Configuration/Pre-Consultation Reports/reducer'

import InstructionManagementReducer from '../Containers/Configuration/Instruction/reducer'
import ObservationManagementReducer from '../Containers/Configuration/Observation/reducer'
import DiseaseMapDietToTakeReducer from '../Containers/Configuration/Diseases Mapping Management/Diseases And Diets To Take/reducer'
import DiseaseMapDietNotToTakeReducer from '../Containers/Configuration/Diseases Mapping Management/Diseases And Diets Not To Take/reducer'

import DiseasesMapMedicineInstructionReducer from '../Containers/Configuration/Diseases Mapping Management/Diseases Map Medicine Instructions/reducer'
import DiseaseMapExerciseInstructionReducer from '../Containers/Configuration/Diseases Mapping Management/Diseases Map Exercise Instructions/reducer'
import DiseaseMapSpecialInstructionReducer from '../Containers/Configuration/Diseases Mapping Management/Diseases Map Special Instructions/reducer'
import DiseaseMapSpecificQuestionsReducer from '../Containers/Configuration/Diseases Mapping Management/Diseases Specific Questions/reducer'
import DiseasesMapTimeTableReducer from '../Containers/Configuration/Diseases Mapping Management/Disease Map Time Table/reducer'
import InventoryReducer from '../Containers/Configuration/Inventory/reducer'


export const rootReducer = combineReducers({
    HerbsManagementReducer,
    MedicineManagementReducer,
    DiseasesManagementReducer,
    QuestionsManagementReducer,
    ExerciseManagementReducer,
    DietsManagementReducer,
    DiseasesAndMedicineReducer,
    diseasesExerciseReducer,
    UserManagementReducer,
    PreConsultationReducer,
    ConsultationReducer,
    DispensaryReportManagementReducer,
    AccountsReportManagementReducer,

    LoginReducer,
    AccountReducer,
    DashboardAccessReducer,
    PatientReducer,
    commonReducer,
    dispensaryReducer,
    PatientDashboardReducer,
    Pre_ConsultationReportReducer,
    InstructionManagementReducer,
    ObservationManagementReducer,
    DiseaseMapDietToTakeReducer,
    DiseaseMapDietNotToTakeReducer,
    DiseasesMapMedicineInstructionReducer,
    DiseaseMapExerciseInstructionReducer,
    DiseaseMapSpecialInstructionReducer,
    DiseaseMapSpecificQuestionsReducer,
    DiseasesMapTimeTableReducer,
    InventoryReducer
}) 