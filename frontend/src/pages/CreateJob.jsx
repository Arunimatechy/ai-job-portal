import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { createJob } from "../api/jobApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function CreateJob() {

  const navigate = useNavigate();


  const [form,setForm] = useState({

    title:"",
    company:"",
    location:"",
    salary:"",
    experience:"",
    job_type:"full_time",
    skills_required:"",
    description:"",
    deadline:"",

  });





  const handleChange=(e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };





  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{

      await createJob(form);


      toast.success(
        "Job Created Successfully"
      );


      navigate("/my-jobs");


    } catch (error) {

  console.log("Status:", error.response?.status);
  console.log("Response:", error.response?.data);

  alert(JSON.stringify(error.response?.data));

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

  ➕ Create Job

  </h1>




  <form

  onSubmit={handleSubmit}

  style={{

    marginTop:"25px",

    maxWidth:"750px",

    background:
    "rgba(15,23,42,.75)",

    backdropFilter:
    "blur(20px)",

    padding:"35px",

    borderRadius:"25px",

    border:
    "1px solid rgba(255,255,255,.1)",

    boxShadow:
    "0 20px 50px rgba(0,0,0,.35)"

  }}

  >





  <input

  name="title"

  placeholder="Job Title"

  value={form.title}

  onChange={handleChange}

  style={inputStyle}

  />





  <input

  name="company"

  placeholder="Company"

  value={form.company}

  onChange={handleChange}

  style={inputStyle}

  />





  <input

  name="location"

  placeholder="Location"

  value={form.location}

  onChange={handleChange}

  style={inputStyle}

  />





  <input

  name="salary"

  placeholder="Salary (₹50,000/month)"

  value={form.salary}

  onChange={handleChange}

  style={inputStyle}

  />





  <input

  name="experience"

  placeholder="Experience (2 Years)"

  value={form.experience}

  onChange={handleChange}

  style={inputStyle}

  />






  <select

  name="job_type"

  value={form.job_type}

  onChange={handleChange}

  style={inputStyle}

  >


  <option value="full_time">
  Full Time
  </option>


  <option value="part_time">
  Part Time
  </option>


  <option value="internship">
  Internship
  </option>


  <option value="remote">
  Remote
  </option>


  </select>






  <input

  name="skills_required"

  placeholder="React, Django, Python"

  value={form.skills_required}

  onChange={handleChange}

  style={inputStyle}

  />







  <textarea

  name="description"

  placeholder="Job Description"

  rows="6"

  value={form.description}

  onChange={handleChange}

  style={inputStyle}

  />






  <input

  type="date"

  name="deadline"

  value={form.deadline}

  onChange={handleChange}

  style={inputStyle}

  />







  <button

  type="submit"

  style={buttonStyle}

  >

  Publish Job 🚀

  </button>





  </form>



  </div>



  </DashboardLayout>

  );

}





const inputStyle={


width:"100%",

padding:"14px",

marginTop:"15px",

borderRadius:"14px",

background:"#020617",

border:
"1px solid rgba(255,255,255,.1)",

color:"white",

fontSize:"15px",

outline:"none"


};





const buttonStyle={


width:"100%",

marginTop:"25px",

padding:"15px",

border:"none",

borderRadius:"999px",

background:
"linear-gradient(90deg,#2563eb,#7c3aed)",

color:"white",

fontWeight:"700",

fontSize:"16px",

cursor:"pointer"


};