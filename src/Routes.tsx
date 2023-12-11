import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import City from "./components/worlds/City";
import World from "./components/worlds/World";

export function Router() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
         <Route path="/world/:pid?" element={<World />} />
         <Route path="/city" element={<City />} />
         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   );
}
