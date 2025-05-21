import { Injectable } from "@nestjs/common";
import { CreateDto, UpdateDto, DataRowDto } from "./crud.dto";

@Injectable()
export class CRUDService {
  private records: DataRowDto[] = [];

  findAll(): DataRowDto[] {
    return this.records;
  };

  findOne(id: string): DataRowDto | null | undefined {
    return this.records.find((record) => record.id === id);
  };

  create(createDto: CreateDto): DataRowDto {
    const newRecord = { id: Date.now().toString(), ...createDto };
    return newRecord;
  };

  update(id: string, updateDto: UpdateDto): DataRowDto | null {
    const recordIndex = this.records.findIndex((record) => record.id === id);
    if (recordIndex !== -1) {
      this.records[recordIndex] = { ...this.records[recordIndex], ...updateDto };
      return this.records[recordIndex];
    }
    return null;
  };

  remove(id: string): DataRowDto | null {
    const recordIndex = this.records.findIndex((record) => record.id === id);
    if (recordIndex !== -1) {
      const [removedRecord] = this.records.splice(recordIndex, 1);
      return removedRecord;
    }
    return null;
  };
};
