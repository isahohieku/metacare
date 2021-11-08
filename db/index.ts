import { config } from 'dotenv';
config({ path: __dirname + '/../.env' });
import Logger from '../utils/logger';

const _Config = {
    getKnexInstance(): {} {
        // if (process.env.SITE === 'production') {
        //     return this.production;
        // }
        if (process.env.SITE === 'test') {
            return this.test;
        }
        return this.development;
    },
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'migrations'
        },
        acquireConnectionTimeout: 3000,
        pool: {
            min: 1,
            max: 1,
            afterCreate: function (connection: any, callback: any): void {
                Logger('db', 'Connection created', 'info');
                connection.query('SET timezone = "UTC";', function (err: any): any {
                    callback(err, connection);
                });
            }
        },
        seeds: {
            directory: './seeds/dev'
        }
    },
    test: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        },
        acquireConnectionTimeout: 3000,
        pool: {
            min: 1,
            max: 1
        },
        seeds: {
            directory: './seeds/dev'
        }
    }
};

const knexConfig = _Config.getKnexInstance();

export default knexConfig;