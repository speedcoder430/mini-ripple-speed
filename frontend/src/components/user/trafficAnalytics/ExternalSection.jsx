import React, { useMemo } from "react";
import RealTimeVsReturningUsersChart from "./RealTimeVsReturningUsersChart";
import ReferralDomainsExternalTrafficTable from "./ReferralDomainsExternalTrafficTable";

function ExternalSection() {
    return (
        <section className="flex flex-wrap gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none max-md:mr-2.5">
            <RealTimeVsReturningUsers />
            <article className="overflow-hidden flex-1 rounded-lg shadow-sm bg-neutral-50 text-slate-900 min-w-[415px] h-[320px]">
                <h3 className="flex-1 shrink gap-2.5 self-stretch px-6 py-3 w-full text-sm font-bold tracking-tight leading-none basis-0 max-md:px-5">
                    Referral Domains & External Traffic
                </h3>
                <ReferralDomainsExternalTrafficTable />
            </article>
        </section>
    )
}

function RealTimeVsReturningUsers() {
    const sessionMetrics = [
        { bounceRate: 0.05 },
        { bounceRate: 0.10 },
        { bounceRate: 0.07 },
        { bounceRate: 0.04 },
        { bounceRate: 0.06 },
    ];

    const { avgBounceRateNum, bouncePercent, sessionPercent } = useMemo(() => {
        const total = sessionMetrics.length;
        const totalBounce = sessionMetrics.reduce((acc, cur) => acc + cur.bounceRate, 0);
        const avgBounce = total ? totalBounce / total : 0;
        const bounce = (avgBounce * 100).toFixed(1);
        const session = (100 - bounce).toFixed(1);
        return {
            avgBounceRateNum: avgBounce,
            bouncePercent: bounce + "%",
            sessionPercent: session + "%",
        };
    }, [sessionMetrics]);

    return (
        <article className="flex flex-col px-5 py-4 rounded-lg shadow-sm bg-neutral-50 w-5/12 h-[320px]">
            <h3 className="font-bold text-slate-900 mb-4">Real-Time vs. Returning Users</h3>
            <RealTimeVsReturningUsersChart bounceRate={avgBounceRateNum} />
            <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
                <div>
                    <p className="text-zinc-600">Real-Time</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#e29400]" />
                        <span>{bouncePercent}</span>
                    </div>
                </div>
                <div>
                    <p className="text-zinc-600">Returning Users</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#059669]" />
                        <span>{sessionPercent}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ExternalSection;