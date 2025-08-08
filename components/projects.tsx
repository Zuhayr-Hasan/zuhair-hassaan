"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: "LocalCoins - P2P Trading Platform",
      description:
        "Enabled users to trade directly without intermediaries, improving transaction speed, reducing fees, and increasing flexibility through secure, real-time payments — boosting user trust and adoption in local trading markets.",
      image: "/placeholder.svg?height=200&width=400&text=LocalCoins+Trading",
      technologies: ["React Native", "TypeScript", "Node.js", "GraphQL", "Stripe", "MongoDB"],
      liveUrl: "www.local-coins.com",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "AI Writing Tool",
      description:
        "Created a platform for generating social media posts and articles with campaigns, AI prompts, and calendars — enabling content creators to save hours weekly, stay organized, and maintain consistent high-quality output across multiple platforms.",
      technologies: ["TypeScript", "Next.js", "ShadCN", "Firebase", "QWEN", "Paddle Payment Gateway"],
      liveUrl: "www.atomwriter.com",
      color: "from-yellow-500 to-purple-500",
    },
    {
      title: "Redfin - Property Comparison Platform",
      description:
        "Property checker platform for users to compare properties, view prices, areas, and images of houses and apartments in the USA with advanced filtering — empowering buyers and investors to make faster, data-driven decisions.",
      image: "/placeholder.svg?height=200&width=400&text=TREDA+Property",
      technologies: ["React", "Next.js", "TypeScript", "Real Estate APIs", "Tailwind CSS"],
      liveUrl: "https://www.redfin.com/",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "AI Teleprompter Extension",
      description:
        "Browser extension for interview preparation that captures user voice and provides intelligent answers using the Gemini API with real-time processing — helping candidates improve confidence, fluency, and accuracy during live interviews.",
      image: "/placeholder.svg?height=200&width=400&text=AI+Teleprompter",
      technologies: ["JavaScript", "Browser Extension", "Gemini API", "Voice Recognition", "AI Integration"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Facebook Campaign Analyzer",
      description:
        "Analytics tool to analyze Facebook campaigns, identify top-selling Shopify products, and summarize marketing campaigns using OpenAI API — allowing marketers to optimize ad spend and maximize campaign ROI.",
      image: "/placeholder.svg?height=200&width=400&text=Campaign+Analyzer",
      technologies: ["React", "OpenAI API", "Facebook API", "Shopify API", "Data Visualization"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "PKI PDF Platform",
      description:
        "Optimized PDF processing platform with 20% faster document signing performance and enhanced security — enabling organizations to process sensitive documents efficiently while ensuring compliance with digital signature standards.",
      image: "/placeholder.svg?height=200&width=400&text=PKI+PDF+Platform",
      technologies: ["TypeScript", "React", "PDF Processing", "Digital Signatures", "Security"],
      liveUrl: "https://www.codegic.com/aatl-pdf-digital-signatures/",
      color: "from-indigo-500 to-blue-500",
    },
  ];

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
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Some of my recent work and professional projects</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20`}></div>

                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
                    >
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`}></div>
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <p className="text-gray-600 dark:text-gray-400 text-sm flex-1">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ delay: 0.1 * techIndex }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {project.liveUrl && (
                      <div className="flex gap-2 pt-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="w-full bg-transparent"
                          >
                            <a
                              href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
