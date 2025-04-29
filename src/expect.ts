/** Logs an error containing the given reason. */
export default (msg: string): ((reason: any) => void) => {
  return (reason) => console.error(`${msg}: ${JSON.stringify(reason)}`);
};
