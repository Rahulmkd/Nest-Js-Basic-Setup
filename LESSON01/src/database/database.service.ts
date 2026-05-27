// import { Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// @Injectable()
// export class DatabaseService extends PrismaClient {
//   constructor() {
//     const adapter = new PrismaPg({
//       connectionString: process.env.DATABASE_URL as string,
//     });
//     super({ adapter });
//   }
// }

// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { PrismaNeon } from '@prisma/adapter-neon';

// @Injectable()
// export class DatabaseService extends PrismaClient implements OnModuleInit {
//   constructor() {
//     const adapter = new PrismaNeon({
//       connectionString: process.env.DATABASE_URL!,
//     });

//     super({
//       adapter,
//     });
//   }

//   async onModuleInit() {
//     await this.$connect();
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor() {
    const connectionString = process.env.DATABASE_URL!;

    const adapter = new PrismaNeon({
      connectionString,
    });

    super({
      adapter,
    });
  }
}
