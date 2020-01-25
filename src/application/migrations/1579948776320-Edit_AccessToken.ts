import {MigrationInterface, QueryRunner} from "typeorm";

export class EditAccessToken1579948776320 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accessToken"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "accessToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accessToken"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "accessToken" character varying(64)`);
    }

}
