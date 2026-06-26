import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [loading,setLoading] = useState(false);


    const [form,setForm] = useState({
        username:"",
        password:"",
    });



    const handleChange = (e)=>{

        setForm({
            ...form,
            [e.target.name]:e.target.value
        });

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();

        setLoading(true);


        try{

            const data = await loginUser(form);


            dispatch(
                loginSuccess({
                    access:data.access,
                    refresh:data.refresh,
                    role:data.role,
                    user:data.user,
                })
            );


            toast.success("Login Successful");


            if(data.role?.toLowerCase()==="recruiter"){

                navigate("/recruiter-dashboard");

            }else{

                navigate("/dashboard");

            }


        }catch(error){

            console.log(error);

            toast.error(
                error?.response?.data?.detail ||
                "Invalid Credentials"
            );


        }finally{

            setLoading(false);

        }

    };




    return (

    <div

    style={{

        minHeight:"100vh",

        display:"flex",

        justifyContent:"center",

        alignItems:"center",

        background:
        "radial-gradient(circle at top,#1e40af,#020617 70%)",

        padding:"20px"

    }}

    >



    <form

    onSubmit={handleSubmit}

    style={{

        width:"380px",

        padding:"40px",

        borderRadius:"25px",

        background:
        "rgba(15,23,42,.75)",

        backdropFilter:"blur(20px)",

        border:
        "1px solid rgba(255,255,255,.1)",

        boxShadow:
        "0 25px 60px rgba(0,0,0,.4)"

    }}

    >



    <h1

    style={{

        textAlign:"center",

        marginBottom:"10px",

        background:
        "linear-gradient(90deg,#60a5fa,#c084fc)",

        WebkitBackgroundClip:"text",

        color:"transparent"

    }}

    >

    Welcome Back 🚀

    </h1>



    <p

    style={{

        textAlign:"center",

        color:"#94a3b8",

        marginBottom:"30px"

    }}

    >

    Login to AI Job Portal

    </p>





    <input

    type="text"

    name="username"

    placeholder="Username"

    value={form.username}

    onChange={handleChange}

    style={inputStyle}

    />





    <input

    type="password"

    name="password"

    placeholder="Password"

    value={form.password}

    onChange={handleChange}

    style={inputStyle}

    />





    <button

    type="submit"

    disabled={loading}

    style={buttonStyle}

    >

    {loading ? "Logging in..." : "Login"}

    </button>



    </form>



    </div>

    );
}




const inputStyle={

width:"100%",

padding:"14px",

marginTop:"15px",

borderRadius:"12px",

border:
"1px solid rgba(255,255,255,.1)",

background:"#020617",

color:"white",

fontSize:"16px",

outline:"none",

};



const buttonStyle={

width:"100%",

marginTop:"25px",

padding:"14px",

background:
"linear-gradient(90deg,#2563eb,#7c3aed)",

color:"white",

border:"none",

borderRadius:"999px",

cursor:"pointer",

fontWeight:"700",

fontSize:"16px",

};