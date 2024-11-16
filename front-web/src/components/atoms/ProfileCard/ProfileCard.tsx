interface ProfileCardProps {
  name: string;
  experience: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, experience }) => {
  return (
    <div className="w-2/4 h-72 border border-gray-300 rounded-lg bg-white flex flex-col">
      <div className="w-full h-3/4 bg-gray-200 flex flex-1 items-center justify-center">
        Imagem 1
      </div>
      <span className="p-4">
        <p className="text-sm">{name}</p>
        <h2 className="text-xl">{experience}</h2>
      </span>
    </div>
  );
};

export default ProfileCard;
