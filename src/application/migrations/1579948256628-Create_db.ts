import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDb1579948256628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "roleId" integer NOT NULL, "claim" integer NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6f07ce384bab18c6fdda09bac4" ON "permission" ("roleId", "claim") `);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "code" smallint NOT NULL, "name" character varying(50) NOT NULL, "level" smallint NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_ee999bb389d7ac0fd967172c41f" UNIQUE ("code"), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying(200) NOT NULL, "type" integer NOT NULL, "thumbnailId" integer, "videoInfo" text, "musicInfo" text, "imageInfo" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ratio" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "value" character varying(20) NOT NULL, "description" character varying(60) NOT NULL, "type" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9e8320a0161e1eceb5f38e316c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "screen" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "slug" character varying(300), "template" text, "categoryId" integer, "ratioId" integer, "userId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_60a388a40f8a2b1c3268acfb153" UNIQUE ("name"), CONSTRAINT "PK_7d30806a7556636b84d24e75f4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying(300) NOT NULL, "slug" character varying(300) NOT NULL, "description" character varying(2000) NOT NULL, "screens" text, "status" character varying(20), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "roleId" integer NOT NULL, "firstName" character varying(20) NOT NULL, "lastName" character varying(20), "email" character varying(200) NOT NULL, "password" character varying(32) NOT NULL, "avatar" character varying, "gender" smallint, "birthday" date, "phone" character varying(20), "address" character varying(200), "culture" character varying(5), "currency" character varying(3), "accessToken" character varying(64), "keyRandom" character varying(64), "tokenExpire" TIMESTAMP WITH TIME ZONE, "accountExpire" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "template" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "categoryId" integer, "ratioId" integer, "code" integer NOT NULL, "name" character varying(50) NOT NULL, "slug" character varying(300) NOT NULL, "isDrag" boolean NOT NULL, "template" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "value" character varying(20) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_0db866835bf356d896e1892635d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_12d253da1234b92da2b047ed9c0" FOREIGN KEY ("thumbnailId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screen" ADD CONSTRAINT "FK_c901820d73c243cd3d4df3709d3" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screen" ADD CONSTRAINT "FK_1d4e68b58657e8f999a689e1ee1" FOREIGN KEY ("ratioId") REFERENCES "ratio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screen" ADD CONSTRAINT "FK_245de35b79e1d136adee5b1f493" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_5e718539594d02a4c75ddc1ca56" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_e61ab29dcf33afe2d09a1f72e41" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_14c86a4d043dd01d6278ea84176" FOREIGN KEY ("ratioId") REFERENCES "ratio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_14c86a4d043dd01d6278ea84176"`);
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_e61ab29dcf33afe2d09a1f72e41"`);
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_5e718539594d02a4c75ddc1ca56"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`);
        await queryRunner.query(`ALTER TABLE "screen" DROP CONSTRAINT "FK_245de35b79e1d136adee5b1f493"`);
        await queryRunner.query(`ALTER TABLE "screen" DROP CONSTRAINT "FK_1d4e68b58657e8f999a689e1ee1"`);
        await queryRunner.query(`ALTER TABLE "screen" DROP CONSTRAINT "FK_c901820d73c243cd3d4df3709d3"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_12d253da1234b92da2b047ed9c0"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_0db866835bf356d896e1892635d"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "template"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "screen"`);
        await queryRunner.query(`DROP TABLE "ratio"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP INDEX "IDX_6f07ce384bab18c6fdda09bac4"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
