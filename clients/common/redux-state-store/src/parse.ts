// import { URL } from "url";
export default (url: string, origin: string = window.location.href) => {
  const orig: URL = new URL(origin);
  if (/^:\d/.test(url)) {
    orig.port = url.split("/")[0].substring(1);
    url = url
      .split("/")
      .slice(1)
      .join("/");
    orig.protocol = "https";
  }
  return new URL(url, orig);
};
