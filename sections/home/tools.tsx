"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent } from "@mui/material";
import React from "react";
import { BookImage, FileType2, SquareLibrary } from "lucide-react";

function OurTools() {
  const tools = [
    {
      value: "content-generation",
      title: "Content Generation",
      desc: "Create original texts with the keywords and titles you have determined.",
      features: [
        "Generate blog posts, articles, and essays.",
        "Create compelling product descriptions.",
        "Write social media captions and ads.",
        "SEO optimization for better reach."
      ],
      icon: <FileType2 size={32} />
    },
    {
      value: "content-from-images",
      title: "Content from Images",
      desc: "Analyze your uploaded photo and create appropriate content suggestions.",
      features: [
        "Identify objects, scenes, and emotions from images.",
        "Generate text based on image content.",
        "Suggest captions or tags based on visual analysis.",
        "Generate stories or blog ideas inspired by the images."
      ],
      icon: <BookImage size={32} />
    },
    {
      value: "content-categorisation",
      title: "Content Categorisation",
      desc: "Better organize your content and get automatic category suggestions based on keywords and titles.",
      features: [
        "Automatically categorize blog posts, articles, and content.",
        "Tag content with relevant keywords.",
        "Improve content discoverability with smart categorization.",
        "Customize categories based on your preferences."
      ],
      icon: <SquareLibrary size={32} />
    }
  ];

  return (
    <div className="w-full flex justify-center items-center">
      {/* Large screens: Tabs layout */}
      <div className="lg:block hidden">
        <Tabs defaultValue="content-generation" className="w-full max-w-6xl px-4">
          <TabsList className="flex flex-wrap justify-center gap-4 bg-green-600 h-auto sm:h-24 text-white w-full px-4 py-4 sm:px-9">
            {tools.map((tool) => (
              <TabsTrigger
                key={tool.value}
                value={tool.value}
                className="h-auto flex flex-col items-center gap-2 px-4 py-2 sm:h-full sm:w-auto sm:text-lg"
              >
                <div className="flex flex-col justify-center items-center">
                  {tool.icon}
                  <h1 className="text-[16px] sm:text-[20px] mt-1"> {tool.title} </h1>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {tools.map((tool) => (
            <TabsContent key={tool.value} value={tool.value} className="p-4 sm:p-6 border border-gray-300 rounded-lg">
              <h1 className="font-montserrat font-bold text-xl sm:text-2xl"> {tool.title} </h1>
              <p className="text-gray-600 text-[14px] sm:text-[16px]"> {tool.desc} </p>
              <Card className="bg-gray-900 p-4 mt-4">
                <CardHeader>
                  <CardTitle className="text-green-500 text-[18px] sm:text-[20px]">{"What's this one doing?"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-gray-200 text-[14px] sm:text-[16px]">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="my-2">{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Small screens: Stacked layout */}
      <div className="w-full lg:hidden flex flex-col justify-center items-center">
        {tools.map((tool) => (
          <div key={tool.value} className="w-full  p-4 sm:p-6 border border-gray-300 rounded-lg mt-4">
            <h1 className="font-montserrat font-bold text-xl sm:text-2xl"> {tool.title} </h1>
            <p className="text-gray-600 text-[14px] sm:text-[16px]"> {tool.desc} </p>
            <Card className="bg-gray-900 p-4 mt-4">
              <CardHeader>
                <CardTitle className="text-green-500 text-[18px] sm:text-[20px]">{"What's this one doing?"}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-200 text-[14px] sm:text-[16px]">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="my-2">{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Tools() {
  return (
    <div className="mt-16 sm:mt-32 lg:mt-40 w-full flex flex-col justify-center items-center px-4">
      <h1 className="font-montserrat font-bold text-3xl sm:text-5xl text-center"> Our Tools </h1>
      <div className="w-full mt-6 sm:mt-8 flex justify-center items-center">
        <OurTools />
      </div>
    </div>
  );
}
