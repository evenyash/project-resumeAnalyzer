import { RouterProvider } from "react-router";

import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/contexts/auth.context.jsx";
import { InterviewProvider } from "./features/interview/contexts/interview.context.jsx";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <Toaster />
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;
