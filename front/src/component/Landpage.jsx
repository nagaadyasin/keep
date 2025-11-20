import React from "react";
import { Link } from "react-router-dom";
function Landpage() {
  return (
    <div className="bg-black text-red-600 min-h-screen flex flex-col justify-center items-center text-center font-mono">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-widest font-holloween">
        DISCOVER DARK SECRET
      </h1>
      <div>
        {" "}
        <img src="IMG_6559.PNG" className="h-40 w-40 text-red-700" alt="" />
      </div>
      <p class="max-w-2xl text-red-500 leading-relaxed px-4 font-holloween">
        Darkness falls across the land and the midnight hour is close at hand.
        Wards of creatures and ghouls deep inside of us are closing in. No mere
        mortal can resist the evil of the human.
      </p>
      <p class="text-2xl font-bold mt-4 text-red-600 font-holloween">
        CAN YOU?
      </p>
      <div class=" flex display-flex justify-between a mt-8 gap-1.5 ">
        <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md transition font-holloween">
          <Link to="/login">Login</Link>
        </button>
        <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md transition font-holloween">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
}

export default Landpage;
