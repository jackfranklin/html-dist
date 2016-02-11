import script from './script';
import googleAnalytics from './google-analytics';
import link from './link';
import run from './run';
import h from 'virtual-dom/h';

// called from the CLI to allow custom arguments being passed
let args = {};
function setUserArgs(newArgs) {
  args = newArgs;
}


export {
  script,
  googleAnalytics,
  h,
  link,
  run,
  args,
  setUserArgs,
}

