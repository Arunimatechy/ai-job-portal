import { useParams } from "react-router-dom";
import { useState } from "react";
import { jsPDF } from "jspdf";

import DashboardLayout from "../components/DashboardLayout";

export default function OfferLetter() {
  const { id } = useParams();

  const [candidateName, setCandidateName] =
    useState("");

  const [position, setPosition] =
    useState("");

  const [salary, setSalary] =
    useState("");

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Offer Letter", 20, 20);

    doc.setFontSize(12);

    const content = `
Candidate: ${candidateName}

Position: ${position}

Salary: ${salary}

Congratulations!

We are pleased to offer you the position of ${position}.

We look forward to working with you.

HR Department
`;

    const lines =
      doc.splitTextToSize(
        content,
        170
      );

    doc.text(lines, 20, 40);

    doc.save(
      `${candidateName}-offer-letter.pdf`
    );
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
          📄 Offer Letter
        </h2>

        <p>
          Application ID: {id}
        </p>

        <input
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) =>
            setCandidateName(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          placeholder="Position"
          value={position}
          onChange={(e) =>
            setPosition(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          placeholder="Salary"
          value={salary}
          onChange={(e) =>
            setSalary(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          onClick={downloadPDF}
        >
          📥 Download PDF
        </button>
      </div>
    </DashboardLayout>
  );
}