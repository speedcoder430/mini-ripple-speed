"use client";
import React from "react";

const PAGE_LIMIT = 8;

function UserListTable({ data }) {
    const emptyRows = PAGE_LIMIT - data.length;

    return (
        <div className="flex overflow-hidden flex-wrap items-start mt-6 mr-6 ml-6 rounded-md shadow-sm font-['Amble'] bg-neutral-50 max-md:mr-2.5">
            <TableColumn title="Name" items={data.map((item) => ({ name: item.name, avatar: item.avatar, }))} isNameWithAvatar={true} emptyCount={emptyRows} />
            <TableColumn title="Email" items={data.map((item) => item.email)} emptyCount={emptyRows} />
            <TableColumn title="Role" items={data.map((item) => item.role)} emptyCount={emptyRows} />
            <TableColumn title="Phone Number" items={data.map((item) => item.phoneNumber)} emptyCount={emptyRows} />
            <TableColumn title="Added Date" items={data.map((item) => item.addedDate)} width="w-[185px]" emptyCount={emptyRows} />
            <TableColumn
                title="Status"
                items={data.map((item) => ({
                    text: item.status,
                    color: item.status === "Active" ? "text-blue-600" : "text-red-600",
                }))}
                isStatus={true}
                emptyCount={emptyRows}
            />
            <ActionsColumn rowCount={data.length} data={data} emptyCount={emptyRows} />
        </div>
    );
}

function TableColumn({
    title,
    items,
    width = "flex-1 shrink basis-0",
    isStatus = false,
    isNameWithAvatar = false,
    emptyCount = 0
}) {
    const baseTextClass = "text-sm tracking-tight leading-none";
    const textClass = isStatus
        ? `${baseTextClass} text-blue-700 whitespace-nowrap`
        : `${baseTextClass} text-zinc-600`;

    return (
        <div className={`${textClass} ${width}`}>
            <div className="flex gap-10 items-center w-full font-bold bg-blue-200">
                <div className="gap-2.5 self-stretch px-6 py-6 my-auto max-md:px-5">
                    {title}
                </div>
            </div>

            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex gap-10 items-center py-2.5 mt-1 w-full whitespace-nowrap bg-white"
                >
                    {isNameWithAvatar ? (
                        < div className="gap-2.5 self-stretch px-6 py-[11px] my-auto max-md:px-5 flex items-center">
                            <>
                                {item.avatar ? (
                                    <img
                                        src={item.avatar}
                                        alt={item.name}
                                        className="w-8 h-8 rounded-full mr-2 object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full mr-2 bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                                        {item.name?.[0]?.toUpperCase() || "?"}
                                    </div>
                                )}
                                <span>{item.name}</span>
                            </>
                        </div>
                    )
                        : isStatus ? (
                            < div className="gap-2.5 self-stretch px-6 py-5 my-auto max-md:px-5 flex items-center">
                                <span className={item.color}>{item.text}</span>
                            </div>
                        ) : (
                            < div className="gap-2.5 self-stretch px-6 py-5 my-auto max-md:px-5 flex items-center">
                                {item || "N/A"}
                            </div>
                        )}
                </div>
            ))
            }

            {/* Render empty placeholders */}
            {
                Array.from({ length: emptyCount }).map((_, index) => (
                    <div
                        key={`empty-${index}`}
                        className="flex gap-10 items-center py-[17px] mt-1 w-full whitespace-nowrap bg-white"
                    >
                        <div className="gap-2.5 self-stretch px-6 py-5 my-auto max-md:px-5 text-zinc-300"></div>
                    </div>
                ))
            }
        </div >
    );
}

function ActionsColumn({ data, rowCount, emptyCount }) {
    return (
        <div className="flex relative flex-col flex-1 shrink items-start basis-0 font-['Jost']">
            <div className="flex z-0 gap-10 items-center self-stretch w-full text-sm font-bold tracking-tight leading-none whitespace-nowrap bg-blue-200 rounded-none text-zinc-600">
                <div className="gap-2.5 self-stretch px-6 py-6 my-auto max-md:px-5">
                    Actions
                </div>
            </div>

            {data.map((user, index) => {
                const hasRole = !!user.role;
                const buttonText = hasRole ? "Remove Role" : "Assign Role";
                const borderColor = hasRole ? "border-red-500 text-red-600" : "bg-blue-900 text-white";

                return (
                    <div
                        key={index}
                        className="bg-white pr-6 mt-1 rounded-none w-full"
                    >
                        <div className="flex flex-1 shrink gap-2.5 items-center self-stretch px-6 py-[18px] my-auto w-full rounded-none basis-0 max-md:px-5">
                            <div className="flex items-start self-stretch my-auto">
                                <button
                                    className={`border px-3 py-2 w-[110px] rounded text-sm font-medium ${borderColor}`}
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Empty action placeholders */}
            {Array.from({ length: emptyCount }).map((_, index) => (
                <div
                    key={`empty-action-${index}`}
                    className="bg-white pr-6 py-0 mt-1 rounded-none w-full"
                >
                    <div className="flex flex-1 shrink gap-2.5 items-center self-stretch px-6 py-[37px] my-auto w-full rounded-none basis-0 max-md:px-5">
                        <div className="flex items-start self-stretch my-auto w-9 text-zinc-300"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}



export default UserListTable;
