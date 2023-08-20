import { useState } from "react";
import FormStyle from '../../css/form.module.css'
import React from "react";
import { WizardLang } from "../../MultiLanguageFiles/wizard";
import { RadioLableLang } from "../../MultiLanguageFiles/radioLable";
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

export const TextField = ({label, ...props}) => {
  return (
    <>
        <label htmlFor={props.id}>{label}</label>
        <input
        {...props}
        />
    </>
  )
}


export const RadioButton = ({label, ...props}) => {
  return (
    <>
        <label className={FormStyle.customRadio}> <RadioLableLang labelContent={label} keyword={props.keyword}/>
            <input
                {...props}
            />
            <span className={FormStyle.checkmark}></span>
        </label>
    </>
  )
}


export function WizardStep({children}){
  return <>{children}</>
}

export function Wizard({children,...props}){
  const childrenArray = React.Children.toArray(children);
  const [step,setStep] = useState(0);
  const currentChild = childrenArray[step];
  const currentMode = props.wizardMode;
  

  const isLastStep = () =>{
      return step === childrenArray.length - 1;
  }

  const previousStep = () =>{
      setStep(step - 1);
      if (typeof window !== 'undefined') {
        document.documentElement.scrollTop = 0
        }
  }
  
  const handleWizardFormSubmit = (e)=>{
      
      e.preventDefault();

      
      if(isLastStep()){
          props.handleSubmit();
      }
      else{
          setStep(step + 1);
          if (typeof window !== 'undefined') {
          document.documentElement.scrollTop = 0
          }
      }
  }

  let handleHidden = () =>{
    if(props.hideForm){
    props.hideForm();
    }
  }
  return(
          <form  onSubmit={(e)=>handleWizardFormSubmit(e)}>
          {currentChild}
      <div className="col-md-12">
        <div className="py-3 d-flex justify-content-between">
          <button type="button" className={FormStyle.formButtonPrev} onClick={() => handleHidden()}>
            <WizardLang labelContent='Cancel' keyword='cancel' />
          </button>
          <div>
            {step > 0 ? <button type="button" className={FormStyle.formButtonPrev} onClick={() => previousStep()}><WizardLang labelContent='Previous' keyword='previous' /></button> : null}
            {isLastStep() ? <button id="wizardSubmit" className={FormStyle.formButton} type="submit" disabled={props.progressStatus}>{currentMode == 'Edit' ? <>{props.progressStatus ? <div className="search-Loader p-2">
                <Loader
                  color='#fff' 
                  size={10}/>
              </div> : <WizardLang labelContent='Update' keyword='update' />} </> : <>{props.progressStatus ? <div className="search-Loader p-2">
                <Loader
                  color='#fff' 
                  size={10}/>
              </div> : <WizardLang labelContent='Submit' keyword='submit' />}</>}</button> : <button id="wizardNext" className={FormStyle.formButton} type="submit" disabled={props.progressStatus}>
              {props.progressStatus ? <div className="search-Loader p-2">
                <Loader
                  color='#fff' 
                  size={10}/>
              </div> : <WizardLang labelContent='Next' keyword='next' />}
            </button>}
                </div>
              </div>
          </div>
      </form>
  )
}
 