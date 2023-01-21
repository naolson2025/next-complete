// need to use the old school module.exports
// 2 popular use cases for next.config.js
// can add redirects here
// and env variables

// 4 PHASES OF NEXT.JS
// 1. PHASE_DEVELOPMENT_SERVER (when you run next dev)
// 2. PHASE_EXPORT (when you run next export)
// 3. PHASE_PRODUCTION_BUILD (when you run next build)
// 4. PHASE_PRODUCTION_SERVER (when you run next start)
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

// this is a function that returns an object
// will receive a phase argument
module.exports = (phase) => {
  // check if we are in the development phase
  // if we are, return an object with the env variables
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: process.env.MONGODB_USERNAME,
        mongodb_password: process.env.MONGODB_PASSWORD,
        mongodb_clustername: process.env.MONGODB_CLUSTERNAME,
        mongodb_database: process.env.MONGODB_DATABASE,
      },
    };
  }

  // ** could add more if checks with other phases
  // so each phase can have different env variables

  return {
    env: {
      mongodb_username: process.env.MONGODB_USERNAME,
      mongodb_password: process.env.MONGODB_PASSWORD,
      mongodb_clustername: process.env.MONGODB_CLUSTERNAME,
      mongodb_database: process.env.MONGODB_DATABASE,
    },
  };
};
