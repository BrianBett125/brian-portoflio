import { Metadata } from "next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Private analytics dashboard for portfolio performance.",
  robots: { index: false, follow: false },
};

const pageViewsData = [
  { name: "Jan", views: 4000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 5000 },
  { name: "Apr", views: 4500 },
  { name: "May", views: 6000 },
  { name: "Jun", views: 5500 },
];

const topProjectsData = [
  { name: "Project A", clicks: 120 },
  { name: "Project B", clicks: 98 },
  { name: "Project C", clicks: 80 },
  { name: "Project D", clicks: 65 },
  { name: "Project E", clicks: 50 },
];

const blogPostPerformanceData = [
  { name: "Post 1", views: 300 },
  { name: "Post 2", views: 250 },
  { name: "Post 3", views: 400 },
  { name: "Post 4", views: 200 },
  { name: "Post 5", views: 350 },
];

export default function AnalyticsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Page Views</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Projects</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProjectsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clicks" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Blog Post Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={blogPostPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}