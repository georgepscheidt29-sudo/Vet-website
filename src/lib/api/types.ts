export type Vet = {
    email: string;
    nome: string;
}

export type VetList = Vet[];

export type Dono = {
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