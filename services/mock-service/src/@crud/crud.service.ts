import { Injectable } from "@nestjs/common";
import { CreateDto, UpdateDto, DataRowDto,  } from "./crud.dto";
import { FindAllDto, DataPerPage } from "@/@common-dto/pagination-query.dto";

@Injectable()
export class CRUDService {
  private records: DataRowDto[] = [];

  async findAll(_dto: FindAllDto): Promise<DataPerPage<DataRowDto>> {
    return {
      total: this.records.length,
      items: this.records,
    };
  };

  async findOne(id: string): Promise<DataRowDto | null | undefined> {
    return this.records.find((record) => record.id === id);
  };

  async create(dto: CreateDto): Promise<DataRowDto> {
    const newRecord = { id: Date.now().toString(), ...dto };
    return newRecord;
  };

  async update(id: string, dto: UpdateDto): Promise<DataRowDto | null> {
    const recordIndex = this.records.findIndex((record) => record.id === id);
    if (recordIndex !== -1) {
      this.records[recordIndex] = { ...this.records[recordIndex], ...dto };
      return this.records[recordIndex];
    }
    return null;
  };

  async remove(id: string): Promise<DataRowDto | null> {
    const recordIndex = this.records.findIndex((record) => record.id === id);
    if (recordIndex !== -1) {
      const [removedRecord] = this.records.splice(recordIndex, 1);
      return removedRecord;
    }
    return null;
  };
};
