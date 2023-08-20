import FormStyle from '../../css/form.module.css';
import customModalStyle from '../../css/customModal.module.css'
import { BiPlus } from 'react-icons/bi'
import { AiOutlineFileDone } from 'react-icons/ai'
import { ImSearch } from 'react-icons/im'
import { HiDotsVertical } from 'react-icons/hi';
import { Wizard, WizardStep, RadioButton } from '../../Common Component/Wizard/WizardFields';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from 'react-toast-notifications';
import * as ACTIONS from './action'
import * as commonAction from '../../Common Api Calls/commonAction'
import { ConsultationLang } from '../../MultiLanguageFiles/consultation';
import { CommonLang } from '../../MultiLanguageFiles/common';
import { Pagination } from '../../Common Component/Pagination';
import LoadingSpin from 'react-loading-spin';
import { CommonText } from '../../Multi_Lang';
import { CommonPlainText } from '../../Multi_Lang/text';
import { PatientPrevDetails } from '../../Common Component/PatientPrevDetails';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

export default function Consultation() {

    const [consultationPayload, setConsultationPayload] = useState({
        token_id: '',
    })

    const [paymentDetails, setPaymentDetails] = useState({
        prev_balance: 0,
        map_amount: 0,
        actual_amount: 0,
        discount: 0,
    })

    const [dialysisPayload, setDialysisPayload] = useState({})

    const [infectedPartOfBody, setInfectedPartOfBody] = useState({})
    const [anotherQuestion, setAnotherQuestion] = useState('')
    const [anotherWayOfTaken, setAnotherWayOfTaken] = useState({})
    const [anotherMedicineInstruction, setAnotherMedicineInstruction] = useState('')
    const [anotherExerciseInstruction, setAnotherExerciseInstruction] = useState('')
    const [anotherDietToTake, setAnotherDietToTake] = useState('')
    const [anotherDietNotToTake, setAnotherDietNotToTake] = useState('')
    const [anotherSpecialInstruction, setAnotherSpecialInstruction] = useState('')

    let [allPreferedQuestion, setAllPreferedQuestion] = useState([])
    let [allDietToTake, setAllDietToTake] = useState([])
    let [allDietNotToTake, setAllDietNotToTake] = useState([])
    let [allMedicineInstruction, setAllMedicineInstruction] = useState([])
    let [allExerciseInstruction, setAllExerciseInstruction] = useState([])
    let [allSpecialInstruction, setAllSpecialInstruction] = useState([])

    let [diseasePreferedQuestion, setDiseasePreferedQuestion] = useState([])
    let [diseaseDietToTake, setDiseaseDietToTake] = useState([])
    let [diseaseDietNotToTake, setDiseaseDietNotToTake] = useState([])
    let [diseaseMedicineInstruction, setDiseaseMedicineInstruction] = useState([])
    let [diseaseExerciseInstruction, setDiseaseExerciseInstruction] = useState([])
    let [diseaseSpecialInstruction, setDiseaseSpecialInstruction] = useState([])

    let [allPrescribedMedicine, setAllPrescribedMedicine] = useState([])
    let [allPrescribedExercise, setAllPrescribedExercise] = useState([])

    let [patientAllPrevData, setPatientAllPrevData] = useState([])
    let [patientDetails, setPatientDetails] = useState({})

    let { addToast } = useToasts();
    let [isSubmitting, setIsSubmitting] = useState(false)
    let [todayAllTokens, setTodayAllTokens] = useState([])
    let [isTodayAnyPatient, setIsTodayAnyPatient] = useState(false);
    let [formView, setFormView] = useState(false);

    let [allDiseases, setAllDiseases] = useState([])
    let [allMedicine, setAllMedicine] = useState([])
    let [allExercises, setAllExercises] = useState([])

    let [isLoading, setIsLoading] = useState(true);
    let [isSearching, setIsSearching] = useState(false);
    let [searchingDiseaseData, setSearchingDiseaseData] = useState(false)

    let [responseData, setResponseData] = useState({})

    let [anotherMedicine, setAnotherMedicine] = useState({
        checked: true,
        quantity: '1',
    })

    let [anotherExercise, setAnotherExercise] = useState('')

    let [paginationData, setPaginationData] = useState({
        currentPage: 1,
        record_per_page: 15,
    })

    let [searchedPatient, setSearchedPatient] = useState([])

    let [haveResponse, setHaveResponse] = useState(false);

    let [directConsultation, setDirectConsultation] = useState(false)

    let dispatch = useDispatch()

    let commonState = useSelector((state) => state.commonReducer)

    let state = useSelector((state) => state.ConsultationReducer)

    // Use Carefully it take time to render again

    let resetAllToInitialState = () => {
        setConsultationPayload({
            token_id: '',
        })
        setPaymentDetails({
            prev_balance: 0,
            map_amount: 0,
            actual_amount: 0,
            discount: 0,
        })
        setInfectedPartOfBody({})
        setAnotherWayOfTaken({})
        setAnotherQuestion('')
        setAnotherMedicineInstruction('')
        setAnotherExerciseInstruction('')
        setAnotherDietToTake('')
        setAnotherDietNotToTake('')
        setAnotherSpecialInstruction('')
        setDialysisPayload({})

        setPulseObservationPayload([])
        setPulseObservationValue('')
        setPulseObservationOtherValue('')
        setOtherPulseObservation(false)

        settoungeObservationPayload([])

        settoungeObservationValue('')
        settoungeObservationOtherValue('')
        setOthertoungeObservation(false)

        setDiseasePreferedQuestion([])
        setDiseaseDietToTake([])
        setDiseaseDietNotToTake([])
        setDiseaseMedicineInstruction([])
        setDiseaseExerciseInstruction([])
        setDiseaseSpecialInstruction([])


        setAllPrescribedMedicine([])
        setAllPrescribedExercise([])

        setPatientAllPrevData([])
        setPatientDetails({})

        setIsSubmitting(false)
        setFormView(false);

        setIsLoading(false);
        setIsSearching(false);
        setSearchingDiseaseData(false);

        setResponseData({})

        setAnotherMedicine({
            checked: true,
            quantity: '1',
        })

        setAnotherExercise('')

        setPaginationData({
            currentPage: 1,
            record_per_page: 15,
        })

        setSearchedPatient([])

        setHaveResponse(false);

        setDirectConsultation(false)

    }

    // end reset to initialstate

        // add pulse observation data

        const [pulseObservationPayload, setPulseObservationPayload] = useState([]);
        const [pulseObservationValue, setPulseObservationValue] = useState('');
        const [pulseObservationOtherValue, setPulseObservationOtherValue] = useState('')
        const [otherPulseObservation, setOtherPulseObservation] = useState(false);
        const [pulseObservationOptions, setPulseObservationOptions] = useState([]);
    
        const selectPulseObservation = (e) => {
            if (e.target.value === 'other') {
                setOtherPulseObservation(true)
            }
            else {
                setOtherPulseObservation(false)
                setPulseObservationOtherValue('')
            }
    
            setPulseObservationValue(e.target.value)
    
        }
    
        const pulseObservationOtherHandler = (e) => {
            setPulseObservationOtherValue(e.target.value);
        }
    
        const addPulseObservation = () => {
    
            let pulseObservationPayloadCopy = [...pulseObservationPayload]
    
            if (pulseObservationValue === "") {
                return addToast("Warning!", {
                    appearance: "warning",
                    content: `Please select one to add.`,
                });
            }
    
            if (pulseObservationValue === "other") {
                if (pulseObservationOtherValue === "") {
                    return addToast("Warning!", {
                        appearance: "warning",
                        content: `Please enter some observation value to add.`,
                    });
                }
                else {
    
                    pulseObservationPayloadCopy.push({
                        observation: `${pulseObservationOtherValue}`,
                        checked: true,
                    })
    
                    setPulseObservationValue('')
                    setPulseObservationOtherValue('')
                    setPulseObservationPayload(pulseObservationPayloadCopy)
                    setOtherPulseObservation(false)
                }
            }
            else {
    
                let pulseObservationData = pulseObservationOptions.find((item) => item.id == pulseObservationValue)
                pulseObservationPayloadCopy.push({
                    id:pulseObservationValue,
                    observation: `${pulseObservationData.observation}`,
                    checked: true,
                })
    
                setPulseObservationPayload(pulseObservationPayloadCopy)
                setPulseObservationValue('')
            }
    
        }
    
        // end adding pulse observation data
    
        // Adding tounge observation
        const [toungeObservationPayload, settoungeObservationPayload] = useState([]);
    
        const [toungeObservationValue, settoungeObservationValue] = useState('');
        const [toungeObservationOtherValue, settoungeObservationOtherValue] = useState('')
        const [othertoungeObservation, setOthertoungeObservation] = useState(false);
    
        const [toungeObservationOptions, settoungeObservationOptions] = useState([]);
    
        const selecttoungeObservation = (e) => {
            if (e.target.value === 'other') {
                setOthertoungeObservation(true)
            }
            else {
                setOthertoungeObservation(false)
                settoungeObservationOtherValue('')
            }
    
            settoungeObservationValue(e.target.value)
    
        }
    
        const toungeObservationOtherHandler = (e) => {
            settoungeObservationOtherValue(e.target.value);
        }
    
        const addtoungeObservation = () => {
    
            let toungeObservationPayloadCopy = [...toungeObservationPayload]
    
            if (toungeObservationValue === "") {
                return addToast("Warning!", {
                    appearance: "warning",
                    content: `Please select one to add.`,
                });
            }
    
            if (toungeObservationValue === "other") {
                if (toungeObservationOtherValue === "") {
                    return addToast("Warning!", {
                        appearance: "warning",
                        content: `Please enter some observation value to add.`,
                    });
                }
                else {
    
                    toungeObservationPayloadCopy.push({
                        observation: `${toungeObservationOtherValue}`,
                        checked: true,
                    })
    
                    settoungeObservationValue('')
                    settoungeObservationOtherValue('')
                    settoungeObservationPayload(toungeObservationPayloadCopy)
                    setOthertoungeObservation(false)
                }
            }
            else {
                let toungeObservationDataCopy = toungeObservationOptions.find((item) => item.id == toungeObservationValue)
                toungeObservationPayloadCopy.push({
                    id:toungeObservationValue,
                    observation: `${toungeObservationDataCopy.observation}`,
                    checked: true,
                })
    
                settoungeObservationPayload(toungeObservationPayloadCopy)
                settoungeObservationValue('')
            }
    
        }
    
    
        const removetoungeObservation = (e) => {
    
            let toungeObservationPayloadCopy = [...toungeObservationPayload]
    
            let status = toungeObservationPayloadCopy[e.target.value].checked
    
            if (status == true) {
                toungeObservationPayloadCopy[e.target.value].checked = false
            }
            else {
                toungeObservationPayloadCopy[e.target.value].checked = true
            }
    
            settoungeObservationPayload(toungeObservationPayloadCopy)
        }
    
        // end add tounge observation


    useEffect(() => {
        dispatch(commonAction.getTodayTokens('PreConsultated'))
    }, [state.registerConsultationSuccess, commonState.generateNewTokenSuccess])

    useEffect(() => {
        dispatch(ACTIONS.getAllCommonData())
    }, [])

    useEffect(() => {
        if (commonState.GetTodayTokenSuccess) {
            setIsLoading(false)
            if (commonState.GetTodayTokenSuccess.tokens.length === 0) {
                setIsTodayAnyPatient(false)
            }
            else {
                setTodayAllTokens(commonState.GetTodayTokenSuccess.tokens)
                setIsTodayAnyPatient(true)
            }
        }
        if (commonState.GetTodayTokenFailure) {
            setIsLoading(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get today tokens.`,
            });
        }

        dispatch(commonAction.resetToInitialState())
    }, [commonState.GetTodayTokenSuccess, commonState.GetTodayTokenFailure])

    useEffect(() => {
        if (state.getAllCommonDataSuccess) {
            let allData = state.getAllCommonDataSuccess;

            setPulseObservationOptions(allData.pulseObservation)
            settoungeObservationOptions(allData.toungeObservation)
            setAllDiseases(allData.diseases)
            setAllPreferedQuestion(allData.questions);
            setAllMedicine(allData.medicines)
            setAllExercises(allData.exercises)
            setAllMedicineInstruction(allData.medicineInstructions)
            setAllExerciseInstruction(allData.exerciseInstructions)
            setAllSpecialInstruction(allData.specialInstructions)
            setAllDietToTake(allData.dietsToTake)
            setAllDietNotToTake(allData.dietsNotToTake)
        }
        if (state.getAllCommonDataFailure) {

            addToast("Error!", {
                appearance: "error",
                content: `Unable to get all common data.`,
            });
        }

        dispatch(ACTIONS.resetToInitialState())
    }, [state.getAllCommonDataSuccess, state.getAllCommonDataFailure])


    let handleChangeAnswers = (index, ansIndx) => {
        let diseasePreferedQuestionCopy = [...diseasePreferedQuestion]

        diseasePreferedQuestionCopy[index].answers.map((item, index) => {
            if (index === ansIndx) {
                item.checked = true
            }
            else {
                item.checked = false
            }

            return item;
        })

        // diseasePreferedQuestionCopy[index].answers[ansIndx]['checked'] = true
        setDiseasePreferedQuestion(diseasePreferedQuestionCopy)
    }

    let tokenChangeHandler = (e) => {
        if (e.target.value != '') {
            let consultationPayloadCopy = { ...consultationPayload }
            consultationPayloadCopy['token_id'] = e.target.value;
            setConsultationPayload(consultationPayloadCopy);
            dispatch(ACTIONS.getPatientDetails({ 'token_id': e.target.value }))
            dispatch(commonAction.getPatientAllPrevData({
                'token_id': e.target.value,
            }))
            setIsSubmitting(true)
            setIsSearching(true)
        }
    }

    useEffect(() => {
        if (state.patientDetailsSuccess) {
            let consultationPayloadCopy = { ...consultationPayload }
            let paymentDetailsCopy = { ...paymentDetails }

            let patientData = state.patientDetailsSuccess.data;

            consultationPayloadCopy['patient_id'] = patientData.patient_id;

            paymentDetailsCopy.prev_balance = (patientData.remaining_amount ? patientData.remaining_amount : 0);
            setPaymentDetails(paymentDetailsCopy)
            setConsultationPayload(consultationPayloadCopy)

            setPatientDetails(patientData)
        }

        if (state.patientDetailsFailure) {
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patient details.`,
            });
        }

        dispatch(ACTIONS.resetToInitialState())
    }, [state.patientDetailsSuccess, state.patientDetailsFailure])

    useEffect(() => {
        if (commonState.getAllPrevDataSuccess) {
            setPatientAllPrevData(commonState.getAllPrevDataSuccess.data)
            setIsSearching(false)
            setIsSubmitting(false)
            setFormView(true)
        }

        if (commonState.getAllPrevDataFailure) {
            setIsSubmitting(false)
            setIsSearching(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patient previous details.`,
            });
        }

        dispatch(commonAction.resetToInitialState())
    }, [commonState.getAllPrevDataSuccess, commonState.getAllPrevDataFailure])


    let majorDiseasesHandleChange = (e) => {
        let consultationPayloadCopy = { ...consultationPayload }
        let paymentDetailsCopy = { ...paymentDetails }

        consultationPayloadCopy['major_diseases'] = e.target.value;
        consultationPayloadCopy['major_diseases_name'] = getDiseasesDataById(e.target.value).name
        consultationPayloadCopy['major_diseases_hi_name'] = getDiseasesDataById(e.target.value).hi_name

        setConsultationPayload(consultationPayloadCopy)

        paymentDetailsCopy.map_amount = getDiseasesDataById(e.target.value)?.billing_amount;
        paymentDetailsCopy.actual_amount = (paymentDetails.prev_balance ? parseInt(paymentDetails.prev_balance) : 0) + (getDiseasesDataById(e.target.value)?.billing_amount ? parseInt(getDiseasesDataById(e.target.value)?.billing_amount) : 0);
        setPaymentDetails(paymentDetailsCopy)

        dispatch(ACTIONS.getDiseaseSpecificAllData(e.target.value))
        setIsSubmitting(true)
        setSearchingDiseaseData(true)

    }

    useEffect(() => {
        if (state.getDiseaseSpecificDataSuccess) {
            let allData = state.getDiseaseSpecificDataSuccess;

            // set disease questions\

            setDiseasePreferedQuestion(allData.allQuestions)

            // set disease medicine

            let newPrescribedMedicine = []
            let diseaseMedicineData = allData.allMedicines;

            if (diseaseMedicineData.length > 0) {
                diseaseMedicineData.map((item) => {
                    newPrescribedMedicine.push({
                        checked: true,
                        In_Take_Sequence: item.In_Take_Sequence,
                        medicine: item.medicine,
                        medicine_hi_name: item.medicine_hi_name,
                        medicine_name: item.medicine_name,
                        buy_from: 'arogyapath',
                        consumption_count: item.consumption_count,
                        quantity: 1,
                        how_to_take: item.how_to_take,
                    })
                })
            }

            setAllPrescribedMedicine(newPrescribedMedicine)

            // set disease Exercise

            let preferedExercisesData = []
            let diseaseExerciseData = allData.allExercises;

            if (diseaseExerciseData.length > 0) {
                diseaseExerciseData.map((item) => {
                    preferedExercisesData.push({
                        'checked': true,
                        'exercise_name': item.name,
                        'exercise_hi_name': item.hi_name,
                        'exercise': item.id,
                    })
                })
            }

            setAllPrescribedExercise(preferedExercisesData)

            // set disease medicine instruction
            let allMedicineInsData = []

            if (allData.allMedicineIns && allData.allMedicineIns.length > 0) {

                allData.allMedicineIns.map((item, index) => {
                    allMedicineInsData[index] = {
                        checked: true,
                        instruction: item.instruction,
                        hi_instruction: item.hi_instruction,
                        inst_id: item.id,
                    }
                })
            }

            setDiseaseMedicineInstruction(allMedicineInsData)

            // Set disease exercise instruction 

            let allExerciseInsData = []

            if (allData.allExerciseIns && allData.allExerciseIns.length > 0) {

                allData.allExerciseIns.map((item, index) => {
                    allExerciseInsData[index] = {
                        checked: true,
                        instruction: item.instruction,
                        hi_instruction: item.hi_instruction,
                        inst_id: item.id,
                    }
                })
            }

            setDiseaseExerciseInstruction(allExerciseInsData)

            // set disease special instruction

            let allSpecialInsData = []

            if (allData.allSpecialIns && allData.allSpecialIns.length > 0) {

                allData.allSpecialIns.map((item, index) => {
                    allSpecialInsData[index] = {
                        checked: true,
                        instruction: item.instruction,
                        hi_instruction: item.hi_instruction,
                        inst_id: item.id,
                    }
                })
            }

            setDiseaseSpecialInstruction(allSpecialInsData)

            // set disease diet to take

            let allDietsToTakeData = []

            if (allData.allDietsToTake && allData.allDietsToTake.length > 0) {

                allData.allDietsToTake.map((item, index) => {
                    allDietsToTakeData[index] = {
                        checked: true,
                        description: item.description,
                        hi_description: item.hi_description,
                        diet: item.id,
                    }
                })
            }

            setDiseaseDietToTake(allDietsToTakeData)

            // set disease diet not to take

            let allDietsNotToTakeData = []

            if (allData.allDietsNotToTake && allData.allDietsNotToTake.length > 0) {

                allData.allDietsNotToTake.map((item, index) => {
                    allDietsNotToTakeData[index] = {
                        checked: true,
                        description: item.description,
                        hi_description: item.hi_description,
                        diet: item.id,
                    }
                })
            }

            setDiseaseDietNotToTake(allDietsNotToTakeData)

            setIsSubmitting(false)
            setSearchingDiseaseData(false)
        }

        if (state.getDiseaseSpecificDataFailure) {
            setIsSubmitting(false)
            setSearchingDiseaseData(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get Disease Specific Data.`,
            });
        }

        dispatch(ACTIONS.resetToInitialState())
    }, [state.getDiseaseSpecificDataSuccess, state.getDiseaseSpecificDataFailure])

    let dialysisHandleChange = (e) => {
        let dialysisObj = { ...dialysisPayload }
        dialysisObj[e.target.id] = e.target.value
        setDialysisPayload(dialysisObj)
    }

    let diselectMedicine = (index) => {

        let allPrescribedMedicineCopy = [...allPrescribedMedicine]

        if (allPrescribedMedicineCopy[index].checked == true) {
            allPrescribedMedicineCopy[index].checked = false
        }
        else {
            allPrescribedMedicineCopy[index].checked = true
        }
        setAllPrescribedMedicine(allPrescribedMedicineCopy)
    }

    let diselectExercises = (index) => {
        let allPrescribedExerciseCopy = [...allPrescribedExercise]

        if (allPrescribedExerciseCopy[index].checked == true) {
            allPrescribedExerciseCopy[index].checked = false
        }
        else {
            allPrescribedExerciseCopy[index].checked = true
        }
        setAllPrescribedExercise(allPrescribedExerciseCopy)
    }

    let diselectMedicineInstruction = (index) => {
        let allDiseaseMedicineInstructionCopy = [...diseaseMedicineInstruction]

        if (allDiseaseMedicineInstructionCopy[index].checked == true) {
            allDiseaseMedicineInstructionCopy[index].checked = false
        }
        else {
            allDiseaseMedicineInstructionCopy[index].checked = true
        }
        setDiseaseMedicineInstruction(allDiseaseMedicineInstructionCopy)
    }

    let diselectExerciseInstruction = (index) => {
        let allDiseaseExerciseInstructionCopy = [...diseaseExerciseInstruction]

        if (allDiseaseExerciseInstructionCopy[index].checked == true) {
            allDiseaseExerciseInstructionCopy[index].checked = false
        }
        else {
            allDiseaseExerciseInstructionCopy[index].checked = true
        }
        setDiseaseExerciseInstruction(allDiseaseExerciseInstructionCopy)
    }

    let diselectSpecialInstruction = (index) => {
        let allDiseaseSpecialInstructionCopy = [...diseaseSpecialInstruction]

        if (allDiseaseSpecialInstructionCopy[index].checked == true) {
            allDiseaseSpecialInstructionCopy[index].checked = false
        }
        else {
            allDiseaseSpecialInstructionCopy[index].checked = true
        }
        setDiseaseSpecialInstruction(allDiseaseSpecialInstructionCopy)
    }

    let diselectDietsToTake = (index) => {
        let allDiseaseDietsToTakeCopy = [...diseaseDietToTake]

        if (allDiseaseDietsToTakeCopy[index].checked == true) {
            allDiseaseDietsToTakeCopy[index].checked = false
        }
        else {
            allDiseaseDietsToTakeCopy[index].checked = true
        }
        setDiseaseDietToTake(allDiseaseDietsToTakeCopy)
    }

    let diselectDietsNotToTake = (index) => {
        let allDiseaseDietsNotToTakeCopy = [...diseaseDietNotToTake]

        if (allDiseaseDietsNotToTakeCopy[index].checked == true) {
            allDiseaseDietsNotToTakeCopy[index].checked = false
        }
        else {
            allDiseaseDietsNotToTakeCopy[index].checked = true
        }
        setDiseaseDietNotToTake(allDiseaseDietsNotToTakeCopy)
    }

    let prescribeMedicineHandleChange = (e, i) => {

        let prescribedMedicine = [...allPrescribedMedicine]
        prescribedMedicine[i][e.target.id] = e.target.value
        setAllPrescribedMedicine(prescribedMedicine)
    }

    let anotherMedicineHandler = (e) => {
        let anotherMedicineCopy = { ...anotherMedicine }

        if (e.target.id == 'medicine') {
            let medicineData = allMedicine.find((item) => item.id == e.target.value)
            anotherMedicineCopy['medicine_name'] = medicineData.name
            anotherMedicineCopy['medicine_hi_name'] = medicineData.hi_name
            anotherMedicineCopy['how_to_take'] = []
            setAnotherWayOfTaken({
                'time_of_take': '',
                'hi_time_of_take': '',
                'how_to_take_conf': '',
            })
        }
        anotherMedicineCopy[e.target.id] = e.target.value
        setAnotherMedicine(anotherMedicineCopy)
    }

    let handleOtherWayOfTakeChange = (e) => {
        let anotherWayOfTakencopy = { ...anotherWayOfTaken }
        anotherWayOfTakencopy[e.target.id] = e.target.value
        setAnotherWayOfTaken(anotherWayOfTakencopy)
    }

    let addOtherWayOfTaken = () => {

        if (anotherWayOfTaken.how_to_take_conf && anotherWayOfTaken.how_to_take_conf != '') {

            let anotherMedicineCopy = { ...anotherMedicine }
            let newObj = {}

            if (anotherWayOfTaken.time_of_take) {
                newObj['time_of_take'] = anotherWayOfTaken.time_of_take
            }
            else {
                newObj['time_of_take'] = ''
            }

            if (anotherWayOfTaken.hi_time_of_take) {
                newObj['hi_time_of_take'] = anotherWayOfTaken.hi_time_of_take
            }
            else {
                newObj['hi_time_of_take'] = ''
            }

            let medicineWayOfTaken = getMedicineDataById(anotherMedicine?.medicine).all_way_of_taken[anotherWayOfTaken.how_to_take_conf]

            newObj['way_of_taken'] = medicineWayOfTaken.way_of_taken
            newObj['hi_way_of_taken'] = medicineWayOfTaken.hi_way_of_taken

            if (anotherMedicineCopy.how_to_take && anotherMedicineCopy.how_to_take.length > 0) {
                anotherMedicineCopy.how_to_take.push(newObj)
            }
            else {
                anotherMedicineCopy['how_to_take'] = [newObj]
            }

            setAnotherMedicine(anotherMedicineCopy)
            setAnotherWayOfTaken({
                'time_of_take': '',
                'hi_time_of_take': '',
                'how_to_take_conf': '',
            })
        } else {
            addToast("Warning!", {
                appearance: "warning",
                content: `Please fill all medatory fields.`,
            });
        }

    }

    let RemoveAnotherMedicineWayOfTake = (index) => {
        let anotherMedicineCopy = { ...anotherMedicine }
        anotherMedicineCopy.how_to_take = anotherMedicineCopy.how_to_take.filter((itm, ind) => ind != index)
        setAnotherMedicine(anotherMedicineCopy)
    }

    function array_move(arr, old_index, new_index) {
        let anotherMedicineCopy = { ...anotherMedicine }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        anotherMedicineCopy.how_to_take = arr;
        setAnotherMedicine(anotherMedicineCopy)

    };

    let addAnotherMedicine = () => {

        let allPrescribedMedicineCopy = [...allPrescribedMedicine]
        let alreadyHaveMedicine = allPrescribedMedicineCopy.find((item) => item.medicine == anotherMedicine.medicine)

        if (alreadyHaveMedicine) {
            return addToast("Warning!", {
                appearance: "warning",
                content: `This medicine already mapped.`,
            });
        }
        else {
            if (anotherMedicine.medicine && anotherMedicine.buy_from) {
                let length = allPrescribedMedicineCopy.length
                let anotherMedicineCopy = { ...anotherMedicine }

                let InTakeSequences = allPrescribedMedicineCopy.map(object => {
                    return parseInt(object.In_Take_Sequence);
                });

                let maxSqNo = Math.max(...InTakeSequences);

                if(length > 0){
                    anotherMedicineCopy['In_Take_Sequence'] = maxSqNo + 1;
                }else{
                    anotherMedicineCopy['In_Take_Sequence'] = 1;
                }

                allPrescribedMedicineCopy[length] = anotherMedicineCopy

                setAllPrescribedMedicine(allPrescribedMedicineCopy)

                setAnotherMedicine({
                    checked: true,
                    medicine: '',
                    buy_from: '',
                    consumption_count: '',
                    quantity: '1',
                })

                setAnotherWayOfTaken({
                    'time_of_take': '',
                    'hi_time_of_take': '',
                    'how_to_take_conf': '',
                })

            }
            else {
                addToast("Warning!", {
                    appearance: "warning",
                    content: `Please fill all medatory fields.`,
                });
            }
        }
    }

    let addAnotherMedicineInstruction = () => {
        if (anotherMedicineInstruction && anotherMedicineInstruction != '') {
            let DiseaseMedicineInstructionCopy = [...diseaseMedicineInstruction]
            let anotherInstructionData = allMedicineInstruction.find((itm) => itm.id == anotherMedicineInstruction)

            DiseaseMedicineInstructionCopy.push({
                instruction: anotherInstructionData.instruction,
                hi_instruction: anotherInstructionData.hi_instruction,
                inst_id: anotherInstructionData.id,
                checked: true
            })
            setDiseaseMedicineInstruction(DiseaseMedicineInstructionCopy)
            setAnotherMedicineInstruction('')
        }
        else {
            return addToast("Warning!", {
                appearance: "warning",
                content: `Please select medicine instruction.`,
            });
        }
    }

    let addAnotherExerciseInstruction = () => {
        if (anotherExerciseInstruction && anotherExerciseInstruction != '') {
            let DiseaseExerciseInstructionCopy = [...diseaseExerciseInstruction]
            let anotherInstructionData = allExerciseInstruction.find((itm) => itm.id == anotherExerciseInstruction)

            DiseaseExerciseInstructionCopy.push({
                instruction: anotherInstructionData.instruction,
                hi_instruction: anotherInstructionData.hi_instruction,
                inst_id: anotherInstructionData.id,
                checked: true
            })
            setDiseaseExerciseInstruction(DiseaseExerciseInstructionCopy)
            setAnotherExerciseInstruction('')
        }
        else {
            return addToast("Warning!", {
                appearance: "warning",
                content: `Please select exercise instruction.`,
            });
        }
    }

    let addAnotherSpecialInstruction = () => {
        if (anotherSpecialInstruction && anotherSpecialInstruction != '') {
            let DiseaseSpecialInstructionCopy = [...diseaseSpecialInstruction]
            let anotherInstructionData = allSpecialInstruction.find((itm) => itm.id == anotherSpecialInstruction)

            DiseaseSpecialInstructionCopy.push({
                instruction: anotherInstructionData.instruction,
                hi_instruction: anotherInstructionData.hi_instruction,
                inst_id: anotherInstructionData.id,
                checked: true
            })
            setDiseaseSpecialInstruction(DiseaseSpecialInstructionCopy)
            setAnotherSpecialInstruction('')
        }
        else {
            return addToast("Warning!", {
                appearance: "warning",
                content: `Please select special instruction.`,
            });
        }
    }

    let addAnotherDietToTake = () => {
        if (anotherDietToTake && anotherDietToTake != '') {
            let DiseaseDietToTakeCopy = [...diseaseDietToTake]
            let anotherDietData = allDietToTake.find((itm) => itm.id == anotherDietToTake)

            DiseaseDietToTakeCopy.push({
                description: anotherDietData.description,
                hi_description: anotherDietData.hi_description,
                diet: anotherDietData.id,
                checked: true
            })
            setDiseaseDietToTake(DiseaseDietToTakeCopy)
            setAnotherDietToTake('')
        }
        else {
            return addToast("Warning!", {
                appearance: "warning",
                content: `Please select diet to take.`,
            });
        }
    }

    let addAnotherDietNotToTake = () => {
        if (anotherDietNotToTake && anotherDietNotToTake != '') {
            let DiseaseDietNotToTakeCopy = [...diseaseDietNotToTake]
            let anotherDietData = allDietNotToTake.find((itm) => itm.id == anotherDietNotToTake)

            DiseaseDietNotToTakeCopy.push({
                description: anotherDietData.description,
                hi_description: anotherDietData.hi_description,
                diet: anotherDietData.id,
                checked: true
            })
            setDiseaseDietNotToTake(DiseaseDietNotToTakeCopy)
            setAnotherDietNotToTake('')
        }
        else {
            return addToast("Warning!", {
                appearance: "warning",
                content: `Please select diet not to take.`,
            });
        }
    }

    let addAnotherExercise = () => {

        let allPrescribedExerciseCopy = [...allPrescribedExercise]

        let alreadyHaveExercises = allPrescribedExerciseCopy.find((item) => item.exercise == anotherExercise)

        if (alreadyHaveExercises) {
            return addToast("Warning!", {
                appearance: "warning",
                content: `This Exercise already mapped.`,
            });
        }
        else {
            if (anotherExercise && anotherExercise != '') {
                let length = allPrescribedExerciseCopy.length
                let exerciseData = allExercises.find((item) => item.id == anotherExercise)

                let anotherExerciseCopy = {
                    exercise_hi_name: exerciseData.hi_name,
                    exercise_name: exerciseData.name,
                    checked: true,
                    exercise: exerciseData.id,
                }

                allPrescribedExerciseCopy[length] = anotherExerciseCopy
                setAllPrescribedExercise(allPrescribedExerciseCopy)
                setAnotherExercise('')
            }
            else {
                addToast("Warning!", {
                    appearance: "warning",
                    content: `Please select a exercise.`,
                });
            }
        }
    }

    let infectedPartOnchangeHandler = (e) => {
        let infectedPartOfBodyCopy = { ...infectedPartOfBody }
        infectedPartOfBodyCopy[e.target.id] = e.target.value;
        setInfectedPartOfBody(infectedPartOfBodyCopy)
    }

    let handleOnChange = (e) => {
        let consultationPayloadCopy = { ...consultationPayload }
        if (e.target.id == 'medicine_duration') {
            if (isNaN(e.target.value)) {
                return addToast("Warning!", {
                    appearance: "warning",
                    content: `Only Number allowed.`,
                });
            }
        }
        consultationPayloadCopy[e.target.id] = e.target.value;
        setConsultationPayload(consultationPayloadCopy);
    }

    let handleOnSubmit = () => {

        let consultationPayloadCopy = { ...consultationPayload }

        let pulseObservationPayloadCopy = pulseObservationPayload.filter((item) => item.checked == true)

        let pulseObservationData = []

        pulseObservationPayloadCopy.map((item) => {
            delete item.checked
            pulseObservationData.push(item)
        })

        // filter tounge observation checked data

        let toungeObservationPayloadCopy = toungeObservationPayload.filter((item) => item.checked == true)

        let toungeObservationData = []

        toungeObservationPayloadCopy.map((item) => {
            delete item.checked
            toungeObservationData.push(item)
        })


        // filter question and answer

        let questionAnswerData = []

        const questionAnswerCopy = diseasePreferedQuestion.filter((element) => {
            return element.answers.find(item => {
                return item.checked == true
            })
        })

        questionAnswerCopy.map((item) => {

            let answer = item.answers.find((element) => element.checked == true)
            delete answer.checked
            questionAnswerData.push({
                'question': item.question,
                'hi_question': item.hi_question,
                'id': item.id,
                'answer': answer,
            })
        })

        // filter diet to take checked data

        let diseaseDietToTakeCopy = diseaseDietToTake.filter((item) => item.checked == true)

        let diseaseDietToTakeData = []

        diseaseDietToTakeCopy.map((item) => {
            delete item.checked
            diseaseDietToTakeData.push(item)
        })

        // filter diet not to take checked data

        let diseaseDietNotToTakeCopy = diseaseDietNotToTake.filter((item) => item.checked == true)

        let diseaseDietNotToTakeData = []

        diseaseDietNotToTakeCopy.map((item) => {
            delete item.checked
            diseaseDietNotToTakeData.push(item)
        })

        // filter medicine instruction data

        let diseaseMedicineInstructionCopy = diseaseMedicineInstruction.filter((item) => item.checked == true)

        let diseaseMedicineInstructionData = []

        diseaseMedicineInstructionCopy.map((item) => {
            delete item.checked
            diseaseMedicineInstructionData.push(item)
        })


        // filter Exercise instruction data

        let diseaseExerciseInstructionCopy = diseaseExerciseInstruction.filter((item) => item.checked == true)

        let diseaseExerciseInstructionData = []

        diseaseExerciseInstructionCopy.map((item) => {
            delete item.checked
            diseaseExerciseInstructionData.push(item)
        })


        // filter Special instruction data

        let diseaseSpecialInstructionCopy = diseaseSpecialInstruction.filter((item) => item.checked == true)

        let diseaseSpecialInstructionData = []

        diseaseSpecialInstructionCopy.map((item) => {
            delete item.checked
            diseaseSpecialInstructionData.push(item)
        })

        // filter exercise data

        let exerciseDataCopy = allPrescribedExercise.filter((item) => item.checked == true)

        let exerciseAllData = []

        exerciseDataCopy.map((item) => {
            delete item.checked
            exerciseAllData.push(item)
        })

        // filter medicine data

        let medicineDataCopy = allPrescribedMedicine.filter((item) => item.checked == true)

        let medicineAllData = []

        medicineDataCopy.map((item) => {
            delete item.checked
            medicineAllData.push(item)
        })

        // filter dialysis data

        if (dialysisPayload.happen == 'no') {
            delete dialysisPayload.inWeeks
        }


        consultationPayloadCopy['pulse_observation'] = pulseObservationData;//
        consultationPayloadCopy['tounge_observation'] = toungeObservationData;//
        consultationPayloadCopy['prefered_question'] = questionAnswerData;
        consultationPayloadCopy['payment_details'] = paymentDetails;//
        consultationPayloadCopy['dialysis_details'] = dialysisPayload; //
        consultationPayloadCopy['infected_part_of_body'] = infectedPartOfBody; //
        consultationPayloadCopy['medicine_instruction'] = diseaseMedicineInstructionData;//
        consultationPayloadCopy['exercise_instruction'] = diseaseExerciseInstructionData; //
        consultationPayloadCopy['special_instruction'] = diseaseSpecialInstructionData;
        consultationPayloadCopy['diet_to_take'] = diseaseDietToTakeData;
        consultationPayloadCopy['diet_not_to_take'] = diseaseDietNotToTakeData;
        consultationPayloadCopy['exercises'] = exerciseAllData;//
        consultationPayloadCopy['medicines'] = medicineAllData; //


        setIsSubmitting(true)
        dispatch(ACTIONS.registerConsultation(consultationPayloadCopy));
    }

    useEffect(() => {
        if (state.registerConsultationSuccess) {
            setIsSubmitting(false)
            setHaveResponse(true)
            addToast("Success!", {
                appearance: "success",
                content: `Patient Consultated Succesfully.`,
            });
        }
        if (state.registerConsultationFailure) {
            setIsSubmitting(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to consultate patient.`,
            });
        }

        dispatch(ACTIONS.resetToInitialState())
    }, [state.registerConsultationSuccess, state.registerConsultationFailure])

    let closeModal = () => {
        resetAllToInitialState();
    }

    let getMedicineDataById = (medicine) => {
        let medicineData = allMedicine.find(element => element.id == medicine)
        return medicineData;
    }

    let getDiseasesDataById = (diseases) => {
        let diseasesData = allDiseases.find(element => element.id == diseases)
        return diseasesData;
    }

    let handleSearchInput = (e) => {
        let paginationDataCopy = { ...paginationData }
        paginationDataCopy[e.target.name] = e.target.value
        setPaginationData(paginationDataCopy)
    }

    let handlePaginationDataChange = (e) => {
        let paginationDataCopy = { ...paginationData }
        paginationDataCopy[e.target.name] = e.target.value
        setPaginationData(paginationDataCopy)
        setIsSearching(true)
        dispatch(commonAction.searchPatient(paginationDataCopy))
    }

    let handleSearchPatient = () => {
        if (paginationData.searchValue && paginationData.searchValue != "") {
            setIsSubmitting(true)
            setIsSearching(true)
            dispatch(commonAction.searchPatient(paginationData))
        }
        else {
            return addToast("Warning!", {
                appearance: "warning",
                content: `Enter some value.`,
            });
        }
    }

    let handleMedicineInstruction = (e) => {
        let consultationPayloadCopy = { ...consultationPayload }
        consultationPayloadCopy.medicine_config_instruction = e.target.value
        setConsultationPayload(consultationPayloadCopy)
    }

    useEffect(() => {
        if (commonState.patientSearchSuccess) {
            setIsSubmitting(false)
            setSearchedPatient(commonState.patientSearchSuccess.patients.data)
            setIsSearching(false)

            let paginationDataCopy = { ...paginationData }
            let allReceivedData = commonState.patientSearchSuccess.patients

            paginationDataCopy['currentPage'] = allReceivedData.current_page;
            paginationDataCopy['recordFrom'] = allReceivedData.from;
            paginationDataCopy['recordTo'] = allReceivedData.to;
            paginationDataCopy['lastPage'] = allReceivedData.last_page;
            paginationDataCopy['total'] = allReceivedData.total;

            setPaginationData(paginationDataCopy)

            setIsLoading(false)
            setIsSearching(false)


            if (commonState.patientSearchSuccess?.patients?.data?.length > 0) {
                setIsSearching(false)
            }
            if (commonState.patientSearchSuccess?.patients?.data?.length == 0) {
                addToast("Warning!", {
                    appearance: "warning",
                    content: `No matching record found.`,
                });
            }
        }

        if (commonState.patientSearchFailure) {
            setIsSubmitting(false)
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get patient.`,
            });
        }

        dispatch(commonAction.resetToInitialState())

    }, [commonState.patientSearchSuccess, commonState.patientSearchFailure])


    let handleGenerateNewToken = (patient_id) => {
        setIsSubmitting(true)
        dispatch(commonAction.generateNewToken({
            'patient_id': patient_id,
            'progress_status': 'PreConsultated'
        }))
    }


    useEffect(() => {
        if (commonState.generateNewTokenSuccess) {
            setIsSubmitting(false)
            setResponseData(commonState.generateNewTokenSuccess)
            addToast("Success!", {
                appearance: "success",
                content: `Generate New Token Success.`,
            });

        }

        if (commonState.generateNewTokenFailure) {
            setIsSubmitting(false)
            if (commonState.generateNewTokenFailure?.message) {
                addToast("Warning!", {
                    appearance: "warning",
                    content: `${commonState.generateNewTokenFailure?.message}`,
                });
            }
            else {
                addToast("Error!", {
                    appearance: "error",
                    content: `Unable to create token.`,
                });
            }
        }

        dispatch(commonAction.resetToInitialState())

    }, [commonState.generateNewTokenSuccess, commonState.generateNewTokenFailure])


    let handleAccountDetailChange = (e) => {
        let paymentDetailsCopy = { ...paymentDetails }
        if (e.target.id == 'actual_amount') {
            if (paymentDetailsCopy.discount > e.target.value) {
                return addToast("Warning!", {
                    appearance: "warning",
                    content: `Actual Amount can not be less than discount.`,
                });
            }
            if (isNaN(e.target.value)) {
                return addToast("Warning!", {
                    appearance: "warning",
                    content: `Actual Amount must be a number.`,
                });
            }
        }

        if (e.target.id == 'discount') {
            if (paymentDetailsCopy.actual_amount < e.target.value) {
                return addToast("Warning!", {
                    appearance: "warning",
                    content: `Actual Amount can not be less than discount.`,
                });
            }
            if (isNaN(e.target.value)) {
                return addToast("Warning!", {
                    appearance: "warning",
                    content: `Discount must be a number.`,
                });
            }
        }

        paymentDetailsCopy[e.target.id] = e.target.value
        setPaymentDetails(paymentDetailsCopy)
    }

    let filterdMedicine = () => {

        let alreadyHave = [...allPrescribedMedicine]

        const filteredData = allMedicine.filter((element) => {
            return !alreadyHave.find(item => {
                return item.medicine == element.id
            })
        })

        return filteredData

    }

    let filterdMedicineInstruction = () => {

        let alreadyHave = [...diseaseMedicineInstruction]

        const filteredData = allMedicineInstruction.filter((element) => {
            return !alreadyHave.find(item => {
                return item.inst_id == element.id
            })
        })

        return filteredData

    }

    let filterdExercises = () => {

        let alreadyHave = allPrescribedExercise

        const filteredData = allExercises.filter((element) => {
            return !alreadyHave.find(item => {
                return item.exercise == element.id
            })
        })

        return filteredData

    }

    let filterdExerciseInstruction = () => {

        let alreadyHave = [...diseaseExerciseInstruction]

        const filteredData = allExerciseInstruction.filter((element) => {
            return !alreadyHave.find(item => {
                return item.inst_id == element.id
            })
        })

        return filteredData

    }

    let filterdSpecialInstruction = () => {

        let alreadyHave = [...diseaseSpecialInstruction]

        const filteredData = allSpecialInstruction.filter((element) => {
            return !alreadyHave.find(item => {
                return item.inst_id == element.id
            })
        })

        return filteredData

    }

    let filterdDietsToTake = () => {

        let alreadyHave = [...diseaseDietToTake]

        const filteredData = allDietToTake.filter((element) => {
            return !alreadyHave.find(item => {
                return item.diet == element.id
            })
        })

        return filteredData

    }

    let filterdDietsNotToTake = () => {

        let alreadyHave = [...diseaseDietNotToTake]

        const filteredData = allDietNotToTake.filter((element) => {
            return !alreadyHave.find(item => {
                return item.diet == element.id
            })
        })

        return filteredData

    }

    let filteredQuestions = () => {

        let alreadyHave = diseasePreferedQuestion

        const filteredData = allPreferedQuestion.filter((element) => {
            return !alreadyHave.find(item => {
                return item.id == element.id
            })
        })


        return filteredData

    }

    let removepulseObservation = (e) => {

        let pulseObservationPayloadCopy = [...pulseObservationPayload]

        let status = pulseObservationPayloadCopy[e.target.value].checked

        if (status == true) {
            pulseObservationPayloadCopy[e.target.value].checked = false
        }
        else {
            pulseObservationPayloadCopy[e.target.value].checked = true
        }

        setPulseObservationPayload(pulseObservationPayloadCopy)
    }

    let addAnotherQuestion = () => {

        if(anotherQuestion && anotherQuestion != ''){

        
        let data = allPreferedQuestion.find((item) => item.id == anotherQuestion)
        let diseasePreferedQuestionCopy = [...diseasePreferedQuestion]

        if(data){
        diseasePreferedQuestionCopy.push({
            'id': data.id,
            'question': data.question,
            'hi_question': data.hi_question,
            'answers': data.answers,
        })
        setDiseasePreferedQuestion(diseasePreferedQuestionCopy)
        setAnotherQuestion('')

        }else{
            return addToast("Warning!", {
                appearance: "warning",
                content: `No quetion found to add.`,
            });
        }
        }
        else{
            return addToast("Warning!", {
                appearance: "warning",
                content: `Select quetion to add.`,
            });
        }
    }

    return (<>
        <section className={FormStyle.commonFormArea}>
            <div className="container">
                <div className="row">
                    {haveResponse &&
                        <div className={customModalStyle.customModalLayout}>
                            <div className={customModalStyle.customModalBox}>
                                <p className='text-center text-success'>
                                <CommonText en="Patient Consultated Successfully." hi="रोगी का सफलतापूर्वक परामर्श किया गया।"/>
                                </p>
                                <button type='button' className='btn btn-success' onClick={() => closeModal()}>
                                <CommonText en="Ok" hi="ठीक है"/>
                                </button>
                            </div>
                        </div>
                    }
                    {responseData.tokenNo && <div className={customModalStyle.customModalLayout}>
                        <div className={customModalStyle.customModalBox}>
                            <p className='text-center text-success'>
                            <CommonText en="Consultation Provide successfully." hi="सफलतापूर्वक परामर्श प्रदान"/>
                                
                            </p>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12 d-flex justify-content-between align-items-center mt-3'>
                                        <h6 className='mb-0'>
                                        <CommonText en="Consultation token number" hi="परामर्श टोकन संख्या"/>
                                        </h6>
                                        <div className='d-flex'>
                                            <input id="tokenNo" type="text" className={customModalStyle.customResponseBox} value={responseData.tokenNo} disabled />
                                        </div>
                                    </div>
                                    <div className='col-12 d-flex justify-content-center mt-4'>
                                        <button type="button" className={FormStyle.formButton} onClick={() => {
                                            setResponseData({})
                                        }}>
                                            <CommonText en="Ok" hi="ठीक है"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {isLoading ?
                        <div className='row justify-content-center py-5'>
                            <LoadingSpin
                                size="100px"
                                primaryColor="#2BBF50" />
                        </div>
                        : <>
                            <div className="col-lg-12">
                                <div className={`${FormStyle.commonFormWrapper} ${FormStyle.consultationHeight}`}>
                                    <div className="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-8'>
                                                <h1 className={`${FormStyle.formTitle} mb-0 pb-0 `}>
                                                    
                                                    <CommonText en='Patient Information' hi='रोगी की जानकारी' />
                                                </h1>
                                            </div>
                                            <div className='col-md-4 text-end'>
                                                {directConsultation ? <button className="common-gradient" onClick={() => resetAllToInitialState()}>
                                                    <BiPlus />
                                                    <CommonText en='Consultation' hi='परामर्श' />
                                                </button>
                                                    :
                                                    <button className="common-gradient" onClick={() => {
                                                        setDirectConsultation(true);
                                                    }}>
                                                        <BiPlus />
                                                        <CommonText en='Direct Consultation' hi='तत्काल परामर्श' />
                                                    </button>}
                                            </div>
                                        </div>
                                    </div>
                                    {directConsultation ? <>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className={FormStyle.feildWrapper}>
                                                    <label htmlFor=""
                                                        className={FormStyle.customLabelSecond}>
                                                        <CommonLang labelContent='Registration No / Mobile' keyword='name' />
                                                    </label>
                                                    <input type="text" name="searchValue"
                                                   
                                                        placeholder={ CommonPlainText({
                                                            en:'Registration No/ Mobile',
                                                            hi:'पंजीकरण संख्या/मोबाइल नंबर  '
                                                         })}
                                                        
                                                        value={paginationData.searchValue}
                                                        onChange={(e) => handleSearchInput(e)}
                                                        onKeyUp={(e) => {e.key == 'Enter' && handleSearchPatient()}}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-md-4 d-flex align-items-end'>
                                                <div className={FormStyle.feildWrapper}>
                                                    <button className='common-gradient' onClick={() => handleSearchPatient()} disabled={isSubmitting}>
                                                        <ImSearch /> &nbsp; &nbsp;<CommonText en="Search" hi="खोजें" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        {isSearching ?
                                            <div className='row justify-content-center'>
                                                <LoadingSpin
                                                    size="100px"
                                                    primaryColor="#2BBF50" />
                                            </div> : <>
                                                {searchedPatient?.length > 0 &&
                                                    <div className={FormStyle.allListTable}>
                                                        <table>
                                                            <thead>
                                                                <tr className={FormStyle.allListTableHeadings}>
                                                                    <th><CommonLang labelContent='Name' keyword='name' /></th>
                                                                    <th><CommonLang labelContent='Email' keyword='email' /></th>
                                                                    <th><CommonLang labelContent='Contact Number' keyword='contact_no' /></th>
                                                                    <th><CommonLang labelContent='Registration No' keyword='registration_no' /></th>
                                                                    <th className={FormStyle.allListTableActionList}></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {searchedPatient.map((item, index) => {
                                                                    return (<tr className={FormStyle.allListTableSingleRow} key={index}>
                                                                        <td>{item?.name}</td>
                                                                        <td>{item?.email}</td>
                                                                        <td>{item?.mobile}</td>
                                                                        <td>{item?.Registration_no}</td>
                                                                        <td> <button type='button' className='common-gradient' onClick={() => handleGenerateNewToken(item.id)} disabled={isSubmitting}><CommonText en="Provide Consultation" hi="परामर्श प्रदान करें" /></button></td>
                                                                    </tr>)
                                                                })}
                                                            </tbody>
                                                        </table>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className='d-flex'>
                                                                <button type='button' className='btn' name='currentPage'
                                                                    value={paginationData.currentPage - 1 == 0 ? 1 : paginationData.currentPage - 1}
                                                                    onClick={(e) => handlePaginationDataChange(e)} disabled={paginationData.currentPage - 1 == 0}>
                                                                    <CommonText en="Prev" hi="पिछला" />
                                                                </button>

                                                                <Pagination from={1} to={paginationData.lastPage} current={paginationData.currentPage} onclick={handlePaginationDataChange} />

                                                                <button type='button' className='btn'
                                                                    name='currentPage'
                                                                    value={paginationData.currentPage + 1 > paginationData.lastPage ? paginationData.lastPage :
                                                                        paginationData.currentPage + 1}
                                                                    onClick={(e) => handlePaginationDataChange(e)}
                                                                    disabled={paginationData.currentPage + 1 > paginationData.lastPage}>
                                                                    <CommonText en="next" hi="अगला" /></button>
                                                            </div>
                                                        </div>
                                                    </div>}
                                            </>}
                                    </> :
                                        <>
                                            {isTodayAnyPatient ? <>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <div className={FormStyle.feildWrapper}>
                                                                <label htmlFor='token_id' className={FormStyle.customLabelSecond}>
                                                                    <CommonLang labelContent='Token No' keyword='token_no' />
                                                                </label>
                                                                <select
                                                                    className="form-select text-start"
                                                                    id="token_id"
                                                                    value={consultationPayload?.token_id}
                                                                    onChange={(e) => tokenChangeHandler(e)}>
                                                                    <option value='' disabled hidden>
                                                                        <CommonLang labelContent='Select' keyword='select' /></option>
                                                                    {todayAllTokens?.length > 0 && <>
                                                                        {todayAllTokens.map((item, index) => {
                                                                            return (<option value={item?.id} key={index}>{item?.token_no}</option>)
                                                                        })}</>}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {patientDetails?.name &&
                                                            <div className="col-md-3">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label className={FormStyle.customLabelSecond}>
                                                                        <CommonLang labelContent='Name' keyword='name' />
                                                                    </label>
                                                                    <div className="input-group-text">
                                                                        {patientDetails?.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {patientDetails?.Registration_no &&
                                                            <div className="col-md-3">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label className={FormStyle.customLabelSecond}>
                                                                        <CommonLang labelContent='Registration No' keyword='registration_no' />
                                                                    </label>
                                                                    <div className="input-group-text">
                                                                        {patientDetails?.Registration_no}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {patientDetails?.mobile &&
                                                            <div className="col-md-3">
                                                                <div className={FormStyle.feildWrapper}>
                                                                    <label className={FormStyle.customLabelSecond}>
                                                                        <CommonLang labelContent='Contact No' keyword='contact_no' />
                                                                    </label>
                                                                    <div className="input-group-text">
                                                                        {patientDetails?.mobile}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                {isSearching ?
                                                    <div className="search-Loader">
                                                        <Loader
                                                            color='#2bbf4f' />
                                                    </div>
                                                    : <>
                                                        {patientAllPrevData.length > 0 &&
                                                            <PatientPrevDetails patientAllPrevData={patientAllPrevData} patientDateWiseData={patientAllPrevData[0]} />
                                                        }
                                                        {formView && <>
                                                            <div className='col-md-12 mt-4'>
                                                                <h1 className={FormStyle.formTitle}>
                                                                   
                                                                    <CommonText en='Consultation' hi='परामर्श' />
                                                                </h1>
                                                            </div>
                                                            <Wizard handleSubmit={handleOnSubmit} progressStatus={isSubmitting}>
                                                                <WizardStep>
                                                                    <div className="col-lg-12">
                                                                        <div className="row mb-3">
                                                                            <div class="accordion" id="accordionExample">
                                                                                <div class="accordion-item">
                                                                                    <h2 class="accordion-header" id="headingTwo">
                                                                                        <button class="accordion-button py-lg-2" type="button" data-bs-toggle="collapse"
                                                                                            data-bs-target="#collapseTwo" aria-expanded="fasle" aria-controls="collapseTwo">
                                                                                            <CommonText en='Pulse' hi='नब्ज' />
                                                                                        </button></h2>
                                                                                    <div id="collapseTwo" class="accordion-collapse collapse show p-lg-3"
                                                                                        aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                                        <div className="col-md-12">
                                                                                            <table className={`${FormStyle.customTable}  w-100`}>
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th scope="col">
                                                                                                            <CommonText en='Vata' hi='वात' />
                                                                                                        </th>
                                                                                                        <th scope="col">
                                                                                                            <CommonText en='Pitta' hi='पित' />
                                                                                                        </th>
                                                                                                        <th scope="col">
                                                                                                            <CommonText en='Kapha' hi='कफ' />
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                <tr>
                                                                                                        <td>
                                                                                                            <RadioButton label="Normal" id="pulse_vata" name="pulse_vata" type="radio" keyword="normal" value="normal" checked={consultationPayload?.pulse_vata === 'normal'} onChange={(e) => handleOnChange(e)} />
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <RadioButton label="Normal" id="pulse_pitta" name="pulse_pitta" type="radio" keyword="normal" value="normal" checked={consultationPayload?.pulse_pitta === 'normal'} onChange={(e) => handleOnChange(e)} />
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <RadioButton label="Normal" id="pulse_kapha" name="pulse_kapha" type="radio" keyword="normal" value="normal" checked={consultationPayload?.pulse_kapha === 'normal'} onChange={(e) => handleOnChange(e)} />
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <RadioButton label="Up" id="pulse_vata" name="pulse_vata" type="radio" value="up" keyword="up"
                                                                                                                checked={consultationPayload?.pulse_vata === 'up'} onChange={(e) => handleOnChange(e)}

                                                                                                            />
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <RadioButton label="Up" id="pulse_pitta" name="pulse_pitta" type="radio" value="up" keyword="up"
                                                                                                                checked={consultationPayload?.pulse_pitta === 'up'} onChange={(e) => handleOnChange(e)} />
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <RadioButton label="Up" id="pulse_kapha" name="pulse_kapha" type="radio" value="up" keyword="up"
                                                                                                                checked={consultationPayload?.pulse_kapha === 'up'} onChange={(e) => handleOnChange(e)} />
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <RadioButton label="Down" id="pulse_vata" name="pulse_vata" type="radio" keyword="down" value="down" checked={consultationPayload?.pulse_vata === 'down'} onChange={(e) => handleOnChange(e)} />
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <RadioButton label="Down" id="pulse_pitta" name="pulse_pitta" type="radio" keyword="down" value="down" checked={consultationPayload?.pulse_pitta === 'down'} onChange={(e) => handleOnChange(e)} />
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <RadioButton label="Down" id="pulse_kapha" name="pulse_kapha" type="radio" keyword="down" value="down" checked={consultationPayload?.pulse_kapha === 'down'} onChange={(e) => handleOnChange(e)} />
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                        <div className="col-md-12">
                                                                                            <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                                <p className={FormStyle.customTableHeading}>
                                                                                                    
                                                                                                    <CommonText en='Pulse Observation' hi='नब्ज अवलोकन' />
                                                                                                </p>
                                                                                                <div className={FormStyle.customTableHeadingLine}></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        {pulseObservationPayload.length > 0 &&
                                                                                            <div className="col-md-12 mb-4">
                                                                                                {pulseObservationPayload.map((item, index) => {
                                                                                                    return (<>
                                                                                                        <div className='row mb-2' key={index}>

                                                                                                            <div className='col-md-10 pe-0'>
                                                                                                                <div className='border d-flex align-items-center w-100 h-100 py-2 px-3'>
                                                                                                                    <p className='m-0'>{item.observation}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className='col-md-2 ps-0'>
                                                                                                                <div className='border d-flex align-items-center w-100 h-100'><input type="checkbox" value={index} checked={item.checked} onChange={(e) => removepulseObservation(e)} /></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </>)
                                                                                                })}
                                                                                            </div>
                                                                                        }
                                                                                        <div className="col-md-12">
                                                                                            <div className='row'>
                                                                                                <div className='col-md-9'>
                                                                                                    <select className='form-select'
                                                                                                        id="pulseObservation"
                                                                                                        value={pulseObservationValue}
                                                                                                        onChange={(e) => selectPulseObservation(e)}
                                                                                                    >

                                                                                                        <option disabled value=''>
                                                                                                            <CommonText en="select observation" hi="अवलोकन का चयन करें" />
                                                                                                            </option>
                                                                                                        {pulseObservationOptions.length > 0 && pulseObservationOptions.map((item, index) => {
                                                                                                            return (<option key={index} value={item.id}>{item.observation}</option>)
                                                                                                        })}
                                                                                                        <option value="other">
                                                                                                        <CommonText en="Other" hi="अन्य" />
                                                                                                        </option>
                                                                                                    </select>
                                                                                                    {(otherPulseObservation) && <>
                                                                                                        <input type="text" className={`form-control ${(otherPulseObservation && pulseObservationOptions.length > 0) && "mt-2"}`} id="pulseObservationInput" value={pulseObservationOtherValue} onChange={(e) => pulseObservationOtherHandler(e)} />
                                                                                                    </>}
                                                                                                </div>
                                                                                                <div className='col-md-3'>
                                                                                                    <button type="button" className="common-gradient d-flex w-100 align-items-center justify-content-center" onClick={() => addPulseObservation()}><BiPlus className='me-2' />
                                                                                                    <CommonText en="Save & Continue" hi="सहेजें और जारी रखें" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row ">
                                                                       
                                                                            
                                                                                            <div className="col-md-12">
                                                                                    <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                        <p className={FormStyle.customTableHeading}>
                                                                                            
                                                                                           <CommonText en='Tounge' hi='जीभ' />
                                                                                        </p>
                                                                                        <div className={FormStyle.customTableHeadingLine}></div>
                                                                                    </div>
                                                                                </div>
                                                                               <div className="col-md-12">
                                                                                    <table className={`${FormStyle.customTable}  w-100`}>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th scope="col" className="border-end-0">
                                                                                                    <CommonText en='Color' hi='रंग' />
                                                                                                </th>
                                                                                                <th scope="col" className="border-end-0"></th>
                                                                                                <th scope="col"></th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td className="border-end-0">
                                                                                                    <RadioButton label="Black" id="tounge_color" keyword="black" name="tounge_color" type="radio" value="black" checked={consultationPayload?.tounge_color === 'black'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td className="border-end-0">
                                                                                                    <RadioButton label="White" id="tounge_color" keyword="white" name="tounge_color" type="radio" value="white" checked={consultationPayload?.tounge_color === 'white'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td className="border-end-0">
                                                                                                    <RadioButton label="Red" id="tounge_color" keyword="red" name="tounge_color" type="radio" value="red" checked={consultationPayload?.tounge_color === 'red'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td className="border-end-0">
                                                                                                    <RadioButton label="Brown" id="tounge_color" keyword="brown" name="tounge_color" type="radio" value="brown" checked={consultationPayload?.tounge_color === 'brown'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td className="border-end-0">
                                                                                                    <RadioButton label="Yellow" id="tounge_color" keyword="yellow" name="tounge_color" type="radio" value="yellow" checked={consultationPayload?.tounge_color === 'yellow'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td className="border-end-0">
                                                                                                    <RadioButton label="Green" id="tounge_color" keyword="green" name="tounge_color" type="radio" value="green" checked={consultationPayload?.tounge_color === 'green'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                                <div className="col-md-12 mt-4">
                                                                                    <table className={`${FormStyle.customTable}  w-100`}>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th scope="col">
                                                                                                    <ConsultationLang labelContent='Vata' keyword='vata' />
                                                                                                </th>
                                                                                                <th scope="col">
                                                                                                    <ConsultationLang labelContent='Pitta' keyword='pitta' />
                                                                                                </th>
                                                                                                <th scope="col"><ConsultationLang labelContent='Kapha' keyword='kapha' /></th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                        <tr>
                                                                                                <td>
                                                                                                    <RadioButton label="Normal" id="tounge_vata" name="tounge_vata" keyword="normal" type="radio" value="normal" checked={consultationPayload?.tounge_vata === 'normal'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <RadioButton label="Normal" id="tounge_pitta" name="tounge_pitta" keyword="normal" type="radio" value="normal" checked={consultationPayload?.tounge_pitta === 'normal'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <RadioButton label="Normal" id="tounge_kapha" name="tounge_kapha" keyword="normal" type="radio" value="normal" checked={consultationPayload?.tounge_kapha === 'normal'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <RadioButton label="Up" id="tounge_vata" keyword="up" name="tounge_vata" type="radio" value="up" checked={consultationPayload?.tounge_vata === 'up'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <RadioButton label="Up" id="tounge_pitta" keyword="up" name="tounge_pitta" type="radio" value="up" checked={consultationPayload?.tounge_pitta === 'up'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <RadioButton label="Up" id="tounge_kapha" keyword="up" name="tounge_kapha" type="radio" value="up" checked={consultationPayload?.tounge_kapha === 'up'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <RadioButton label="Down" id="tounge_vata" keyword="down" name="tounge_vata" type="radio" value="down" checked={consultationPayload?.tounge_vata === 'down'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <RadioButton label="Down" id="tounge_pitta" keyword="down" name="tounge_pitta" type="radio" value="down" checked={consultationPayload?.tounge_pitta === 'down'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <RadioButton label="Down" id="tounge_kapha" name="tounge_kapha" keyword="down" type="radio" value="down" checked={consultationPayload?.tounge_kapha === 'down'} onChange={(e) => handleOnChange(e)} required />
                                                                                                </td>
                                                                                            </tr>
                                                                                            
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                        <p className={FormStyle.customTableHeading}>
                                                                                            
                                                                                            <CommonText en="Tounge Observation" hi="जीभ अवलोकन" />
                                                                                        </p>
                                                                                        <div className={FormStyle.customTableHeadingLine}></div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-12 mb-4">
                                                                                    {toungeObservationPayload.length > 0 && toungeObservationPayload.map((item, index) => {
                                                                                        return (<>
                                                                                            <div className='row mb-2' key={index}>
                                                                                                <div className='col-md-10 pe-0'>
                                                                                                    <div className='border d-flex align-items-center w-100 h-100 py-2 px-3'>
                                                                                                        <p className='m-0'>{item.observation}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='col-md-2 ps-0'>
                                                                                                    <div className='border d-flex align-items-center w-100 h-100'>
                                                                                                        <input type="checkbox" value={index} checked={item.checked} 
                                                                                                        onChange={(e) => removetoungeObservation(e)} /></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </>)
                                                                                    })}
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <div className='row'>
                                                                                        <div className='col-md-9'>
                                                                                            <select className='form-select'
                                                                                                id="toungeObservation"
                                                                                                value={toungeObservationValue}
                                                                                                onChange={(e) => selecttoungeObservation(e)}
                                                                                            >
                                                                                                <option disabled value=''>
                                                                                                    
                                                                                                    <CommonText en="select observation" hi="अवलोकन का चयन करें" />
                                                                                                    </option>
                                                                                                {toungeObservationOptions.length > 0 && toungeObservationOptions.map((item, index) => {
                                                                                                    return (<option key={index} value={item.id}>{item.observation}</option>)
                                                                                                })}
                                                                                                <option value="other">
                                                                                                <CommonText en="Other" hi="अन्य" />
                                                                                                </option>
                                                                                            </select>
                                                                                            {(othertoungeObservation) && <>
                                                                                                <input type="text" 
                                                                                                className={`form-control ${(othertoungeObservation && toungeObservationOptions.length > 0) && "mt-2"}`} 
                                                                                                id="toungeObservationInput" value={toungeObservationOtherValue} onChange={(e) => toungeObservationOtherHandler(e)} />
                                                                                            </>}
                                                                                        </div>
                                                                                        <div className='col-md-3'>
                                                                                            <button type="button" className="common-gradient d-flex w-100 align-items-center justify-content-center" onClick={() => addtoungeObservation()}><BiPlus className='me-2' />
                                                                                            <CommonText en="Save & Continue" hi="सहेजें और जारी रखें" />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                    

                                                                    
                                                                </WizardStep>
                                                                <WizardStep>
                                                                    <div className="col-md-12">
                                                                        <div className="row">
                                                                        <div class="accordion" id="accordionExample">
                                                                        <div className='accordion-item'>
                                                                        <h2 class="accordion-header" id="headingFour">
                                                                                    <button class="accordion-button py-lg-2" type="button" data-bs-toggle="collapse"
                                                                                        data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                                                                            <ConsultationLang labelContent='Infected Part Of Body' keyword='infected_part_of_body' />
                                                                                        </button>
                                                                                        </h2>
                                                                           
                                                                            <div id="collapseFour" class="accordion-collapse collapse show p-lg-3"
                                                                                aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                                            <div className="col-md-12">
                                                                                <table className={`${FormStyle.customTable}  w-100`}>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Lungs' keyword='lungs' />
                                                                                            </th>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Stomach' keyword='stomach' />
                                                                                            </th>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Kidney' keyword='kidney' />  </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Good Breathe" keyword="good_breath" id="lungs" name="lungs" type="radio" value="Good Breath" checked={infectedPartOfBody.lungs === 'Good Breath'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Normal Digestion" keyword="normal_digestion" id="stomach" name="stomach" type="radio" value="Normal Digestion" checked={infectedPartOfBody.stomach === 'Normal Digestion'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Stone" id="kidney" keyword="stone" name="kidney" type="radio" value="Stone" checked={infectedPartOfBody.kidney === 'Stone'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Bad Breath" id="lungs" name="lungs" type="radio" keyword="bad_breath" value="Bad Breath" checked={infectedPartOfBody.lungs === 'Bad Breath'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Digestion Problem" id="stomach" name="stomach" type="radio" keyword="digestion_problem" value="Digestion Problem" checked={infectedPartOfBody.stomach === 'Digestion Problem'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Soiling" id="kidney" name="kidney" type="radio" keyword="soiling" value="Soiling" checked={infectedPartOfBody.kidney === 'Soiling'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Breathing Problem" id="lungs" name="lungs" type="radio" keyword="breathing_problem" value="Breathing Problem" checked={infectedPartOfBody.lungs === 'Breathing Problem'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Infection" id="kidney" name="kidney" type="radio" keyword="infection" value="Infection" checked={infectedPartOfBody.kidney === 'Infection'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                            </td>
                                                                                            <td>
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="kidney" name="kidney" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.kidney === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Head' keyword='head' />
                                                                                            </th>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Large Intestine' keyword='large_intenstine' />  </th>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Small Intestine' keyword='small_intestine' />  </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="head" name="head" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.head === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="largeIntestine" name="largeIntestine" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.largeIntestine === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="smallIntestine" name="smallIntestine" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.smallIntestine === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Heaviness" id="head" name="head" type="radio" keyword="heaviness" value="Heaviness" checked={infectedPartOfBody.head === 'Heaviness'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Bowel Filth" id="largeIntestine" name="largeIntestine" type="radio" keyword="bowel_filth" value="Bowel Filth" checked={infectedPartOfBody.largeIntestine === 'Bowel Filth'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Bowel Filth" id="smallIntestine" name="smallIntestine" type="radio" keyword="bowel_filth" value="Bowel Filth" checked={infectedPartOfBody.smallIntestine === 'Bowel Filth'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Headache in Right Side" id="head" name="head" type="radio" keyword="headach_in_right" value="Headache in Right Side" checked={infectedPartOfBody.head === 'Headache in Right Side'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Headache in Left Side" id="head" name="head" type="radio" keyword="headach_in_left" value="Headache in Left Side" checked={infectedPartOfBody.head === 'Headache in Left Side'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Waist' keyword='waist' /></th>
                                                                                            <th scope="col">

                                                                                                <ConsultationLang labelContent='Above hip' keyword='above_hip' /></th>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Heart' keyword='heart' /></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Pain" id="waist" name="waist" type="radio" keyword="pain" value="Pain" checked={infectedPartOfBody.waist === 'Pain'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Heaviness" id="above_hip" name="above_hip" type="radio" keyword="heaviness" value="Heaviness" checked={infectedPartOfBody.above_hip === 'Heaviness'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Cholesterol" id="heart" name="heart" type="radio" keyword="Cholesterol" value="Cholesterol" checked={infectedPartOfBody.heart === 'Cholesterol'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Above or neck" id="waist" name="waist" type="radio" keyword="above_neck" value="Above or neck" checked={infectedPartOfBody.waist === 'Above or neck'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="above_hip" name="above_hip" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.above_hip === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Prick" id="heart" name="heart" type="radio" keyword="prick" value="Prick" checked={infectedPartOfBody.heart === 'Prick'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Center" id="waist" name="waist" type="radio" keyword="center" value="Center" checked={infectedPartOfBody.waist === 'Center'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td> </td>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="heart" name="heart" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.heart === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Below Hip" id="waist" name="waist" type="radio" keyword="below_hip" value="Below Hip" checked={infectedPartOfBody.waist === 'Below Hip'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td> </td>
                                                                                            <td>
                                                                                                <RadioButton label="Anxiety" id="heart" name="heart" type="radio" keyword="anxiety" value="Anxiety" checked={infectedPartOfBody.heart === 'Anxiety'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Urine' keyword='urine' />
                                                                                            </th>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Soiling in foot' keyword='soiling_in_foot' /></th>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Pain in Kidney' keyword='pain_in_kidney' /></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="urine" name="urine" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.urine === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Yes" id="soiling_in_foot" name="soiling_in_foot" type="radio" keyword="yes" value="Yes" checked={infectedPartOfBody.soiling_in_foot === 'Yes'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Yes" id="pain_in_kidney" name="pain_in_kidney" type="radio" keyword="yes" value="Yes" checked={infectedPartOfBody.pain_in_kidney === 'Yes'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Problem in Urination" id="urine" name="urine" type="radio" keyword="problem_in_urination" value="Problem in Urination" checked={infectedPartOfBody.urine === 'Problem in Urination'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="No" id="soiling_in_foot" name="soiling_in_foot" type="radio" keyword="no" value="No" checked={infectedPartOfBody.soiling_in_foot === 'No'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="No" id="pain_in_kidney" name="pain_in_kidney" type="radio" keyword="no" value="No" checked={infectedPartOfBody.pain_in_kidney === 'No'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent="'How's the Urine" keyword='how_the_urine' />?
                                                                                            </th>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Urine Color' keyword='urine_color' /></th>
                                                                                            <th scope="col">
                                                                                                <ConsultationLang labelContent='Water Consumption' keyword='water_consumption' />
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="concentrated" id="how_the_urine" name="how_the_urine" type="radio" keyword="concentrated" value="concentrated" checked={infectedPartOfBody.how_the_urine === 'concentrated'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Yellow" id="urine_color" name="urine_color" type="radio" keyword="yellow" value="Yellow" checked={infectedPartOfBody.urine_color === 'Yellow'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Low" id="water_consumption" name="water_consumption" type="radio" keyword="low" value="Low" checked={infectedPartOfBody.water_consumption === 'Low'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="how_the_urine" name="how_the_urine" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.how_the_urine === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="White" id="urine_color" name="urine_color" type="radio" keyword="white" value="White" checked={infectedPartOfBody.urine_color === 'White'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="High" id="water_consumption" name="water_consumption" type="radio" keyword="high" value="High" checked={infectedPartOfBody.water_consumption === 'High'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <RadioButton label="Foamy" id="how_the_urine" name="how_the_urine" type="radio" keyword="foamy" value="Foamy" checked={infectedPartOfBody.how_the_urine === 'Foamy'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="urine_color" name="urine_color" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.urine_color === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <RadioButton label="Normal" id="water_consumption" name="water_consumption" type="radio" keyword="normal" value="Normal" checked={infectedPartOfBody.water_consumption === 'Normal'} onChange={(e) => infectedPartOnchangeHandler(e)} />
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    <thead>
                                                                                        <tr>

                                                                                            <th scope="col"><ConsultationLang labelContent='Dialysis' keyword='dialysis' /></th>

                                                                                            {dialysisPayload.happen === 'yes' ? <th scope="col">
                                                                                                <ConsultationLang labelContent='In Weeks' keyword='in_weeks' /></th> : <th></th>}
                                                                                            <th scope="col"><ConsultationLang labelContent='Nails' keyword='Nails' /></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>

                                                                                            <td>
                                                                                                <label className={FormStyle.customRadio}><CommonLang labelContent='Yes' keyword='yes' />
                                                                                                    <input type="radio" id="happen" value='yes' checked={dialysisPayload.happen === 'yes'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                    <span className={FormStyle.checkmark}></span>
                                                                                                </label>
                                                                                            </td>
                                                                                            {dialysisPayload.happen === 'yes' ? <td>
                                                                                                <div className={FormStyle.weeksListWrapper}>
                                                                                                    <label className={FormStyle.customRadio}><ConsultationLang labelContent='One' keyword='one' />
                                                                                                        <input type="radio" id="inWeeks" value='one' checked={dialysisPayload.inWeeks === 'one'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                        <span className={FormStyle.checkmark}></span>
                                                                                                    </label>
                                                                                                    <label className={FormStyle.customRadio}><ConsultationLang labelContent='Two' keyword='two' />
                                                                                                        <input type="radio" id="inWeeks" value='two' checked={dialysisPayload.inWeeks === 'two'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                        <span className={FormStyle.checkmark}></span>
                                                                                                    </label>
                                                                                                    <label className={FormStyle.customRadio}><ConsultationLang labelContent='Three' keyword='three' />
                                                                                                        <input type="radio" id="inWeeks" value='three' checked={dialysisPayload.inWeeks === 'three'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                        <span className={FormStyle.checkmark}></span>
                                                                                                    </label>
                                                                                                    <label className={FormStyle.customRadio}><ConsultationLang labelContent='Four' keyword='four' />
                                                                                                        <input type="radio" id="inWeeks" value='four' checked={dialysisPayload.inWeeks === 'four'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                        <span className={FormStyle.checkmark}></span>
                                                                                                    </label>
                                                                                                    <label className={FormStyle.customRadio}><ConsultationLang labelContent='Five' keyword='five' />
                                                                                                        <input type="radio" id="inWeeks" value='five' checked={dialysisPayload.inWeeks === 'five'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                        <span className={FormStyle.checkmark}></span>
                                                                                                    </label>
                                                                                                    <label className={FormStyle.customRadio}><ConsultationLang labelContent='Six' keyword='six' />
                                                                                                        <input type="radio" id="inWeeks" value="six" checked={dialysisPayload.inWeeks === 'six'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                        <span className={FormStyle.checkmark}></span>
                                                                                                    </label>
                                                                                                    <label className={FormStyle.customRadio}><ConsultationLang labelContent='Seven' keyword='seven' />
                                                                                                        <input type="radio" id="inWeeks" value='seven' checked={dialysisPayload.inWeeks === 'seven'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                        <span className={FormStyle.checkmark}></span>
                                                                                                    </label>
                                                                                                </div>
                                                                                            </td>
                                                                                                :
                                                                                                <td></td>
                                                                                            }
                                                                                            <td>
                                                                                                <label className={FormStyle.customRadio}><ConsultationLang labelContent='White' keyword='white' />
                                                                                                    <input type="radio" id="nailColor" value='white' checked={dialysisPayload.nailColor === 'white'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                    <span className={FormStyle.checkmark}></span>
                                                                                                </label>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>

                                                                                            <td> <label className={FormStyle.customRadio}><ConsultationLang labelContent='No' keyword='no' />
                                                                                                <input type="radio" id="happen" value='no' checked={dialysisPayload.happen === 'no'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                <span className={FormStyle.checkmark}></span>
                                                                                            </label></td>
                                                                                            <td></td>
                                                                                            <td> <label className={FormStyle.customRadio}><ConsultationLang labelContent='Red' keyword='red' />
                                                                                                <input type="radio" id="nailColor" value='red' checked={dialysisPayload.nailColor === 'red'} onChange={(e) => dialysisHandleChange(e)} />
                                                                                                <span className={FormStyle.checkmark}></span>
                                                                                            </label></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    {/* ---paste----- */}
                                                                                </table>
                                                                            </div></div>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </WizardStep>
                                                                <WizardStep>
                                                                    <div className='col-md-12'>
                                                                        <div className='row'>
                                                                            <div className="col-md-12">
                                                                                <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                    <div>
                                                                                        <p className={FormStyle.customTableHeading}>
                                                                                            <ConsultationLang labelContent='Major Diseases' keyword='major_diseases' />
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className={FormStyle.customTableHeadingLine}></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-lg-2">
                                                                            <div className="col-md-12">
                                                                                <div className={FormStyle.majorDiseasesCard}>
                                                                                    <h2><ConsultationLang labelContent='select major diseases' keyword='select_major_disease' /></h2>
                                                                                    <div className={FormStyle.majorDiseasesOption}>
                                                                                        {allDiseases?.length > 0 && <>{allDiseases?.map((item, ind) => {
                                                                                            return <div className='col-md-3' key={ind}>
                                                                                                <label className={FormStyle.customRadio}>
                                                                                                    <CommonText en={item.name} hi={item.hi_name}/>
                                                                                                    <input type="radio" name='major_diseases' value={item?.id} checked={consultationPayload?.major_diseases == item.id} onChange={(e) => majorDiseasesHandleChange(e)} required />
                                                                                                    <span className={FormStyle.checkmark}></span>
                                                                                                </label>
                                                                                            </div>
                                                                                        })}</>}
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        {searchingDiseaseData ? <div className="search-Loader">
                                                                            <Loader
                                                                                color='#2bbf4f' />
                                                                        </div> : <>

                                                                            {diseasePreferedQuestion && consultationPayload?.major_diseases && diseasePreferedQuestion.length > 0 &&
                                                                                <div className="row">

                                                                                    <div className="col-md-12">
                                                                                        <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                            <div>
                                                                                                <p className={FormStyle.customTableHeading}>
                                                                                                    <CommonText en='Disease Specific Question' hi='रोग आधारित प्रश्न' />
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className={FormStyle.customTableHeadingLine}></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-12">
                                                                                        <div className='row g-0'>
                                                                                            {diseasePreferedQuestion.map((item, index) => {
                                                                                                return (
                                                                                                    <div className={`col-md-4 border ${FormStyle.majorDiseasesCard}`} key={index}>
                                                                                                        <h2 className='p-3 border-0'>
                                                                                                        <CommonText en={item.question} hi={item.hi_question} /></h2>
                                                                                                        <ul className='list-unstyled ps-4'>
                                                                                                            {item.answers && item.answers.length > 0 && item.answers.map((answ, indx) => {
                                                                                                                return (<li className='pb-3' key={indx}>
                                                                                                                    <label className={FormStyle.customRadio} >
                                                                                                                       <CommonText en={answ.answer} hi={answ.hi_answer}/>
                                                                                                                        <input type="radio" name={`answers${index}`} onChange={() => handleChangeAnswers(index, indx)} checked={answ?.checked == true} />
                                                                                                                        <span className={FormStyle.checkmark}></span>
                                                                                                                    </label>
                                                                                                                </li>)
                                                                                                            })}
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>}
                                                                            {consultationPayload?.major_diseases && filteredQuestions()?.length > 0 &&
                                                                                <>
                                                                                    <div className='row'>
                                                                                        <div className="col-md-12">
                                                                                            <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                                <div>
                                                                                                    <p className={FormStyle.customTableHeading}>
                                                                                                       
                                                                                                        <CommonText en="Add Questions" hi="प्रश्न जोड़ें" />
                                                                                                    </p>
                                                                                                </div>
                                                                                                <div className={FormStyle.customTableHeadingLine}></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='row'>
                                                                                        <div className='col-lg-6'>
                                                                                            <div className={FormStyle.feildWrapper}>
                                                                                                <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                                    
                                                                                                    <CommonText en="Question" hi="प्रश्न " />
                                                                                                </label>
                                                                                                <select
                                                                                                    className="form-select"
                                                                                                    aria-label="Default select example"
                                                                                                    id='anotherQuestion'
                                                                                                    value={anotherQuestion}
                                                                                                    onChange={(e) => {
                                                                                                        setAnotherQuestion(e.target.value)
                                                                                                    }}
                                                                                                >
                                                                                                    <option value='' hidden>
                                                                                                        <CommonLang labelContent='Please Select' keyword='select' />
                                                                                                    </option>
                                                                                                    {filteredQuestions()?.map((item, index) => {
                                                                                                        return <option value={item?.id} key={index}>
                                                                                                          <CommonText en={item.question} hi={item.hi_question} /></option>
                                                                                                    })}
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-lg-3 d-flex align-items-end'>
                                                                                            <div className={FormStyle.feildWrapper}>
                                                                                                <button className='btn light-green-bg text-white' type="button" onClick={() => addAnotherQuestion()}>
                                                                                                    <BiPlus className='me-2' />
                                                                                                    <CommonText en="Save & Continue" hi="सहेजें और जारी रखें" />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            }
                                                                        </>}
                                                                    </div>
                                                                </WizardStep>
                                                                <WizardStep>
                                                                    <div className='col-md-12'>
                                                                        {allPrescribedMedicine?.length > 0 && <>
                                                                            <div className='row '>
                                                                                <div className="col-md-12">
                                                                                    <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                        <div>
                                                                                            <p className={FormStyle.customTableHeading}>
                                                                                             
                                                                                                
                                                                                                 <CommonText en="Diseases Based Medicine" hi="रोग के अनुसार औषधि" />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className={FormStyle.customTableHeadingLine}></div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={FormStyle.diseasesWiseMedicineWrapper}>
                                                                                    <div className="row mt-lg-2">
                                                                                        <div className='col-1'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                                
                                                                                                <ConsultationLang labelContent='S.No.' keyword='seq_no' />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className='col-md-3'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}><ConsultationLang labelContent='Medicine' keyword='medicine' /></p>
                                                                                        </div>
                                                                                        <div className='col-md-3'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}><ConsultationLang labelContent='Buy From' keyword='buy_form' /></p>
                                                                                        </div>
                                                                                        <div className='col-md-2 text-center'><p className={FormStyle.diseasesWiseMedicineWrapperHeading}><ConsultationLang labelContent='Consumption Count' keyword='consumption_count' /></p></div>
                                                                                        <div className='col-md-2 text-center'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                            <ConsultationLang labelContent='Quantity' keyword='quantity' />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className='col-1'></div>
                                                                                        <div className="col-md-12">
                                                                                            <div className={FormStyle.majorDiseasesCard}>
                                                                                                {allPrescribedMedicine.map((item, index) => {
                                                                                                    return (
                                                                                                        <div className='row mb-3' key={index}>
                                                                                                            <div className='col-1 py-3'>
                                                                                                                {item.In_Take_Sequence}
                                                                                                            </div>
                                                                                                            <div className='col-md-3 py-3'>
                                                                                                               <CommonText en={item.medicine_name} hi={item.medicine_hi_name}/>
                                                                                                            </div>
                                                                                                            <div className='col-md-3'>
                                                                                                                <div className={` ${FormStyle.feildWrapper}`}>
                                                                                                                    <select
                                                                                                                        id="buy_from"
                                                                                                                        value={item?.buy_from}
                                                                                                                        onChange={(e) => prescribeMedicineHandleChange(e, index)}
                                                                                                                    >
                                                                                                                        <option value='' defaultValue hidden>
                                                                                                                            <CommonLang labelContent='Please Select' keyword='select' />
                                                                                                                        </option>
                                                                                                                        <option value='arogyapath'><ConsultationLang labelContent='Arogyapath' keyword='from_arogyapath' /></option>
                                                                                                                        <option value='outside'><ConsultationLang labelContent='Outside' keyword='from_outside' /></option>
                                                                                                                    </select>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className='col-md-2 text-center'>
                                                                                                                <div className={FormStyle.feildWrapper}>
                                                                                                                    <input type="text"diseases Based Medicine

                                                                                                                        placeholder="" id="consumption_count" name={item?.medicine} className=" text-center"
                                                                                                                        onChange={(e) => prescribeMedicineHandleChange(e, index)} value={item.consumption_count} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className='col-md-2 text-center'>
                                                                                                                <div className={FormStyle.feildWrapper}>
                                                                                                                    <input type="text"
                                                                                                                        placeholder="" id="quantity" name={item?.medicine} className=" text-center"
                                                                                                                        onChange={(e) => prescribeMedicineHandleChange(e, index)} value={item.quantity} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className='col-1 d-flex justify-content-end py-3'>
                                                                                                                <input className="form-check-input" type="checkbox" value={index} id="checkedMedicine" onChange={() => diselectMedicine(index)} checked={item.checked} />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                })}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>}

                                                                        {consultationPayload?.major_diseases && filterdMedicine()?.length > 0 && <>
                                                                            <div className='row'>
                                                                                <div className="col-md-12">
                                                                                    <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                        <div>
                                                                                            <p className={FormStyle.customTableHeading}>
                                                                                                <ConsultationLang labelContent='Add Medicine' keyword='add_medicine' />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className={FormStyle.customTableHeadingLine}></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-lg-3'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}><ConsultationLang labelContent='Medicine' keyword='medicine' /> </label>
                                                                                        <select
                                                                                            className="form-select"
                                                                                            onChange={(e) => anotherMedicineHandler(e)}
                                                                                            id='medicine'
                                                                                            aria-label="Default select example"
                                                                                            value={anotherMedicine?.medicine}
                                                                                        >
                                                                                            <option value='' hidden>
                                                                                                <CommonLang labelContent='Please Select' keyword='select' />
                                                                                            </option>
                                                                                            {filterdMedicine()?.map((item, index) => {
                                                                                                return <option value={item?.id} key={index}>{item?.hi_name}</option>
                                                                                            })}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-lg-3'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}><ConsultationLang labelContent='Buy From' keyword='buy_form' /></label>
                                                                                        <select
                                                                                            className="form-select"
                                                                                            id="buy_from"
                                                                                            value={anotherMedicine?.buy_from}
                                                                                            onChange={(e) => anotherMedicineHandler(e)}
                                                                                            aria-label="Default select example"
                                                                                        >
                                                                                            <option defaultValue hidden>
                                                                                                <CommonLang labelContent='Please Select' keyword='select' />
                                                                                            </option>
                                                                                            <option value='arogyapath'><ConsultationLang labelContent='Arogyapath' keyword='from_arogyapath' /></option>
                                                                                            <option value='outside'><ConsultationLang labelContent='Outside' keyword='from_outside' /></option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-lg-3'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}><ConsultationLang labelContent='Consumption Count' keyword='consumption_count' /></label>
                                                                                        <input type="text" placeholder=""
                                                                                            id="consumption_count"
                                                                                            value={anotherMedicine?.consumption_count}
                                                                                            onChange={(e) => anotherMedicineHandler(e)} className="text-center" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-lg-3'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                        <ConsultationLang labelContent='Quantity' keyword='quantity' />
                                                                                        </label>
                                                                                        <input type="text" placeholder=""
                                                                                            id="quantity"
                                                                                            value={anotherMedicine?.quantity}
                                                                                            onChange={(e) => anotherMedicineHandler(e)} className="text-center" />
                                                                                    </div>
                                                                                </div>
                                                                                {anotherMedicine.medicine ? <>{getMedicineDataById(anotherMedicine?.medicine) && getMedicineDataById(anotherMedicine?.medicine).all_way_of_taken && getMedicineDataById(anotherMedicine?.medicine).all_way_of_taken.length > 0 ? <>
                                                                                    <div className='col-md-12 border'>
                                                                                        <div className='row'>
                                                                                            <div className='col-md-3'>
                                                                                                <div className={FormStyle.feildWrapper}>
                                                                                                    <label htmlFor='time_of_take'>
                                                                                                      <CommonText en="Time of take (English)" hi="लेने का समय (अंग्रेजी)" />
                                                                                                    </label>
                                                                                                    <input type="text" id="time_of_take" value={anotherWayOfTaken.time_of_take} onChange={(e) => handleOtherWayOfTakeChange(e)} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='col-md-3'>
                                                                                                <div className={FormStyle.feildWrapper}>
                                                                                                    <label htmlFor='hi_time_of_take'>
                                                                                                      <CommonText en="Time of take (Hindi)" hi="लेने का समय (हिंदी)" />
                                                                                                    </label>
                                                                                                    <input type="text" id="hi_time_of_take" value={anotherWayOfTaken.hi_time_of_take} onChange={(e) => handleOtherWayOfTakeChange(e)} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='col-md-4'>
                                                                                                <div className={FormStyle.feildWrapper}>
                                                                                                    <label htmlFor='how_to_take_conf'>
                                                                                                    <CommonText en="Way of taken" hi="लेने का तरीका "/>
                                                                                                    </label>
                                                                                                    <select id="how_to_take_conf" value={anotherWayOfTaken.how_to_take_conf} onChange={(e) => handleOtherWayOfTakeChange(e)} >
                                                                                                        <option value='' hidden>
                                                                                                        <CommonText en="Select way of taken" hi="लेने का तरीका चुनें "/>
                                                                                                        </option>
                                                                                                        {getMedicineDataById(anotherMedicine?.medicine).all_way_of_taken.map((item, index) => {
                                                                                                            return (
                                                                                                                <option value={index} key={index}>{item.way_of_taken}</option>
                                                                                                            )
                                                                                                        })
                                                                                                        }
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='col-md-2 d-flex align-items-end'>
                                                                                                <div className={FormStyle.feildWrapper}>
                                                                                                    <button className='btn light-green-bg text-white' type="button" onClick={() => addOtherWayOfTaken()}>
                                                                                                        <BiPlus className='me-2'/><CommonText en="Save & Continue" hi="सहेजें और जारी रखें" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                            {anotherMedicine.how_to_take && anotherMedicine.how_to_take.length > 0 &&
                                                                                                <div className='col-md-12'>
                                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                                        <div className={FormStyle.allListTable}>
                                                                                                            <table>
                                                                                                                <thead>
                                                                                                                    <tr className={FormStyle.allListTableHeadings}>
                                                                                                                        <th><CommonText en="Sequence" hi="क्रम" /></th>
                                                                                                                        <th><CommonText en="Time of take (English)" hi="लेने का समय (अंग्रेजी)" /></th>
                                                                                                                        <th><CommonText en="Time of take (Hindi)" hi="लेने का समय (हिंदी)" /></th>
                                                                                                                        <th><CommonText en="Way of taken (English)" hi="लेने का तरीका (अंग्रेज़ी)"/></th>
                                                                                                                        <th><CommonText en="Way of taken  (Hindi)" hi="लेने का तरीका (हिंदी)"/></th>
                                                                                                                        <th className={FormStyle.allListTableActionList}></th>
                                                                                                                    </tr>
                                                                                                                </thead>
                                                                                                                <tbody>
                                                                                                                    {anotherMedicine.how_to_take.map((item, index) => {
                                                                                                                        return (<tr className={FormStyle.allListTableSingleRow} key={index}>
                                                                                                                            <td>{index + 1}</td>
                                                                                                                            <td>{item.time_of_take}</td>
                                                                                                                            <td>{item.hi_time_of_take}</td>
                                                                                                                            <td>{item.way_of_taken}</td>
                                                                                                                            <td>{item.hi_way_of_taken}</td>
                                                                                                                            <td className={FormStyle.allListTableActionList}>
                                                                                                                                <ul className={FormStyle.actionList}>
                                                                                                                                    <li className="nav-item dropdown">
                                                                                                                                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                                                            <HiDotsVertical />
                                                                                                                                        </span>
                                                                                                                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                                                                                                            <li>
                                                                                                                                                <div>
                                                                                                                                                    <span className="dropdown-item" onClick={() => RemoveAnotherMedicineWayOfTake(index)}>
                                                                                                                                                        
                                                                                                                                                        <CommonText en ="Remove" hi="हटाना"/>
                                                                                                                                                    </span>
                                                                                                                                                </div>
                                                                                                                                            </li>
                                                                                                                                            {index > 0 && <li>
                                                                                                                                                <div>
                                                                                                                                                    <span className="dropdown-item" onClick={() => array_move(anotherMedicine.how_to_take, index, index - 1)} >
                                                                                                                                                        
                                                                                                                                                        <CommonText en ="Move Up" hi="ऊपर ले जाएँ"/>

                                                                                                                                                    </span>
                                                                                                                                                </div>
                                                                                                                                            </li>}
                                                                                                                                            {index < (anotherMedicine.how_to_take.length - 1) && <li>
                                                                                                                                                <div>
                                                                                                                                                    <span className="dropdown-item" onClick={() => array_move(anotherMedicine.how_to_take, index, index + 1)} >
                                                                                                                                                        
                                                                                                                                                        <CommonText en ="Move Down" hi="नीचे ले जाएँ"/>
                                                                                                                                                    </span>
                                                                                                                                                </div>
                                                                                                                                            </li>}

                                                                                                                                        </ul>
                                                                                                                                    </li>
                                                                                                                                </ul>
                                                                                                                            </td>

                                                                                                                        </tr>
                                                                                                                        )
                                                                                                                    })
                                                                                                                    }
                                                                                                                </tbody>
                                                                                                            </table>

                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>}
                                                                                        </div>
                                                                                    </div>
                                                                                </> :
                                                                                    <CommonText en="No way of taken mapped with this medicine" hi="इस औषधि के साथ लिए जाने का कोई तरीका मैप नहीं है"></CommonText>
                                                                                    
                                                                                }
                                                                                </> : ''
                                                                                }

                                                                                <div className='col-lg-12 d-flex align-items-center'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <button className='btn light-green-bg text-white' 
                                                                                          type="button" onClick={() => addAnotherMedicine()}>
                                                                                            
                                                                                            <BiPlus className='me-2' /><CommonText en="Save and add in list" hi="सहेजें और सूची में जोड़ें" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className='row'>
                                                                                <div className="col-md-12">
                                                                                    <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                        <div>
                                                                                            <p className={FormStyle.customTableHeading}>
                                                                                                
                                                                                                <CommonText en="Medicine Configuration" hi="औषधि निर्देश" />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className={FormStyle.customTableHeadingLine}></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-lg-3'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                            <ConsultationLang labelContent='Duration of Medicine' keyword='time_of_medicine' /> </label>
                                                                                        <div className='input-group'>
                                                                                            <input type="text" className="form-control"
                                                                                                id="medicine_duration"
                                                                                                onChange={(e) => handleOnChange(e)}
                                                                                                value={consultationPayload?.medicine_duration}
                                                                                                aria-describedby="medicine_duration_Time"
                                                                                            />
                                                                                            <span class="input-group-text" id="medicine_duration_Time">
                                                                                                <CommonText en="Month" hi="माह" />
                                                                                                </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-lg-3'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                            <ConsultationLang labelContent='Given mode' keyword='given_mode' /></label>
                                                                                        <select
                                                                                            className="form-select"
                                                                                            id="medicine_given_mode"
                                                                                            onChange={(e) => handleOnChange(e)}
                                                                                            value={consultationPayload?.medicine_given_mode}
                                                                                        >
                                                                                            <option value='physical'>
                                                                                                <ConsultationLang labelContent='Physical' keyword='Physical' />
                                                                                            </option>
                                                                                            <option value='courier'>
                                                                                                <ConsultationLang labelContent='Courier' keyword='Courier' />
                                                                                            </option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-lg-6'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}><ConsultationLang labelContent='Special Instruction for medicine' keyword='special_medicine_ins' /></label>
                                                                                        <textarea
                                                                                            className={`${FormStyle.customTextarea}`}
                                                                                            id="medicine_instruction"
                                                                                            onChange={(e) => handleMedicineInstruction(e)}
                                                                                            value={consultationPayload.medicine_config_instruction}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {diseaseMedicineInstruction?.length > 0 && <>

                                                                                <div className='row '>
                                                                                    <div className="col-md-12">
                                                                                        <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                            <div>
                                                                                                <p className={FormStyle.customTableHeading}>
                                                                                                    <CommonText en='Disease Based Medicine Instructions' 
                                                                                                    hi='रोग आधारित औषधि निर्देश' />
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className={FormStyle.customTableHeadingLine}></div>
                                                                                        </div>
                                                                                    </div>


                                                                                    <div className={FormStyle.diseasesWiseMedicineWrapper}>
                                                                                        <div className="row mt-lg-2">
                                                                                            <div className='col-2'>
                                                                                                <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                                    
                                                                                                    <ConsultationLang labelContent='S.No.' 
                                                                                                    keyword='seq_no' />
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className='col-8'>
                                                                                                <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                                    
                                                                                                    <ConsultationLang labelContent='Instructions' 
                                                                                                    keyword='instructions' />
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className='col-2'></div>
                                                                                            <div className="col-md-12">
                                                                                                <div className={FormStyle.majorDiseasesCard}>
                                                                                                    {diseaseMedicineInstruction?.map((item, index) => {
                                                                                                        return (
                                                                                                            <div className='row mb-3' key={index}>
                                                                                                                <div className='col-2 py-3'>
                                                                                                                    {index + 1}
                                                                                                                </div>
                                                                                                                <div className='col-md-8 py-3'>
                                                                                                                    {item.instruction}
                                                                                                                </div>
                                                                                                                <div className='col-2 d-flex justify-content-end py-3'>
                                                                                                                    <input className="form-check-input" type="checkbox" value={index} id="checkedMedicineInstruction" onChange={() => diselectMedicineInstruction(index)} checked={item.checked} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    })}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div></div>
                                                                                </div>
                                                                            </>}

                                                                            {filterdMedicineInstruction().length > 0 &&
                                                                                <>
                                                                                    <div className='row'>
                                                                                        <div className="col-md-12">
                                                                                            <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                                <div>
                                                                                                    <p className={FormStyle.customTableHeading}>
                                                                                                        
                                                                                                        <CommonText en="Add Medicine Instruction" hi="औषधि निर्देश जोड़ें" />
                                                                                                    </p>
                                                                                                </div>
                                                                                                <div className={FormStyle.customTableHeadingLine}></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-8'>
                                                                                            <div className={FormStyle.feildWrapper}>
                                                                                                <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                                    
                                                                                                    <CommonText en="Instruction" hi="निर्देश" />
                                                                                                </label>
                                                                                                <select
                                                                                                    className="form-select"
                                                                                                    id="anotherMedicineInstruction"
                                                                                                    value={anotherMedicineInstruction}
                                                                                                    onChange={(e) => {
                                                                                                        setAnotherMedicineInstruction(e.target.value)
                                                                                                    }}
                                                                                                >
                                                                                                    <option defaultValue hidden>
                                                                                                        <CommonLang labelContent='Please Select' keyword='select' />
                                                                                                    </option>
                                                                                                    {filterdMedicineInstruction().map((item, index) => {
                                                                                                        return (<option value={item.id} key={index}>{item.instruction}</option>)
                                                                                                    })}
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-4 d-flex justify-content-center align-items-end'>
                                                                                            <div className={FormStyle.feildWrapper}>
                                                                                                <button className='btn light-green-bg text-white' type="button" onClick={() => addAnotherMedicineInstruction()}>
                                                                                                    
                                                                                                <BiPlus className='me-2' /><CommonText en="Save and add" hi="सहेजें और जोड़ें" />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>}
                                                                        </>}
                                                                    </div>
                                                                </WizardStep>
                                                                
                                                                <WizardStep>
                                                                    {consultationPayload.major_diseases &&
                                                                        <>
                                                                            {allPrescribedExercise.length > 0 && <>
                                                                                <div className='row'>
                                                                                    <div className="col-md-12">
                                                                                        <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                            <div>
                                                                                                <p className={FormStyle.customTableHeading}>
                                                                                                    <ConsultationLang labelContent='Prefered Exercises' keyword='exercises' />
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className={FormStyle.customTableHeadingLine}></div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={FormStyle.diseasesWiseMedicineWrapper}>
                                                                                    <div className="row mt-lg-2">
                                                                                        <div className='col-2'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                                
                                                                                                <ConsultationLang labelContent='S.No.' keyword='seq_no' />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className='col-md-8'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                                <ConsultationLang labelContent='Exercise' keyword='exercises' /></p>
                                                                                        </div>
                                                                                        <div className='col-2'></div>
                                                                                        <div className="col-md-12">
                                                                                            <div className={FormStyle.majorDiseasesCard}>
                                                                                                {allPrescribedExercise.map((item, index) => {
                                                                                                    return (<div className='row mb-3' key={index}>
                                                                                                        <div className='col-2 py-3'>
                                                                                                            {index + 1}
                                                                                                        </div>
                                                                                                        <div className='col-md-6 py-3'>
                                                                                                            {item.exercise_hi_name}
                                                                                                        </div>
                                                                                                        <div className='col-2 d-flex justify-content-end py-3'>
                                                                                                            <input className="form-check-input" type="checkbox" value={index} checked={item.checked} onChange={() => diselectExercises(index)} />
                                                                                                        </div>
                                                                                                    </div>)
                                                                                                })}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </>}
                                                                            {filterdExercises().length > 0 && <>
                                                                                <div className='row'>
                                                                                    <div className="col-md-12">
                                                                                        <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                            <div>
                                                                                                <p className={FormStyle.customTableHeading}>
                                                                                                     
                                                                                                    <CommonText en="Add Exercises" hi="व्यायाम जोड़ें" />

                                                                                                </p>
                                                                                            </div>
                                                                                            <div className={FormStyle.customTableHeadingLine}></div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='row'>
                                                                                    <div className='col-lg-4'>
                                                                                        <div className={FormStyle.feildWrapper}>
                                                                                            <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                                
                                                                                                <CommonText en="Exercise" hi="व्यायाम" />
                                                                                            </label>
                                                                                            <select
                                                                                                className="form-select"
                                                                                                id='exercise'
                                                                                                value={anotherExercise}
                                                                                                onChange={(e) => {
                                                                                                    setAnotherExercise(e.target.value)
                                                                                                }}
                                                                                            >
                                                                                                <option value='' hidden>
                                                                                                    
                                                                                                <CommonText en="Please Select" hi="चुनें" />
                                                                                                </option>
                                                                                                {filterdExercises()?.map((item, index) => {
                                                                                                    return <option value={item.id} key={index}>{item.hi_name}</option>
                                                                                                })}
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='col-lg-3 d-flex align-items-end justify-content-center'>
                                                                                        <div className={FormStyle.feildWrapper}>
                                                                                            <button className='btn light-green-bg text-white' type="button" onClick={() => addAnotherExercise()}>
                                                                                                <BiPlus className='me-2' /><CommonText en="Save & Continue" hi="सहेजें और जारी रखें" />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </>}
                                                                            {diseaseExerciseInstruction?.length > 0 && <>
                                                                                <div className='row '>
                                                                                    <div className="col-md-12">
                                                                                        <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                            <div>
                                                                                                <p className={FormStyle.customTableHeading}>
                                                                                                    <CommonText en='Disease Based Exercise Instructions' hi='रोग आधारित व्यायाम निर्देश' />
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className={FormStyle.customTableHeadingLine}></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={FormStyle.diseasesWiseMedicineWrapper}>
                                                                                        <div className="row mt-lg-2">
                                                                                            <div className='col-2'>
                                                                                                <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                                <ConsultationLang labelContent='S.No.' keyword='seq_no' />
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className='col-8'>
                                                                                                <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                                
                                                                                                    <CommonText en="Instructions" hi="निर्देश" />
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className='col-2'></div>
                                                                                            <div className="col-md-12">
                                                                                                <div className={FormStyle.majorDiseasesCard}>
                                                                                                    {diseaseExerciseInstruction?.map((item, index) => {
                                                                                                        return (
                                                                                                            <div className='row mb-3' key={index}>
                                                                                                                <div className='col-2 py-3'>
                                                                                                                    {index + 1}
                                                                                                                </div>
                                                                                                                <div className='col-md-8 py-3'>
                                                                                                                    {item.instruction}
                                                                                                                </div>
                                                                                                                <div className='col-2 d-flex justify-content-end py-3'>
                                                                                                                    <input className="form-check-input" type="checkbox" value={index} id="checkedExerciseInstruction" onChange={() => diselectExerciseInstruction(index)} checked={item.checked} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    })}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </>}
                                                                            {filterdExerciseInstruction().length > 0 &&
                                                                                <>
                                                                                    <div className='row'>
                                                                                        <div className="col-md-12">
                                                                                            <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                                <div>
                                                                                                    <p className={FormStyle.customTableHeading}>
                                                                                                        
                                                                                                        <ConsultationLang labelContent='Add Exercise Instruction' 
                                                                                                        keyword='add_exercise_instruction' />
                                                                                                    </p>
                                                                                                </div>
                                                                                                <div className={FormStyle.customTableHeadingLine}></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-8'>
                                                                                            <div className={FormStyle.feildWrapper}>
                                                                                                <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                                    
                                                                                                    <CommonText en="Instructions" hi="निर्देश" />
                                                                                                </label>
                                                                                                <select
                                                                                                    className="form-select"
                                                                                                    id="anotherExerciseInstruction"
                                                                                                    value={anotherExerciseInstruction}
                                                                                                    onChange={(e) => {
                                                                                                        setAnotherExerciseInstruction(e.target.value)
                                                                                                    }}
                                                                                                >
                                                                                                    <option defaultValue hidden>
                                                                                                        <CommonLang labelContent='Please Select' keyword='select' />
                                                                                                    </option>
                                                                                                    {filterdExerciseInstruction().map((item, index) => {
                                                                                                        return (<option value={item.id} key={index}>{item.instruction}</option>)
                                                                                                    })}
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-4 d-flex justify-content-center align-items-end'>
                                                                                            <div className={FormStyle.feildWrapper}>
                                                                                                <button className='btn light-green-bg text-white' type="button" onClick={() => addAnotherExerciseInstruction()}>
                                                                                                    
                                                                                                <BiPlus className='me-2'/><CommonText en="Save and add" hi="सहेजें और जोड़ें" />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>}
                                                                        </>
                                                                    }
                                                                </WizardStep>
                                                                <WizardStep>
                                                                    {diseaseDietToTake && diseaseDietToTake.length > 0 && <>
                                                                        <div className='row'>
                                                                            <div className="col-md-12">
                                                                                <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                    <div>
                                                                                        <p className={FormStyle.customTableHeading}>
                                                                                            
                                                                                            
                                                                                            <CommonText en="Diets to take" hi="
                                                                                                आहार जो लेना है" />
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className={FormStyle.customTableHeadingLine}></div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-12'>
                                                                                <div className={FormStyle.diseasesWiseMedicineWrapper}>
                                                                                    <div className="row mt-lg-2">
                                                                                        <div className='col-2'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                            <ConsultationLang labelContent='S.No.' keyword='seq_no' />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className='col-8'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                            <CommonText en="Diets to take" hi="
                                                                                                आहार जो लेना है" />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className='col-2'></div>
                                                                                        <div className="col-md-12">
                                                                                            <div className={FormStyle.majorDiseasesCard}>
                                                                                                {diseaseDietToTake?.map((item, index) => {
                                                                                                    return (
                                                                                                        <div className='row mb-3' key={index}>
                                                                                                            <div className='col-2 py-3'>
                                                                                                                {index + 1}
                                                                                                            </div>
                                                                                                            <div className='col-md-8 py-3'>
                                                                                                                {item.description}
                                                                                                            </div>
                                                                                                            <div className='col-2 d-flex justify-content-end py-3'>
                                                                                                                <input className="form-check-input" type="checkbox" value={index} id="checkedDietsToTake" onChange={() => diselectDietsToTake(index)} checked={item.checked} />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                })}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>}
                                                                    {filterdDietsToTake().length > 0 &&
                                                                        <>
                                                                            <div className='row'>
                                                                                <div className="col-md-12">
                                                                                    <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingnpWrapper} overflow-hidden position-relative my-4`}>
                                                                                        <div>
                                                                                            <p className={FormStyle.customTableHeading}>
                                                                                                
                                                                                                <CommonText en="Add Diet To Take" hi="आहार जो लेना है जोड़े" />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className={FormStyle.customTableHeadingLine}></div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-8'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                            
                                                                                            <CommonText en="Diet To Take" hi="
                                                                                                आहार जो लेना है" />
                                                                                        </label>
                                                                                        <select
                                                                                            className="form-select"
                                                                                            id="anotherDietToTake"
                                                                                            value={anotherDietToTake}
                                                                                            onChange={(e) => {
                                                                                                setAnotherDietToTake(e.target.value)
                                                                                            }}
                                                                                        >
                                                                                            <option defaultValue hidden>
                                                                                                <CommonLang labelContent='Please Select' keyword='select' />
                                                                                            </option>
                                                                                            {filterdDietsToTake().map((item, index) => {
                                                                                                return (<option value={item.id} key={index}>{item.description}</option>)
                                                                                            })}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-4 d-flex justify-content-center align-items-end'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <button className='btn light-green-bg text-white' type="button" onClick={() => addAnotherDietToTake()}>
                                                                                        <BiPlus className='me-2'/><CommonText en="Save and add" hi="
सहेजें और जोड़ें" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>}
                                                                    {diseaseDietNotToTake && diseaseDietNotToTake.length > 0 && <>
                                                                        <div className='row'>
                                                                            <div className="col-md-12">
                                                                                <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                    <div>
                                                                                        <p className={FormStyle.customTableHeading}>
                                                                                            
                                                                                            <CommonText en="Diets not to take" hi="आहार जो नहीं लेना है" />
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className={FormStyle.customTableHeadingLine}></div>
                                                                                </div>
                                                                            </div>

                                                                            <div className='col-12'>
                                                                                <div className={FormStyle.diseasesWiseMedicineWrapper}>
                                                                                    <div className="row mt-lg-2">
                                                                                        <div className='col-2'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                                
                                                                                                <ConsultationLang labelContent='S.No.' keyword='seq_no' />
                                                                                                
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className='col-8'>
                                                                                            <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                                
                                                                                                <CommonText en="Diets not to take" hi="आहार जो नहीं लेना है" />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className='col-2'></div>
                                                                                        <div className="col-md-12">
                                                                                            <div className={FormStyle.majorDiseasesCard}>
                                                                                                {diseaseDietNotToTake?.map((item, index) => {
                                                                                                    return (
                                                                                                        <div className='row mb-3' key={index}>
                                                                                                            <div className='col-2 py-3'>
                                                                                                                {index + 1}
                                                                                                            </div>
                                                                                                            <div className='col-md-8 py-3'>
                                                                                                                {item.description}
                                                                                                            </div>
                                                                                                            <div className='col-2 d-flex justify-content-end py-3'>
                                                                                                                <input className="form-check-input" type="checkbox" value={index} id="checkedDietsToTake" onChange={() => diselectDietsNotToTake(index)} checked={item.checked} />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                })}
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </>}
                                                                    {filterdDietsNotToTake().length > 0 &&
                                                                        <>
                                                                            <div className='row'>
                                                                                <div className="col-md-12">
                                                                                    <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                        <div>
                                                                                            <p className={FormStyle.customTableHeading}>
                                                                                                
                                                                                                <CommonText en="Add Diet Not To Take" hi="आहार जो नहीं लेना है जोड़े" />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className={FormStyle.customTableHeadingLine}></div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-8'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                            
                                                                                            <CommonText en="Diet Not To Take" hi="आहार जो नहीं लेना है" />
                                                                                        </label>
                                                                                        <select
                                                                                            className="form-select"
                                                                                            id="anotherDietNotToTake"
                                                                                            value={anotherDietNotToTake}
                                                                                            onChange={(e) => {
                                                                                                setAnotherDietNotToTake(e.target.value)
                                                                                            }}
                                                                                        >
                                                                                            <option defaultValue hidden>
                                                                                                <CommonLang labelContent='Please Select' keyword='select' />
                                                                                            </option>
                                                                                            {filterdDietsNotToTake().map((item, index) => {
                                                                                                return (<option value={item.id} key={index}>{item.description}</option>)
                                                                                            })}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-4 d-flex justify-content-center align-items-end'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <button className='btn light-green-bg text-white' type="button" onClick={() => addAnotherDietNotToTake()}>
                                                                                        <BiPlus className='me-2'/><CommonText en="Save and add" hi="
सहेजें और जोड़ें" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>}
                                                                    {diseaseSpecialInstruction?.length > 0 && <>

                                                                        <div className='row '>
                                                                            <div className="col-md-12">
                                                                                <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                    <div>
                                                                                        <p className={FormStyle.customTableHeading}>
                                                                                            <CommonText en='Special Instructions' hi='विशेष निर्देश' />
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className={FormStyle.customTableHeadingLine}></div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={FormStyle.diseasesWiseMedicineWrapper}>
                                                                                <div className="row mt-lg-2">
                                                                                    <div className='col-2'>
                                                                                        <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                        <ConsultationLang labelContent='S.No.' keyword='seq_no' />
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className='col-8'>
                                                                                        <p className={FormStyle.diseasesWiseMedicineWrapperHeading}>
                                                                                            
                                                                                            <CommonText en="Instructions" hi="निर्देश" />
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className='col-2'></div>
                                                                                    <div className="col-md-12">
                                                                                        <div className={FormStyle.majorDiseasesCard}>
                                                                                            {diseaseSpecialInstruction?.map((item, index) => {
                                                                                                return (
                                                                                                    <div className='row mb-3' key={index}>
                                                                                                        <div className='col-2 py-3'>
                                                                                                            {index + 1}
                                                                                                        </div>
                                                                                                        <div className='col-md-8 py-3'>
                                                                                                            {item.instruction}
                                                                                                        </div>
                                                                                                        <div className='col-2 d-flex justify-content-end py-3'>
                                                                                                            <input className="form-check-input" type="checkbox" value={index} id="checkedSpecialInstruction" onChange={() => diselectSpecialInstruction(index)} checked={item.checked} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>}
                                                                    {filterdSpecialInstruction().length > 0 &&
                                                                        <>
                                                                            <div className='row'>
                                                                                <div className="col-md-12">
                                                                                    <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                        <div>
                                                                                            <p className={FormStyle.customTableHeading}>
                                                                                                
                                                                                                <CommonText en="Add Special Instruction" hi="विशेष निर्देश जोड़े" />
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className={FormStyle.customTableHeadingLine}></div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-8'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <label htmlFor='' className={FormStyle.customLabelSecond}>
                                                                                            
                                                                                            <CommonText en="Instruction" hi="निर्देश" />
                                                                                        </label>
                                                                                        <select
                                                                                            className="form-select"
                                                                                            id="anotherSpecialInstruction"
                                                                                            value={anotherSpecialInstruction}
                                                                                            onChange={(e) => {
                                                                                                setAnotherSpecialInstruction(e.target.value)
                                                                                            }}
                                                                                        >
                                                                                            <option defaultValue hidden>
                                                                                                <CommonLang labelContent='Please Select' keyword='select' />
                                                                                            </option>
                                                                                            {filterdSpecialInstruction().map((item, index) => {
                                                                                                return (<option value={item.id} key={index}>{item.instruction}</option>)
                                                                                            })}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-4 d-flex justify-content-center align-items-end'>
                                                                                    <div className={FormStyle.feildWrapper}>
                                                                                        <button className='btn light-green-bg text-white' type="button" onClick={() => addAnotherSpecialInstruction()}>
                                                                                        <BiPlus className='me-2'/><CommonText en="Save and add" hi="सहेजें और जोड़ें" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>}
                                                                    <div className='row'>
                                                                        <div className="col-md-12">
                                                                            <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden position-relative my-4`}>
                                                                                <div>
                                                                                    <p className={FormStyle.customTableHeading}>
                                                                                        
                                                                                        <CommonText en="Special Instructions / Description" hi="विशेष निर्देश / टिप्पणी" />
                                                                                    </p>
                                                                                </div>
                                                                                <div className={FormStyle.customTableHeadingLine}></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-md-12'>
                                                                            <div className={` ${FormStyle.feildWrapper}`}>
                                                                                <textarea id="remark" value={consultationPayload.remark}
                                                                                    onChange={(e) => handleOnChange(e)} className={`${FormStyle.customTextarea}`} rows={3} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </WizardStep>
                                                                <WizardStep>
                                                                    <div className='row'>
                                                                        <div className="col-md-12">
                                                                            <div className={`${FormStyle.feildWrapper}${FormStyle.customTableHeadingWrapper} overflow-hidden
                                        position-relative my-4`}>
                                                                                <div>
                                                                                    <p className={FormStyle.customTableHeading}>
                                                                                        <CommonText en="Accounts Details" hi="लेखा विवरण" />
                                                                                    </p>
                                                                                </div>
                                                                                <div className={FormStyle.customTableHeadingLine}></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <div className={FormStyle.feildWrapper}>
                                                                                <label className={FormStyle.customLabelSecond}><CommonText en="Previous Balance" hi="पिछला बकाया" /> </label>
                                                                                <div className='input-group-text justify-content-between'>
                                                                                    {patientDetails.remaining_amount} <span>₹</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <div className={FormStyle.feildWrapper}>
                                                                                <label className={FormStyle.customLabelSecond}><CommonText en="Disease Map Amount" hi="रोग आधारित राशि" /></label>
                                                                                <div className='input-group-text justify-content-between'>
                                                                                    {getDiseasesDataById(consultationPayload.major_diseases)?.billing_amount}<span>₹</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <div className={FormStyle.feildWrapper}>
                                                                                <label htmlFor="actual_amount" className={FormStyle.customLabelSecond}><CommonText en="Actual Amount" hi="वास्तविक राशि" /></label>
                                                                                <div className='input-group'>
                                                                                    <input type="text" id="actual_amount"
                                                                                        className="form-control"
                                                                                        value={paymentDetails.actual_amount}
                                                                                        onChange={(e) => handleAccountDetailChange(e)}
                                                                                        required

                                                                                    />
                                                                                    <span class="input-group-text">₹</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <div className={FormStyle.feildWrapper}>
                                                                                <label htmlFor="discount" className={FormStyle.customLabelSecond}><CommonText en="Discount" hi="छूट" /></label>
                                                                                <div className='input-group'>
                                                                                    <input type="text" id="discount"
                                                                                        className="form-control"
                                                                                        value={paymentDetails.discount}
                                                                                        onChange={(e) => handleAccountDetailChange(e)}
                                                                                    />
                                                                                    <span class="input-group-text">₹</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <div className={FormStyle.feildWrapper}>
                                                                                <label htmlFor="payable" className={FormStyle.customLabelSecond}><CommonText en="Payable" hi="देय" /></label>
                                                                                <div className='input-group-text justify-content-between'>
                                                                                    {paymentDetails.actual_amount - paymentDetails.discount}<span>₹</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </WizardStep>
                                                            </Wizard>
                                                        </>
                                                        }
                                                    </>}
                                            </>
                                                :
                                                <p><CommonText en="Good Morning !.." hi="शुभ प्रभात !.." /><br /><CommonText en="No Patients have registered yet. You can come again here and see the details once the patients are registered." hi="अभी तक कोई मरीज दर्ज नहीं हुआ है। आप यहां फिर से आ सकते हैं और रोगियों के पंजीकरण के बाद विवरण देख सकते हैं।" /> </p>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </>}
                </div>
            </div>
        </section>
    </>
    )
}