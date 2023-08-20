import React, { useState, useMemo, useCallback, useEffect } from "react";
import ImageCapture from "react-image-data-capture";
import Image from "next/image";
import captureImageStyle from '../../css/captureImage.module.css'
import { useToasts } from "react-toast-notifications";
import LoadingSpin from "react-loading-spin";
import { CommonText } from "../../Multi_Lang";
import { CommonPlainText } from "../../Multi_Lang/text";

export default function Capture(props) {
      
    const [showImgCapture, setShowImgCapture] = useState(true);
    const config = useMemo(() => ({ video: true }), []);
    const [imgSrc, setImgSrc] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    let { addToast } = useToasts();
    
    const handleCancel = () =>{
      props.handleCancel()
    }  

    const handleUpload = () =>{
      props.handleCapture(imgFile, props.id)
    }  

    const onCapture = (imageData) => {
        // read as webP
        setImgSrc(imageData.webP);
        // read as file

        let imgFile = new File([imageData.blob], `${Date.now()}`, {type: 'image/png'});
        // setImgFile(imageData.file);
        setImgFile(imgFile);
        // Unmount component to stop the video track and release camera
        setShowImgCapture(false);
      };

      let handleRetake = () =>{
        setImgFile(null)
        setImgSrc(null)
        setShowImgCapture(true)
      }

      useEffect(()=>{
        setTimeout(() => { setIsLoading(false) }, 3000)
      },[isLoading])

      const onError = useCallback((error) => {
        console.log(error,'this error found on that')
        addToast("Warning!", {
          appearance: "warning",
          content: `Unable to Capture image right now please refresh and try again.`,
        });
      }, []);

  return (
    <>
        {isLoading ? 
        <div className={captureImageStyle.loader}>
            <div>
            <LoadingSpin
                size="50px"
                primaryColor="#2BBF50"/>
            </div>
        </div>
    : <div>
      {showImgCapture && (
        <div 
        className={`${captureImageStyle.customModal} ${CommonPlainText({
          en:captureImageStyle.en_custom_modal,
          hi:captureImageStyle.hi_custom_modal
       })}`}
       >
          <div className={captureImageStyle.captureBox}>
        <ImageCapture
          onCapture={onCapture}
          onError={onError}
          width={500}
          userMediaConfig={config}
        />
        <buttton type="button" className="common-cancel-btn" onClick={()=>handleCancel()}>
        <CommonText en="Cancel" hi="रद्द करें" />
        </buttton>
        </div>
      </div>
      )}
      {imgSrc && (
        <div className={captureImageStyle.imageView}>
            <div className={captureImageStyle.customBox}>
          <Image src={imgSrc} alt="captured-img" layout='fill' width={500} height={500}/>
          <div className="d-flex w-100 mt-2 justify-content-between">
            <buttton type="button" className="common-cancel-btn" onClick={()=>handleCancel()}>
            <CommonText en="Cancel" hi="रद्द करें" />
            </buttton>
            <div className="d-flex">
              <buttton type="button" className="common-gradient me-2" onClick={()=>handleRetake()}>
              <CommonText en="Retake" hi="फिर से ले" />
              </buttton>
              <buttton type="button" className="common-gradient" onClick={()=>handleUpload()}>
              <CommonText en="Upload" hi="अपलोड" />
              </buttton>
            </div>
          </div>
          </div>
        </div>  
      )}
      </div>}
    </>
    
  )
}
