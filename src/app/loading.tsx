import schoolInfo from "@/data/school.json";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-950">
      <p className="animate-pulse text-xl font-bold tracking-tight text-primary">
        {schoolInfo.name}
      </p>
    </div>
  );
}
