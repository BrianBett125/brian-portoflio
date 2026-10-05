import AnalyticsSessionProvider from "@/app/analytics/AnalyticsSessionProvider";

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <AnalyticsSessionProvider>{children}</AnalyticsSessionProvider>;
}
