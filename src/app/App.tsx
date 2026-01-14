import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/index.css'
import DashboardLayout from "../components/layout/DashboardLayout";

function App() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold">
        Welcome to the Dashboard
      </h1>
    </DashboardLayout>
  );
}

export default App;


