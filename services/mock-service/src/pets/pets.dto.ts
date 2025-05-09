export type PetDto = {
  id?: string;
  name: string;
  species: string;
  age: number;
};

export type CreatePetDto = Omit<PetDto, 'id'>;
export type UpdatePetDto = Partial<PetDto>;