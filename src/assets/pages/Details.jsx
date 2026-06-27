import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

export default function Details() {
  const { id } = useParams();

  const getuserdetails = async () => {
    const response = await axios.get(`https://ums12.runasp.net/api/users/${id}`);
    return response.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userdetails", id],
    queryFn: getuserdetails,
    staleTime: 5 * 60 * 1000,
  });

    if (isError) {
        return <div>Error...</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">User Details</h2>
      
      <div className="space-y-5">
        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</span>
          <p className="text-base font-semibold text-gray-900 mt-1">{data.name}</p>
        </div>

        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</span>
          <p className="text-base font-medium text-gray-700 mt-1">{data.email}</p>
        </div>

        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Age</span>
          <p className="text-base font-medium text-gray-700 mt-1">{data.age} years old</p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
        <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition" >
          Back to list
        </Link>
      </div>
    </div>
  );
}

