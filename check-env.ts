import { config } from 'dotenv';
import * as cowsay from 'cowsay';

config();

const checkVariables = (variables): void => {
    const missing = [];

    variables.forEach((variable): void => {
        if (process.env[variable] === undefined) {
            missing.push(variable);
        }
    });

    if (missing.length) {
        if (missing.length === 1) {
            throw new Error(`Missing environment variable ${missing[0]}`);
        }
        throw new Error(`Missing environment variables ${missing.join(', ')}`);
    }
};

try {
    checkVariables(process.argv.slice(2));
} catch (err) {
    console.error(cowsay.say({
        text: err.message
    }));

    process.exit(1);
}
