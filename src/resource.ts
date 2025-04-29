import browser from "webextension-polyfill";

/** A reference to data in browser storage. */
export class Resource<T> {
  private key: string;
  private defaultValue!: T;

  /** Creates a new resource. */
  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  /** Reads the value from storage. */
  async get(): Promise<T> {
    return browser.storage.local
      .get(this.makeEntry())
      .then((entry) => this.valueOf(entry));
  }

  /** Updates the value of the resource. */
  async set(newValue: T) {
    await browser.storage.local.set(this.makeEntry(newValue));
  }

  /** Updates the value of the resource by mapping its previous value. */
  async update(f: (oldValue: T) => T) {
    const oldValue = await this.get();
    const newValue = f(oldValue);

    await this.set(newValue);
  }

  /** Adds a listener that is called immediately, and afterwards when the value is changed. */
  async observe(f: (newValue: T) => void) {
    const value = await this.get();

    f(value);

    browser.storage.onChanged.addListener((changes) => {
      const change = changes[this.key];
      const newValue = (change.newValue ??
        change.oldValue ??
        this.defaultValue) as T;

      f(newValue);
    });
  }

  private makeEntry(value?: T): Record<string, unknown> {
    return { [this.key]: value ?? this.defaultValue };
  }

  private valueOf(entry: Record<string, unknown>): T {
    return entry[this.key] as T;
  }
}
