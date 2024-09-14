export function KeyValueBlock({
  keyName,
  value,
}: {
  keyName: string;
  value: unknown;
}) {
  return (
    <div className="flex flex-row gap-1">
      <h5 className="text-mediumGray">{keyName}:</h5>
      {typeof value === "object" && value !== null ? (
        <h5 className="truncate">
          <pre>{JSON.stringify(value, null, 1)}</pre>
        </h5>
      ) : (
        <h5>{String(value)}</h5>
      )}
    </div>
  );
}
