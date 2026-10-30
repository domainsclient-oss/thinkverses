type Block =
  | { p: string }
  | { h3: string }
  | { ul: string[] }
  | { ol: string[] };

export type ArticleSection = { id: string; title: string; blocks: Block[] };

export const articleSections: ArticleSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        p: "Dubai and the wider UAE have become regional hubs for digital transformation, smart infrastructure and advanced technology. Businesses across the country are adopting AI, IoT, automation, cloud platforms and real-time analytics to run more efficiently and compete globally.",
      },
      {
        p: "Among these technologies, Digital Twins stand out because they connect the physical and digital worlds directly. They give organizations a way to see, test and improve their operations without disrupting them.",
      },
    ],
  },
  {
    id: "what-is-digital-twin-technology",
    title: "What is Digital Twin technology?",
    blocks: [
      {
        p: "A Digital Twin is a dynamic virtual representation of a physical asset, process, system or environment. It is kept up to date with real-time data from sensors, machines and business systems, so it reflects what is actually happening rather than what was planned.",
      },
      {
        p: "Unlike a static model, a Digital Twin keeps interacting with real-world data. That makes it useful for monitoring, simulation, prediction and optimization across the full life of an asset.",
      },
    ],
  },
  {
    id: "key-technologies",
    title: "Key technologies behind Digital Twins",
    blocks: [
      {
        ul: [
          "IoT sensors and devices that capture live operating conditions",
          "Connectivity and data integration that bring OT, IT and ERP data together",
          "Cloud and edge computing to store and process data at the right place",
          "AI and machine learning to detect patterns, forecast behavior and recommend actions",
          "3D visualization and simulation engines to explore scenarios",
        ],
      },
    ],
  },
  {
    id: "digital-twin-vs-digital-model",
    title: "Digital Twin vs. traditional digital model",
    blocks: [
      {
        p: "A traditional digital model, such as a CAD drawing or a simulation built once for a project, describes how something was designed. A Digital Twin describes how it is behaving now. It is connected, it updates continuously and it can be used to predict what will happen next and to test responses before acting on them.",
      },
    ],
  },
  {
    id: "why-growing-in-uae",
    title: "Why Digital Twin technology is growing in Dubai & UAE",
    blocks: [
      { h3: "Growing focus on smart cities" },
      {
        p: "Large-scale smart city and infrastructure programs need a way to plan, monitor and operate complex, connected environments. Digital Twins provide a shared, living view of those environments.",
      },
      { h3: "Demand for data-driven operations" },
      {
        p: "Organizations want decisions grounded in real operating data instead of periodic reports. A Digital Twin turns that data into something teams can explore and act on.",
      },
      { h3: "Growth of Industry 4.0" },
      {
        p: "Manufacturing, energy and logistics operators are connecting machines and systems. Once assets are connected, a Digital Twin is the natural next step to make sense of the data they produce.",
      },
      { h3: "Focus on efficiency and sustainability" },
      {
        p: "Reducing energy use, waste and unplanned downtime is a priority for many UAE businesses. Simulation lets teams find improvements and test them before investing.",
      },
    ],
  },
  {
    id: "how-it-works",
    title: "How Digital Twin technology works",
    blocks: [
      {
        ol: [
          "Data collection from sensors, machines and systems",
          "IoT connectivity that streams that data reliably",
          "Data integration across operational and business systems",
          "A virtual replica of the asset, process or facility",
          "Real-time monitoring of condition and performance",
          "AI analysis and simulation of possible scenarios",
          "Predictive insights about what will happen next",
          "Continuous optimization as results feed back into the model",
        ],
      },
    ],
  },
  {
    id: "key-benefits",
    title: "Key benefits for businesses in Dubai & UAE",
    blocks: [
      {
        ul: [
          "Predictive maintenance that reduces unplanned downtime",
          "Better asset utilization and longer asset life",
          "Remote monitoring of distributed sites",
          "Safer testing of changes through simulation",
          "Faster, better-informed decisions",
          "Progress toward energy and sustainability goals",
        ],
      },
    ],
  },
  {
    id: "applications",
    title: "Applications across UAE industries",
    blocks: [
      {
        ul: [
          "Smart cities: planning, traffic, utilities and public services",
          "Manufacturing: production lines, quality and maintenance",
          "Construction & real estate: design coordination and building operations",
          "Energy & utilities: grid assets, demand forecasting and plant performance",
          "Logistics & transportation: warehouses, fleets and flows",
          "Healthcare: facility operations and equipment availability",
        ],
      },
    ],
  },
  {
    id: "digital-twin-and-ai",
    title: "Digital Twin technology and AI",
    blocks: [
      {
        p: "AI is what moves a Digital Twin from showing the present to anticipating the future. Machine learning models forecast failures and performance, and Generative AI lets teams ask the twin questions in plain language and receive explained recommendations.",
      },
    ],
  },
  {
    id: "role-of-iot",
    title: "The role of IoT",
    blocks: [
      {
        p: "IoT is the twin's nervous system. Sensors and connected devices supply the continuous stream of temperature, vibration, pressure, energy and location data that keeps the virtual model accurate.",
      },
    ],
  },
  {
    id: "challenges",
    title: "Challenges of implementing Digital Twin solutions",
    blocks: [
      {
        ul: [
          "Data quality and gaps in sensor coverage",
          "Integrating legacy systems and different data formats",
          "Cybersecurity and access control",
          "Skills and change management inside operating teams",
          "Defining clear business outcomes before building",
        ],
      },
    ],
  },
  {
    id: "how-to-adopt",
    title: "How businesses can adopt Digital Twin technology",
    blocks: [
      {
        p: "Start with one decision that matters, such as when to maintain a critical asset, and build the twin needed to improve it. Assess the data you already have, connect what is missing, prove value on a focused scope and then expand. Choosing a partner that builds on your own data and systems avoids starting from scratch.",
      },
    ],
  },
  {
    id: "future",
    title: "The future of Digital Twin technology in Dubai & UAE",
    blocks: [
      {
        p: "As connectivity, AI and robotics mature, Digital Twins will increasingly close the loop: deciding in the virtual world and acting in the physical one, then learning from the result. For businesses in the UAE this means operations that are more predictable, efficient and resilient.",
      },
    ],
  },
  {
    id: "conclusion",
    title: "Conclusion",
    blocks: [
      {
        p: "Digital Twin technology is becoming a foundation for smart business operations in Dubai and the UAE. Organizations that start now, with a clear decision to improve and a model built on their own data, will be best placed to benefit as the technology and the region's digital infrastructure continue to grow.",
      },
    ],
  },
];
