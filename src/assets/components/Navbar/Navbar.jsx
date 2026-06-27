import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <span className="font-bold text-xl text-gray-900 tracking-tight transition duration-200 group-hover:text-blue-600">
                Users management
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-blue-50 text-blue-600 hover:bg-gray-50 hover:text-gray-900`}>Home</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}