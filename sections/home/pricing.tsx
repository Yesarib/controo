import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Ban, CircleCheckBig } from "lucide-react"
import Link from "next/link"

const pricingPlans = [
    {
        name: "Free Plan",
        price: 0.00,
        paymentTime: "month",
        limit: "10 content / week",
        features: [
            {
                title: "Content Generations",
                description: "Generate original, creative content using predefined keywords.",
                check: true
            },
            {
                title: "Content From Images",
                description: "Create content from your images based on their context and elements.",
                check: false
            },
            {
                title: "Content Categorisation",
                description: "Organize your content automatically into relevant categories based on keywords.",
                check: false
            }
        ]
    },
    {
        name: "Monthly",
        price: 2.49,
        paymentTime: "month",
        limit: "Unlimited",
        features: [
            {
                title: "Content Generations",
                description: "Generate original, creative content using predefined keywords.",
                check: true
            },
            {
                title: "Content From Images",
                description: "Create content from your images based on their context and elements.",
                check: true
            },
            {
                title: "Content Categorisation",
                description: "Organize your content automatically into relevant categories based on keywords.",
                check: true
            }
        ]
    },
    {
        name: "Yearly",
        price: 24.00,
        paymentTime: "year",
        limit: "Unlimited",
        discount: "Save 20%",
        features: [
            {
                title: "Content Generations",
                description: "Generate original, creative content using predefined keywords.",
                check: true
            },
            {
                title: "Content From Images",
                description: "Create content from your images based on their context and elements.",
                check: true
            },
            {
                title: "Content Categorisation",
                description: "Organize your content automatically into relevant categories based on keywords.",
                check: true
            }
        ]
    },
]

export default function Pricing() {
    return (
        <div className="w-full flex flex-col justify-center items-center mt-24">
            <h1 className="font-montserrat font-bold text-5xl"> Pricing Plans</h1>
            <p className="mt-2 text-gray-600"> Pick the plan that works best for you! </p>
            <div className="w-2/3 flex gap-8 mt-8 cursor-pointer">
                {pricingPlans.map((plan, index) => {

                    const isAnnual = plan.name === "Yearly";
                    return (
                        <Card key={index} className={`border ${isAnnual ? "border-green-600 border-2" : "border-gray-400"} p-4 mt-4`}>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold font-montserrat">{plan.name}</CardTitle>
                                <div className="relative flex gap-2 items-center">
                                    {isAnnual &&
                                        <div className="absolute -top-16 -right-6 bg-green-600 p-2 rounded-lg text-white">
                                            <h1 className="font-bold font-montserrat"> {plan.discount} </h1>
                                        </div>
                                    }
                                    <CardTitle className="text-2xl font-montserrat"> ${plan.price.toFixed(2)} </CardTitle>
                                    <CardTitle className="text-xl font-montserrat font-normal">/{plan.paymentTime} </CardTitle>
                                </div>
                                <p className="text-md text-gray-800"> {plan.limit} </p>
                            </CardHeader>
                            <Separator />
                            <CardContent>
                                {plan.features.map((feature, index) => {
                                    return (
                                        <div key={index} className="flex gap-2 items-center my-4">
                                            {feature.check ? (
                                                <CircleCheckBig size={32} color="green" />
                                            ) : (
                                                <Ban color="red" size={32} />
                                            )}
                                            <div>
                                                <h1 className="font-semibold">{feature.title}</h1>
                                                <p className="text-sm text-gray-500">{feature.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <Button className="bg-green-600 w-full mt-8">
                                    <Link href={'/login'}>Start Creating Content</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}