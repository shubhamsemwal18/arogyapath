import { useState } from 'react';
import exercisesStyle from '../../css/exercises.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { CommonText } from '../../Multi_Lang';

function VideosDetail() {
    let [videoUrl, setVideoUrl] = useState([{
        videoUrl: "https://www.youtube.com/embed/Vpeo-8WFUFU",
    },
    {
        videoUrl: "https://www.youtube.com/embed/vKiAMj0zYHg"
    },
    {
        videoUrl: "https://www.youtube.com/embed/fC9nudceylY"
    },
    {
        videoUrl: "https://www.youtube.com/embed/LUjxpy8NNRM"
    }])

    return (
        <>
         <div className="common-redirect-banner">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12 text-center">
                            <p className="common-redirect-banner-title">
                                <CommonText en="Video Details" hi="वीडियो विवरण"/> </p>
                            <nav aria-label="breadcrumb"></nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className={`${exercisesStyle.videoCards}  section-padding `}>
                <div className='container'>
                    <div className='row'>



                        {/* <Image src="/images/exsercise1.gif" alt="aboutpic" layout='fill' /> */}
                        {
                            videoUrl.map((item, i) => {
                                return (

                                    <div className='col-lg-6 '>
                                        <div className={exercisesStyle.excerciseSingleCard}>
                                            <div className={exercisesStyle.excerciseCardPic}>


                                                {/* <video key={item.videoUrl} width="100%" height="100%" controls>
                                                    <source src={item.videoUrl} />
                                                    Your browser does not support the video tag.
                                                </video> */}
                                                <div className={exercisesStyle.videoBox}>
                                                <iframe width="100%" height="100%" key={item.videoUrl} 
                                                src={item.videoUrl} >
                                                </iframe>
                                                </div>
                                                <div className={`${exercisesStyle.excerciseCardContent} d-none`}>
                                                    <p className={exercisesStyle.title}>Video {i}</p>


                                                </div>
                                            </div>
                                        </div>
                                        </div>


                                        )
                                        })
                                     
                                    }


                </div>

            </div>

        </section>

        </>
    )
}

export default VideosDetail;