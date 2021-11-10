import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('comments', function(table): void {
        table.increments('id').primary();
        table.string('comment').notNullable();
        table.string('filmId').notNullable();
        table.string('author').notNullable();
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('comments');
}

