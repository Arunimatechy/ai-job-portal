import { Link } from "react-router-dom";

export default function RecruiterSidebar() {
  return (
    <div
      style={{
        width:"260px",

        background:
        "rgba(2,6,23,.9)",

        backdropFilter:
        "blur(20px)",

        color:"white",

        padding:"30px 20px",

        borderRight:
        "1px solid rgba(255,255,255,.1)",

        minHeight:"100vh",

        position:"sticky",

        top:0

      }}
    >


      <h2

      style={{

        color:"#60a5fa",

        fontSize:"24px",

        marginBottom:"10px"

      }}

      >
        🚀 Recruiter Panel
      </h2>


      <p

      style={{

        color:"#64748b",

        fontSize:"14px"

      }}

      >
        AI Hiring Dashboard
      </p>





      <div
        style={{
          display:"flex",
          flexDirection:"column",
          gap:"15px",
          marginTop:"40px",
        }}
      >


        <Menu
          to="/recruiter-dashboard"
          text="📊 Dashboard"
        />


        <Menu
          to="/create-job"
          text="➕ Create Job"
        />


        <Menu
          to="/my-jobs"
          text="💼 My Jobs"
        />


        <Menu
          to="/analytics"
          text="📈 Analytics"
        />


        <Menu
          to="/ai-screening"
          text="🤖 AI Screening"
        />
<Menu
  to="/schedule-interview"
  text="📅 Schedule Interview"
/>

      </div>


    </div>
  );
}




function Menu({to,text}) {

return (

<Link

to={to}

style={{

color:"#cbd5e1",

textDecoration:"none",

padding:"14px 16px",

borderRadius:"16px",

background:
"rgba(30,41,59,.7)",

border:
"1px solid rgba(255,255,255,.05)",

fontWeight:"600",

transition:"0.3s",

display:"flex",

alignItems:"center",

gap:"10px"

}}


onMouseEnter={(e)=>{

e.currentTarget.style.background =
"linear-gradient(90deg,#2563eb,#7c3aed)";

e.currentTarget.style.transform =
"translateX(6px)";

}}


onMouseLeave={(e)=>{

e.currentTarget.style.background =
"rgba(30,41,59,.7)";

e.currentTarget.style.transform =
"translateX(0)";

}}

>

{text}

</Link>

);

}