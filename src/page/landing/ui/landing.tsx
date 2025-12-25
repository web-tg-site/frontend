import { Advantages } from "@/widgets/advantages";
import { ForWho } from "@/widgets/for-who";
import { Geography } from "@/widgets/geography";
import { Hero } from "@/widgets/hero";
import { LaunchAds } from "@/widgets/launch-ads";
import { Order } from "@/widgets/order";
import { OurService } from "@/widgets/our-services";
import { WeInNumber } from "@/widgets/we-in-numbers";

const LandingPage = () => {
    return (
        <main className="p-2.5">
            <Hero />
            <Geography />
            <WeInNumber />
            <Advantages />
            <ForWho />
            <OurService />
            <LaunchAds />
            <Order />
        </main>
    )
}

export default LandingPage;