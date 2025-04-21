import { scans } from "./storage";

const downloadButton = document.getElementById("download");
const clearButton = document.getElementById("clear");

function setDownloadEnabled(enabled: boolean) {
  if (enabled) downloadButton.removeAttribute("disabled");
  else downloadButton.setAttribute("disabled", "");
}

scans.get().then((scans) => {
  downloadButton.onclick = () => {
    const content = new Blob([JSON.stringify(scans)], { type: "text/plain" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(content);

    downloadButton.setAttribute("href", url);

    link.download = "a11y-log.json";
    link.href = url;

    link.click();
    URL.revokeObjectURL(url);

    downloadButton.removeAttribute("href");
  };
});

clearButton.onclick = () => {
  setDownloadEnabled(false);

  scans.clear().finally(() => setDownloadEnabled(true));
};
