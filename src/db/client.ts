import { PrismaClient } from "@prisma/client";

class Client {
  public prisma: PrismaClient;
  private static instance: Client;
  private constructor() {
    this.prisma = new PrismaClient();
  }
  public static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }
    return Client.instance;
  }
}

export default Client;
