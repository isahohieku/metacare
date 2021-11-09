import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import knexConfig from '../../db';

const knex = Knex(knexConfig);
Model.knex(knex);

export interface CommentI {
    id: number;
    author: string;
    movie: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

class CommentModel extends Model {
    public id?: string;
    public movie: number;
    public author: string;
    public comment?: string;
    public createdAt?: string;
    public updatedAt?: string;

    public constructor() {
        super();
    }

    // Table name is the only required property.
    public static get tableName(): string {
        return 'comments';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public $beforeInsert(): void {
        this.createdAt = moment().toISOString(true);
    }

    public $beforeUpdate(): void {
        this.updatedAt = moment().toISOString(true);
    }

    // Optional JSON schema. This is not the database schema!
    // No tables or columns are generated based on this. This is only
    // used for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    // See http://json-schema.org/ for more info.

    /** An example of the Objection jsonSchema */
    public static get jsonSchema(): {} {
        return {
            type: 'object',
            required: ['comment'],

            properties: {
                id: {type: 'integer'},
                comment: { type: 'string'},
                createdAt: {type: 'string'},
                updatedAt: {type: 'string'}
            }
        };
    }
}

export default CommentModel;
