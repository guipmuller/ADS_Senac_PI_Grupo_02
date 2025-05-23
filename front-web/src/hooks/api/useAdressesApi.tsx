import { useCrudApi } from "../useCrudApi";

export interface Address {
  id?: number | null; // somente é preechido em operações GET. POST e PUT passar nulos
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export function useAddressesApi() {
  return useCrudApi<Address>('addresses');
}