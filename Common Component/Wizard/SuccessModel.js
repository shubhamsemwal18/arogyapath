import { useState, useEffect } from "react";
import FormStyle from '../../css/form.module.css'
import React from "react";

  
export function SuccessModal({children,...props}){
  
    return(
            <div>
                {children}
            </div>
    )
  }