import useCrudApi from "../useCrudApi";

export default function usePatientsApi() {
  return useCrudApi('patients');
}