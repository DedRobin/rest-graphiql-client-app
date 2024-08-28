import { mockHistoryData } from "@/app/(main)/history/__mocks__/mockRequests";

export function HistoryData({
  historyData,
}: {
  historyData: typeof mockHistoryData;
}) {
  return (
    <div className="history-requests flex justify-center flex-wrap gap-3">
      {historyData.map((request, index) => (
        <div key={index} className="request">
          {Object.entries(request).map(([field, value], index) => (
            <div
              key={index}
              className="request-row grid grid-cols-4 *:border-2"
            >
              <div className="request-field">{field}</div>
              <div className="request-value col-span-3">
                {JSON.stringify(value)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
