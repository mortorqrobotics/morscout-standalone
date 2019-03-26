/* eslint-disable */
import { vol } from "memfs";
import { patchRequire, patchFs } from "fs-monkey";
if (standaloneFs !== undefined) {
  const v = vol.fromJSON(standaloneFs);
  patchFs(v);
  patchRequire(v);
}

import "..";
