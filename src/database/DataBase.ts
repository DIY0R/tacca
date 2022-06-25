export interface PostgresqlConfigInterface {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

class PostgresqlConfigDeploy {
  private readonly type = 'postgres';
  private readonly host = process.env.HOST;
  private readonly port = process.env.PORT_HOST;
  private readonly username = process.env.USER;
  private readonly password = process.env.PASSWORD;
  private readonly database = process.env.DATABASE;
  private readonly synchronize = true;
  private readonly logging = true;
  get getConfig() {
    return this;
  }
}

class Database {
  constructor(private readonly database: PostgresqlConfigDeploy) {}
  public get getDataBaseConfig(): object {
    return this.database.getConfig;
  }
}
export const DatabaseConfig = new Database(new PostgresqlConfigDeploy());
