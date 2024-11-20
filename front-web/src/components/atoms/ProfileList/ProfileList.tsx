interface ProfileListProps {
  name: string;
  role: string;
  label: string;
}

const ProfileList: React.FC<ProfileListProps> = ({ name, role, label }) => {
  return (
      <div className="flex justify-between my-4">
        <span className="flex flex-col w-4/5">
          <h1 className="text-sm font-medium">{name}</h1>
          <p className="text-xs">{role}</p>
        </span>

        <p className="text-sm text-end">
          <strong>{label}</strong>
        </p>
      </div>
  );
};

export default ProfileList;
