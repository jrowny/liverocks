import useRockStore from "../../store/RockStore";

export default function Volume() {
  const volume = useRockStore((s) => s.volume);
  const setVolume = useRockStore((s) => s.setVolume);
  return (
    <div className="flex flex-row items-center justify-center text-slate-200 gap-4">
      <label htmlFor="vol" className="font-bold">
        Volume
      </label>
      <input
        id="default-range"
        type="range"
        name="vol"
        value={volume.volume.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVolume(parseInt(e.target.value, 10))}
        min={-50}
        max={20}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />

      {Math.round(volume.volume.value)}db
    </div>
  );
}
