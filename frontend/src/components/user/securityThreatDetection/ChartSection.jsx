import React, { useMemo } from "react";
import RepeatedOffendersHighFrequencyVisitorsChart from "./RepeatedOffendersHighFrequencyVisitorsChart";
import BotsVpnDetectionChart from "./BotsVpnDetectionChart";

function ChartSection() {
    return (
        <section className="flex gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none max-md:mr-2.5">
            <BotsVpnDetectionSummary />
            <BarChart />
        </section>
    );
}

function BarChart() {

    return (
        <article className="flex overflow-hidden flex-col grow shrink px-5 py-4 mb-6 rounded-lg shadow-sm bg-neutral-50 w-7/12 h-[320px]">
            <h3 className="sshrink gap-2.5 self-stretch py-2 w-full font-bold basis-0 text-slate-900">
                Repeated Offenders & High-Frequency Visitors
            </h3>
            <RepeatedOffendersHighFrequencyVisitorsChart />
        </article>
    );
}

function BotsVpnDetectionSummary() {
    const sessionMetrics = [
        { bots: 0.12, vpn: 0.08 },
        { bots: 0.15, vpn: 0.10 },
        { bots: 0.10, vpn: 0.05 },
        { bots: 0.18, vpn: 0.07 },
        { bots: 0.14, vpn: 0.09 },
    ];

    const { avgBotsNum, avgVpnNum, botsPercent, vpnPercent } = useMemo(() => {
        const total = sessionMetrics.length;
        const totalBots = sessionMetrics.reduce((acc, cur) => acc + (cur.bots || 0), 0);
        const totalVpn = sessionMetrics.reduce((acc, cur) => acc + (cur.vpn || 0), 0);
        const avgBots = total ? totalBots / total : 0;
        const avgVpn = total ? totalVpn / total : 0;

        return {
            avgBotsNum: avgBots,
            avgVpnNum: avgVpn,
            botsPercent: (avgBots * 100).toFixed(1) + '%',
            vpnPercent: (avgVpn * 100).toFixed(1) + '%',
        };
    }, [sessionMetrics]);

    return (
        <article className="flex flex-col px-5 py-4 rounded-lg shadow-sm bg-neutral-50 w-5/12 h-[320px]">
            <h3 className="font-bold text-slate-900 mb-4">Bot | VPN Detection</h3>
            <BotsVpnDetectionChart bots={avgBotsNum} vpn={avgVpnNum} />
            <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
                <div>
                    <p className="text-zinc-600">Bots</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#e7992e]" />
                        <span>{botsPercent}</span>
                    </div>
                </div>
                <div>
                    <p className="text-zinc-600">VPN Detection</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#e6302d]" />
                        <span>{vpnPercent}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ChartSection;
