import { CacheModule, Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
