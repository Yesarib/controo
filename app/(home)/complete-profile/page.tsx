'use client';

import { useEffect, useState } from "react";
import { completeProfile, getSubscriptionPlans } from "./action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Ban, CircleCheckBig } from "lucide-react";
import { Subscriptions } from "@/types/custom";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";


interface Feature {
    title: string;
    description: string;
    check: boolean;
}

interface SubscriptionWithFeatures extends Subscriptions {
    features: Feature[];
}

export default function CompleteProfile() {
    const [fullName, setFullName] = useState("");
    const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = useState<number | null>(null);
    const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionWithFeatures[]>([]);

    useEffect(() => {
        const fetchSubscriptionPlans = async () => {
            const response = await getSubscriptionPlans();

            const updatedPlans = response.map(plan => {
                let features: Feature[] = [];

                if (plan.subscription_type === "free") {
                    features = [
                        { title: "Content Generations", description: "Generate original, creative content using predefined keywords.", check: true },
                        { title: "Content From Images", description: "Create content from your images based on their context and elements.", check: false },
                        { title: "Content Categorisation", description: "Organize your content automatically into relevant categories based on keywords.", check: false },
                    ];
                } else if (plan.subscription_type === "monthly") {
                    features = [
                        { title: "Content Generations", description: "Generate original, creative content using predefined keywords.", check: true },
                        { title: "Content From Images", description: "Create content from your images based on their context and elements.", check: true },
                        { title: "Content Categorisation", description: "Organize your content automatically into relevant categories based on keywords.", check: true },
                    ];
                } else if (plan.subscription_type === "yearly") {
                    features = [
                        { title: "Content Generations", description: "Generate original, creative content using predefined keywords.", check: true },
                        { title: "Content From Images", description: "Create content from your images based on their context and elements.", check: true },
                        { title: "Content Categorisation", description: "Organize your content automatically into relevant categories based on keywords.", check: true },
                    ];
                }

                return {
                    ...plan,
                    features,
                };
            });

            setSubscriptionPlans(updatedPlans);

            if (updatedPlans.length > 0) {
                setSelectedSubscriptionPlan(updatedPlans[0].id);
            }
        };
        fetchSubscriptionPlans();
    }, []);

    const handleProfileCompletion = async () => {
        if (!fullName || !selectedSubscriptionPlan) return;
        const response = await completeProfile(fullName, selectedSubscriptionPlan);
        if (response.success) {
            if (selectedSubscriptionPlan === 1) {
                redirect('/dashboard');
            } else {
                // router.push('/billing');
                // payment
            }
        } else {
            // handle error
        }
    };

    return (
        <div className="w-full flex flex-col items-center mt-12">
            <h1 className="text-3xl font-bold mb-6">Complete Profile And Choose Your Plan</h1>
            <div className="w-full flex flex-col justify-center items-center">
                <Input
                    type="text"
                    placeholder="Full Name"
                    className="w-80 mb-6"
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <div className="w-2/3 flex gap-6 mt-4">
                {subscriptionPlans.map((plan) => (
                    <Card
                        key={plan.id}
                        className={`border ${selectedSubscriptionPlan === plan.id ? "border-green-600 border-2" : "border-gray-400"} p-4 cursor-pointer`}
                        onClick={() => setSelectedSubscriptionPlan(plan.id)}
                    >
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{plan.subscription_type.toUpperCase()}</CardTitle>
                            <div className="flex gap-2 items-center">
                                <CardTitle className="text-2xl">${plan?.price?.toFixed(2) ?? "Free"}</CardTitle>
                                <CardTitle className="text-xl font-normal">/{plan.subscription_type === "yearly" ? "year" : "month"}</CardTitle>
                            </div>
                            <p className="text-md text-gray-800">{plan.usage_limit ? `${plan.usage_limit} content / week` : "Unlimited"}</p>
                        </CardHeader>
                        <Separator />
                        <CardContent>
                            {plan.features.map((feature: Feature, index: number) => (
                                <div key={index} className="flex gap-2 items-center my-4">
                                    {feature.check ? (
                                        <CircleCheckBig size={24} color="green" />
                                    ) : (
                                        <Ban color="red" size={24} />
                                    )}
                                    <div>
                                        <h1 className="font-semibold">{feature.title}</h1>
                                        <p className="text-sm text-gray-500">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Button className="bg-green-600 mt-6 w-80" onClick={handleProfileCompletion}>Save And Continue</Button>
        </div>
    );
}
