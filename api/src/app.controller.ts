import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
// import { AllowAnonymous } from "./common/authorization/allow-anonymous.decorator";
import Logger from "./common/logger/logger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: Logger) {
    logger.setContext(AppController.name);
  }

  @Get()
  // @AllowAnonymous()
  getHello(): string {
    this.logger.log("Hello World");
    this.logger.warn("Hello World");
    this.logger.error("Hello World");
    return this.appService.getHello();
  }

  @Get("test123")
  getTest(): string {
    return "This is a test123 router!";
  }
}
