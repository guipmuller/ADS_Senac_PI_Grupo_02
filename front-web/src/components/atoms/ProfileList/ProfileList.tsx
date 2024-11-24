import Image from "next/image";
import healthIcon from "../../../assets/images/healthicon.svg";

interface ProfileListProps {
  name: string;
  role: string;
  label: string;
}

const ProfileList: React.FC<ProfileListProps> = ({ name, role, label }) => {
  return (
    <div className="flex justify-between items-center my-4 gap-3">
      <span
        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0"
        style={{ minWidth: "40px", minHeight: "40px" }}
      >
        <Image src={healthIcon} alt="Símbolo da saúde" className="w-6 h-6" />
      </span>
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
