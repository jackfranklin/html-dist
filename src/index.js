import script from './script';
import googleAnalytics from './google-analytics';
import run from './run';

let args = {};

function setUserArgs(newArgs) {
  args = newArgs;
}


export {
  script,
  googleAnalytics,
  run,
  args,
  setUserArgs
}

