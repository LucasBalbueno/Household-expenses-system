import { Routes, Route } from "react-router-dom"
import { Layout } from "../layout"
import { Dashboard } from "../pages/Dashboard"
import { People } from "../pages/People"
import { Categories } from "../pages/Categories"
import { Transactions } from "../pages/Transactions"

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/people" element={<People />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  )
}