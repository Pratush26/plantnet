import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import EmptyState from "../../components/Shared/EmptyState";
import { useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export default function AllPlantsPage() {
    const [searchText, setSearchText] = useState("")
    const [activeCategory, setActiveCategory] = useState([])
    const { data: plantData, isLoading: plantLoading, error: plantErr } = useQuery({
        queryKey: ['all-plants'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/plants`).then(res => res?.data),
        staleTime: 5 * 60 * 1000,
    })
    const { data: categoryData, isLoading: categoryLoading, error: categoryErr } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/categories`).then(res => res?.data),
        staleTime: 5 * 60 * 1000,
    })
    const filteredData = useMemo(() => {
        if (!plantData) return [];
        return plantData.filter(e => {
            return (
                e.title.toLowerCase().includes(searchText.toLowerCase()) &&
                (
                    activeCategory.length > 0
                        ? activeCategory.every(ctgry => e.categories?.includes(ctgry))
                        : true
                )
            );
        });
    }, [searchText, plantData, activeCategory]);

    if (plantLoading || categoryLoading) return (
        <div className="flex items-center justify-center min-h-[80vh] w-full">
            <LoadingSpinner />
        </div>
    )
    if (plantErr) return <EmptyState message={plantErr.message} address='/' label="Back to Home" />
    if (categoryErr) return <EmptyState message={categoryErr.message} address='/' label="Back to Home" />
    return (
        <main>
            <section className="flex flex-col gap-6 my-14 items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Plant Collection ({filteredData?.length})</h1>
                <form action="">
                    <input type="text" name="search" id="search" placeholder="Search here..."
                        onChange={e => setSearchText(e.target.value)}
                        className="px-4 py-2 bg-zinc-100 shadow-md/20 rounded-full w-full" />
                </form>
            </section>
            <div className="grid grid-cols-[25%_75%] w-11/12 mx-auto gap-2">
                <aside className="flex flex-wrap gap-4 h-fit">
                    {
                        categoryData?.map(e => (
                            <span
                                onClick={() => setActiveCategory(prev => prev.includes(e.name) ? prev.filter(i => i !== e.name) : [...prev, e.name])}
                                key={e._id}
                                className={`${activeCategory.includes(e.name) ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black hover:bg-zinc-200'} px-4 py-2 rounded-full cursor-pointer w-fit h-fit`}
                            >
                                {e.name}
                            </span>
                        ))
                    }
                </aside>
                <section className="grid grid-cols-3 place-content-center-safe gap-8">
                    {
                        filteredData?.map(e => (
                            <div key={e._id} className="flex flex-col rounded-xl shadow-lg/20 overflow-hidden">
                                <img src={e.image} alt="plant image" className="w-full aspect-4/5 object-cover" />
                                <article className="w-5/6 mx-auto py-4 h-full flex flex-col gap-2 justify-between">
                                    <p className="text-lg font-semibold">{e.title}</p>
                                    <p className="">Price: ${e.price}</p>
                                    <p className="text-sm text-gray-600 line-clamp-2">{e.description}</p>
                                    <div className="mx-auto w-fit">
                                        <Link to={`/plant/${e._id}`} className="hover:underline text-sm">View more</Link>
                                    </div>
                                </article>
                            </div>
                        ))
                    }
                </section>
            </div>
        </main>
    )
}