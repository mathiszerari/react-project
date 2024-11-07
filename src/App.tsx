import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";

export default function App() {
  return (
    <div className="border w-full h-full flex flex-col justify-between">
      <Outlet />
      <Navigation />
    </div>
  );
}
