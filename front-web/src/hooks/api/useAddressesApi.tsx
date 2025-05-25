import { useCrudApi } from "../useCrudApi";

export interface Addresses {
  id: number;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export function useAddressesApi() {
  return useCrudApi<Addresses>('addresses');
}