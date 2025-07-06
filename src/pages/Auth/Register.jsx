import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Social from "../../pages/Auth/Social"


const Registar = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosUserSecure = useAxios();

  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [profilePic, setProfilePic] = useState('')


const onSubmit = (data) => {
  // console.log(data);

  createUser(data.email, data.password)
    .then(async (result) => {
      console.log(result.user);

      const userInfo = {
        email: data.email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_signin_at: new Date().toISOString()
      };

      try {
        const userRes = await axiosUserSecure.post('/api/users', userInfo);
        console.log(userRes.data);
      } catch (err) {
        console.error('Error saving user to DB:', err.response?.data || err.message);
        // Optionally, notify user or exit early here
        return;
      }

      // ✅ Update profile only if DB insertion succeeds
      updateUserProfile(data.name, profilePic)
        .then(() => {
          console.log('Profile updated');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    })
    .catch((error) => {
      console.error('Error creating user:', error);
    });
};


  const handlePhotoUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('image', img);
    
    const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    const res = await axios.post(imgUploadUrl, formData);

    setProfilePic(res.data.data.display_url);
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
                {...register("name", {
                  required: true,
                })}
                name="name"
                className="input"
                placeholder="Name"
              />

              <label className="label">Photo URL</label>
              <input
                type="file"
                onChange={handlePhotoUpload}
                name="photoURL"
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
          <Social></Social>
        </div>
      </div>
    </div>
  );
};

export default Registar;
