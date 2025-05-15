"use client";
import React from "react";
import RoleLabel from "./RoleLabel";
import ActionButton from "./ActionButton";

function RoleCard({ roleName, roleDescription }) {
    return (
        <article className="flex justify-between p-3 rounded-lg shadow-sm m-3 bg-neutral-50 w-[23%]">
            <div className="flex-1 shrink basis-0">
                <div className="flex flex-col w-full font-bold">
                    <RoleLabel text="Role" />
                    <h3 className="mt-1 text-[16px] font-bold tracking-tight leading-none text-slate-900">
                        {roleName}
                    </h3>
                </div>
                <div className="flex flex-col mt-1.5 w-full text-xs">
                    <RoleLabel text="Permission" />
                    <p className="mt-1 leading-3 text-slate-900">
                        {roleDescription}
                    </p>
                </div>
            </div>
            <div className="self-start text-base whitespace-nowrap w-[72px] font-['Jost'] flex flex-col">
                <ActionButton
                    text="Edit"
                    variant="blue"
                    onClick={() => console.log("Edit clicked")}
                />
                <ActionButton
                    text="Delete"
                    variant="red"
                    className="mt-3.5"
                    onClick={() => console.log("Delete clicked")}
                />
            </div>
        </article>
    );
}

export default RoleCard;
