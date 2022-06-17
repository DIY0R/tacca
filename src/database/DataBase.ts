export interface PostgresqlConfigInterface {
  type: string
  host: string
  port: number
  username: string
  password: string
  database: string
  synchronize: boolean
  logging: boolean
}
class PostgresqlConfig {
  private readonly type = 'postgres'
  private readonly host = 'localhost'
  private readonly port = 5432
  private readonly username = 'postgres'
  private readonly password = '********'
  private readonly database = 'tacca'
  private readonly synchronize = true
  private readonly logging = true
  get getConfig() {
    return this
  }
}

class Database {
  constructor(private readonly database: PostgresqlConfig) {}
  public get getDataBaseConfig(): object {
    return this.database.getConfig
  }
}
export const DatabaseConfig = new Database(new PostgresqlConfig())
