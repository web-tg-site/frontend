import { SendApplicationForm } from "@/features/send-application-form"
import { LeftOrder } from "./left-order"

export const Order = () => {
    return (
        <section className="grid grid-cols-2 gap-2.5" id="orderSelection">
            <LeftOrder />

            <SendApplicationForm 
                className="flex justify-center items-center"
            />
        </section>
    )
}