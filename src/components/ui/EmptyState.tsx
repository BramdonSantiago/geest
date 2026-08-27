type EmptyStateProps = {
  title: string;
  description?: string;
};

const EmptyState = ({
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-[#E5EAF0] bg-white px-6 text-center">
      <h2 className="text-base font-medium text-[#172033]">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-[#667085]">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;