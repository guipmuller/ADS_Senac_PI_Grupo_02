export interface AddressRequest {
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}