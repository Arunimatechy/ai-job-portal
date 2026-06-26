import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";

import api from "../api/axios";


export default function AIRanking() {

  const { id } = useParams();


  const [candidates,setCandidates] = useState([]);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    loadRanking();

  },[]);




  const loadRanking = async()=>{

    try{

      const response =
      await api.get(
        `/ai/ranking/${id}/`
      );


      setCandidates(response.data);


    }catch(error){

      console.log(error);

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

    color:"transparent",

    marginBottom:"30px"

  }}

  >

  🤖 AI Candidate Ranking

  </h1>





  {
  candidates.length===0 ?


  (

  <div

  style={emptyCard}

  >

  No AI rankings found.
  Candidates must analyze their resume first.

  </div>

  )



  :



  candidates.map((candidate,index)=>(



  <div

  key={index}

  style={{

    background:
    "rgba(15,23,42,.75)",

    backdropFilter:
    "blur(20px)",

    border:
    "1px solid rgba(255,255,255,.1)",

    borderRadius:"25px",

    padding:"30px",

    marginTop:"20px",

    boxShadow:
    "0 20px 50px rgba(0,0,0,.35)"

  }}

  >




  <div

  style={{

    display:"flex",

    justifyContent:"space-between",

    alignItems:"center"

  }}

  >


  <h2>

  #{index+1} {candidate.candidate}

  </h2>



  <span

  style={{

    background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

    padding:"10px 18px",

    borderRadius:"999px",

    fontWeight:"700"

  }}

  >

  {candidate.score}% Match

  </span>



  </div>







  <div style={infoBox}>

  <h3>
  💪 Strengths
  </h3>

  <p>
  {
  candidate.strengths?.length
  ?
  candidate.strengths.join(", ")
  :
  "None"
  }
  </p>

  </div>






  <div style={infoBox}>

  <h3>
  ⚠ Missing Skills
  </h3>

  <p>

  {
  candidate.missing_skills?.length
  ?
  candidate.missing_skills.join(", ")
  :
  "None"
  }

  </p>

  </div>






  <div style={infoBox}>

  <h3>
  🚀 Recommendation
  </h3>

  <p>

  {
  candidate.recommendations ||
  "No recommendations"
  }

  </p>


  </div>





  </div>


  ))

  }



  </div>


  </DashboardLayout>

  );

}





const infoBox={

background:"#020617",

padding:"15px",

borderRadius:"15px",

marginTop:"20px",

color:"#cbd5e1"

};




const emptyCard={

background:
"rgba(15,23,42,.7)",

padding:"30px",

borderRadius:"20px",

color:"#94a3b8"

};