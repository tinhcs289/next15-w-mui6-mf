export type DataRowDto = {
  id?: string;
  name: string;
  species: string;
  age: number;
};

export type CreateDto = Omit<DataRowDto, "id">;
export type UpdateDto = Partial<DataRowDto>;
