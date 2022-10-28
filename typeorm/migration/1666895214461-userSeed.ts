import { MigrationInterface, QueryRunner } from "typeorm"

export class userSeed1666895214461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO users (name, email, password) VALUES ('Alexsander da Silva', 'alexsander@gmail.com', '123456')`,
          );
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM users WHERE email = 'alexsander@gmail.com'`,
          );
      
    }

}
