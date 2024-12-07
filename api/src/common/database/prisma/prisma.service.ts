import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient, Prisma } from ".prisma/client";

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'> implements OnModuleInit {

  /**
   *
   */
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });

  }
  async onModuleInit() {

    // this.$on('info', (e) => console.log('info-', e));
    // this.$on('error', (e) => console.log('error-', e));
    // this.$on('warn', (e) => console.log('warn-', e));
    // this.$on('query', (e) => console.log('query-', e));
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
