import { config } from 'dotenv';
import { Config } from 'knex';

config({ path: __dirname + '/../.env' });
import Logger from '../utils/logger';

const {
    ENV,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_PORT
} = process.env;

const dbConfig = {
    getKnexInstance(): Config {
        if (ENV === 'test') {
            return this.test;
        }
        return this.development;
    },
    development: {
        client: 'pg',
        connection: {
            host: DB_HOST,
            database: DB_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT
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
        migrations: {
            extension: 'ts',
            directory: 'migrations',
            tableName: 'migrations_history'
        }
    },
    test: {
        client: 'pg',
        connection: {
            host: DB_HOST,
            database: DB_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT
        },
        acquireConnectionTimeout: 3000,
        pool: {
            min: 1,
            max: 1
        }
    }
};

const knexConfig = dbConfig.getKnexInstance();

export default knexConfig;