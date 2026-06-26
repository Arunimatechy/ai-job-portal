import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import RecruiterStats from "../components/RecruiterStats";
import EmptyState from "../components/EmptyState";

import { getRecruiterAnalytics } from "../api/analyticsApi";

import toast from "react-hot-toast";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const response = await getRecruiterAnalytics();

      setData(response);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <EmptyState message="No Analytics Available" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        style={{
          padding: "30px",
          color: "white",
        }}
      >
        <h1
          style={{
            background:
              "linear-gradient(90deg,#38bdf8,#a855f7)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          📊 Recruiter Analytics
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          AI powered hiring insights
        </p>

        {/* Statistics */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <RecruiterStats
            title="Total Jobs"
            value={data?.total_jobs || 0}
          />

          <RecruiterStats
            title="Active Jobs"
            value={data?.active_jobs || 0}
          />

          <RecruiterStats
            title="Applications"
            value={data?.total_applications || 0}
          />

          <RecruiterStats
            title="Shortlisted"
            value={data?.shortlisted || 0}
          />

          <RecruiterStats
            title="Rejected"
            value={data?.rejected || 0}
          />

          <RecruiterStats
            title="Pending"
            value={data?.pending || 0}
          />

          <RecruiterStats
            title="Reviewed"
            value={data?.reviewed || 0}
          />
        </div>

        {/* Conversion */}

        <div
          style={{
            background: "#1e293b",
            borderRadius: "20px",
            padding: "25px",
            marginTop: "30px",
          }}
        >
          <h2>🎯 Conversion Rate</h2>

          <h1
            style={{
              color: "#22c55e",
            }}
          >
            {data?.conversion_rate || 0}%
          </h1>

          <p>
            {data?.insight || "No insight available"}
          </p>
        </div>

        {/* Hiring Insight */}

        <div
          style={{
            background: "#1e293b",
            borderRadius: "20px",
            padding: "25px",
            marginTop: "25px",
          }}
        >
          <h2>🚀 Hiring Insights</h2>

          <p>
            <strong>
              Average Applications Per Job:
            </strong>{" "}
            {data?.average_applications || 0}
          </p>

          <p>
            <strong>
              Best Performing Job:
            </strong>{" "}
            {typeof data?.top_job === "object"
              ? data?.top_job?.job_title
              : data?.top_job || "N/A"}
          </p>
        </div>

        {/* Job Performance */}

        <div
          style={{
            background: "#1e293b",
            borderRadius: "20px",
            padding: "25px",
            marginTop: "25px",
          }}
        >
          <h2>💼 Job Performance</h2>

          {(data?.job_stats || []).length === 0 ? (
            <p>No job statistics found.</p>
          ) : (
            data.job_stats.map((job, index) => (
              <div
                key={index}
                style={{
                  borderBottom:
                    "1px solid #334155",
                  padding: "15px 0",
                }}
              >
                <h3>{job.job_title}</h3>

                <p>
                  Applications :{" "}
                  {job.applications || 0}
                </p>

                <p>
                  Shortlisted :{" "}
                  {job.shortlisted || 0}
                </p>

                <p>
                  Rejected :{" "}
                  {job.rejected || 0}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Recent Applications */}

        <div
          style={{
            background: "#1e293b",
            borderRadius: "20px",
            padding: "25px",
            marginTop: "25px",
          }}
        >
          <h2>🕒 Recent Applications</h2>

          {(data?.recent_applications || []).length ===
          0 ? (
            <p>No recent applications.</p>
          ) : (
            data.recent_applications.map(
              (app, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom:
                      "1px solid #334155",
                    padding: "15px 0",
                  }}
                >
                  <h4>{app.candidate}</h4>

                  <p>{app.job}</p>

                  <p>
                    Status : {app.status}
                  </p>

                  <p>
                    {new Date(
                      app.applied_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}