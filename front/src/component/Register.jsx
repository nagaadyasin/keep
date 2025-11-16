 import { useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
 import { register } from "../lib/api/user";

 function Register() {
   const [error, setError] = useState(null);
   const [formdata, setFormData] = useState({
     name: "",
     email: "",
     password: "",
   });

   const navigate = useNavigate();

   function handleChange(e) {
     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   }

   async function handleSubmit(e) {
     e.preventDefault();
     try {
       await register(formdata); // ✅ AWAIT!
       navigate("/login"); // ✅ Redirect after success
     } catch (error) {
       setError(error.message);
     }
   }

   return (
     <div className="h-screen flex flex-col justify-center items-center bg-slate-800 text-white">
       <h1 className="text-8xl font-holloween text-center text-red-500 mb-6">
         Register
       </h1>

       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         <input
           name="name"
           type="text"
           required
           placeholder="name"
           onChange={handleChange}
         />
         <input
           name="email"
           type="email"
           required
           placeholder="email"
           onChange={handleChange}
         />
         <input
           name="password"
           type="password"
           required
           placeholder="Password"
           onChange={handleChange}
         />
         <button
           className="bg-red-500 w-32 rounded-full p-2 text-lg"
           type="submit"
         >
           Register
         </button>
       </form>

       <p className="text-center text-slate-300 mt-4">
         I have an account?{" "}
         <Link to="/login" className="text-red-500 underline">
           Login
         </Link>
       </p>

       {error && <p className="text-red-500 text-center">{error}</p>}
     </div>
   );
 }

 export default Register;
