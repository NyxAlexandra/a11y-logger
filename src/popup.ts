import download from "./download";
import { Log, Scan } from "./log";
import { Resource } from "./resource";
import expect from "./expect";
import IconButton from "./icon-button";

import PLAY from "@material-design-icons/svg/round/play_arrow.svg?url";
import PAUSE from "@material-design-icons/svg/round/pause.svg?url";
import DOWNLOAD from "@material-design-icons/svg/round/download_for_offline.svg?url";
import DOWNLOADING from "@material-design-icons/svg/round/downloading.svg?url";
import DELETE from "@material-design-icons/svg/round/delete.svg?url";

const FILE_NAME = "a11y-log.json";

const scans = new Resource<Scan[]>("scans", []);
const isLogging = new Resource("isLogging", false);

// UI

const popup = document.createElement("div");

const heading = document.createElement("h1");
const toolbar = document.createElement("div");

const toggleLogging = new IconButton();

const spacer = document.createElement("div");

const downloadLogs = new IconButton();
const clearLogs = new IconButton();

document.body.append(popup);

popup.append(heading, toolbar);
toolbar.append(
  toggleLogging.button,
  spacer,
  downloadLogs.button,
  clearLogs.button,
);

popup.id = "popup";

heading.innerText = "A11y Logger";
toolbar.id = "toolbar";

// Triggers once when called
isLogging.observe((isLogging) => {
  const src = isLogging ? PAUSE : PLAY;

  toggleLogging.icon.src = src;
});
toggleLogging.button.onclick = () => {
  isLogging.update((x) => !x).catch(expect("failed to change `isLogging`"));
};

spacer.className = "spacer";

downloadLogs.icon.src = DOWNLOAD;
downloadLogs.button.onclick = () => {
  downloadLogs.icon.src = DOWNLOADING;

  scans
    .get()
    .then((scans) => {
      const log = new Log(scans);

      download(FILE_NAME, log);
    })
    .catch(expect("failed to retreive `scans` to download"))
    .finally(() => (downloadLogs.icon.src = DOWNLOAD));
};

clearLogs.icon.src = DELETE;
clearLogs.button.onclick = () => {
  scans.set([]).catch(expect("failed to clear `scans`"));
};
