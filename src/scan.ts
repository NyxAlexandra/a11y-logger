import axe, { Result as AxeResult, AxeResults } from "axe-core";

/** The results of a scan of a website. */
export class Scan {
  /** The URL of the scanned page. */
  url: string;
  /** When the scan was taken. */
  timestamp: string;
  /** Scanned violations. */
  violations: Result[] = [];
  /** Incomplete results. */
  incomplete: Result[] = [];

  /** Creates a new scan from its `axe-core` counterpart. */
  constructor(raw: AxeResults) {
    this.url = raw.url;
    this.timestamp = raw.timestamp;

    const makeResults = (results: AxeResult[]) =>
      results.map((inner) => new Result(inner));

    this.violations = makeResults(raw.violations);
    this.incomplete = makeResults(raw.incomplete);
  }
}

/** A possible violation. */
export class Result {
  /** A description of the violation. */
  description: string;
  /** The impact of a violation. */
  impact: Impact;
  /** Help for resolving the violation. */
  help?: string;
  /** URL for help. */
  helpUrl?: string;

  /** Creates a result from its `axe-core` counterpart. */
  constructor(raw: AxeResult) {
    const { description, help, helpUrl } = raw;

    this.description = description;
    // `raw.impact` is `(string | null) | null`
    this.impact = raw.impact! ?? "unknown" ?? "unknown";
    this.help = help;
    this.helpUrl = helpUrl;
  }
}

/** The impact of a possible violation. */
export type Impact = "minor" | "moderate" | "serious" | "critical" | "unknown";
