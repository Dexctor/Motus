"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════
   CLARTE: Mini video player
   IDLE: paused state, progress at 0
   HOVER: video "plays", progress fills, view count ticks up
   ═══════════════════════════════════════════ */
export function ClarityScene({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 pt-3 sm:p-6 sm:pt-5">
      <div className="relative w-full max-w-[240px] overflow-hidden rounded-lg border border-white/[0.06] bg-[#111] shadow-lg transition-all duration-500 sm:max-w-[340px]"
        style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
      >
        {/* Video area */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1a2a28] to-[#0f0f0f]">
          {/* Waveform / audio visualization */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end gap-[2px]">
            {[35, 55, 25, 70, 45, 60, 30, 50, 65, 40, 55, 35, 70, 45, 25, 60, 50, 40].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-accent"
                animate={{
                  height: hovered ? [h * 0.15, h * 0.6, h * 0.3, h * 0.5] : [h * 0.1, h * 0.15, h * 0.1],
                  opacity: hovered ? 0.7 : 0.2,
                }}
                transition={{
                  duration: hovered ? 0.5 : 2,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          {/* Play/Pause */}
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm"
            animate={{
              backgroundColor: hovered ? "rgba(var(--accent-rgb),0.3)" : "rgba(var(--accent-rgb),0.15)",
              scale: hovered ? [1, 0.9, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {hovered ? (
              <svg className="h-3.5 w-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="ml-0.5 h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.div>
          {/* Timer */}
          <motion.div
            className="absolute right-2 top-2 rounded px-1.5 py-0.5 text-[9px] font-bold"
            animate={{
              backgroundColor: hovered ? "rgba(var(--accent-rgb),0.9)" : "rgba(var(--accent-rgb),0.5)",
              color: "#0a0a0a",
            }}
          >
            {hovered ? "0:30" : "0:00"}
          </motion.div>
        </div>
        {/* Progress bar */}
        <div className="h-1 w-full bg-white/5">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: hovered ? 3 : 0.5, ease: hovered ? "linear" : "easeOut" }}
          />
        </div>
        {/* Bottom bar */}
        <div className="flex items-center justify-between px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <motion.div
              className="h-1.5 w-1.5 rounded-full"
              animate={{ backgroundColor: hovered ? "var(--color-accent)" : "rgba(var(--accent-rgb),0.3)" }}
            />
            <span className="text-[8px] text-white/30">showreel.mp4</span>
          </div>
          <motion.span
            className="text-[8px] font-medium text-accent"
            animate={{ opacity: hovered ? 1 : 0 }}
          >
            HD 1080p
          </motion.span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   IMPACT: Engagement metrics
   IDLE: static cards, dimmed
   HOVER: cards fly in faster, numbers count up, glow pulse
   ═══════════════════════════════════════════ */
export function ImpactScene({ hovered }: { hovered: boolean }) {
  const notifs = [
    { icon: "👁", text: "1.2k vues", hoverText: "8.4k vues", delay: 0, color: "border-accent/20" },
    { icon: "🔥", text: "+89%", hoverText: "+340%", delay: 1.2, color: "border-orange-500/20" },
    { icon: "💬", text: "6 leads", hoverText: "48 leads", delay: 2.4, color: "border-blue-400/20" },
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden p-4 sm:gap-2.5 sm:p-5">
      {notifs.map((n, i) => (
        <motion.div
          key={i}
          className={`flex w-full max-w-[160px] items-center gap-2 rounded-lg border ${n.color} bg-[#1e1e1e] px-2.5 py-1.5 shadow-sm sm:max-w-[180px] sm:gap-2.5 sm:px-3 sm:py-2`}
          animate={{
            x: hovered ? [30, 0] : [50, 8, 8, 50],
            opacity: hovered ? [0, 1] : [0, 0.5, 0.5, 0],
            scale: hovered ? [0.95, 1.02, 1] : [0.95, 1, 1, 0.95],
          }}
          transition={{
            duration: hovered ? 0.4 : 5,
            repeat: hovered ? 0 : Infinity,
            delay: hovered ? i * 0.12 : n.delay,
            ease: "easeOut",
            times: hovered ? undefined : [0, 0.15, 0.8, 1],
          }}
        >
          <span className="text-sm">{n.icon}</span>
          <span className="text-[11px] font-semibold text-white/80">
            {hovered ? n.hoverText : n.text}
          </span>
          {hovered && (
            <motion.span
              className="ml-auto text-[9px] font-bold text-accent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              ↑
            </motion.span>
          )}
        </motion.div>
      ))}
      {/* Hover glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-rgb),0.06),transparent_70%)]"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   RAPIDITE: Delivery timeline
   IDLE: steps slowly cycle through
   HOVER: ALL steps complete instantly with a satisfying cascade
   ═══════════════════════════════════════════ */
export function SpeedScene({ hovered }: { hovered: boolean }) {
  const steps = [
    { label: "Brief recu", idle: 0 },
    { label: "Creation", idle: 1.8 },
    { label: "Revisions", idle: 3.6 },
    { label: "Livre !", idle: 5.4 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-4 sm:p-5">
      <div className="flex w-full max-w-[180px] flex-col gap-1.5 sm:max-w-[200px] sm:gap-2">
        {steps.map((step, i) => {
          const isCompleted = hovered;
          return (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              animate={{
                x: hovered ? [8, 0] : 0,
              }}
              transition={{ delay: hovered ? i * 0.08 : 0, duration: 0.3 }}
            >
              {/* Check circle */}
              <motion.div
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                animate={{
                  borderColor: isCompleted
                    ? "var(--color-accent)"
                    : ["rgba(255,255,255,0.08)", "rgba(var(--accent-rgb),0.5)", "rgba(var(--accent-rgb),0.5)", "rgba(255,255,255,0.08)"],
                  backgroundColor: isCompleted
                    ? "rgba(var(--accent-rgb),0.2)"
                    : ["rgba(0,0,0,0)", "rgba(var(--accent-rgb),0.1)", "rgba(var(--accent-rgb),0.1)", "rgba(0,0,0,0)"],
                  scale: isCompleted ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: isCompleted ? 0.3 : 7,
                  repeat: isCompleted ? 0 : Infinity,
                  delay: isCompleted ? i * 0.1 : step.idle,
                  times: isCompleted ? undefined : [0, 0.12, 0.65, 1],
                }}
              >
                <motion.svg
                  className="h-2.5 w-2.5 text-accent"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                  animate={{
                    opacity: isCompleted
                      ? [0, 1]
                      : [0, 1, 1, 0],
                    pathLength: isCompleted ? [0, 1] : undefined,
                  }}
                  transition={{
                    duration: isCompleted ? 0.25 : 7,
                    repeat: isCompleted ? 0 : Infinity,
                    delay: isCompleted ? i * 0.1 + 0.1 : step.idle,
                    times: isCompleted ? undefined : [0, 0.12, 0.65, 1],
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </motion.svg>
              </motion.div>

              {/* Label + bar */}
              <div className="flex-1">
                <motion.span
                  className="text-[10px] font-medium"
                  animate={{
                    color: isCompleted ? "var(--color-accent)" : "rgba(255,255,255,0.35)",
                  }}
                  transition={{ delay: isCompleted ? i * 0.1 : 0, duration: 0.3 }}
                >
                  {step.label}
                </motion.span>
                <div className="mt-0.5 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    animate={{
                      width: isCompleted ? "100%" : ["0%", "100%", "100%", "0%"],
                    }}
                    transition={{
                      duration: isCompleted ? 0.4 : 7,
                      repeat: isCompleted ? 0 : Infinity,
                      delay: isCompleted ? i * 0.08 : step.idle,
                      ease: "easeOut",
                      times: isCompleted ? undefined : [0, 0.15, 0.65, 1],
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
        {/* "Done" badge on hover */}
        <motion.div
          className="mt-1 self-end rounded-full bg-accent/20 px-3 py-0.5 text-[9px] font-bold text-accent"
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 8,
          }}
          transition={{ delay: hovered ? 0.5 : 0, duration: 0.3 }}
        >
          Livre en 7 jours ✓
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONVERSION: Funnel dashboard
   IDLE: bars slowly fill one by one
   HOVER: all bars snap to full with "+27%" highlight, numbers appear
   ═══════════════════════════════════════════ */
export function ConversionScene({ hovered }: { hovered: boolean }) {
  const metrics = [
    { label: "Visiteurs", value: "12.4k", width: "92%", idle: 0 },
    { label: "Engages", value: "3.8k", width: "58%", idle: 0.8 },
    { label: "Leads", value: "940", width: "32%", idle: 1.6 },
    { label: "Clients", value: "312", width: "16%", idle: 2.4 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-4 pt-3 sm:p-5 sm:pt-4">
      <div className="w-full max-w-[260px] sm:max-w-[380px]">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[9px] font-medium text-white/20">Funnel Q1 2026</span>
          <motion.div
            className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-accent"
            animate={{
              scale: hovered ? [1, 1.15, 1] : 1,
              backgroundColor: hovered ? "rgba(var(--accent-rgb),0.25)" : "rgba(var(--accent-rgb),0.1)",
            }}
            transition={{ duration: 0.4 }}
          >
            {hovered ? "+27% ↑" : "+27%"}
          </motion.div>
        </div>

        {/* Funnel bars */}
        <div className="flex flex-col gap-2.5">
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="w-12 text-right text-[8px] text-white/25">{m.label}</span>
              <div className="relative h-5 flex-1 overflow-hidden rounded bg-white/[0.04]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded"
                  animate={{
                    width: hovered ? m.width : ["0%", m.width, m.width, "0%"],
                    backgroundColor: hovered
                      ? "rgba(var(--accent-rgb),0.35)"
                      : "rgba(var(--accent-rgb),0.15)",
                  }}
                  transition={{
                    duration: hovered ? 0.5 : 6,
                    repeat: hovered ? 0 : Infinity,
                    delay: hovered ? i * 0.1 : m.idle,
                    ease: "easeOut",
                    times: hovered ? undefined : [0, 0.2, 0.7, 1],
                  }}
                />
                <motion.span
                  className="absolute inset-y-0 right-2 flex items-center text-[9px] font-bold text-white/70"
                  animate={{
                    opacity: hovered ? 1 : [0, 0.7, 0.7, 0],
                  }}
                  transition={{
                    duration: hovered ? 0.3 : 6,
                    repeat: hovered ? 0 : Infinity,
                    delay: hovered ? i * 0.1 + 0.2 : m.idle + 0.5,
                    times: hovered ? undefined : [0, 0.2, 0.7, 1],
                  }}
                >
                  {m.value}
                </motion.span>
              </div>
            </div>
          ))}
        </div>

        {/* Hover conversion rate */}
        <motion.div
          className="mt-3 flex items-center justify-center gap-1.5 text-[10px]"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ delay: hovered ? 0.5 : 0, duration: 0.3 }}
        >
          <span className="text-white/30">Taux de conversion:</span>
          <span className="font-bold text-accent">2.5%</span>
        </motion.div>
      </div>
    </div>
  );
}
