import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../lib/api/user";
function Login() {
  const [error, setError] = useState("");
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // halkan waxaad ku yeeri doontaa API login function
      login(formdata);
      console.log(formdata);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-800 text-white">
      <h1 className="text-8xl font-holloween text-center text-red-500 mb-6">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="p-4 rounded-4xl bg-slate-50 text-slate-900 w-max"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="p-4 rounded-4xl bg-slate-50 text-slate-900 w-max"
          onChange={handleChange}
        />

        <div className="flex justify-center text-center">
          <button
            className="bg-red-500 w-32 rounded-full p-2 text-lg"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <p className="text-center text-slate-300 mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-red-500 underline">
          Register
        </Link>
      </p>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default Login;
