import React from 'react'
import Navbar from '../assets/components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
