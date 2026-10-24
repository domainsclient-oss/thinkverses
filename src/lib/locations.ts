// Kept free of path aliases: next.config.ts imports this file for redirects.

export type ServiceKey = "digital-twin" | "robotic-process-automation" | "iot";

export type Service = {
  key: ServiceKey;
  title: string;
  short: string;
  summary: string;
  capabilities: string[];
};

export type Region = {
  slug: string;
  name: string;
  parent?: string;
};

export const services: Service[] = [
  {
    key: "digital-twin",
    title: "Digital Twin Technology Solutions",
    short: "Digital Twin",
    summary:
      "Living virtual replicas of your assets, processes and facilities, fed by real-time data so teams can monitor performance, test scenarios and act before problems reach the floor.",
    capabilities: [
      "Real-time monitoring of assets and processes",
      "Predictive maintenance and anomaly detection",
      "Scenario simulation before physical change",
      "AI-powered forecasting on your operational data",
    ],
  },
  {
    key: "robotic-process-automation",
    title: "Robotic Process Automation Solutions",
    short: "Robotic Process Automation",
    summary:
      "Automation that turns decisions into consistent execution, from repetitive digital workflows to physical robotics connected to your operational systems.",
    capabilities: [
      "Workflow automation across operational systems",
      "Robotics integrated with Digital Twin decisions",
      "Exception handling with human oversight",
      "Execution data fed back into planning",
    ],
  },
  {
    key: "iot",
    title: "IoT Solutions",
    short: "IoT",
    summary:
      "Sensor networks and device integration that give your operation a reliable, continuous stream of data, the foundation every Digital Twin and AI model depends on.",
    capabilities: [
      "Industrial sensor and device integration",
      "Connectivity with ERP, cloud and OT systems",
      "Edge-to-cloud data pipelines",
      "Condition monitoring and alerting",
    ],
  },
];

export const emirates: Region[] = [
  { slug: "abu-dhabi", name: "Abu Dhabi", parent: "uae" },
  { slug: "dubai", name: "Dubai", parent: "uae" },
  { slug: "ras-al-khaimah", name: "Ras Al Khaimah", parent: "uae" },
  { slug: "sharjah", name: "Sharjah", parent: "uae" },
];

export const countries: Region[] = [
  { slug: "uae", name: "UAE" },
  { slug: "bahrain", name: "Bahrain" },
  { slug: "kuwait", name: "Kuwait" },
  { slug: "oman", name: "Oman" },
  { slug: "qatar", name: "Qatar" },
  { slug: "saudi-arabia", name: "Saudi Arabia" },
];

export const regions: Region[] = [...countries, ...emirates];

// Mirrors the regions each service is offered in on the current site.
export const serviceRegions: Record<ServiceKey, string[]> = {
  "digital-twin": regions.map((r) => r.slug),
  "robotic-process-automation": regions.map((r) => r.slug),
  iot: regions.map((r) => r.slug).filter((s) => s !== "saudi-arabia"),
};

export function solutionPath(service: ServiceKey, region: string) {
  return `/solutions/${service}/${region}`;
}

export function getService(key: string) {
  return services.find((s) => s.key === key);
}

export function getRegion(slug: string) {
  return regions.find((r) => r.slug === slug);
}

export const articleSlug =
  "digital-twin-technology-growing-in-dubai-uae-the-future-of-smart-business-operations";

// Old WordPress URLs mapped to the new structure so existing search rankings carry over.
export const legacyRedirects: { source: string; destination: string }[] = [
  ["/digital-twin-technology-solutions-in-uae", "digital-twin", "uae"],
  ["/digital-twin-technology-solutions-in-uae/digital-twin-technology-solutions-in-abu-dhabi", "digital-twin", "abu-dhabi"],
  ["/digital-twin-technology-solutions-in-uae/digital-twin-technology-solutions-in-dubai", "digital-twin", "dubai"],
  ["/digital-twin-technology-solutions-in-uae/digital-twin-technology-solutions-in-ras-al-khaimah", "digital-twin", "ras-al-khaimah"],
  ["/digital-twin-technology-solutions-in-uae/digital-twin-technology-solutions-in-sharjah", "digital-twin", "sharjah"],
  ["/digital-twin-technology-solutions-in-bahrain", "digital-twin", "bahrain"],
  ["/digital-twin-technology-solutions-in-kuwait", "digital-twin", "kuwait"],
  ["/digital-twin-technology-solutions-in-oman", "digital-twin", "oman"],
  ["/digital-twin-technology-solutions-in-qatar", "digital-twin", "qatar"],
  ["/digital-twin-technology-solutions-in-saudi-arabia", "digital-twin", "saudi-arabia"],
  ["/robotic-process-automation-solutions-in-uae", "robotic-process-automation", "uae"],
  ["/robotic-process-automation-solutions-in-uae/robotic-process-automation-solutions-in-abu-dhabi-2", "robotic-process-automation", "abu-dhabi"],
  ["/robotic-process-automation-solutions-in-uae/robotic-process-automation-solutions-in-dubai", "robotic-process-automation", "dubai"],
  ["/robotic-process-automation-solutions-in-uae/robotic-process-automation-solutions-in-ras-al-khaimah-2", "robotic-process-automation", "ras-al-khaimah"],
  ["/robotic-process-automation-solutions-in-uae/robotic-process-automation-solutions-in-sharjah-2", "robotic-process-automation", "sharjah"],
  ["/robotic-process-automation-solutions-in-bahrain", "robotic-process-automation", "bahrain"],
  ["/robotic-process-automation-solutions-in-kuwait", "robotic-process-automation", "kuwait"],
  ["/robotic-process-automation-solutions-in-oman", "robotic-process-automation", "oman"],
  ["/robotic-process-automation-solutions-in-qatar", "robotic-process-automation", "qatar"],
  ["/robotic-process-automation-solutions-in-saudi-arabia", "robotic-process-automation", "saudi-arabia"],
  ["/iot-solutions-in-uae", "iot", "uae"],
  ["/iot-solutions-in-uae/iot-solutions-in-abu-dhabi-2", "iot", "abu-dhabi"],
  ["/iot-solutions-in-uae/iot-solutions-in-dubai-2", "iot", "dubai"],
  ["/iot-solutions-in-uae/iot-solutions-in-ras-al-khaimah", "iot", "ras-al-khaimah"],
  ["/iot-solutions-in-uae/iot-solutions-in-sharjah-2", "iot", "sharjah"],
  ["/iot-solutions-in-bahrain", "iot", "bahrain"],
  ["/iot-solutions-in-kuwait", "iot", "kuwait"],
  ["/iot-solutions-in-oman", "iot", "oman"],
  ["/iot-solutions-in-qatar", "iot", "qatar"],
  ["/iot-solutions-in-qatar-copy", "iot", "qatar"],
].map(([source, service, region]) => ({
  source,
  destination: solutionPath(service as ServiceKey, region),
}));
