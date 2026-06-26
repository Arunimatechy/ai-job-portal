import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";

import {
  getJobDetail,
  updateJob
} from "../api/jobApi";

import toast from "react-hot-toast";


export default function EditJob() {


  const { id } = useParams();

  const navigate = useNavigate();



  const [form,setForm] = useState({

    title:"",
    company:"",
    location:"",
    salary:"",
    experience:"",
    job_type:"",
    skills_required:"",
    description:"",
    deadline:""

  });





  useEffect(()=>{

    loadJob();

  },[]);





  const loadJob = async()=>{

    try{

      const data =
      await getJobDetail(id);


      setForm(data);


    }catch{

      toast.error(
        "Failed to load job"
      );

    }

  };





  const handleChange=(e)=>{


    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });


  };





  const handleSubmit=async(e)=>{


    e.preventDefault();


    try{


      await updateJob(
        id,
        form
      );


      toast.success(
        "Job Updated Successfully"
      );


      navigate("/my-jobs");


    }catch{


      toast.error(
        "Update Failed"
      );


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

  ✏️ Edit Job

  </h1>





  <form


  onSubmit={handleSubmit}


  style={{

    maxWidth:"750px",

    marginTop:"25px",

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

  placeholder="Salary"

  value={form.salary}

  onChange={handleChange}

  style={inputStyle}

  />





  <input

  name="experience"

  placeholder="Experience"

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

  rows="6"

  name="description"

  placeholder="Job Description"

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

  Update Job 🚀

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