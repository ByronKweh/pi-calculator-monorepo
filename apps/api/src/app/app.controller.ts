import { Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";

import { AppService, PiValueWithSunCircumference } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): Promise<PiValueWithSunCircumference> {
    return this.appService.getData();
  }

  // @Post("increment-pi-value")
  // incrementPiValue(): Promise<void> {
  //   return this.appService.increment();
  // }

  @Post("test-increment")
  testIncrement() {
    return this.appService.calculatePi();
  }
}
