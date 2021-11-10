import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import knexConfig from '../../db';

const knex = Knex(knexConfig);
Model.knex(knex);

export interface CommentI {
    id: number;
    author: string;
    filmId: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

class CommentModel extends Model {
    public id?: number;
    public filmId: number;
    public author: string;
    public comment: string;
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

    public static get jsonSchema(): {} {
        return {
            type: 'object',
            required: ['comment', 'author', 'filmId'],

            properties: {
                id: { type: 'integer' },
                filmId: { type: 'integer' },
                comment: { type: 'string' },
                author: { type: 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        };
    }
}

export default CommentModel;
