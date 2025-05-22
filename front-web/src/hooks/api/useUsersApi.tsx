import api from '../../services/api';
import useCrudApi from '../useCrudApi';

export default function useUsersApi() {
  const crud = useCrudApi('users');

  const getByFirebaseToken = () => api.get('/users/firebase');

  return { ...crud, getByFirebaseToken };
}