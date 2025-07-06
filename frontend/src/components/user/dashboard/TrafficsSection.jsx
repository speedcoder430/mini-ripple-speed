import React, { useMemo } from "react";
import TrafficTrendsChart from "./TrafficTrendsChart";
import ReferralTrafficChart from "./ReferralTrafficChart";
import useTrafficTrends from "./useTrafficTrends";
import useReferralTraffic from "./useReferralTraffic";
function TrafficSection({ data: dashboardData }) {
    const { trafficData, loading, error } = useTrafficTrends();




    const formattedTrendData = useMemo(() => {
        if (!Array.isArray(trafficData)) return [];
        return trafficData.map((item) => ({
            dateHour: item.dateHour,
            metric1: item.metric1,
            metric2: item.metric2,
        }));
    }, [trafficData]);

    return (
        <section className="flex flex-wrap gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none max-md:mr-2.5">
            <TrafficTrends
                data={formattedTrendData}
                isLoading={loading}
                error={error}
            />
            <ReferralTraffic data={dashboardData?.referralTraffic || []} />
        </section>
    );
}

function TrafficTrends({ data, isLoading, error }) {
    return (
        <article className="flex overflow-hidden flex-col grow shrink justify-center p-5 rounded-lg shadow-sm bg-neutral-50 min-w-60 w-[646px] min-h-[287px] max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
                <h3 className="self-stretch my-auto font-bold text-neutral-950">
                    Traffic Trends
                </h3>
                <div className="flex gap-2.5 items-center self-stretch my-auto text-zinc-600">
                    <span className="self-stretch my-auto">This Month</span>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2db8dd0b04e4cc6108ea3ba89fa8843ffd12ebe3?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                        alt="Filter dropdown"
                        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                    />
                </div>
            </div>

            {isLoading ? (
                <p className="mt-5 text-sm text-gray-500">Loading traffic data...</p>
            ) : error ? (
                <p className="mt-5 text-sm text-red-500">
                    Failed to load traffic data: {error?.message || "Unknown error"}
                </p>
            ) : (
                <TrafficTrendsChart
                    gaData={data}
                    metricKeys={["metric1", "metric2"]}
                    metricLabels={["Last 24 hrs", "Last 7 Days"]}
                />
            )}

        </article>
    );
}



function ReferralTraffic() {
  const { summary, sources, loading, error } = useReferralTraffic();

  return (
    <article className="flex overflow-hidden flex-col grow shrink px-5 py-4 rounded-lg shadow-sm bg-neutral-50 min-w-60 w-[278px] min-h-[287px]">
      <h3 className="sshrink gap-2.5 self-stretch py-2 w-full font-bold basis-0 text-slate-900">
        Referral Traffic{" "}
        <span className="font-normal text-[rgba(77,81,88,1)]">(Sources of Traffic)</span>
      </h3>

      {loading ? (
        <p className="text-sm text-gray-500 mt-2">Loading referral traffic...</p>
      ) : error ? (
        <p className="text-sm text-red-500 mt-2">Failed to load referral data.</p>
      ) : (
        <>
          <ReferralTrafficChart gaData={sources} />
          <div className="flex gap-10 justify-between items-center mt-0 w-full whitespace-nowrap">
            <div className="self-stretch my-auto">
              <p className="text-zinc-600">Direct</p>
              <div className="flex gap-2 items-center mt-1 font-bold text-gray-900">
                <span className="w-2.5 h-2.5 rounded-xl bg-slate-900" />
                <span>{summary.direct}</span>
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto">
              <p className="text-zinc-600">Organic</p>
              <div className="flex gap-2 items-center mt-1 font-bold text-gray-900">
                <span className="w-2.5 h-2.5 bg-amber-600 rounded-xl" />
                <span>{summary.organic}</span>
              </div>
            </div>
            <div className="self-stretch my-auto">
              <p className="text-zinc-600">Social</p>
              <div className="flex gap-2 items-center mt-1 font-bold text-gray-900">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-xl" />
                <span>{summary.social}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}


export default TrafficSection;
