import useCrudApi from "../useCrudApi";

export default function useAddressesApi() {
  return useCrudApi('addresses');
}