import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {

  const navigate = useNavigate();


  const logout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");

    navigate("/", { replace:true });

  };


  return (

    <nav
      style={{

        height:"80px",

        background:"rgba(2,6,23,.85)",

        backdropFilter:"blur(20px)",

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        padding:"0 50px",

        borderBottom:
        "1px solid rgba(255,255,255,.1)",

        position:"sticky",

        top:0,

        zIndex:100,

      }}
    >


      <Link
        to="/"
        style={{

          color:"#60a5fa",

          textDecoration:"none",

          fontSize:"26px",

          fontWeight:"800",

        }}
      >

        🚀 AI Job Portal

      </Link>



      <div
        style={{

          display:"flex",

          alignItems:"center",

          gap:"28px",

        }}
      >



        <Link
          to="/"
          style={linkStyle}
        >
          Home
        </Link>



        <Link
          to="/about"
          style={linkStyle}
        >
          About
        </Link>



        <Link
          to="/contact"
          style={linkStyle}
        >
          Contact
        </Link>



        <button
          onClick={logout}
          style={logoutBtn}
        >
          🚪 Logout
        </button>


      </div>


    </nav>

  );
}



const linkStyle = {

  color:"#cbd5e1",

  textDecoration:"none",

  fontWeight:"600",

};



const logoutBtn = {

  background:
  "linear-gradient(90deg,#ef4444,#dc2626)",

  color:"white",

  border:"none",

  padding:"12px 25px",

  borderRadius:"999px",

  cursor:"pointer",

  fontWeight:"700",

};