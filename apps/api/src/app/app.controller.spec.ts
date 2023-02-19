import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppModule } from "./app.module";
import { request } from "http";
import {
  CacheModule,
  CACHE_MANAGER,
  INestApplication,
  Module,
} from "@nestjs/common";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let controller: AppController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    controller = moduleRef.get<AppController>(AppController);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe("/data (GET)", () => {
    // TODO Add cases of different cache states
    it("should return the PiValueWithSunCircumference object", async () => {
      const result = await controller.getData();
      expect(result).toBeDefined();
      expect(result.pi_value).toBeDefined();
      expect(result.circumference).toBeDefined();
    });
  });
});
