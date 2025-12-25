import { MyCollections } from "@/page/my-collection";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    
    return <MyCollections id={id} />
}