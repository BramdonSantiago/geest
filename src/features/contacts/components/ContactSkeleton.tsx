const ContactSkeleton = () => {
  return (
    <div className="divide-y divide-[#E5EAF0] rounded-xl border border-[#E5EAF0] bg-white">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-6 px-6 py-5"
        >
          <div className="h-4 w-32 animate-pulse rounded bg-[#F4F7FA]" />
          <div className="h-4 w-44 animate-pulse rounded bg-[#F4F7FA]" />
          <div className="h-4 w-32 animate-pulse rounded bg-[#F4F7FA]" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-[#F4F7FA]" />
          {/* <div className="h-4 w-32 animate-pulse rounded-full bg-[#F4F7FA]" /> */}
        </div>
      ))}
    </div>
  );
};

export default ContactSkeleton;