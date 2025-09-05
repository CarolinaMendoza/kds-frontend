import { Routes, Route } from "react-router-dom";
import { routes } from "./router/routes";
import GlobalLoadingOverlay from "./shared/components/ui/GlobalLoadingOverlay";


export default function App() {
  return (
    <>
      <GlobalLoadingOverlay />
      <Routes>
        {routes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
      </Routes>
    </>
  );
}