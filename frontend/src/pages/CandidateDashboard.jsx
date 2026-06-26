import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import RecentApplications from "../components/RecentApplications";
import CandidateAnalytics from "../components/CandidateAnalytics";
import LoadingSpinner from "../components/LoadingSpinner";

import { getDashboardData } from "../api/dashboardApi";


export default function CandidateDashboard() {


  const [dashboard,setDashboard] = useState(null);



  useEffect(()=>{

    loadDashboard();

  },[]);




  const loadDashboard = async()=>{

    try{

      const data =
      await getDashboardData();

      setDashboard(data);


    }catch(error){

      console.log(error);

    }

  };




  if(!dashboard){

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

    color:"white",

    padding:"30px"

  }}

  >




  <h1

  style={{

    fontSize:"36px",

    background:
    "linear-gradient(90deg,#60a5fa,#c084fc)",

    WebkitBackgroundClip:"text",

    color:"transparent",

    marginBottom:"10px"

  }}

  >

  👋 Candidate Dashboard

  </h1>




  <p

  style={{

    color:"#94a3b8",

    marginBottom:"30px"

  }}

  >

  Track applications, resume score and job matches

  </p>







  <div

  style={{

    display:"grid",

    gridTemplateColumns:
    "repeat(auto-fit,minmax(230px,1fr))",

    gap:"25px"

  }}

  >




  <StatCard

    title="📨 Applications"

    value={
      dashboard?.total_applications
    }

  />



  <StatCard

    title="📄 Resume Score"

    value={
      dashboard?.resume_score
    }

  />



  <StatCard

    title="🎯 Recommended Jobs"

    value={
      dashboard?.recommended_jobs
    }

  />



  </div>






  <div

  style={{

    marginTop:"30px"

  }}

  >

  <CandidateAnalytics

  dashboard={dashboard}

  />


  </div>







  <RecentApplications

  applications={
    dashboard?.recent_applications
  }

  />




  </div>



  </DashboardLayout>

  );

}