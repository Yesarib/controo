'use client'

import { Button } from "@/components/ui/button";
import { Typography } from "@mui/material";
import Link from "next/link";


export default function Header() {
    return (
        <div className="w-full mt-16 flex flex-col justify-center items-center">
            <Typography sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight:'bold', fontSize:{xs:20, sm:40, md:48, lg:64} }}>
                The <strong className="text-green-600"> Easiest </strong> way to create content.
            </Typography>
            <div className="mt-4 w-1/2 lg:w-full flex justify-center text-center">
                <Typography variant="body1" className="text-primary"> Create, edit and optimise your content effortlessly with our AI-powered content automation tool! </Typography>
            </div>
            <div className="mt-8">
                <Button>
                    <Link href={'/login'}> Start Creating Content </Link>
                </Button>
            </div>
        </div>
    )
}