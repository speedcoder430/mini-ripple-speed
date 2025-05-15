import React, { useRef, useState, useEffect } from "react";
import { geoCylindricalEqualArea } from "d3-geo-projection";
import { geoCentroid, geoPath } from "d3-geo";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/features.json";

const GRAY_COLOR = "#e5e7eb";
const RED_BASE = [239, 68, 68]; // Tailwind red-500

function getRedGradientColor(value, max) {
    if (max === 0) return GRAY_COLOR;
    const ratio = value / max;
    const [r, g, b] = RED_BASE;
    return `rgba(${r}, ${g}, ${b}, ${0.3 + 0.7 * ratio})`;
}

export default function VisualRepresentationMap({ gaData }) {
    const mapRef = useRef(null);
    const projection = geoCylindricalEqualArea().parallel(35);
    const path = geoPath().projection(projection);

    const [tooltip, setTooltip] = useState({ show: false, name: "", x: 0, y: 0 });
    const [countryVisitorMap, setCountryVisitorMap] = useState({});

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        const visitorMap = {};
        for (const row of gaData) {
            const country = row.country || "Unknown";
            const count = parseInt(row.activeUsers || 0);
            if (!visitorMap[country]) visitorMap[country] = 0;
            visitorMap[country] += count;
        }

        setCountryVisitorMap(visitorMap);
    }, [gaData]);

    const handleMouseMove = (e, name) => {
        const bounds = mapRef.current?.getBoundingClientRect();
        setTooltip({
            show: true,
            name,
            x: e.clientX - (bounds?.left || 0),
            y: e.clientY - (bounds?.top || 0),
        });
    };

    const maxUsers = Math.max(...Object.values(countryVisitorMap), 0);

    return (
        <div
            ref={mapRef}
            className="relative h-[360px] overflow-auto border border-gray-200 flex-1 rounded-lg"
        >
            <div className="absolute top-0 left-0 font-bold text-[14px] px-3 py-2 bg-[#aae0fa] rounded-sm">
                Visual representation (Map)
            </div>
            <ComposableMap
                width={982}
                height={450}
                projection={projection}
                style={{ background: "#aae0fa" }}
            >
                <rect width="100%" height="100%" fill="#E0F7FA" />

                {/* Ocean labels */}
                <text x={340} y={140} fontSize={14} fill="#77a" fontStyle="italic" textAnchor="middle">Atlantic Ocean</text>
                <text x={920} y={160} fontSize={14} fill="#77a" fontStyle="italic" textAnchor="middle">Pacific Ocean</text>
                <text x={80} y={260} fontSize={14} fill="#77a" fontStyle="italic" textAnchor="middle">Pacific Ocean</text>
                <text x={730} y={270} fontSize={14} fill="#77a" fontStyle="italic" textAnchor="end">Indian Ocean</text>

                {/* Geography */}
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const name = geo.properties.name;
                            const userCount = countryVisitorMap[name] || 0;
                            const color = userCount ? getRedGradientColor(userCount, maxUsers) : GRAY_COLOR;

                            const centroid = geoCentroid(geo);
                            const [cx, cy] = projection(centroid);
                            const bounds = path.bounds(geo);
                            const w = bounds[1][0] - bounds[0][0];
                            const h = bounds[1][1] - bounds[0][1];
                            const isTiny = w < 12 || h < 12;

                            return (
                                <g key={geo.rsmKey}>
                                    <Geography
                                        geography={geo}
                                        onMouseEnter={(e) => handleMouseMove(e, name)}
                                        onMouseMove={(e) => handleMouseMove(e, name)}
                                        onMouseLeave={() => setTooltip({ show: false, name: "", x: 0, y: 0 })}
                                        style={{
                                            default: {
                                                fill: color,
                                                outline: "none",
                                            },
                                            hover: {
                                                fill: "#facc15",
                                                outline: "none",
                                            },
                                            pressed: {
                                                fill: "#f87171",
                                                outline: "none",
                                            },
                                        }}
                                    />
                                    {cx && cy && !isTiny && (
                                        <text
                                            x={cx}
                                            y={cy}
                                            textAnchor="middle"
                                            fontSize={11}
                                            fill="#111"
                                            style={{
                                                fontFamily: "Arial",
                                                pointerEvents: "none",
                                            }}
                                        >
                                            {name}
                                        </text>
                                    )}
                                </g>
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>

            {tooltip.show && (
                <div
                    className="absolute bg-white text-xs text-gray-800 px-2 py-1 rounded shadow pointer-events-none z-10"
                    style={{
                        top: tooltip.y + 12,
                        left: tooltip.x + 12,
                    }}
                >
                    {tooltip.name}
                </div>
            )}
        </div>
    );
}
