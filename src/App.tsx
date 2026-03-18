import { Routes, Route } from "react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { ModulePage } from "@/pages/ModulePage";
import { AnswersProvider } from "@/context/AnswersContext";

export default function App() {
  return (
    <AnswersProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="module/:frameworkSlug" element={<ModulePage />} />
        </Route>
      </Routes>
    </AnswersProvider>
  );
}
