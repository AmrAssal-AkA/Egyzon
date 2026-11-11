import "dotenv/config";
import { startEmailWorker } from "./src/workers/index";
import logger from "./src/utils/logger";

startEmailWorker().catch((err) => {
  logger.error("Error starting email worker:", err);
  process.exit(1);
});