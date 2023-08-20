import FormStyle from '../../../css/form.module.css';
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'
import { useEffect, useState } from 'react';
import * as ACTION from './action'
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

const DispensaryReport = () =>{

    const [reportPayload, setReportPayload] = useState({})

    const [reportData, setReportData] = useState([])
    const [allDates, setAllDates] = useState([])

    let { addToast } = useToasts();
    
    const state = useSelector((state) => state.DispensaryReportManagementReducer);
    
    const dispatch = useDispatch();


    const fileType = "xlsx"

    const exportToCsv = () =>{

    // const jsonData = XLSX.utils.json_to_sheet(reportData, {
    //     skipHeader: true,
    // });

    const jsonData = XLSX.utils.json_to_sheet(reportData);

    const obj = {
        Sheets:{
            'Reports':jsonData,
        },
        SheetNames:['Reports']
    }

    const objCopy = {...obj}

    const excelBuffer = XLSX.write(objCopy, {bookType:"xlsx", type:"array"})
    const data = new Blob([excelBuffer], {type:fileType});
    FileSaver.saveAs(data, "Report"+".xlsx")
}

    const handleChange = (e) =>{
        let reportPayloadCopy ={...reportPayload}
        reportPayloadCopy[e.target.id] = e.target.value
        setReportPayload(reportPayloadCopy)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(ACTION.getDispensaryDatewiseData(reportPayload))
    }

    let maxAge = () =>{
        let globalDate = new Date();
        let currentDate = globalDate.getDate();
        let currentYear = globalDate.getFullYear();
        let currentMonth = globalDate.getMonth() + 1;

        if(currentMonth <10){
        currentMonth = "0"+currentMonth;
        }
        if(currentDate <10){
        currentDate = "0"+currentDate;
        }

        let maxDate = `${currentYear}-${currentMonth}-${currentDate}`;

        return maxDate;
    }

    useEffect(()=>{

        if(state.getDispensaryDateWiseDataSuccess){

            setReportData(state.getDispensaryDateWiseDataSuccess.data)
            setAllDates(state.getDispensaryDateWiseDataSuccess.date)

            if(state.getDispensaryDateWiseDataSuccess.data.lengh = 0){
                addToast("Warning!", {
                    appearance: "warning",
                    content: `No data found on these dates.`,
                });
            }
        }

        if(state.getDispensaryDateWiseDataFailure){
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get data.`,
            });
        }

        dispatch(ACTION.resetToInitialState())
    },[state.getDispensaryDateWiseDataSuccess, state.getDispensaryDateWiseDataFailure])

  return (
    <section className={FormStyle.commonFormArea}>
        <div className='container'>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className={FormStyle.commonFormWrapper}>
                <div className='row'>
                    <div className='col-4'>
                        <div className={FormStyle.feildWrapper} >
                            <label htmlFor='startFrom' className={FormStyle.customLabelSecond}>From*</label>
                            <input type="date" 
                                    id="startFrom"
                                    onChange={(e) => handleChange(e)}
                                    value={reportPayload.startFrom}
                                    max={maxAge()}
                                    />
                        </div>
                    </div>
                    <div className='col-4'>
                    {reportPayload.startFrom &&
                        <div className={FormStyle.feildWrapper} >
                            <label htmlFor='endTo' className={FormStyle.customLabelSecond}>To</label>
                            <input type="date" 
                                    id="endTo"
                                    onChange={(e) => handleChange(e)}
                                    value={reportPayload.endTo}
                                    max={maxAge()}
                                    min={reportPayload.startFrom}
                                    required
                                    />
                        </div>
                    }
                    </div>
                    {reportPayload.startFrom && reportPayload.endTo &&
                    <div className='col-4 d-flex align-items-end justify-content-center'>
                        <div className={FormStyle.feildWrapper}>
                            <button type='submit' 
                                className='common-gradient' 
                                >Go</button> 
                        </div>
                    </div>
                    }
                    {reportData.length > 0 && 
                    <>
                    <div className='col-12 d-flex align-items-center justify-content-end'>
                        <div className={FormStyle.feildWrapper}>
                            <button type='button' 
                                className='common-gradient' 
                                onClick={()=>exportToCsv()}
                                >Export</button> 
                        </div>
                    </div>
                    {/* Table View */}

                    <div className="col-md-12">
                        <div className={FormStyle.allListTable}>
                            <table>
                              <thead>
                          <tr className={FormStyle.allListTableHeadings}>
                            <th>Medicine</th>
                            {allDates?.map((item)=>{
                                return(
                                    <th>{item}</th>
                                )
                            })}
                          </tr>
                          </thead>
                          <tbody>
                          {reportData.length > 0 ? reportData.map((item, index) => {
                              return (
                                <tr className={FormStyle.allListTableSingleRow} key={index}>
                                  <td>{item.medicine}</td>
                                  {
                                    allDates?.map((dates)=>{
                                        return(
                                            <td>{item[dates]}</td>
                                        )
                                    })
                                  }
                                </tr>
                              )
                            })
                            :
                            <tr><td>No data found</td></tr>
                          }
                          </tbody>
                            </table>
                      </div>
                    </div>

                    {/* End Table View */}
                    </>
                    }
                </div>
            </div>
            </form>
        </div>
    </section>
  )
}

export default DispensaryReport