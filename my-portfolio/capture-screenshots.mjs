import { accessSync, constants, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

const browserCandidates = [
  process.env.CHROME_BIN,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter((candidate) => typeof candidate === "string" && candidate.length > 0);

const browser = browserCandidates.find((candidate) => {
  try {
    accessSync(candidate, constants.X_OK);
    return true;
  } catch {
    return false;
  }
});

if (!browser) {
  throw new Error("Chrome or Chromium was not found. Set CHROME_BIN to its executable path.");
}

const baseUrl = process.env.PORTFOLIO_SCREENSHOT_URL ?? "http://localhost:3000";
const outputDirectory = resolve(process.env.PORTFOLIO_SCREENSHOT_DIR ?? "public/screenshots");
mkdirSync(outputDirectory, { recursive: true });

const captures = [
  { name: "portfolio-desktop.png", width: 1440, height: 1100 },
  { name: "portfolio-mobile.png", width: 390, height: 950 },
];

for (const capture of captures) {
  const screenshotPath = resolve(outputDirectory, capture.name);
  await new Promise((resolveCapture, rejectCapture) => {
    const child = spawn(
      browser,
      [
        "--headless=new",
        ...(process.env.PORTFOLIO_SCREENSHOT_THEME === "light" ? [] : ["--force-dark-mode"]),
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        `--window-size=${capture.width},${capture.height}`,
        "--virtual-time-budget=5000",
        `--screenshot=${screenshotPath}`,
        baseUrl,
      ],
      { stdio: "ignore" },
    );

    child.once("error", rejectCapture);
    child.once("close", (code) => {
      if (code === 0) {
        console.log(`Captured ${screenshotPath}`);
        resolveCapture();
      } else {
        rejectCapture(new Error(`Chrome exited with status ${code} while capturing ${capture.name}`));
      }
    });
  });
}
