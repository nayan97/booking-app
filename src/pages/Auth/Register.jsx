import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Registar = () => {
    const { createUser } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Register Here!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
              />
              <input
                type="text"
                name="photoURL"
                placeholder="Photo URL"
                className="input"
              />
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", {
              required: true,
            })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p role="alert" className="text-red-600">
                  email is required
                </p>
              )}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p role="alert" className="text-red-600">
                  password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p role="alert" className="text-red-600">
                  password is must be 6 character.
                </p>
              )}

              <button className="btn btn-neutral mt-4">Register</button>
              <p className="text-center mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login here
                </a>
              </p>
            </fieldset>
          </form>
          {/* <Social></Social> */}
        </div>
      </div>
    </div>
  );
};

export default Registar;
