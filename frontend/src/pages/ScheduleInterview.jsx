import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import {
  scheduleInterview,
  getShortlistedApplicants,
} from "../api/interviewApi";

import toast from "react-hot-toast";

export default function ScheduleInterview() {

  const [applicants, setApplicants] =
    useState([]);

  const [applicationId, setApplicationId] =
    useState("");

  const [scheduledAt, setScheduledAt] =
    useState("");

  const [meetingLink, setMeetingLink] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadApplicants();

  }, []);

  const loadApplicants = async () => {

    try {

      const data =
        await getShortlistedApplicants();

      setApplicants(data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load applicants"
      );

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await scheduleInterview({

        application: applicationId,

        scheduled_at: scheduledAt,

        meeting_link: meetingLink,

        notes: notes,

      });

      toast.success(
        "Interview Scheduled"
      );

      setApplicationId("");
      setScheduledAt("");
      setMeetingLink("");
      setNotes("");

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to schedule interview"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <div
        style={{
          padding: "30px",
          color: "white",
        }}
      >

        <h2>
          📅 Schedule Interview
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            marginTop: "20px",
          }}
        >

          <select
            value={applicationId}
            onChange={(e) =>
              setApplicationId(
                e.target.value
              )
            }
            style={inputStyle}
            required
          >

            <option value="">
              Select Applicant
            </option>

            {applicants.map((app) => (

              <option
                key={app.id}
                value={app.id}
              >
                {app.candidate}
                {" - "}
                {app.job}
              </option>

            ))}

          </select>

          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) =>
              setScheduledAt(
                e.target.value
              )
            }
            style={inputStyle}
            required
          />

          <input
            type="text"
            placeholder="Meeting Link"
            value={meetingLink}
            onChange={(e) =>
              setMeetingLink(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
            style={{
              ...inputStyle,
              minHeight: "120px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {loading
              ? "Scheduling..."
              : "📅 Schedule Interview"}
          </button>

        </form>

      </div>

    </DashboardLayout>

  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
};