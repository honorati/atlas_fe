import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

export function Router() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   );
}
