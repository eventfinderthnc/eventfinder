"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import CategoryStep from "../../_components/CategoryStep"
import InfoStep from "../../_components/InfoStep"
import { useRouter } from "next/navigation"

export type Step = "info" | "category"

const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

export default function Page() {
  const [step, setStep] = useState<Step>("info")
  const [direction, setDirection] = useState(1)
  const router = useRouter()

  const goNext = (next: Step) => {
    setDirection(1)
    setStep(next)
  }

  const goBack = (prev: Step) => {
    setDirection(-1)
    setStep(prev)
  }

  return (
    <div className="auth-section auth-bg">
      <div className="relative overflow-hidden flex flex-col p-10 w-[320px] h-[510px] sm:w-[550px] sm:h-[660px] rounded-4xl bg-white shadow-[0_6px_16px_0_rgba(0,0,0,0.25)]">

        <AnimatePresence custom={direction} mode="wait">
          {step === "info" && (
            <motion.div
              key="info"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full"
            >
              <InfoStep
                type="attendee"
                onBack={() => router.push("/")}
                onNext={() => goNext("category")}
              />
            </motion.div>
          )}

          {step === "category" && (
            <motion.div
              key="category"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full"
            >
              <CategoryStep
                type="attendee"
                onBack={() => goBack("info")}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}