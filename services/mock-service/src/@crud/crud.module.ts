import { Module } from "@nestjs/common";
import { CRUDController } from "./crud.controller";
import { CRUDService } from "./crud.service";

@Module({
  controllers: [CRUDController],
  providers: [CRUDService],
})
export class CRUDModule {}
