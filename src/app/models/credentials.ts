/**
 * Class to hold the constants related to JSONNetworkService
 */
export class Credentials {
  private username: string;
  private password: string;
  constructor(userName: string, password: string) {
    this.username = userName;
    this.password = password;
  }

  /**
   * Returns the user name.
   */
  public getUserName(): string {
    return this.username;
  }

  /**
   * Returns the password.
   */
  public getPassword(): string {
    return this.password;
  }
}
