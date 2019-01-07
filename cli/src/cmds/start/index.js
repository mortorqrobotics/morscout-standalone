import { setup as daemonize } from "daemonize2";
import { removeSync as rm } from "fs-extra";
import minimist from "minimist";
import revminimist from "minimist-reverse";

global.daemons = {};

export default args => {
  const secure = args.secure || args.s;
  const redirect = args.redirect || args.r;
  // Huge logic to determine port number
  // eslint-disable-next-line
  const port = args.port ? args.port : args.p ? args.p : ((secure ? 443 : 80) + ((args.dev | args.d | (process.env.dev === 'development' && !args.p && !args.production)) ? 3000 : 0));
  const argv = revminimist(
    Object.assign(minimist(process.argv.slice(2)), {
      secure,
      port,
      redirect
    })
  );
  const daemon = daemonize({
    main: "server.js",
    name: `morscout:${port}`,
    pidfile: `morscout.${port}.pid`,
    argv,
    silent: true
  });
  daemon.on("error", error => {
    // eslint-disable-next-line
    console.log(error.message);
    // eslint-disable-next-line
    rm(daemon._options.pidfile);
    delete global.daemons[port];
  });
  daemon.start();
  global.daemons[port] = daemon;
};
