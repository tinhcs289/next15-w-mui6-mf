import { PetsModule } from '@/pets/pets.module';
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [PetsModule],
  controllers: [AppController],
})
export class AppModule {}
