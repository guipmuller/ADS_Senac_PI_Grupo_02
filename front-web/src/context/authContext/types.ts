import { User } from 'firebase/auth';

export type AuthContextProps = {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};
