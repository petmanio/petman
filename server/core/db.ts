import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';
import config from '../config/index';
import { logger } from '../services/util/util.service';
import { User } from '../models/User';

config.sequelizeConfig.modelPaths = [join(__dirname, '../models')];
const sequelize =  new Sequelize(config.sequelizeConfig);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
    return sequelize.sync(config.syncOptions);
  })
  .then(() => {
    logger.info('Db sync completed');
    // let owner;
    // User.findById(1)
    //   .then(u => {
    //     owner = u;
    //     const c = new User({});
    //     return c.save();
    //   })
    //   .then(child => {
    //     owner.$add('businessUsers', child);
    //     owner.save();
    //   });
  })
  .catch(err => {
    logger.error('Unable to connect to the database or sync error', err);
  });

export { sequelize };
