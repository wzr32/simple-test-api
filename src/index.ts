import express, { Request, Response, Application } from 'express';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';

import router from './router';
import './database';

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.use('/', (
  req: Request,
  res: Response
) => res.send('API WORKING'));
app.use('/api', router);

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), () => {
  console.log(colors.green(`Server on port ${app.get('port')}`));
});
