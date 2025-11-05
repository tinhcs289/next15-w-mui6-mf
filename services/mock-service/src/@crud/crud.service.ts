import { Injectable } from "@nestjs/common";
import { CreateDto, UpdateDto, DataRowDto, FindAllDto, DataPerPage } from "./crud.dto";

@Injectable()
export class CRUDService {
  private records: DataRowDto[] = [];

  findAll(_dto: FindAllDto): DataPerPage {
    return {
      total: this.records.length,
      items: this.records,
    };
  };

  findOne(id: string): DataRowDto | null | undefined {
    return this.records.find((record) => record.id === id);
  };

  create(dto: CreateDto): DataRowDto {
    const newRecord = { id: Date.now().toString(), ...dto };
    return newRecord;
  };

  update(id: string, dto: UpdateDto): DataRowDto | null {
    const recordIndex = this.records.findIndex((record) => record.id === id);
    if (recordIndex !== -1) {
      this.records[recordIndex] = { ...this.records[recordIndex], ...dto };
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
