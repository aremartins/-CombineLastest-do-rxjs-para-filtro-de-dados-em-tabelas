export interface Investidores {
  id: number;
  nome: string;
  aum: number;
  profile: Profile;
  endereco: Endereco;
  contatos: Contatos;
}

export interface Profile {
  id: number;
  nivel: string;
}

export interface Endereco {
  estado: string;
  country: string;
}

export interface Contatos {
  id: number;
  name: string;
}
