"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Users, Lightbulb, Target } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Expert in JavaScript, TypeScript, React, Next.js, and React Native",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Strong communication skills with experience in agile development",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Creative solutions for complex technical challenges and optimization",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Focused on delivering high-quality applications and user experiences",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm a passionate full-stack software engineer from Multan, Pakistan, with expertise in modern web
            technologies. I love building scalable applications and solving complex problems with clean, efficient code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Currently working as a Full-Stack Software Engineer at Huebyte, where I develop innovative applications
              including peer-to-peer trading platforms, property comparison tools, and AI-powered solutions using OpenAI
              and Gemini APIs.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              I hold a BS in Computer Science from the University of Management and Technology, Lahore, and have
              hands-on experience with modern technologies like React, Next.js, TypeScript, and various databases
              including MongoDB and PostgreSQL.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                🇵🇰 Pakistan
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">
                English, Urdu, Hindi
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="p-4 h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-0">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-3`}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
