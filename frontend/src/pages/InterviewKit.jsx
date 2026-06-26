import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";

import {
 generateInterviewKit,
 getInterviewKit
} from "../api/interviewApi";

import toast from "react-hot-toast";


export default function InterviewKit(){

const {id}=useParams();

const [kit,setKit]=useState(null);
const [loading,setLoading]=useState(true);



useEffect(()=>{

loadKit();

},[]);



const loadKit=async()=>{

try{

const data =
await getInterviewKit(id);

setKit(data);


}catch(error){

setKit(null);

}

setLoading(false);

}




const generate=async()=>{

try{

const data =
await generateInterviewKit(id);


setKit(data);


toast.success(
"Interview questions generated"
);


}catch(error){

toast.error(
"AI generation failed"
);

}

}




return(

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

📅 Interview Kit

</h1>




<p

style={{

color:"#94a3b8"

}}

>

AI generated interview preparation

</p>






<button

onClick={generate}

style={{

marginTop:"25px",

background:
"linear-gradient(90deg,#2563eb,#7c3aed)",

color:"white",

padding:"14px 25px",

border:"none",

borderRadius:"999px",

fontWeight:"700",

cursor:"pointer"

}}

>

🤖 Generate Interview Kit

</button>






{

loading ?

(

<div style={loadingCard}>

Loading AI questions...

</div>

)


:


kit &&

<div>





<Card

title="💻 Technical Questions"

data={
kit.technical_questions
}

/>





<Card

title="🧠 Behavioral Questions"

data={
kit.behavioral_questions
}

/>





<Card

title="🎯 Role Based Questions"

data={
kit.role_based_questions
}

/>






<div

style={infoCard}

>


<h3>
⚡ Difficulty
</h3>


<p>
{kit.difficulty}
</p>



<h3>
📝 AI Summary
</h3>


<p>
{kit.summary}
</p>


</div>





</div>


}



</div>


</DashboardLayout>

)

}





function Card({
title,
data=[]
}){


return (


<div

style={{

background:
"rgba(15,23,42,.75)",

backdropFilter:
"blur(20px)",

border:
"1px solid rgba(255,255,255,.1)",

padding:"25px",

borderRadius:"25px",

marginTop:"25px",

boxShadow:
"0 20px 50px rgba(0,0,0,.35)"

}}

>


<h2>

{title}

</h2>



<ul

style={{

color:"#cbd5e1",

lineHeight:"1.8"

}}

>


{

data?.map((q,i)=>(

<li key={i}>

{q}

</li>

))

}


</ul>



</div>


)

}





const infoCard={

background:"#020617",

padding:"25px",

borderRadius:"20px",

marginTop:"25px",

color:"#cbd5e1"

};




const loadingCard={

background:
"rgba(15,23,42,.7)",

padding:"30px",

borderRadius:"20px",

color:"#94a3b8"

};