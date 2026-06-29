import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function Create() {
  const schema = yup.object({
  name: yup.string().required("Name is required").min(3,"Name must be at least 3 characters"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  age: yup.number().required("Age is required"),
  image: yup.mixed().required("Image is required"),
});

  const { register, handleSubmit,formState:{errors} } = useForm(
    {
      resolver: yupResolver(schema),
    }
  );
  const queryClient = useQueryClient();


const AddUser = async (data) => {
  
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("age", data.age);
    formData.append("image", data.image[0]);

    const response = await axios.post("https://ums12.runasp.net/api/users", formData);
    await queryClient.invalidateQueries({ queryKey: ["users"] });



  } catch (error) {
    alert(JSON.stringify(error.response.data.errors));
  }
};

  return (
    <>
      <form name="addUserForm" onSubmit={handleSubmit(AddUser)}>
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Add new user</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Name</label>
              <input type="text" {...register("name")} placeholder="Alaa Test" className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Email</label>
              <input type="email" {...register("email")} placeholder="alaa@example.com" className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Age</label>
              <input type="number" {...register("age")} placeholder="30" className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Profile image</label>

              <label className="flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-gray-300 rounded-lg text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
                  <path d="M2 11l3-3 2 2 3-3 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>

                <span>Choose file</span>

                <input type="file" {...register("image")} className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-5">
            <button type="reset" className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition cursor-pointer">Reset</button>
            <button type="submit" className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer">Add user</button>
          </div>
        </div>
      </form>
    </>
  )
}
