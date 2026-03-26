import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes/routes"
import { Toaster } from "sonner"

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
