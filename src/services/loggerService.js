import Raven from "raven-js";

function init() {
  Raven.config("https://6f1c9f7e58ce4f008098b7b264f5596d@sentry.io/1386212", {
    environment: "development-test",
    release: "1.0.0"
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
    init,
    log
};