export const glob = (pattern: string, input: string) => {
  //TODO: replace with a better glob pattern tester
  const re = new RegExp(pattern.replace(/([.?+^$[\]\\(){}|/-])/g, '\\$1').replace(/\*/g, '.*'));
  return re.test(input);
};
