import { Cpu, Code2, BrainCircuit, GraduationCap } from "lucide-react";

export const servicesData = [
  {
    key: "iot-hardware",
    icon: Cpu,
    title: "IoT & Hardware",
    shortDesc:
      "Designing reliable connected hardware systems with production-ready electronics and firmware.",
    description:
      "We engineer end-to-end IoT and hardware systems that are robust, secure, and scalable. From circuit design to embedded firmware and cloud connectivity, our solutions are built for real-world deployment—not lab demos.",
    features: [
      {
        title: "Production-Grade PCB Design",
        desc: "Multi-layer PCB layouts designed for signal integrity, power efficiency, and manufacturability."
      },
      {
        title: "Embedded Firmware Development",
        desc: "Low-level firmware in C/C++ and RTOS environments optimized for stability and performance."
      },
      {
        title: "Sensor & Protocol Integration",
        desc: "Integration of industrial sensors with protocols like I2C, SPI, UART, CAN, and Modbus."
      },
      {
        title: "Rapid Prototyping & Testing",
        desc: "Functional prototypes with validation testing to accelerate hardware-to-market cycles."
      }
    ]
  },

  {
    key: "Software Development",
    icon: Code2,
    title: "Software Development",
    shortDesc:
      "Scalable, secure software systems engineered for performance and long-term growth.",
    description:
      "We build custom software solutions with clean architecture, maintainable codebases, and modern technology stacks. Our focus is on performance, security, and systems that scale smoothly as your business grows.",
    features: [
      {
        title: "Full-Stack Application Development",
        desc: "Modern web applications using React, Node.js, and cloud-native architectures."
      },
      {
        title: "Backend & API Engineering",
        desc: "Secure REST and GraphQL APIs with optimized database design and authentication."
      },
      {
        title: "System Architecture & Scalability",
        desc: "Well-structured systems designed to handle increasing traffic and data volume."
      },
      {
        title: "Performance Optimization",
        desc: "Improving load times, API response speed, and overall system efficiency."
      }
    ]
  },

  {
    key: "Artificial Intelligence",
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    shortDesc:
      "Turning raw data into intelligent systems that automate decisions and predict outcomes.",
    description:
      "We develop AI and data-driven systems that deliver measurable impact. Our work focuses on practical machine learning solutions that integrate seamlessly into existing products and workflows.",
    features: [
      {
        title: "Custom Machine Learning Models",
        desc: "Tailored models built for prediction, classification, and pattern recognition."
      },
      {
        title: "Data Processing & Feature Engineering",
        desc: "Clean, structured pipelines that prepare real-world data for reliable model performance."
      },
      {
        title: "AI Integration in Products",
        desc: "Embedding intelligence directly into applications, dashboards, and workflows."
      },
      {
        title: "Model Evaluation & Optimization",
        desc: "Continuous performance monitoring and refinement to maintain accuracy over time."
      }
    ]
  },

  {
    key: "Training",
    icon: GraduationCap,
    title: "Training",
    shortDesc:
      "Industry-focused training programs designed to build real, job-ready technical skills.",
    description:
      "Our training programs are built around practical learning and real projects. We focus on equipping students and teams with skills that translate directly into professional competence, not just theoretical knowledge.",
    features: [
      {
        title: "Hands-On Project-Based Learning",
        desc: "Real-world projects that reinforce concepts through implementation."
      },
      {
        title: "Industry-Relevant Curriculum",
        desc: "Content aligned with current tools, frameworks, and engineering practices."
      },
      {
        title: "Mentorship & Technical Guidance",
        desc: "Direct support from experienced engineers throughout the learning process."
      },
      {
        title: "Career-Oriented Skill Building",
        desc: "Focused training aimed at interviews, internships, and professional readiness."
      }
    ]
  }
];
