import Footer from "@/components/footer";
import FAQ from "@/sections/home/faq";
import Header from "@/sections/home/header";
import Pricing from "@/sections/home/pricing";
import Tools from "@/sections/home/tools";

export default function Home() {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Header />
            <Tools />
            <Pricing />
            <FAQ />
            <Footer />
        </div>
    )
}