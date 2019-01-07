import { dirname, join, extname } from "path";
import { existsSync as exists, readdirSync as readDir } from "fs-extra";
import { setup as daemonize } from "daemonize2";
import minimist from "minimist";
import revminimist from "minimist-reverse";

global.daemons = global.daemons ? global.daemons : {};

export default args => {
  const all = args.all || args.a;
  const dir = dirname(__filename);
  const secure = args.secure || args.s;
  // eslint-disable-next-line
  let port = args.port ? args.port : args.p ? args.p : ((secure ? 443 : 80) + ((args.dev | args.d | (process.env.dev === 'development' && !args.p && !args.production)) ? 3000 : 0));
  let argv = revminimist(
    Object.assign(minimist(process.argv.slice(2)), {
      secure,
      port
    })
  );
  if (!all && global.daemons[port]) {
    global.daemons[port].kill();
    delete global.daemons[port];
  } else if (!all && exists(join(dir, `morscout.${port}.pid`))) {
    const d = daemonize({
      main: "server.js",
      name: `morscout:${port}`,
      pidfile: `morscout.${port}.pid`,
      argv,
      silent: true
    });
    d.start(() => d.kill());
  } else {
    // eslint-disable-next-line
    console.log('killing all deamons');
    Object.values(global.daemons, d => d.kill());
    global.daemons = {};
    readDir(dir).forEach(f => {
      if (extname(f) === ".pid") {
        let func = f.split(".");
        func = f[f.length - 2];
        port = func;
        argv = revminimist(
          Object.assign(minimist(process.argv.slice(2)), {
            secure,
            port
          })
        );
        const d = daemonize({
          main: "server.js",
          name: `morscout:${port}`,
          pidfile: `morscout.${port}.pid`,
          argv,
          silent: true
        });
        d.start(() => d.kill());
      }
    });
  }
};
