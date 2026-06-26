import { colors } from "../theme";

export default function RecentApplicants({
    applicants
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

        padding:"30px",

        marginTop:"25px",

        boxShadow:
        "0 20px 50px rgba(0,0,0,.35)"

    }}

    >



    <div

    style={{

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        marginBottom:"20px"

    }}

    >


    <h2
    style={{
        margin:0,
        color:"white"
    }}
    >
    👥 Recent Applicants
    </h2>



    <span

    style={{

        background:
        "linear-gradient(90deg,#2563eb,#7c3aed)",

        padding:"8px 15px",

        borderRadius:"999px",

        fontSize:"13px"

    }}

    >
    Latest
    </span>


    </div>





    {
    applicants?.length > 0 ? (


        applicants.map((app)=>(


        <div

        key={app.id}

        style={{

            background:
            "#020617",

            padding:"18px",

            borderRadius:"18px",

            marginBottom:"15px",

            border:
            "1px solid rgba(255,255,255,.08)",

            transition:"0.3s"

        }}



        >



        <div

        style={{

            display:"flex",

            justifyContent:"space-between",

            alignItems:"center"

        }}

        >


        <h3

        style={{
            margin:0,
            color:"#60a5fa"
        }}

        >

        {app.candidate}

        </h3>



        <span

        style={{

            background:
            app.status==="Rejected"
            ? "#ef4444"
            :
            app.status==="Shortlisted"
            ? "#22c55e"
            :
            "#f59e0b",

            padding:"6px 12px",

            borderRadius:"999px",

            fontSize:"12px",

            color:"white"

        }}

        >

        {app.status}

        </span>



        </div>





        <p
        style={{
            color:"#94a3b8"
        }}
        >
        💼 Job: {app.job}
        </p>



        </div>


        ))


    ) : (


        <p
        style={{
            color:"#94a3b8"
        }}
        >
        No applicants found
        </p>


    )

    }



    </div>

    );
}