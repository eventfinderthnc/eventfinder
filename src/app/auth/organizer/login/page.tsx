"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import OrganizerLoginStep from "./_components/OrganizerLoginStep"
import { useRouter } from "next/navigation"

export type Step = "role" | "orgregis"

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
  const [step, setStep] = useState<Step>("role")
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
            {step === "role"&& (
              <motion.div
                key="contact"
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full"
              >
                <OrganizerLoginStep
                  onBack={() => router.push("/auth")} 
                  onNext={() => router.push("/auth/organizer/onboarding")} 
                />
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  )
}