/** Downloads text. */
export default (fileName: string, data: any) => {
  const content =
    "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  const link = document.createElement("a");

  link.download = fileName;
  link.href = content;

  link.click();
  link.remove();
};
