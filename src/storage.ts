import * as browser from "webextension-polyfill";
import { Result as AxeResult, AxeResults } from "axe-core";

/** The results of a scan of a website. */
export class Scan {
  /** The URL of the scanned page. */
  url: string;
  /** Scanned violations. */
  violations: Result[] = [];
  /** Incomplete results. */
  incomplete: Result[] = [];
  /** Inapplicable results. */
  inapplicable: Result[] = [];

  /** Creates a new scan from its `axe-core` counterpart. */
  constructor(raw: AxeResults) {
    this.url = raw.url;

    const makeResults = (results: AxeResult[]) =>
      results.map((inner) => new Result(inner));

    this.violations = makeResults(raw.violations);
    this.incomplete = makeResults(raw.incomplete);
    this.inapplicable = makeResults(raw.inapplicable);
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

/** Storage for scans. */
export namespace scans {
  /**
   * Returns the stored scans.
   */
  export async function get(): Promise<Scan[]> {
    const storage = await browser.storage.local.get({ scans: [] });

    return storage["scans"] as Scan[];
  }

  /**
   * Appends the violations to browser storage asynchronously.
   */
  export async function push(scan: Scan): Promise<void> {
    const scans = await get();

    scans.push(scan);

    return await browser.storage.local.set({ scans: scans });
  }

  /**
   * Removes all scans from the list asynchronously.
   */
  export async function clear(): Promise<void> {
    return browser.storage.local.set({ scans: [] });
  }
}
