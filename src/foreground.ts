import axe from "axe-core";
import { Scan } from "./scan";
import { Resource } from "./resource";
import expect from "./expect";

const scans = new Resource<Scan[]>("scans", []);
const isLogging = new Resource("isLogging", false);

// TODO: Improve performance on complex pages
isLogging.get().then((isLogging) => {
  if (isLogging) {
    axe.configure({ noHtml: true });

    return axe
      .run({
        frameWaitTime: 100,
        pingWaitTime: 100,
      })
      .then((results) => {
        scans
          .update((scans) => scans.concat(new Scan(results)))
          .catch(expect("failed to write to `scans`"));
      })
      .catch(expect("error running `axe`"));
  }
});
