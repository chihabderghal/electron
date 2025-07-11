import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="mx-auto px-auto">
      <Outlet />
    </div>
  );
}
