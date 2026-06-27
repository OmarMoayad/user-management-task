import React from 'react'
import axios from 'axios';
import { useQuery , useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Users() {
    const queryClient = useQueryClient();
    const GetUsers = async () => {
        const response = await axios.get("https://ums12.runasp.net/api/users");
        return response.data;
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: GetUsers,
        staleTime: 5 * 60 * 1000,
    });

    const DeleteUser = async (id) => {
        try {
            await axios.delete(`https://ums12.runasp.net/api/users/${id}`);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        } catch (err) {
            console.log(err);
        }
    }

    if (isError) {
        return <div>Error...</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-base font-medium">All users</span>
                    <span className="userCount text-green-500 font-medium text-sm  "> Total count : {data.totalCount}</span>
                </div>


            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2.5 border-b border-gray-100 w-10">
                                #
                            </th>
                            <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2.5 border-b border-gray-100">
                                Name
                            </th>
                            <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2.5 border-b border-gray-100">
                                Email
                            </th>
                            <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2.5 border-b border-gray-100 w-16">
                                Age
                            </th>
                            <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2.5 border-b border-gray-100">
                                Image
                            </th>
                            <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2.5 border-b border-gray-100">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody >
                        {data.users.map((user) => (
                            <tr key={user.id}>
                                <td className="py-3 px-3">{user.id}</td>
                                <td className="py-3 px-3">{user.name}</td>
                                <td className="py-3 px-3">{user.email}</td>
                                <td className="py-3 px-3">{user.age}</td>
                                <td className="py-3 px-3"><img className='w-[50px]' src={user.imageUrl} alt={user.name} /></td>
                                <td className="py-3 px-3">
                                    <button onClick={() => DeleteUser(user.id)} className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer">
                                        Delete
                                    </button>
                                    <Link to={`details/${user.id}`}>Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
