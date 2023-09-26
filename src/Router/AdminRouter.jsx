import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from '../components/Admin/AdminDashboard'
import AgentManagement from '../components/Admin/AgentManagement'
import AdminVendorManagement from '../components/Admin/AgentManagement'
import AdminUserMangement from '../components/Admin/AdminUserMangement'
import PropertyManagement from '../components/Admin/PropertyManagement'
import { useSelector } from 'react-redux';
import AdminCommission from '../components/Admin/AdminCommission'


function AdminRouter() {

  const user = useSelector((state) => state.user);
  // if (user) {
  //   return <Navigate to="/admin" />; // Redirect to the admin dashboard
  // }
  return (
    <Routes>
        <Route path='/' element={<AdminDashboard/>} />
        <Route path='/eliteproperty-agent' element={<AdminVendorManagement/>} />
        <Route path='/eliteproperty-user' element={<AdminUserMangement/>} />
        <Route path='/eliteproperty-property' element={<PropertyManagement/>} />
        <Route path='/commission-view' element={<AdminCommission/>} />
        
        </Routes>
  )
}

export default AdminRouter