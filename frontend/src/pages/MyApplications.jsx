import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

import { getMyApplications } from "../api/applicationApi";

import toast from "react-hot-toast";


export default function MyApplications() {


  const [applications,setApplications] =
  useState([]);


  const [loading,setLoading] =
  useState(true);




  useEffect(()=>{

    loadApplications();

  },[]);





  const loadApplications = async()=>{


    try{


      setLoading(true);



      const data =
      await getMyApplications();




      setApplications(

        Array.isArray(data)

        ?

        data

        :

        data.results || []

      );



    }catch(error){


      toast.error(
        "Failed to load applications"
      );


    }finally{


      setLoading(false);

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

  📄 My Applications

  </h1>





  <p

  style={{

    color:"#94a3b8"

  }}

  >

  Track your job application progress

  </p>









  {

  applications.length===0 ?


  (

    <EmptyState

    message="No Applications Yet"

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

  applications.map((app)=>(





  <div


  key={app.id}



  style={cardStyle}



  >






  <h2

  style={{

    color:"#38bdf8"

  }}

  >

  {app.job_title}

  </h2>






  <p>

  🏢 {app.company}

  </p>





  <p>

  📍 {app.location}

  </p>








  <div

  style={{

    marginTop:"20px",

    display:"inline-block",

    padding:"10px 18px",

    borderRadius:"999px",

    fontWeight:"700",

    background:
    getStatusBg(app.status)

  }}

  >

  {app.status}

  </div>







  <p

  style={{

    color:"#94a3b8",

    marginTop:"20px"

  }}

  >

  🕒 Applied:

  {" "}

  {

  new Date(
    app.applied_at
  ).toLocaleDateString()

  }


  </p>






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







function getStatusBg(status){


if(status==="shortlisted"){

return "linear-gradient(90deg,#22c55e,#16a34a)";

}


if(status==="rejected"){

return "linear-gradient(90deg,#ef4444,#dc2626)";

}


return "linear-gradient(90deg,#f59e0b,#d97706)";

}