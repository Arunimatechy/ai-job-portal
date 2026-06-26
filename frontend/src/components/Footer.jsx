import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background:
          "linear-gradient(180deg,#020617,#0f172a)",
        color:"#cbd5e1",
        padding:"60px 30px 30px",
        borderTop:
          "1px solid rgba(255,255,255,0.1)",
      }}
    >

      <div
        style={{
          maxWidth:"1100px",
          margin:"auto",
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
          gap:"40px",
          textAlign:"left"
        }}
      >


        {/* Brand */}

        <div>

          <h2
            style={{
              color:"#60a5fa",
              fontSize:"28px"
            }}
          >
            🚀 AI Job Portal
          </h2>


          <p
            style={{
              marginTop:"15px",
              lineHeight:"1.7",
              color:"#94a3b8"
            }}
          >
            AI powered hiring platform
            for smart recruitment,
            resume analysis and
            candidate matching.
          </p>


        </div>




        {/* Navigation */}

        <div>

          <h3
          style={{
            color:"white",
            marginBottom:"15px"
          }}
          >
          Platform
          </h3>


          <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:"12px"
          }}
          >

          <Link to="/" style={linkStyle}>
            Home
          </Link>


          <Link to="/about" style={linkStyle}>
            About
          </Link>


          <Link to="/contact" style={linkStyle}>
            Contact
          </Link>

          </div>

        </div>





        {/* Tech */}

        <div>

          <h3
          style={{
            color:"white",
            marginBottom:"15px"
          }}
          >
          Technology
          </h3>


          <p style={textStyle}>
            ⚛ React
          </p>

          <p style={textStyle}>
            🐍 Django
          </p>

          <p style={textStyle}>
            🤖 Artificial Intelligence
          </p>


        </div>


      </div>





      <div
        style={{
          marginTop:"50px",
          paddingTop:"25px",
          borderTop:
          "1px solid rgba(255,255,255,.1)",
          textAlign:"center"
        }}
      >

      <p>
        © 2026 AI Job Portal
      </p>

      <p
      style={{
        color:"#64748b"
      }}
      >
        Built with React + Django + AI 🚀
      </p>


      </div>



    </footer>
  );
}



const linkStyle = {

color:"#94a3b8",

textDecoration:"none",

transition:"0.3s",

};


const textStyle = {

color:"#94a3b8",

margin:"8px 0"

};