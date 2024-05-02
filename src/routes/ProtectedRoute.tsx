import NoContent from "../components/NoContent";
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/authStore";
import { reaction } from "mobx";

const ProtectedRoute: React.FC = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const disposer = reaction(
      () => authStore.isAuthenticated,
      (isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          console.log("Not authenticated, redirecting to login");
          navigate("/login");
        }
      }
    );

    return () => disposer();
  }, [navigate]);

  if (!authStore.isAuthenticated) {
    return <NoContent />;
  }

  console.log("Rendering Outlet because isAuthenticated is true");
  return <Outlet />;
});

export default ProtectedRoute;

// import NoContent from "../components/NoContent";
// import React, { useEffect } from "react";
// import { useNavigate, Outlet } from "react-router-dom";
// import { observer } from "mobx-react-lite";
// import { authStore } from "../stores/authStore";

// const ProtectedRoute: React.FC = observer(() => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!authStore.isAuthenticated) {
//       console.log("Not authenticated, redirecting to login");
//       navigate("/login");
//     }
//   }, [navigate]);

//   if (!authStore.isAuthenticated) {
//     return <NoContent />;
//   }

//   console.log("Rendering Outlet because isAuthenticated is true");
//   return <Outlet />;
// });

// export default ProtectedRoute;
