import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

import {
    uploadResume,
    getMyResume,
    deleteResume
} from "../api/resumeApi";


import {
    analyzeResume,
    getMyAnalysis
} from "../api/aiApi";


import toast from "react-hot-toast";



export default function ResumeDashboard() {


    const [file,setFile] = useState(null);

    const [resume,setResume] = useState(null);

    const [analysis,setAnalysis] = useState(null);

    const [pageLoading,setPageLoading] = useState(true);




    useEffect(()=>{

        loadResume();

    },[]);





    const loadResume = async()=>{


        try{


            setPageLoading(true);



            const resumeData =
                await getMyResume();



            setResume(
                resumeData
            );




            try{


                const analysisData =
                    await getMyAnalysis();



                if(
                    analysisData &&
                    analysisData.resume_score > 0
                ){

                    setAnalysis(
                        analysisData
                    );

                }
                else{

                    setAnalysis(null);

                }



            }
            catch(error){


                setAnalysis(null);


            }



        }
        catch(error){


            setResume(null);

            setAnalysis(null);


        }
        finally{


            setPageLoading(false);

        }


    };









    const handleUpload = async()=>{


        if(!file){

            toast.error(
                "Please select PDF file"
            );

            return;
        }




        try{


            const data =
                await uploadResume(file);



            setResume(data);



            // clear old analysis
            setAnalysis(null);



            setFile(null);



            toast.success(
                "Resume Uploaded Successfully"
            );



            const updatedResume =
                await getMyResume();



            setResume(
                updatedResume
            );



        }
        catch(error){


            console.log(error);


            toast.error(
                error?.response?.data?.error ||
                "Upload Failed"
            );


        }


    };









    const handleAnalyze = async()=>{


        try{


            const data =
                await analyzeResume();



            setAnalysis(
                data
            );


            toast.success(
                "Resume Analyzed"
            );


        }
        catch(error){


            console.log(error);


            toast.error(
                error?.response?.data?.error ||
                "Analysis Failed"
            );


        }


    };









    const handleDelete = async()=>{


        try{


            await deleteResume();



            setResume(null);

            setAnalysis(null);

            setFile(null);



            toast.success(
                "Resume deleted successfully"
            );


        }
        catch(error){


            toast.error(
                error?.response?.data?.error ||
                "Delete failed"
            );


        }


    };








    if(pageLoading){


        return (

            <DashboardLayout>

                <LoadingSpinner />

            </DashboardLayout>

        );


    }







    return (

        <DashboardLayout>


            <div
                style={{
                    padding:"20px",
                    color:"white"
                }}
            >


                <h2>
                    📄 Resume Dashboard
                </h2>





                {/* Resume Status */}


                <div

                    style={{

                        background:"#1e293b",

                        padding:"20px",

                        borderRadius:"12px",

                        marginTop:"20px"

                    }}

                >


                    <h3>
                        Resume Status
                    </h3>



                    {
                    !resume ?


                    <EmptyState
                        message="No Resume Uploaded"
                    />


                    :


                    <>


                        <p>
                            ✅ Resume Uploaded
                        </p>




                        <a

                            href={
                                resume.resume_url
                            }

                            target="_blank"

                            rel="noreferrer"

                            style={{
                                color:"#38bdf8"
                            }}

                        >

                            View Resume PDF

                        </a>



                        <br />





                        <button

                            onClick={handleAnalyze}

                            style={{

                                marginTop:"20px",

                                padding:"10px 20px",

                                background:"#16a34a",

                                color:"white",

                                border:"none",

                                borderRadius:"8px",

                                cursor:"pointer"

                            }}

                        >

                            🤖 Analyze Resume

                        </button>







                        <button

                            onClick={handleDelete}

                            style={{

                                marginTop:"20px",

                                marginLeft:"15px",

                                padding:"10px 20px",

                                background:"#dc2626",

                                color:"white",

                                border:"none",

                                borderRadius:"8px",

                                cursor:"pointer"

                            }}

                        >

                            🗑 Delete Resume

                        </button>



                    </>

                    }





                </div>









                {/* Upload */}



                <div
                    style={{
                        marginTop:"25px"
                    }}
                >



                    <input

                        type="file"

                        accept=".pdf"

                        onChange={(e)=>
                            setFile(
                                e.target.files[0]
                            )
                        }

                    />



                    <br />



                    <button

                        onClick={handleUpload}


                        style={{

                            marginTop:"15px",

                            padding:"10px 20px",

                            background:"#2563eb",

                            color:"white",

                            border:"none",

                            borderRadius:"8px",

                            cursor:"pointer"

                        }}

                    >

                        Upload Resume

                    </button>



                </div>









                {/* AI RESULT */}



                {
                analysis &&


                <div

                    style={{

                        marginTop:"30px",

                        background:"#1e293b",

                        padding:"20px",

                        borderRadius:"12px"

                    }}

                >



                    <h3>

                        🤖 AI Resume Analysis

                    </h3>




                    <p>

                        Resume Score:

                        {" "}

                        <b>

                        {analysis.resume_score}

                        </b>

                    </p>





                    <p>

                        Summary:

                    </p>




                    <p>

                        {analysis.summary}

                    </p>







                    <h4>

                        Skills

                    </h4>




                    <ul>


                    {
                    analysis.skills?.map(

                        (skill,index)=>(

                            <li key={index}>

                                {skill}

                            </li>

                        )

                    )
                    }


                    </ul>




                </div>

                }





            </div>


        </DashboardLayout>

    );

}