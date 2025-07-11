type Props = {
  value: number;
  label: string;
};

export default function TimerDisplay({ value, label }: Props) {
  return (
    <div className="w-1/3 flex flex-col items-center gap-4 lg:gap-6">
      <div className="w-full h-20 flex justify-center items-center bg-[#E9E9E9] text-app-gray-dark rounded-lg">
        <span className="text-3xl font-semibold">{value}</span>
      </div>
      <p className="text-app-gray-standard text-lg">{label}</p>
    </div>
  );
}
