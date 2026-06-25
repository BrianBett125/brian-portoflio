export const engineeringNotes = [
  {
    title: "Model the workflow before the screen",
    explanation:
      "The Learning Log and SkillUp projects both start from durable concepts: topics, entries, progression, and review. Once the workflow is honest, the interface has something stable to represent.",
  },
  {
    title: "Use database weight intentionally",
    explanation:
      "SQLite is enough for a local learning record, while PostgreSQL fits a platform that needs stronger querying and relational durability. The database should match the operational pressure.",
  },
  {
    title: "Real-time is a product constraint",
    explanation:
      "The polling project treats feedback speed as part of the product, not a visual flourish. That makes the backend choice and state boundaries more important than the animation around the result.",
  },
  {
    title: "Automation has to survive its environment",
    explanation:
      "Python scripts become more useful when their runtime is repeatable. Docker matters when the automation should behave the same way tomorrow as it did today.",
  },
];

export const hardProblem = {
  title: "Keeping construction inventory visible after materials leave the spreadsheet",
  project: "Nail It",
  problem:
    "Construction materials become hard to reason about once they move through active site operations. The issue is not only recording stock; it is keeping the workflow simple enough that people can actually use it while work is moving.",
  difficulty:
    "Inventory systems fail when they demand perfect input from imperfect environments. On an active site, the interface has to support quick updates, clear state, and low ambiguity without hiding the cost of missing information.",
  commonMistakes: [
    "Designing around an ideal office workflow instead of the way materials move on site.",
    "Adding too many states before the core inventory actions are understandable.",
    "Optimizing the interface before defining what must be tracked and why.",
  ],
  approach:
    "I kept Nail It browser-based and focused the UI around the inventory workflow itself. The technical choice was intentionally simple: HTML, CSS, and JavaScript were enough to make the operational surface clear without introducing framework weight before the domain model justified it.",
  outcome:
    "The result is a focused operations tool that improves visibility into construction materials and makes the tracking problem easier to reason about before losses compound.",
};

export const currentLearning = [
  "Systems design",
  "Backend scalability",
  "Networking concepts",
  "Artificial intelligence",
  "Mobile development",
];
