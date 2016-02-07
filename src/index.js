import script from './script';
import googleAnalytics from './google-analytics';
import run from './run';

export {
  script,
  googleAnalytics,
  run
}

export default function({ config, input }) {
  return run(config, input);
};
