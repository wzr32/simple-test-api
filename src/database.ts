import mongoose from "mongoose";
import colors from 'colors';
import { DB_HOST } from './shared/enviroment';

(async () => {
  try {
    mongoose.connect(DB_HOST || 'mongodb://localhost/apiusers');
    console.log(colors.green('Database connected!'));
  } catch (err) {
    console.log(colors.bgRed('ERROR ON DATABASE CONNECTION'), err);
  }
})();
