import { IoWarning } from "react-icons/io5";
interface LocationNotProvidedProps {
  error: string;
}
const LocationNotProvided = ({ error }: LocationNotProvidedProps) => {
  return (
    <div className="absolute inset-1/2 -translate-1/2 sm:min-w-[500px] min-w-[250px] flex items-center justify-center flex-col gap-4 bg-muted border-2 border-primary h-60 mx-auto p-5 rounded-md text-center">
      <IoWarning size={100} className="text-primary" />
      <p className="text-base sm:text-2xl font-bold "> {error}</p>
      <button
        onClick={() => location.reload()}
        className="p-2 bg-muted border-primary border hover:bg-primary active:bg-primary transition rounded-md cursor-pointer text-lg sm:text-xl"
      >
        اعاده التحميل
      </button>
    </div>
  );
};

export default LocationNotProvided;
