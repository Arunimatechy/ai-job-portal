import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";

import {
  getJobApplicants,
  updateApplicationStatus,
} from "../api/applicationApi";

import toast from "react-hot-toast";


export default function JobApplicants() {


  const { id } = useParams();


  const [applicants,setApplicants] = useState([]);

  const [loading,setLoading] = useState(true);




  useEffect(()=>{

    loadApplicants();

  },[]);





  const loadApplicants = async()=>{

    try{


      const data =
      await getJobApplicants(id);



      setApplicants(
        Array.isArray(data)
        ?
        data
        :
        data.results || []
      );


    }catch(error){

      console.log(error);

      toast.error(
        "Failed to load applicants"
      );


    }finally{

      setLoading(false);

    }

  };







  const handleStatus = async(
    applicationId,
    status
  )=>{


    try{


      await updateApplicationStatus(
        applicationId,
        status
      );


      toast.success(
        `Candidate ${status}`
      );


      loadApplicants();



    }catch(error){


      toast.error(
        "Update failed"
      );


    }

  };






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

  👥 Job Applicants

  </h1>






  {
  applicants.length===0 ?


  (

    <div style={emptyCard}>

    No applicants found.

    </div>

  )

  :



  applicants.map((app)=>(




  <div

  key={app.id}


  style={{

    background:
    "rgba(15,23,42,.75)",

    backdropFilter:
    "blur(20px)",


    border:
    "1px solid rgba(255,255,255,.1)",


    padding:"25px",

    borderRadius:"25px",

    marginTop:"20px",

    boxShadow:
    "0 20px 50px rgba(0,0,0,.35)"

  }}



  >





  <div

  style={{

    display:"flex",

    justifyContent:"space-between",

    alignItems:"center",

    flexWrap:"wrap"

  }}

  >




  <h2>

  👤 {app.candidate_name}

  </h2>




  <span

  style={statusStyle(app.status)}

  >

  {app.status}

  </span>




  </div>







  <p style={textStyle}>

  💼 {app.job_title}

  </p>






  <div

  style={{

    display:"flex",

    gap:"12px",

    flexWrap:"wrap",

    marginTop:"20px"

  }}

  >





  <ActionButton

  text="⏳ Pending"

  click={()=>handleStatus(app.id,"pending")}

  />




  <ActionButton

  text="👀 Reviewed"

  click={()=>handleStatus(app.id,"reviewed")}

  />





  <ActionButton

  text="✅ Shortlisted"

  click={()=>handleStatus(app.id,"shortlisted")}

  />





  <ActionButton

  text="❌ Rejected"

  click={()=>handleStatus(app.id,"rejected")}

  />

{app.status === "shortlisted" && (
    <Link
      to={`/offer-letter/${app.id}`}
    >
      <button
        style={{
          background: "#9333ea",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "999px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        📄 Generate Offer Letter
      </button>
    </Link>
  )}



  </div>






  </div>



  ))

  }




  </div>


  </DashboardLayout>

  );

}







function ActionButton({
text,
click
}){


return (

<button

onClick={click}

style={{

background:"#2563eb",

color:"white",

border:"none",

padding:"10px 18px",

borderRadius:"999px",

cursor:"pointer",

fontWeight:"600"

}}

>

{text}

</button>


);

}






const statusStyle=(status)=>({

background:

status==="shortlisted"

?

"linear-gradient(90deg,#22c55e,#16a34a)"

:

status==="rejected"

?

"linear-gradient(90deg,#ef4444,#dc2626)"

:

"#334155",


padding:"10px 18px",

borderRadius:"999px",

fontWeight:"700"

});





const textStyle={

color:"#cbd5e1",

fontSize:"16px"

};





const emptyCard={

background:
"rgba(15,23,42,.7)",

padding:"30px",

borderRadius:"20px",

color:"#94a3b8"

};