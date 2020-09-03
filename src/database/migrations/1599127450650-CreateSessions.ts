import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSessions1599127450650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            
            new Table({
                name: 'sessions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'showtime',
                        type: 'timestamp with time zone'
                    },
                    {
                        name: 'movie_id',
                        type: 'uuid'
                    },
                    {
                        name: 'room_id',
                        type: 'uuid'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })

        );

        await queryRunner.createForeignKey('sessions', new TableForeignKey({
            name: 'SessionMovie',
            columnNames: ['movie_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movies',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))

        await queryRunner.createForeignKey('sessions', new TableForeignKey({
            name: 'SessionRoom',
            columnNames: ['room_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'rooms',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('sessions', 'SessionRoom');

        await queryRunner.dropForeignKey('sessions', 'SessionMovie');

        await queryRunner.dropTable('sessions');
    }

}
