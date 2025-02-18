import Link from "next/link";
import { Separator } from "./ui/separator";


export default function Footer() {
    return (
        <div className="w-full flex flex-col p-4 mt-32">
            <Separator className="my-4 bg-gray-400" />
            <div className="w-full lg:flex block justify-center lg:justify-between lg:px-8 items-center">
                <p className="text-sm text-gray-800"> © 2025 Contro. All Rights Reserved </p>
                <div className="flex gap-4 mt-4 lg:mt-0">
                    <Link href={'/privacy'}>
                        <p className="text-sm text-gray-800 underline underline-offset-4"> Privacy Policy </p>
                    </Link>
                    <Link href={'/terms-of-service'}>
                        <p className="text-sm text-gray-800 underline underline-offset-4"> Terms of Service </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}