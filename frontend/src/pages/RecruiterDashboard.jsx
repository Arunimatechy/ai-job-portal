import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import ApplicationChart from "../components/ApplicationChart";
import RecentApplications from "../components/RecentApplications";

import { getDashboardStats } from "../api/recruiterApi";

import toast from "react-hot-toast";


export default function RecruiterDashboard() {


const [stats,setStats] = useState(null);

const [loading,setLoading] = useState(true);





useEffect(()=>{

loadStats();

},[]);






const loadStats = async()=>{


try{


setLoading(true);


const data =
await getDashboardStats();


setStats(data);



}catch(error){


toast.error(

error?.response?.data?.error ||

"Failed to load dashboard"

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

📊 Recruiter Dashboard

</h1>





<p

style={{

color:"#94a3b8",

fontSize:"16px"

}}

>

Manage jobs, applicants and AI hiring analytics

</p>








<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"25px",

marginTop:"30px"

}}

>



<Card

title="💼 Total Jobs"

value={stats?.total_jobs || 0}

/>



<Card

title="📄 Applications"

value={stats?.total_applications || 0}

/>




<Card

title="✅ Shortlisted"

value={stats?.shortlisted || 0}

/>




<Card

title="❌ Rejected"

value={stats?.rejected || 0}

/>




<Card

title="⏳ Pending"

value={stats?.pending || 0}

/>



</div>







<div

style={{

marginTop:"35px"

}}

>


<ApplicationChart

stats={stats}

/>


</div>








<div

style={{

marginTop:"35px"

}}

>


<RecentApplications

applications={
stats?.recent_applications || []
}


/>


</div>





</div>


</DashboardLayout>

);

}









function Card({
title,
value
}) {


return (

<div


style={{

background:
"rgba(15,23,42,.75)",


backdropFilter:
"blur(20px)",


border:
"1px solid rgba(255,255,255,.1)",


borderRadius:"25px",


padding:"25px",


boxShadow:
"0 20px 50px rgba(0,0,0,.35)",


textAlign:"center"


}}

>



<h3

style={{

color:"#cbd5e1"

}}

>

{title}

</h3>




<h1

style={{

fontSize:"38px",

marginTop:"15px",

background:
"linear-gradient(90deg,#38bdf8,#c084fc)",

WebkitBackgroundClip:"text",

color:"transparent"

}}

>

{value ?? 0}

</h1>



</div>

);

}