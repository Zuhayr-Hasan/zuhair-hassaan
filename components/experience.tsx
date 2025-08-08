"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      title: "Full-Stack Software Engineer",
      company: "Huebyte",
      location: "On-Site",
      period: "January 2023 - Present",
      description:
        "Developed LocalCoins peer-to-peer cash transaction application, analyzed Facebook campaigns with Shopify integration, built TREDA property comparison platform for USA real estate, and created teleprompter browser extension with Gemini API integration.",
      technologies: ["React", "Next.js", "TypeScript", "OpenAI API", "Gemini API", "Node.js", "MongoDB"],
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Front-End Engineer (Part Time)",
      company: "Codegic",
      location: "On-Site",
      period: "September 2022 - December 2022",
      description:
        "Optimized PKI PDF platform achieving 20% faster document signing performance. Implemented TypeScript resulting in 15% reduction in code issues and improved overall code quality.",
      technologies: ["TypeScript", "React", "PDF Processing", "Performance Optimization"],
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Front-End Engineer (Internship)",
      company: "InvoZone",
      location: "On-Site",
      period: "June 2022 - September 2022",
      description:
        "Specialized in crafting high-end user interfaces with React, MUI, SCSS, and TypeScript. Designed and developed pixel-perfect applications using Next.js, Tailwind CSS, and Shadcn/UI.",
      technologies: ["React", "Next.js", "TypeScript", "MUI", "SCSS", "Tailwind CSS", "Shadcn/UI"],
      color: "from-orange-500 to-red-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Work Experience</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">My professional journey and key achievements</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants} className="relative">
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                  className={`absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} border-4 border-white dark:border-gray-900 z-10`}
                ></motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="ml-16"
                >
                  <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            {exp.title}
                          </CardTitle>
                          <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex flex-col md:items-end gap-2">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            {exp.period}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-2" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{ delay: 0.8 + techIndex * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge
                              variant="outline"
                              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
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
