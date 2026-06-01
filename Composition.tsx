import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, staticFile } from "remotion";

const roadmapPhoto = staticFile("roadmap-photo.png");

const ROADMAP_STEPS = [
  {
    title: "HTML",
    subtitle: "Structure of web pages",
    color: "#ec632f",
    duration: "2 weeks",
  },
  {
    title: "CSS",
    subtitle: "Style and design",
    color: "#2f78e6",
    duration: "2 weeks",
  },
  {
    title: "JS",
    subtitle: "Add interactivity and logic",
    color: "#f5c13c",
    duration: "3 weeks",
  },
  {
    title: "React",
    subtitle: "Build UI with components",
    color: "#1bb0d8",
    duration: "3 weeks",
  },
  {
    title: "Node.js",
    subtitle: "Backend and server logic",
    color: "#79b133",
    duration: "4 weeks",
  },
];

const TOTAL_DURATION = "14 weeks";
const TOTAL_SECONDS = 8;

const StepCard: React.FC<{
  step: typeof ROADMAP_STEPS[number];
  index: number;
  progress: number;
  visible: boolean;
}> = ({ step, index, progress, visible }) => {
  const opacity = visible ? 1 : 0.25;
  const transform = visible ? "translateY(0px)" : "translateY(18px)";
  return (
    <div
      style={{
        width: 220,
        minHeight: 170,
        borderRadius: 28,
        border: `2px solid ${step.color}`,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "rgba(15, 23, 42, 0.92)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
        opacity,
        transform,
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      <div>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 18,
            background: step.color,
            color: "white",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
            fontSize: 18,
          }}
        >
          {index + 1}
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
          {step.title}
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.75, color: "#cbd5e1" }}>
          {step.subtitle}
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 13, color: "#94a3b8" }}>Duration</span>
          <span style={{ fontSize: 13, color: "white", fontWeight: 700 }}>
            {step.duration}
          </span>
        </div>
        <div
          style={{
            height: 10,
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.round(progress * 100)}%`,
              height: "100%",
              borderRadius: 999,
              background: step.color,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const EthiopiaMapComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const durationFrames = TOTAL_SECONDS * fps;
  const progress = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentTime = interpolate(frame, [0, durationFrames], [0, TOTAL_SECONDS], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        background: "#020617",
        color: "white",
        fontFamily: "Inter, system-ui, sans-serif",
        padding: 48,
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 34 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 900,
              letterSpacing: "-1px",
              marginBottom: 16,
            }}
          >
            Roadmap
          </div>
          <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
            <img
              src={roadmapPhoto}
              alt="Roadmap overview"
              style={{
                width: "100%",
                maxWidth: 1080,
                borderRadius: 28,
                boxShadow: "0 40px 120px rgba(0,0,0,0.25)",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#f8fafc",
                padding: "12px 18px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Length: {TOTAL_DURATION}
            </div>
            <div
              style={{
                background: "rgba(56,189,248,0.16)",
                color: "#bae6fd",
                padding: "12px 18px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Time: {currentTime.toFixed(1)}s / {TOTAL_SECONDS}s
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {ROADMAP_STEPS.map((step, index) => {
            const stepStart = index / ROADMAP_STEPS.length;
            const stepEnd = (index + 1) / ROADMAP_STEPS.length;
            const visible = progress >= stepStart * 0.9;
            const stepProgress = Math.min(
              1,
              Math.max(0, (progress - stepStart) / (stepEnd - stepStart))
            );
            return (
              <StepCard
                key={step.title}
                step={step}
                index={index}
                progress={stepProgress}
                visible={visible}
              />
            );
          })}
        </div>

        <div
          style={{
            marginTop: 40,
            position: "relative",
            height: 110,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              height: 8,
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              transform: "translateY(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: `${progress * 100}%`,
              height: 8,
              borderRadius: 999,
              background: "linear-gradient(90deg, #ec632f, #79b133)",
              transform: "translateY(-50%)",
              boxShadow: "0 0 18px rgba(56,189,248,0.25)",
            }}
          />
          {ROADMAP_STEPS.map((step, index) => {
            const left = ((index + 0.5) / ROADMAP_STEPS.length) * 100;
            const done = progress >= (index + 0.5) / ROADMAP_STEPS.length;
            return (
              <div
                key={step.title}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `3px solid ${done ? step.color : "rgba(255,255,255,0.24)"}`,
                    background: done ? step.color : "rgba(255,255,255,0.12)",
                    boxShadow: done ? `0 0 18px ${step.color}55` : "none",
                    marginBottom: 12,
                  }}
                />
                <div
                  style={{
                    fontSize: 12,
                    color: done ? "#e2e8f0" : "#94a3b8",
                    fontWeight: 700,
                    width: 110,
                  }}
                >
                  {step.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EthiopiaMapComposition;
