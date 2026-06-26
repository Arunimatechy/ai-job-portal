import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import RecommendationCard from "../components/RecommendationCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

import { getRecommendedJobs } from "../api/recommendationApi";

import toast from "react-hot-toast";


export default function RecommendedJobs() {


const [jobs,setJobs] = useState([]);

const [loading,setLoading] = useState(true);





useEffect(()=>{

fetchRecommendations();

},[]);






const fetchRecommendations = async()=>{


try{


setLoading(true);



const data =
await getRecommendedJobs();



setJobs(

Array.isArray(data)

?

data

:

[]

);



}catch(error){


toast.error(

error?.response?.data?.error ||

"Failed to load recommendations"

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
"linear-gradient(90deg,#38bdf8,#a855f7)",


WebkitBackgroundClip:"text",

color:"transparent"

}}

>

🤖 AI Recommended Jobs

</h1>





<p

style={{

color:"#94a3b8",

fontSize:"16px"

}}

>

Smart jobs matched with your resume skills

</p>








{

jobs.length===0 ?


(

<EmptyState

message="No Recommended Jobs Found"

/>

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

jobs.map((job)=>(



<div

key={job.id}

style={{

background:
"rgba(15,23,42,.7)",

border:
"1px solid rgba(255,255,255,.1)",

borderRadius:"25px",

padding:"10px",

backdropFilter:
"blur(15px)"

}}

>


<RecommendationCard

job={job}

/>


</div>


))


}





</div>



}





</div>





</DashboardLayout>


);

}