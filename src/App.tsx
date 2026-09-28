import { Routes, Route, Navigate } from "react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { CaseStudyPage } from "@/pages/CaseStudyPage";
import { FrameworksOverviewPage } from "@/pages/FrameworksOverviewPage";
import { AnswersProvider } from "@/context/AnswersContext";

export default function App() {
  return (
    <AnswersProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/frameworks" replace />} />
          <Route path="frameworks" element={<FrameworksOverviewPage />} />
          <Route path="case" element={<CaseStudyPage />} />
          <Route path="assessment" element={<DashboardPage />} />
        </Route>
      </Routes>
    </AnswersProvider>
  );
}
