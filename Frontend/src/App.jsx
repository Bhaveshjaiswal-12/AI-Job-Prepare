import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./Features/auth/auth.context.jsx"
// import { InterviewProvider } from "./Features/interview/interview.context.jsx"

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App