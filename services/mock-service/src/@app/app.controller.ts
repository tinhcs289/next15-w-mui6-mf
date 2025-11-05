import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getStatus() {
    return {
      message: "Mock service is running!",
      timestamp: new Date(),
    };
  }
}
