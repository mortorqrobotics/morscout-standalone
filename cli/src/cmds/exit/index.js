export default args => {
  // eslint-disable-next-line
  process.exit(args.code | args.c ? args.code : (args.error | args.e ? 1 : 0));
};
