import axe = require("axe-core");
import { Scan, scans } from "./storage";

axe.run((err, results) => {
  if (err) {
    console.log(err);
    return;
  }

  scans.push(new Scan(results));
});
