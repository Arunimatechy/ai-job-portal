import { colors } from "../theme";


export default function RecommendationCard({
    job
}) {


    const jobData = job.job;


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

                padding:"30px",

                marginBottom:"25px",

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


            <h2
            style={{
                color:"#60a5fa",
                margin:0
            }}
            >
                {jobData?.title}
            </h2>


            <span

            style={{

                background:
                "linear-gradient(90deg,#22c55e,#16a34a)",

                padding:"8px 15px",

                borderRadius:"999px",

                fontSize:"14px",

                fontWeight:"700"

            }}

            >

            {job.match_score}% Match

            </span>


            </div>





            <p
            style={{
                color:"#cbd5e1",
                fontSize:"17px"
            }}
            >
            🏢 {jobData?.company}
            </p>




            <div

            style={{

                display:"flex",

                gap:"15px",

                flexWrap:"wrap",

                marginTop:"15px"

            }}

            >


            <span style={tagStyle}>
                📍 {jobData?.location}
            </span>


            <span style={tagStyle}>
                💼 {jobData?.job_type}
            </span>


            </div>





            <div

            style={{

                marginTop:"25px",

                background:"#020617",

                padding:"15px",

                borderRadius:"15px"

            }}

            >

            <h4>
            ⚠ Missing Skills
            </h4>


            {

            job.missing_skills?.length > 0 ?

            (

            <ul
            style={{
                color:"#94a3b8"
            }}
            >

            {
            job.missing_skills.map(
            (skill,index)=>(

                <li key={index}>
                    {skill}
                </li>

            ))
            }

            </ul>

            )

            :

            (

            <p
            style={{
                color:"#22c55e"
            }}
            >
            No missing skills 🎉
            </p>

            )

            }


            </div>





            <button

            style={{

                marginTop:"25px",

                width:"100%",

                background:
                "linear-gradient(90deg,#2563eb,#7c3aed)",

                color:"white",

                padding:"14px",

                border:"none",

                borderRadius:"999px",

                cursor:"pointer",

                fontWeight:"700",

                fontSize:"16px"

            }}

            >

            Apply Now 🚀

            </button>



        </div>

    );

}





const tagStyle = {

background:"#1e293b",

padding:"8px 15px",

borderRadius:"999px",

color:"#cbd5e1",

fontSize:"14px"

};