import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface LoadingProps {
    width?: string
    isSidebar?: boolean
}

export default function Loading({ width="200", isSidebar=true }: LoadingProps) {
    return (
        <div className="flex items-center space-x-4 mt-2">
            <div className={`${isSidebar ? "space-y-2":"space-y-8"}`}>
                {[...Array(10)].map((_, index) => (
                    <Skeleton className={`h-4 w-[${width}px]  bg-gray-800`} key={index} />
                ))}
            </div>
        </div>
    );
}
