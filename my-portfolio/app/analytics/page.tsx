import type { Metadata } from "next";
import AnalyticsDashboard from "./AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Private analytics dashboard for portfolio performance.",
  robots: { index: false, follow: false },
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
