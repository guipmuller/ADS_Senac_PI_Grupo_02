import useCrudApi from "../useCrudApi";

export default function useAppointmentsApi() {
  return useCrudApi('appointments');
}