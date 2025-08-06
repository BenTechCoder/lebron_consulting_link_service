import logger from 'jet-logger';

import ENV from '@src/common/constants/ENV';
import server from './server';
import { startCache } from './services/database';

/******************************************************************************
                                  Run
******************************************************************************/

const SERVER_START_MSG =
  'Express server started on http://localhost:' + ENV.Port.toString();

server.listen(ENV.Port, () => {
  logger.info(SERVER_START_MSG);
  startCache();
});
