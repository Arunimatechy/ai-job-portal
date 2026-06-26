import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";

import {
  getMyJobs,
  deleteJob,
} from "../api/jobApi";

import toast from "react-hot-toast";


export default function MyJobs() {

const [jobs,setJobs] = useState([]);


useEffect(()=>{
  loadJobs();
},[]);



const loadJobs = async()=>{

try{

const data = await getMyJobs();


setJobs(
Array.isArray(data)
?
data
:
data.results || []
);


}catch(error){

toast.error(
"Failed to load jobs"
);

}

};




const handleDelete = async(id)=>{


const confirmDelete =
window.confirm(
"Are you sure you want to delete this job?"
);


if(!confirmDelete) return;



try{


await deleteJob(id);


toast.success(
"Job deleted successfully"
);


loadJobs();



}catch(error){

toast.error(
"Delete failed"
);

}


};





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

💼 My Jobs

</h1>



<p

style={{

color:"#94a3b8"

}}

>

Manage your posted jobs and candidates

</p>





{

jobs.length===0 ?


(

<div

style={emptyStyle}

>

No jobs posted yet 🚀

</div>

)


:





<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(320px,1fr))",

gap:"25px",

marginTop:"30px"

}}

>



{

jobs.map(job=>(



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

🛠 {job.skills_required}

</p>






<div

style={{

display:"flex",

gap:"10px",

flexWrap:"wrap",

marginTop:"20px"

}}

>



<Link to={`/edit-job/${job.id}`}>

<button
style={btn("#2563eb")}
>

✏️ Edit

</button>

</Link>




<Link to={`/job-applicants/${job.id}`}>

<button
style={btn("#16a34a")}
>

👥 Applicants

</button>

</Link>






<Link to={`/ai-ranking/${job.id}`}>

<button
style={btn("#9333ea")}
>

🤖 AI Ranking

</button>

</Link>





<Link to={`/interview-kit/${job.id}`}>

<button
style={btn("#f59e0b")}
>

📅 Interview Kit

</button>

</Link>





<button

onClick={()=>handleDelete(job.id)}

style={btn("#ef4444")}

>

🗑 Delete

</button>



</div>







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





const btn=(color)=>({

padding:"10px 16px",

background:color,

color:"white",

border:"none",

borderRadius:"999px",

cursor:"pointer",

fontWeight:"600"

});




const emptyStyle={


marginTop:"30px",

background:"#1e293b",

padding:"40px",

borderRadius:"20px",

textAlign:"center",

color:"#94a3b8"

};