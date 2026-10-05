"use client";

import { useEffect, useState } from "react";

export default function SystemStatus() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const formatTimestamp = () =>
      new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date());

    const updateTimestamp = () => {
      setTimestamp(formatTimestamp());
    };

    updateTimestamp();
    const interval = window.setInterval(updateTimestamp, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-3 rounded-2xl border border-ui-border/10 bg-ui-surface/[0.05] p-4 text-sm backdrop-blur-xl sm:grid-cols-2">
      <div className="flex items-center gap-2 text-foreground">
        <span className="relative flex h-3 w-3" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-50" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-status-success" />
        </span>
        <span className="font-bold">System Status:</span>
        <span className="text-status-success">Online</span>
      </div>
      <div className="text-foreground-secondary sm:text-right">
        <span className="font-bold text-foreground">Last Updated:</span>{" "}
        {timestamp || "Loading..."}
      </div>
    </div>
  );
}
