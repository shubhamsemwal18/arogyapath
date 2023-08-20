import FormStyle from '../../../css/form.module.css';
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'
import { useEffect, useState } from 'react';
import * as ACTION from './action'
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

const AccountsReport = () =>{

    const [reportPayload, setReportPayload] = useState({})

    const [reportData, setReportData] = useState([])

    let { addToast } = useToasts();
    
    const state = useSelector((state) => state.AccountsReportManagementReducer);
    
    const dispatch = useDispatch();


    const fileType = "xlsx"

    const exportToCsv = () =>{

        let reportDataCopy = [...reportData]
        let csvData = [];

        csvData[0] = {
            patient_id:'Registration No',
            actual_amount:'Payable Amount',
            discount:'Discount',
            paid_amount:'Paid Amount',
            remaining_amount:'Balance',
        }

        reportDataCopy.map((item,index)=>{
            return csvData[index + 1] = item;
        })

    const jsonData = XLSX.utils.json_to_sheet(csvData, {
        skipHeader: true,
    });

    // const jsonData = XLSX.utils.json_to_sheet(reportData);

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
        dispatch(ACTION.getAccountsDatewiseData(reportPayload))
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

        if(state.getAccountsDateWiseDataSuccess){

            setReportData(state.getAccountsDateWiseDataSuccess.data)

            if(state.getAccountsDateWiseDataSuccess.data.lengh = 0){
                addToast("Warning!", {
                    appearance: "warning",
                    content: `No data found on these dates.`,
                });
            }
        }

        if(state.getAccountsDateWiseDataFailure){
            addToast("Error!", {
                appearance: "error",
                content: `Unable to get data.`,
            });
        }

        dispatch(ACTION.resetToInitialState())
    },[state.getAccountsDateWiseDataSuccess, state.getAccountsDateWiseDataFailure])

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
                            <th>Registration No</th>
                            <th>Payable</th>
                            <th>Discount</th>
                            <th>Paid</th>
                            <th>Balance</th>
                          </tr>
                          </thead>
                          <tbody>
                          {reportData.length > 0 ? reportData.map((item, index) => {
                              return (
                                <tr className={FormStyle.allListTableSingleRow} key={index}>
                                  <td>{item.patient_id}</td>
                                  <td>{item.actual_amount}</td>
                                  <td>{item.discount}</td>
                                  <td>{item.paid_amount}</td>
                                  <td>{item.remaining_amount}</td>
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

export default AccountsReport