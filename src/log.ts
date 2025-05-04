import {
  Result as AxeResult,
  AxeResults,
  NodeResult as AxeNodeResult,
  ImpactValue,
} from "axe-core";

/** A log of scans. */
export class Log {
  /** The version of the log file. */
  private version: Version;
  /** Collected scans. */
  private scans: Scan[];

  constructor(scans: Scan[]) {
    this.version = 2;
    this.scans = scans;
  }
}

/** The version of the log file. */
type Version = 2;

/** The results of a scan of a website. */
export class Scan {
  /** The URL of the scanned page. */
  url: string;
  /** When the scan was taken. */
  timestamp: string;
  /** The browser's user agent. */
  userAgent: string;
  /** Scanned violations. */
  violations: Result[] = [];
  /** Incomplete results. */
  incomplete: Result[] = [];

  /** Creates a new scan from its `axe-core` counterpart. */
  constructor(raw: AxeResults) {
    this.url = raw.url;
    this.timestamp = raw.timestamp;
    this.userAgent = raw.testEnvironment.userAgent;

    const makeResults = (results: AxeResult[]) =>
      results.map((inner) => new Result(inner));

    this.violations = makeResults(raw.violations);
    this.incomplete = makeResults(raw.incomplete);
  }
}

/** A possible violation. */
export class Result {
  /** A unique identifer for the rule. */
  id: string;
  /** The impact of a violation. */
  impact?: ImpactValue;
  /** Info about the result. */
  help?: string;
  /** URL for help. */
  helpUrl?: string;
  /** Tags for the tested rule. */
  tags: string[];
  /** Results for each node. */
  nodes: NodeResult[];

  /** Creates a result from its `axe-core` counterpart. */
  constructor(raw: AxeResult) {
    this.id = raw.id;
    this.impact = raw.impact;
    this.help = raw.help;
    this.helpUrl = raw.helpUrl;
    this.tags = raw.tags;
    this.nodes = raw.nodes.map((raw) => new NodeResult(raw));
  }
}

/** A result for a particular node. */
export class NodeResult {
  /** The node's HTML. */
  html?: string;
  /** Descriptions of how the node failed/could be fixed. */
  info?: string;

  constructor(raw: AxeNodeResult) {
    this.html = raw.html;
    this.info = raw.failureSummary;
  }
}
