import { Injectable } from "@nestjs/common";
import {
  CreateShopeeProductDto,
  UpdateShopeeProductDto,
  ShopeeProductDto,
} from "./shopee-product.dto";

@Injectable()
export class ShopeeProductService {
  private listData: ShopeeProductDto[] = [];

  findAll() {
    return this.listData;
  }

  findOne(id: number) {
    return this.listData.find((record) => record.itemid === id);
  }

  create(createPetDto: CreateShopeeProductDto) {
    const newRecord = { itemid: -1, ...createPetDto };
    this.listData.push(newRecord);
    return newRecord;
  }

  update(id: number, updatePetDto: UpdateShopeeProductDto) {
    const recordIndex = this.listData.findIndex(
      (record) => record.itemid === id,
    );
    if (recordIndex === -1) return null;

    this.listData[recordIndex] = {
      ...this.listData[recordIndex],
      ...updatePetDto,
    };
    return this.listData[recordIndex];
  }

  remove(id: string) {
    const petIndex = this.listData.findIndex((pet) => pet.id === id);
    if (petIndex !== -1) {
      const [removedPet] = this.listData.splice(petIndex, 1);
      return removedPet;
    }
    return null;
  }
}
