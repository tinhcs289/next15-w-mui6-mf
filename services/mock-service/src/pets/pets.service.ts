import { Injectable } from "@nestjs/common";
import { CreatePetDto, UpdatePetDto, PetDto } from "./pets.dto";

@Injectable()
export class PetsService {
  private pets: PetDto[] = []; // Mock dữ liệu pets (sẽ thay bằng DB sau)

  // Lấy tất cả pets
  findAll() {
    return this.pets;
  }

  // Lấy pet theo ID
  findOne(id: string) {
    return this.pets.find((pet) => pet.id === id);
  }

  // Thêm mới pet
  create(createPetDto: CreatePetDto) {
    const newPet = { id: Date.now().toString(), ...createPetDto };
    this.pets.push(newPet);
    return newPet;
  }

  // Cập nhật pet
  update(id: string, updatePetDto: UpdatePetDto) {
    const petIndex = this.pets.findIndex((pet) => pet.id === id);
    if (petIndex !== -1) {
      this.pets[petIndex] = { ...this.pets[petIndex], ...updatePetDto };
      return this.pets[petIndex];
    }
    return null;
  }

  // Xóa pet
  remove(id: string) {
    const petIndex = this.pets.findIndex((pet) => pet.id === id);
    if (petIndex !== -1) {
      const [removedPet] = this.pets.splice(petIndex, 1);
      return removedPet;
    }
    return null;
  }
}
