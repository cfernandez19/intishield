import { useState, useEffect } from "react";

const contextQuestions = [
  {
    id: "size",
    category: "About Your Business",
    question: "How many people work in your business including yourself?",
    options: [
      { text: "Just me", value: "solo" },
      { text: "2 to 5 people", value: "micro" },
      { text: "6 to 20 people", value: "small" },
      { text: "21 to 50 people", value: "medium" },
    ],
  },
  {
    id: "industry",
    category: "About Your Business",
    question: "What industry are you in?",
    options: [
      { text: "Food & beverage / restaurant", value: "food" },
      { text: "Health, wellness or beauty", value: "health" },
      { text: "Retail or e-commerce", value: "retail" },
      { text: "Trades (plumbing, electrical, construction)", value: "trades" },
      { text: "Professional services (law, accounting, consulting)", value: "professional" },
      { text: "Other", value: "other" },
    ],
  },
  {
    id: "tools",
    category: "About Your Business",
    question: "Which of these does your business currently use?",
    options: [
      { text: "Google Workspace (Gmail, Drive, Docs)", value: "google" },
      { text: "Microsoft 365 (Outlook, Teams, Office)", value: "microsoft" },
      { text: "Neither — we use free personal accounts", value: "neither" },
      { text: "Not sure", value: "unsure" },
    ],
  },
  {
    id: "existing_security",
    category: "About Your Business",
    question: "Does your business currently use any cybersecurity tools or services?",
    options: [
      { text: "Yes — antivirus like Norton or McAfee", value: "antivirus" },
      { text: "Yes — a paid IT or security service", value: "managed" },
      { text: "No — nothing formal", value: "none" },
      { text: "I'm not sure what we have", value: "unsure" },
    ],
  },
  {
    id: "breach",
    category: "About Your Business",
    question: "Has a business you know personally ever been hacked or had a data breach?",
    options: [
      { text: "Yes — it happened to my business", value: "self" },
      { text: "Yes — someone I know", value: "other" },
      { text: "Not that I know of", value: "no" },
      { text: "I'm not sure", value: "unsure" },
    ],
  },
];

const questions = [
  {
    id: 1,
    category: "AI Tools",
    question: "Do you or your team use free AI tools like ChatGPT for work tasks?",
    options: [
      { text: "Yes, all the time", risk: 3 },
      { text: "Sometimes", risk: 2 },
      { text: "Rarely", risk: 1 },
      { text: "Never", risk: 0 },
    ],
  },
  {
    id: 2,
    category: "AI Tools",
    question: "Have you ever pasted customer data, financial info, or private business details into an AI tool?",
    options: [
      { text: "Yes, regularly", risk: 4 },
      { text: "Once or twice", risk: 2 },
      { text: "Never", risk: 0 },
      { text: "I'm not sure", risk: 3 },
    ],
  },
  {
    id: 3,
    category: "Passwords & Access",
    question: "Do you use two-factor authentication (MFA) on your email and banking accounts?",
    options: [
      { text: "Yes, on everything", risk: 0 },
      { text: "On some accounts", risk: 2 },
      { text: "No", risk: 4 },
      { text: "I don't know what that is", risk: 4 },
    ],
  },
  {
    id: 4,
    category: "Passwords & Access",
    question: "Do former employees still have access to your business accounts or tools?",
    options: [
      { text: "No, we remove access immediately", risk: 0 },
      { text: "We try to, but might have missed some", risk: 2 },
      { text: "Probably yes", risk: 4 },
      { text: "I've never thought about this", risk: 4 },
    ],
  },
  {
    id: 5,
    category: "Software & Updates",
    question: "How often do you update your business software and apps?",
    options: [
      { text: "Immediately when updates are available", risk: 0 },
      { text: "Every few months", risk: 2 },
      { text: "Rarely", risk: 3 },
      { text: "Never / I don't manage this", risk: 4 },
    ],
  },
  {
    id: 6,
    category: "Data",
    question: "Where do you store sensitive customer or business data?",
    options: [
      { text: "Secure cloud tools like Google Workspace or Microsoft 365", risk: 0 },
      { text: "A mix of tools including personal email or free apps", risk: 3 },
      { text: "Mostly on personal devices or USB drives", risk: 4 },
      { text: "I'm not sure", risk: 3 },
    ],
  },
  {
    id: 7,
    category: "Team",
    question: "Does your team have any security guidelines for how to handle data or use AI tools?",
    options: [
      { text: "Yes, written policies they follow", risk: 0 },
      { text: "Informal guidelines", risk: 2 },
      { text: "No guidelines", risk: 3 },
      { text: "It's just me", risk: 1 },
    ],
  },
  {
    id: 8,
    category: "Incidents",
    question: "Has your business ever experienced a security incident — hacked account, phishing email, data leak?",
    options: [
      { text: "Yes, and we handled it properly", risk: 1 },
      { text: "Yes, but we didn't do much about it", risk: 4 },
      { text: "Not that I know of", risk: 1 },
      { text: "No", risk: 0 },
    ],
  },
  {
    id: 9,
    category: "Backups",
    question: "Do you back up your important business data regularly?",
    options: [
      { text: "Yes, automatically", risk: 0 },
      { text: "Sometimes manually", risk: 2 },
      { text: "Rarely or never", risk: 4 },
      { text: "I rely on my software to do this", risk: 2 },
    ],
  },
  {
    id: 10,
    category: "Awareness",
    question: "Could you spot a phishing email trying to steal your business login?",
    options: [
      { text: "Yes, I'm confident", risk: 0 },
      { text: "Maybe, I'd have to look carefully", risk: 2 },
      { text: "Probably not", risk: 3 },
      { text: "I've never thought about this", risk: 4 },
    ],
  },
];

const getScore = (totalRisk) => {
  const maxRisk = questions.length * 4;
  const pct = (totalRisk / maxRisk) * 100;
  if (pct <= 15) return { grade: "A", label: "Strong", color: "#4ade80", desc: "Your business has solid security foundations. A few refinements and you're well protected.", bg: "#052e16" };
  if (pct <= 35) return { grade: "B", label: "Good", color: "#a3e635", desc: "You're doing better than most small businesses, but there are gaps worth closing soon.", bg: "#1a2e05" };
  if (pct <= 55) return { grade: "C", label: "At Risk", color: "#facc15", desc: "Your business has meaningful vulnerabilities. Some of these could lead to a costly breach.", bg: "#2d1f00" };
  if (pct <= 75) return { grade: "D", label: "Exposed", color: "#fb923c", desc: "You have serious security gaps that put your business, customers, and data at risk.", bg: "#2d0f00" };
  return { grade: "F", label: "Critical", color: "#f87171", desc: "Your business is highly vulnerable right now. Action is needed immediately.", bg: "#2d0000" };
};

const getRiskyAnswers = (answers) => {
  const risky = [];
  answers.forEach(({ qIndex, optionIndex }) => {
    const q = questions[qIndex];
    const opt = q.options[optionIndex];
    if (opt.risk >= 3) {
      risky.push({ category: q.category, question: q.question, answer: opt.text });
    }
  });
  return risky;
};

export default function Inti() {
  const [screen, setScreen] = useState("landing");
  const [contextStep, setContextStep] = useState(0);
  const [contextAnswers, setContextAnswers] = useState({});
  const [contextSelected, setContextSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [aiInsight, setAiInsight] = useState("");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (screen === "loading") {
      const interval = setInterval(() => setDots(d => (d + 1) % 4), 400);
      return () => clearInterval(interval);
    }
  }, [screen]);

  const totalRisk = answers.reduce((sum, a) => sum + questions[a.qIndex].options[a.optionIndex].risk, 0);
  const score = getScore(totalRisk);
  const riskyAnswers = getRiskyAnswers(answers);

  const handleContextNext = () => {
    if (contextSelected === null) return;
    const cq = contextQuestions[contextStep];
    const newContextAnswers = { ...contextAnswers, [cq.id]: cq.options[contextSelected].value };
    setContextAnswers(newContextAnswers);
    setContextSelected(null);
    if (contextStep < contextQuestions.length - 1) {
      setContextStep(contextStep + 1);
    } else {
      setScreen("quiz");
    }
  };

  const handleAnswer = (optionIndex) => {
    setSelected(optionIndex);
  };

  const handleNext = async () => {
    if (selected === null) return;
    const newAnswers = [...answers, { qIndex: current, optionIndex: selected }];
    setAnswers(newAnswers);
    setSelected(null);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setScreen("loading");
      setLoadingInsight(true);
      const finalRisk = newAnswers.reduce((sum, a) => sum + questions[a.qIndex].options[a.optionIndex].risk, 0);
      const finalScore = getScore(finalRisk);
      const riskyItems = getRiskyAnswers(newAnswers);

      try {
        const prompt = `You are Inti, a friendly cybersecurity advisor for small businesses. A business owner just completed a security assessment and got a grade of "${finalScore.grade}" (${finalScore.label}).

Business context:
- Size: ${contextAnswers.size || "unknown"}
- Industry: ${contextAnswers.industry || "unknown"}
- Tools used: ${contextAnswers.tools || "unknown"}
- Existing security tools: ${contextAnswers.existing_security || "unknown"}

Their riskiest answers were:
${riskyItems.map(r => `- ${r.category}: ${r.question} → They answered: "${r.answer}"`).join("\n")}

Write a 3-sentence plain English summary of their biggest risk right now, tailored to their industry and business size. Be specific, direct, and human. No jargon. End with one concrete action they can take TODAY for free. Do not use bullet points.`;

        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [{ role: "user", content: prompt }],
          }),
        });
        const data = await response.json();
        const text = data.content?.find(b => b.type === "text")?.text || "";
        setAiInsight(text);
      } catch (e) {
        setAiInsight("Your biggest risk is unprotected accounts and unmonitored AI tool usage. These two issues alone account for the majority of small business breaches. Start by enabling two-factor authentication on your email today — it takes 5 minutes and blocks 99% of account takeover attacks.");
      }

      setLoadingInsight(false);
      setScreen("results");
    }
  };

  const progress = ((current) / questions.length) * 100;

  // LANDING
  if (screen === "landing") return (
    <div style={{
      minHeight: "100vh", background: "#080c10",
      fontFamily: "'Georgia', serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "24px", position: "relative", overflow: "hidden"
    }}>
      {/* Sun rays background */}
      <div style={{
        position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,191,36,0.12) 0%, rgba(251,191,36,0.04) 40%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "1px", height: "200px",
        background: "linear-gradient(to bottom, rgba(251,191,36,0.4), transparent)"
      }} />

      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "48px", position: "relative" }}>
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, #fde68a, #f59e0b)",
          margin: "0 auto 20px",
          boxShadow: "0 0 40px rgba(251,191,36,0.4), 0 0 80px rgba(251,191,36,0.15)"
        }} />
        <div style={{ fontSize: "42px", fontWeight: "700", color: "#fde68a", letterSpacing: "6px", textTransform: "uppercase" }}>
          INTI
        </div>
        <div style={{ fontSize: "11px", color: "#78716c", letterSpacing: "3px", textTransform: "uppercase", marginTop: "6px" }}>
          Security that watches over you
        </div>
      </div>

      <div style={{ maxWidth: "360px", textAlign: "center" }}>
        <h1 style={{ fontSize: "26px", color: "#fafaf9", lineHeight: "1.3", marginBottom: "16px", fontWeight: "400" }}>
          Is your business protected — or just lucky?
        </h1>
        <p style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6", marginBottom: "36px" }}>
          10 questions. 3 minutes. Find out exactly where your business is exposed before someone else does.
        </p>

        <button
          onClick={() => setScreen("context")}
          style={{
            width: "100%", padding: "18px", borderRadius: "12px", border: "none",
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "#1c1917", fontSize: "16px", fontWeight: "700",
            cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase",
            boxShadow: "0 8px 32px rgba(245,158,11,0.35)",
            transition: "all 0.2s"
          }}
          onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
          onMouseOut={e => e.target.style.transform = "translateY(0)"}
        >
          Get My Free Risk Score →
        </button>

        <p style={{ color: "#57534e", fontSize: "12px", marginTop: "16px" }}>
          Free forever. No credit card. No spam.
        </p>
      </div>
    </div>
  );

  // CONTEXT QUESTIONS
  if (screen === "context") {
    const cq = contextQuestions[contextStep];
    return (
      <div style={{
        minHeight: "100vh", background: "#080c10",
        fontFamily: "'Georgia', serif",
        display: "flex", flexDirection: "column",
        padding: "24px", maxWidth: "480px", margin: "0 auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div style={{ fontSize: "18px", color: "#fde68a", fontWeight: "700", letterSpacing: "3px" }}>INTI</div>
          <div style={{ fontSize: "13px", color: "#78716c" }}>{contextStep + 1} / {contextQuestions.length}</div>
        </div>

        <div style={{ height: "3px", background: "#1c1917", borderRadius: "4px", marginBottom: "36px" }}>
          <div style={{
            height: "100%", borderRadius: "4px",
            background: "linear-gradient(to right, #f59e0b, #fde68a)",
            width: `${((contextStep) / (contextQuestions.length + questions.length)) * 100}%`,
            transition: "width 0.4s ease"
          }} />
        </div>

        <div style={{
          display: "inline-block", padding: "4px 12px", borderRadius: "20px",
          background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)",
          color: "#f59e0b", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          marginBottom: "20px", alignSelf: "flex-start"
        }}>
          {cq.category}
        </div>

        <h2 style={{ fontSize: "20px", color: "#fafaf9", lineHeight: "1.4", marginBottom: "32px", fontWeight: "400" }}>
          {cq.question}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
          {cq.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setContextSelected(i)}
              style={{
                padding: "16px 20px", borderRadius: "12px", border: "1px solid",
                borderColor: contextSelected === i ? "#f59e0b" : "#292524",
                background: contextSelected === i ? "rgba(245,158,11,0.1)" : "#0f1318",
                color: contextSelected === i ? "#fde68a" : "#a8a29e",
                fontSize: "15px", cursor: "pointer", textAlign: "left",
                transition: "all 0.15s", lineHeight: "1.4"
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>

        <button
          onClick={handleContextNext}
          disabled={contextSelected === null}
          style={{
            marginTop: "28px", width: "100%", padding: "18px", borderRadius: "12px", border: "none",
            background: contextSelected !== null ? "linear-gradient(135deg, #f59e0b, #d97706)" : "#1c1917",
            color: contextSelected !== null ? "#1c1917" : "#44403c",
            fontSize: "15px", fontWeight: "700", cursor: contextSelected !== null ? "pointer" : "not-allowed",
            letterSpacing: "1px", textTransform: "uppercase", transition: "all 0.2s"
          }}
        >
          Next →
        </button>
      </div>
    );
  }

  // QUIZ
  if (screen === "quiz") {
    const q = questions[current];
    return (
      <div style={{
        minHeight: "100vh", background: "#080c10",
        fontFamily: "'Georgia', serif",
        display: "flex", flexDirection: "column",
        padding: "24px", maxWidth: "480px", margin: "0 auto"
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div style={{ fontSize: "18px", color: "#fde68a", fontWeight: "700", letterSpacing: "3px" }}>INTI</div>
          <div style={{ fontSize: "13px", color: "#78716c" }}>{current + 1} / {questions.length}</div>
        </div>

        {/* Progress */}
        <div style={{ height: "3px", background: "#1c1917", borderRadius: "4px", marginBottom: "36px" }}>
          <div style={{
            height: "100%", borderRadius: "4px",
            background: "linear-gradient(to right, #f59e0b, #fde68a)",
            width: `${progress}%`, transition: "width 0.4s ease"
          }} />
        </div>

        {/* Category */}
        <div style={{
          display: "inline-block", padding: "4px 12px", borderRadius: "20px",
          background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
          color: "#f59e0b", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          marginBottom: "20px", alignSelf: "flex-start"
        }}>
          {q.category}
        </div>

        {/* Question */}
        <h2 style={{ fontSize: "20px", color: "#fafaf9", lineHeight: "1.4", marginBottom: "32px", fontWeight: "400" }}>
          {q.question}
        </h2>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              style={{
                padding: "16px 20px", borderRadius: "12px", border: "1px solid",
                borderColor: selected === i ? "#f59e0b" : "#292524",
                background: selected === i ? "rgba(245,158,11,0.1)" : "#0f1318",
                color: selected === i ? "#fde68a" : "#a8a29e",
                fontSize: "15px", cursor: "pointer", textAlign: "left",
                transition: "all 0.15s", lineHeight: "1.4"
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={selected === null}
          style={{
            marginTop: "28px", width: "100%", padding: "18px", borderRadius: "12px", border: "none",
            background: selected !== null ? "linear-gradient(135deg, #f59e0b, #d97706)" : "#1c1917",
            color: selected !== null ? "#1c1917" : "#44403c",
            fontSize: "15px", fontWeight: "700", cursor: selected !== null ? "pointer" : "not-allowed",
            letterSpacing: "1px", textTransform: "uppercase", transition: "all 0.2s"
          }}
        >
          {current < questions.length - 1 ? "Next →" : "Get My Score →"}
        </button>
      </div>
    );
  }

  // LOADING
  if (screen === "loading") return (
    <div style={{
      minHeight: "100vh", background: "#080c10",
      fontFamily: "'Georgia', serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "24px", gap: "24px"
    }}>
      <div style={{
        width: "80px", height: "80px", borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, #fde68a, #f59e0b)",
        boxShadow: "0 0 60px rgba(251,191,36,0.5)",
        animation: "pulse 1.5s ease-in-out infinite"
      }} />
      <style>{`@keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }`}</style>
      <div style={{ color: "#fde68a", fontSize: "18px", letterSpacing: "2px" }}>
        Analyzing{".".repeat(dots)}
      </div>
      <div style={{ color: "#57534e", fontSize: "13px", textAlign: "center", maxWidth: "260px" }}>
        Inti is reviewing your answers and preparing your risk report
      </div>
    </div>
  );

  // RESULTS
  if (screen === "results") return (
    <div style={{
      minHeight: "100vh", background: "#080c10",
      fontFamily: "'Georgia', serif",
      padding: "24px", maxWidth: "480px", margin: "0 auto"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "36px", paddingTop: "12px" }}>
        <div style={{ fontSize: "16px", color: "#fde68a", fontWeight: "700", letterSpacing: "3px", marginBottom: "24px" }}>INTI</div>

        {/* Grade */}
        <div style={{
          width: "100px", height: "100px", borderRadius: "50%", margin: "0 auto 16px",
          background: `radial-gradient(circle at 40% 40%, ${score.color}, ${score.color}99)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "48px", fontWeight: "700", color: "#080c10",
          boxShadow: `0 0 50px ${score.color}60`
        }}>
          {score.grade}
        </div>

        <div style={{ fontSize: "22px", color: score.color, fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
          {score.label}
        </div>
        <div style={{ color: "#a8a29e", fontSize: "14px", lineHeight: "1.6", maxWidth: "300px", margin: "0 auto" }}>
          {score.desc}
        </div>
      </div>

      {/* AI Insight */}
      {aiInsight && (
        <div style={{
          background: "#0f1318", border: "1px solid #292524", borderRadius: "16px",
          padding: "20px", marginBottom: "24px"
        }}>
          <div style={{ fontSize: "11px", color: "#f59e0b", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
            ☀ Inti's Analysis
          </div>
          <p style={{ color: "#d6d3d1", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
            {aiInsight}
          </p>
        </div>
      )}

      {/* Top risks */}
      {riskyAnswers.length > 0 && (
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", color: "#78716c", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>
            Your Top Risks
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {riskyAnswers.slice(0, 3).map((r, i) => (
              <div key={i} style={{
                background: "#0f1318", border: "1px solid #292524",
                borderLeft: "3px solid #f59e0b",
                borderRadius: "10px", padding: "14px 16px"
              }}>
                <div style={{ fontSize: "11px", color: "#f59e0b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
                  {r.category}
                </div>
                <div style={{ color: "#a8a29e", fontSize: "13px", lineHeight: "1.5" }}>
                  {r.question}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{
        background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.05))",
        border: "1px solid rgba(245,158,11,0.2)", borderRadius: "16px",
        padding: "24px", textAlign: "center", marginBottom: "16px"
      }}>
        <div style={{ fontSize: "17px", color: "#fafaf9", marginBottom: "8px", fontWeight: "600" }}>
          Get your full action plan
        </div>
        <div style={{ color: "#78716c", fontSize: "13px", marginBottom: "20px", lineHeight: "1.5" }}>
          See exactly how to fix every risk — step by step, in plain English. Plus a private AI assistant that keeps your business data safe.
        </div>

        {!showEmail ? (
          <button
            onClick={() => setShowEmail(true)}
            style={{
              width: "100%", padding: "16px", borderRadius: "10px", border: "none",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#1c1917", fontSize: "15px", fontWeight: "700",
              cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase"
            }}
          >
            Fix My Risks → Free 14-Day Trial
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: "14px 16px", borderRadius: "10px",
                border: "1px solid #292524", background: "#080c10",
                color: "#fafaf9", fontSize: "15px", outline: "none"
              }}
            />
            <button
              style={{
                width: "100%", padding: "16px", borderRadius: "10px", border: "none",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#1c1917", fontSize: "15px", fontWeight: "700",
                cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase"
              }}
            >
              Start Free Trial →
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => { setScreen("landing"); setCurrent(0); setAnswers([]); setSelected(null); setAiInsight(""); setShowEmail(false); setContextStep(0); setContextAnswers({}); setContextSelected(null); }}
        style={{
          width: "100%", padding: "14px", borderRadius: "10px",
          border: "1px solid #292524", background: "transparent",
          color: "#57534e", fontSize: "13px", cursor: "pointer"
        }}
      >
        Retake Assessment
      </button>

      <div style={{ textAlign: "center", marginTop: "24px", color: "#292524", fontSize: "11px", letterSpacing: "2px" }}>
        INTI · SECURITY THAT WATCHES OVER YOU
      </div>
    </div>
  );
}