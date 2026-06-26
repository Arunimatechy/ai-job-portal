



import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { evaluateAnswer } from "../api/mockInterviewApi";
import toast from "react-hot-toast";

export default function MockInterview() {
  const questions = [
    "Tell me about yourself",
    "Why should we hire you?",
    "What are your strengths?",
    "Describe a challenging project you worked on.",
    "Where do you see yourself in five years?",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
const [interviewCompleted, setInterviewCompleted] = useState(false);
  const recognitionRef = useRef(null);

  const question = questions[currentIndex];
const averageScore =
  history.length > 0
    ? Number(
        (
          history.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) / history.length
        ).toFixed(1)
      )
    : 0;
  useEffect(() => {
    speakQuestion(question);

    setAnswer("");
    setTranscript("");
    setResult(null);
    setTimeLeft(60);
  }, [currentIndex]);

  useEffect(() => {
    if (!recording || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [recording, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && recording) {
      stopRecording();
      toast.success("Time is up!");
    }
  }, [timeLeft, recording]);

  const speakQuestion = (text) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
  };

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(
        "Speech Recognition not supported in this browser"
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;

    recognition.start();

    setRecording(true);

    recognition.onresult = (event) => {
      let text = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {
        text +=
          event.results[i][0]
            .transcript + " ";
      }

      setTranscript(text);
      setAnswer(text);
    };

    recognition.onerror = () => {
      setRecording(false);
      toast.error("Recording failed");
    };

    recognition.onend = () => {
      setRecording(false);
    };
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setRecording(false);
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      toast.error(
        "Please provide an answer"
      );
      return;
    }

    try {
      const data =
     await evaluateAnswer({
  job: 1,
  question,
  answer,
});

      setResult(data);

      setHistory((prev) => {
  const exists = prev.find(
    (item) => item.question === question
  );

  if (exists) {
    return prev;
  }

  return [
    ...prev,
    {
      question,
  score: Number(data.score),
    },
  ];
});

      toast.success(
        "Answer Evaluated"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Evaluation Failed"
      );
    }
  };
const nextQuestion = () => {
  if (!result) {
    toast.error("Please evaluate your answer first");
    return;
  }

  if (currentIndex === questions.length - 1) {
    setInterviewCompleted(true);

    toast.success(
      `Interview Completed! Final Score: ${averageScore}/10`
    );

    return;
  }

  setCurrentIndex((prev) => prev + 1);
  setTimeLeft(60);
  setAnswer("");
  setTranscript("");
  setResult(null);
};
  

  return (
    <DashboardLayout>
      <div
        style={{
          padding: "30px",
          color: "white",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1>
          🎤 AI Mock Interview
        </h1>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3>
            Question{" "}
            {currentIndex + 1}/
            {questions.length}
          </h3>

          <p>{question}</p>

          <button
            onClick={() =>
              speakQuestion(
                question
              )
            }
            style={blueButton}
          >
            🔊 Read Question
          </button>
        </div>

        <h3>
          ⏱ Time Left:{" "}
          {timeLeft}s
        </h3>

        <textarea
          value={answer}
          onChange={(e) =>
            setAnswer(
              e.target.value
            )
          }
          placeholder="Type or speak your answer..."
          style={{
            ...inputStyle,
            minHeight: "180px",
          }}
        />

        {transcript && (
          <div
            style={{
              background:
                "#1e293b",
              padding: "15px",
              borderRadius:
                "10px",
              marginBottom:
                "20px",
            }}
          >
            <h4>
              🎙 Transcript
            </h4>

            <p>
              {transcript}
            </p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {!recording ? (
            <button
              onClick={
                startRecording
              }
              style={
                greenButton
              }
            >
              🎤 Start Recording
            </button>
          ) : (
            <button
              onClick={
                stopRecording
              }
              style={redButton}
            >
              ⏹ Stop Recording
            </button>
          )}

         <button
  onClick={handleSubmit}
  disabled={!!result}
  style={{
    ...blueButton,
    opacity: result ? 0.6 : 1,
  }}
>
  Evaluate Answer
</button>

       <button
  onClick={nextQuestion}
  disabled={interviewCompleted}
  style={{
    ...blueButton,
    opacity: interviewCompleted ? 0.5 : 1,
    cursor: interviewCompleted
      ? "not-allowed"
      : "pointer",
  }}
>
  Next Question
</button>

        </div>

        {result && (
          <div
            style={{
              marginTop: "30px",
              background:
                "#1e293b",
              padding: "20px",
              borderRadius:
                "12px",
            }}
          >
            <h2>
              ⭐ Score:{" "}
              {result.score}
              /10
            </h2>

            <p>
              {result.feedback}
            </p>
          </div>
        )}




 {history.length > 0 && (
  <div
    style={{
      marginTop: "30px",
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h2>📊 Interview History</h2>

    {history.map((item, index) => (
      <div
        key={index}
        style={{
          marginBottom: "15px",
        }}
      >
        <strong>
          {item.question}
        </strong>

        <p>
          Score: {item.score}/10
        </p>
      </div>
    ))}
  </div>
)}   
{interviewCompleted && (
  <div
    style={{
      marginTop: "20px",
      background: "#0f172a",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #334155",
      textAlign: "center",
    }}
  >
    <h2>🏆 Final Average Score</h2>

    <h1
      style={{
        color: "#22c55e",
        fontSize: "48px",
      }}
    >
      {averageScore}/10
    </h1>

    <p>
      Interview Successfully Completed
    </p>
  </div>
)}


{interviewCompleted && (
  <button
    onClick={() => {
      setCurrentIndex(0);
      setAnswer("");
      setTranscript("");
      setResult(null);
      setHistory([]);
      setInterviewCompleted(false);
      setTimeLeft(60);
if (recognitionRef.current) {
  recognitionRef.current.stop();
}

window.speechSynthesis.cancel();

setRecording(false);
     
    }}
    style={{
      ...greenButton,
      marginTop: "15px",
    }}
  >
    🔄 Restart Interview
  </button>
)}

</div>
</DashboardLayout>
            
                
   
      
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  background: "#1e293b",
  color: "white",
  border: "1px solid #334155",
  borderRadius: "8px",
};

const blueButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};

const greenButton = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};

const redButton = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};







