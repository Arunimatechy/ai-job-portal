import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";

import {
  getMyInterviews,
} from "../api/interviewApi";

import toast from "react-hot-toast";

export default function MyInterviews() {

  const [interviews, setInterviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadInterviews();

  }, []);

  const loadInterviews = async () => {

    try {

      const data =
        await getMyInterviews();

      setInterviews(data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load interviews"
      );

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

  return (

    <DashboardLayout>

      <div
        style={{
          padding: "30px",
          color: "white",
        }}
      >

        <h1>
          📅 My Interviews
        </h1>

        {
          interviews.length === 0
          ? (
            <p>
              No interviews scheduled.
            </p>
          )
          : (
            interviews.map(
              (interview) => (

                <div
                  key={interview.id}
                  style={{
                    background: "#1e293b",
                    padding: "20px",
                    borderRadius: "10px",
                    marginTop: "20px",
                  }}
                >

                  <h2>
                    💼 {interview.job_title}
                  </h2>

                  <p>
                    📅 {
                      new Date(
                        interview.scheduled_at
                      ).toLocaleString()
                    }
                  </p>

                  <a
                    href={interview.meeting_link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: "#2563eb",
                      color: "white",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      display: "inline-block",
                      marginTop: "10px",
                    }}
                  >
                    🎥 Join Meeting
                  </a>

                  <p
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    📝 {interview.notes}
                  </p>

                  <p
                    style={{
                      color:
                        interview.status ===
                        "scheduled"
                          ? "#22c55e"
                          : "#ef4444",
                      fontWeight: "bold",
                    }}
                  >
                    Status: {interview.status}
                  </p>

                </div>

              )
            )
          )
        }

      </div>

    </DashboardLayout>

  );
}