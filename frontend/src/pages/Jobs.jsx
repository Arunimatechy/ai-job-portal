import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

import { getJobs } from "../api/jobApi";
import { applyJob } from "../api/applicationApi";

import toast from "react-hot-toast";


export default function Jobs() {


    const [jobs,setJobs] = useState([]);

    const [search,setSearch] = useState("");

    const [loading,setLoading] = useState(true);

    const [appliedJobs,setAppliedJobs] =
    useState([]);




    useEffect(()=>{

        loadJobs();

    },[]);




    const loadJobs = async()=>{

        try{

            setLoading(true);


            const data =
            await getJobs();


            setJobs(

                Array.isArray(data)

                ?

                data

                :

                data.jobs ||
                data.results ||
                []

            );


        }catch(error){

            toast.error(
                "Failed to load jobs"
            );


        }finally{

            setLoading(false);

        }

    };






    const handleApply = async(jobId)=>{


        try{


            await applyJob(jobId);


            toast.success(
                "Application Submitted"
            );


            setAppliedJobs(prev=>[
                ...prev,
                jobId
            ]);



        }catch(error){


            toast.error(
                error?.response?.data?.error ||
                "Already Applied"
            );


        }


    };






    const filteredJobs =
    jobs.filter(job=>{


        const title =
        job.title?.toLowerCase() || "";


        const company =
        job.company?.toLowerCase() || "";


        const text =
        search.toLowerCase();



        return (

            title.includes(text)

            ||

            company.includes(text)

        );


    });







    if(loading){

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

        padding:"30px",

        color:"white"

    }}

    >




    <h1

    style={{

        background:
        "linear-gradient(90deg,#60a5fa,#c084fc)",

        WebkitBackgroundClip:"text",

        color:"transparent"

    }}

    >

    🔥 Available Jobs

    </h1>




    <p

    style={{

        color:"#94a3b8"

    }}

    >

    Find your next career opportunity

    </p>






    <input


    placeholder="Search jobs or company..."


    value={search}


    onChange={(e)=>
        setSearch(e.target.value)
    }



    style={searchStyle}


    />







    {
    filteredJobs.length===0

    ?

    (

        <EmptyState

        message="No Jobs Found"

        />

    )


    :





    <div

    style={{

        display:"grid",

        gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",

        gap:"25px",

        marginTop:"30px"

    }}

    >






    {
    filteredJobs.map(job=>(



    <div


    key={job.id}


    style={cardStyle}



    >





    <h2

    style={{

        color:"#38bdf8"

    }}

    >

    {job.title}

    </h2>





    <p>

    🏢 {job.company}

    </p>




    <p>

    📍 {job.location}

    </p>




    <p>

    💼 {job.job_type}

    </p>





    <p

    style={{

        color:"#94a3b8"

    }}

    >

    🛠 Skills

    <br/>

    {job.skills_required}

    </p>







    <button


    disabled={
        appliedJobs.includes(job.id)
    }


    onClick={()=>handleApply(job.id)}



    style={{

        width:"100%",

        marginTop:"20px",

        padding:"13px",

        border:"none",

        borderRadius:"999px",

        cursor:"pointer",

        fontWeight:"700",

        color:"white",

        background:

        appliedJobs.includes(job.id)

        ?

        "#475569"

        :

        "linear-gradient(90deg,#2563eb,#7c3aed)"

    }}



    >

    {

    appliedJobs.includes(job.id)

    ?

    "Applied ✅"

    :

    "Apply Now 🚀"

    }


    </button>






    </div>


    ))

    }





    </div>

    }





    </div>




    </DashboardLayout>


    );

}






const cardStyle={


background:
"rgba(15,23,42,.75)",


backdropFilter:
"blur(20px)",


border:
"1px solid rgba(255,255,255,.1)",


borderRadius:"25px",


padding:"25px",


boxShadow:
"0 20px 50px rgba(0,0,0,.35)"


};





const searchStyle={


marginTop:"25px",

width:"100%",

maxWidth:"450px",

padding:"15px",

borderRadius:"999px",

border:"1px solid #334155",

background:"#020617",

color:"white",

outline:"none",

fontSize:"15px"


};