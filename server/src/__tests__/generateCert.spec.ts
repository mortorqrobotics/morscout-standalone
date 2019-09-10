import generateCert from "../generateCert";
import { pki } from "node-forge";

test("should return a valid certificate", () => {
  const { key, certificate } = generateCert("example.com");
  expect(pki.certificateFromPem(certificate).subject.getField("CN").value).toBe(
    "example.com"
  );
});
