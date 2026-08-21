// $lib/api/types.ts

export type Vet = {
    id: number;
    email: string;
    nome: string;
}

export type VetList = Vet[];

export type VetRequest = {
    nome: string;
    email: string;
    senha: string;
}

export type Dono = {
    id: number;
    nome: string;
    email: string;
    pets: string[];
}

export type DonoList = Dono[];

export type DonoRequest = {
    nome: string;
    cpf: string;
    email: string;
}

export type Pet = {
    id: number;
    petNome: string;
    donoNome: string;
    donoId: number;
    raca: string;
    vacinaList: string[];
}

export type PetList = Pet[];

export type PetRequest = {
    nome: string;
    raca: string;
    donoId: number;
}

export type Vacina = {
    id: number;
    nome: string;
    virus: string;
    metodo: string;
}

export type VacinaList = Vacina[];

export type VacinaRequest = {
    nome: string;
    virus: string;
    metodo: string;
}

export type Registro = {
    id: number;
    petNome: string;
    petId: number;
    vetNome: string;
    vetId: number;
    vacNome: string;
    vacinaId: number;
}

export type RegistroList = Registro[];

export type RegistroRequest = {
    pet_id: number;
    vet_id: number;
    vacina_id: number;
}

export type FieldType = 'text' | 'email' | 'number' | 'tel' | 'password';

export type SelectOption = {
    label: string;
    value: string;
}

export type FieldConfig<T> = {
    key: keyof T & string;
    label: string;
    type?: FieldType;
    placeholder?: string;
    options?: SelectOption[];
}

export type ColumnConfig<T> = {
    key: keyof T & string;
    label: string;
    format?: (value: T[keyof T & string], row: T) => string;
    emptyText?: string;
}
