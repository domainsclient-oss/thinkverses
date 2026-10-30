export const site = {
  name: "Thinkverses Solutions",
  legalName: "Thinkverses Solutions LLC",
  url: "https://thinkverses.com",
  phone: "+971 525263763",
  phoneHref: "tel:+971525263763",
  whatsapp: "https://api.whatsapp.com/send?phone=971525263763",
  email: "info@thinkverses.com",
  headquarters: "Dubai, UAE",
  description:
    "Thinkverses builds decision-intelligence systems and robotics solutions for operationally complex environments.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Digital Twin Solutions", href: "/#digital-twin" },
  { label: "Robotics Solutions", href: "/#robotics" },
  { label: "Our Industries", href: "/#industries" },
  { label: "About Us", href: "/#about" },
  { label: "Articles & Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
];

export const consultationHref = "/?topic=consultation#contact";

// Profile URLs on the current site point to each network's home page.
// Replace with the company's own profile URLs before launch.
export const socials = [
  { name: "X", href: "https://x.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/" },
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "YouTube", href: "https://www.youtube.com/" },
] as const;

export const valueProps = [
  {
    eyebrow: "Start here if you run a plant or utility",
    title: "Digital Twin",
    text: "Higher output and less downtime, from the data your plant already produces.",
  },
  {
    eyebrow: "Start here if you inspect or secure a site",
    title: "Physical AI",
    text: "Robots that inspect the line and patrol the site, and report what they find as it happens.",
  },
];

export const industries = [
  {
    slug: "oil-gas",
    name: "Operational Excellence in Oil & Gas",
    text: "Maximizing Efficiency & Reducing Environmental Footprint.",
    image: "/images/oil-gas.jpg",
    alt: "Refinery towers and processing units under an overcast sky",
  },
  {
    slug: "smart-buildings",
    name: "Smart Facilities & Energy Optimization",
    text: "Ensuring Resilient Operations & Sustainable Energy Use.",
    image: "/images/smart-buildings.jpg",
    alt: "Glass office towers seen from street level",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing Process Optimization",
    text: "Driving Productivity with Sustainable Practices and Optimized Processes.",
    image: "/images/manufacturing.jpg",
    alt: "Engineer working on a laptop beside automated manufacturing equipment",
  },
  {
    slug: "security",
    name: "Smarter Security Operations",
    text: "Enhance facility security, surveillance, and operational monitoring with intelligent robotic solutions that improve safety, efficiency, and response times.",
    image: "/images/data-center.jpg",
    alt: "Server racks with glowing status lights and network cabling",
  },
  {
    slug: "infrastructure",
    name: "Built for Critical Operations",
    text: "Robotics and Digital Twin solutions enhance safety, efficiency, and real-time operations across manufacturing plants, factories, and heavy industrial facilities.",
    image: "/images/infrastructure.jpg",
    alt: "Industrial electrical control cabinet with breakers and wiring",
  },
  {
    slug: "logistics",
    name: "Smarter Supply Chain Operations",
    text: "Robotics and automation streamline storage, sorting, and movement of goods, improving speed, accuracy, and overall warehouse efficiency.",
    image: "/images/logistics.jpg",
    alt: "Large warehouse with shelving and stocked yellow bins",
  },
];

// "How it works" walkthrough on the home page. Pump 3 and the shift are an illustrative example, not a customer case.
export const approach = [
  {
    stage: "The real pump",
    title: "Vibration, temperature, flow and pressure",
    text: "A robot inspection round adds gauge readings and thermal images.",
  },
  {
    stage: "The data comes together",
    title: "SCADA, maintenance records, ERP and robot inspection data",
    text: "Checked, cleaned and kept in one place.",
  },
  {
    stage: "The digital twin",
    title: "Pump 3: live mirror",
    text: "The bearing temperature is rising above this pump’s normal pattern.",
  },
  {
    stage: "The decision",
    title: "“Which pumps need attention this week?”",
    text: "Pump 3. Plan a bearing check for Thursday’s day shift, before it fails. Asked in plain language and answered from the twin.",
  },
];

export const values = [
  "Decisions over Dashboards",
  "Your Data, Your Edge",
  "Focused Depth",
  "Outcome Ownership",
];

export const companyFacts = [
  { label: "Headquarters", value: "Dubai, UAE" },
  { label: "Established", value: "Dubai Mainland LLC, incorporated March 2025" },
  { label: "What we deliver", value: "Digital Twin decision-intelligence systems and Robotics solutions" },
  { label: "How we engage", value: "Multi-year deployment contracts and project-based engagements" },
];

export const capabilities = [
  { key: "monitoring", title: "Real-Time Monitoring", text: "Live state of every asset and process in one view." },
  { key: "maintenance", title: "Predictive Maintenance", text: "Spot wear and anomalies before they become downtime." },
  { key: "optimization", title: "Operational Optimization", text: "Tune throughput, energy and scheduling against goals." },
  { key: "insights", title: "Data-Driven Insights", text: "Patterns surfaced from your own operational history." },
  { key: "simulation", title: "Performance Simulation", text: "Run what-if scenarios with no risk to production." },
  { key: "risk", title: "Risk Reduction", text: "Test changes virtually before they touch the site." },
  { key: "lifecycle", title: "Improved Asset Lifecycle", text: "Plan repair, refurbishment and replacement on evidence." },
  { key: "decisions", title: "Enhanced Decision Making", text: "Options ranked by predicted outcome, ready to act on." },
] as const;

export const processSteps = [
  { title: "Operational Assessment", text: "We map your assets, data sources and the decisions that matter most." },
  { title: "Digital Twin / Robotics Design", text: "We design the model and, where needed, the robotics that will act on it." },
  { title: "Build & Integrate", text: "We connect sensors and systems and build the twin on your data." },
  { title: "Deploy & Evolve", text: "We go live, validate against real outcomes and keep the model learning." },
];

export const differentiators = [
  {
    key: "predict",
    title: "“We only see problems after they happen.”",
    short: "Predict",
    text: "Digital Twin: predictive maintenance",
  },
  {
    key: "unify",
    title: "“Our data sits in SCADA, ERP and spreadsheets.”",
    short: "Unify",
    text: "Digital Twin: one source of truth",
  },
  {
    key: "answers",
    title: "“The data is there, but answers reach us too late.”",
    short: "Answers",
    text: "Digital Twin: dashboards and plain-language answers",
  },
  {
    key: "inspect",
    title: "“Defects still reach customers, and manual checks slip on night shifts.”",
    short: "Inspect",
    text: "Physical AI: visual inspection",
  },
  {
    key: "patrol",
    title: "“The site is too big to watch every corner, especially at night.”",
    short: "Patrol",
    text: "Physical AI: security patrol",
  },
  {
    key: "start",
    title: "“We don’t know where to start.”",
    short: "Start",
    text: "Start with a maturity assessment",
  },
];

export const impact = [
  {
    title: "Operational Excellence in Oil & Gas",
    image: "/images/case-oil-gas.jpg",
    alt: "Technician grinding steel with sparks flying on an industrial site",
    challenge:
      "Remote, high-value equipment where an unplanned stop is expensive and inspections are hard to schedule.",
    approach:
      "A Digital Twin of critical rotating equipment and process units, combining sensor data with maintenance history to forecast failures and rank interventions.",
    measures: ["Unplanned downtime", "Maintenance cost per asset", "Safety exposure"],
  },
  {
    title: "Smart Facilities & Energy Optimization",
    image: "/images/case-facilities.jpg",
    alt: "Aerial view of a solar farm with rows of panels",
    challenge:
      "Buildings and energy assets run on fixed schedules while occupancy, weather and tariffs change by the hour.",
    approach:
      "A facility twin linking HVAC, lighting, metering and occupancy, simulating set-point changes before they are applied.",
    measures: ["Energy use per area", "Comfort compliance", "Peak demand"],
  },
  {
    title: "Manufacturing Process Optimization",
    image: "/images/case-manufacturing.jpg",
    alt: "Close-up of precision machinery with springs, hoses and fittings",
    challenge:
      "Production lines with hidden bottlenecks, variable quality and changeovers that are planned on experience alone.",
    approach:
      "A line-level twin that simulates schedules and changeovers, with robotics executing the chosen plan and feeding results back.",
    measures: ["Throughput", "First-pass yield", "Changeover time"],
  },
];

export const faqs = [
  {
    group: "Digital Twin Technology",
    q: "What is a Digital Twin, and how does Thinkverses use it?",
    a: "A Digital Twin is a real-time virtual replica of a physical asset, process, or system. Thinkverses creates AI-powered Operational Digital Twins that help organizations monitor performance, analyze operations, predict issues, and optimize assets across industries.",
  },
  {
    group: "Industries",
    q: "Which industries can benefit from Thinkverses solutions?",
    a: "Thinkverses solutions are designed for industries such as Manufacturing, Oil & Gas, Energy & Utilities, Smart Buildings, Infrastructure, and Industrial Operations where real-time monitoring, predictive maintenance, and operational efficiency are critical.",
  },
  {
    group: "Operational Efficiency",
    q: "How does Thinkverses improve operational efficiency?",
    a: "Thinkverses integrates IoT sensors, operational systems, historical data, and Generative AI into a unified platform. This enables businesses to gain real-time visibility, automate decision-making, reduce downtime, and improve overall productivity.",
  },
  {
    group: "IoT Integration",
    q: "Can Thinkverses integrate with my existing systems and sensors?",
    a: "Yes. Thinkverses supports seamless integration with IoT devices, industrial sensors, ERP systems, cloud platforms, and other operational technologies, allowing businesses to leverage their existing infrastructure while gaining advanced insights.",
  },
  {
    group: "Business Benefits",
    q: "What are the key benefits of implementing a Digital Twin?",
    a: "Organizations can benefit from predictive maintenance, asset performance optimization, remote monitoring, anomaly detection, improved decision-making, reduced operational costs, and enhanced sustainability initiatives.",
  },
  {
    group: "Implementation",
    q: "Does Thinkverses offer customized Digital Twin solutions?",
    a: "Yes. Thinkverses provides tailored Digital Twin implementations based on each organization’s operational requirements, industry challenges, and business objectives to ensure maximum value and ROI.",
  },
  {
    group: "Validation",
    q: "How do we know it works?",
    a: "Every decision made by the Digital Twin is tested in simulation first, then validated against real-world outcomes through the Robotics layer. Continuous feedback loops between the “brain” and the “body” let us measure accuracy, reliability, and performance at each stage — not just claim it.",
  },
  {
    group: "Validation",
    q: "What success metrics should we target?",
    a: "Success is measured across three levels: decision accuracy (how well the Digital Twin predicts outcomes), execution precision (how accurately Robotics carries out those decisions), and business impact (efficiency gains, cost savings, or performance improvements in the real-world process being modeled).",
  },
  {
    group: "Security",
    q: "How is data security ensured?",
    a: "Data is encrypted at rest and in transit, access is role-based and permissioned, and the Digital Twin operates within isolated environments to prevent unauthorized exposure. Security practices align with industry standards to protect both operational and sensitive data.",
  },
  {
    group: "Business Benefits",
    q: "What value does it bring?",
    a: "Thinkverses reduces risk and cost by letting decisions be simulated and refined before physical action — saving time, avoiding costly errors, and enabling faster, smarter execution in the real world.",
  },
];


export const article = {
  title: "Digital Twin Technology Growing in Dubai & UAE: The Future of Smart Business Operations",
  date: "2026-03-30",
  dateLabel: "March 30, 2026",
  image: "/images/article-dubai.jpg",
  alt: "Glass skyscrapers seen from below against a pale sky",
  excerpt:
    "Dubai and the UAE are fast becoming hubs for smart infrastructure. Here is what Digital Twin technology is, why adoption is accelerating across the region, and how businesses can put it to work.",
  readingTime: "9 min read",
};
