import script from './script';
import googleAnalytics from './google-analytics';
import link from './link';
import run from './run';

// called from the CLI to allow custom arguments being passed
let args = {};
function setUserArgs(newArgs) {
  args = newArgs;
}


export {
  script,
  googleAnalytics,
  link,
  run,
  args,
  setUserArgs
}

