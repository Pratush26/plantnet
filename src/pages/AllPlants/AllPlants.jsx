import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import EmptyState from "../../components/Shared/EmptyState";
import { useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export default function AllPlantsPage() {
    const [searchText, setSearchText] = useState("")
    const { data, isLoading, error } = useQuery({
        queryKey: ['all-plants'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/plants`).then(res => res?.data),
        staleTime: 5 * 60 * 1000,
    })
    const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(e =>
      e.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, data]);


    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[80vh] w-full">
            <LoadingSpinner />
        </div>
    )
    if (error) return <EmptyState message={error.message} address='/' label="Back to Home" />
    return (
        <main>
            <section className="flex flex-col gap-6 my-14 items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Plant Collection ({filteredData?.length})</h1>
                <form action="">
                    <input type="text" name="search" id="search" placeholder="Search here..."
                        onChange={e => setSearchText(e.target.value)}
                        className="px-4 py-2 bg-zinc-200 rounded-full w-full" />
                </form>
            </section>
            <section className="grid grid-cols-4 place-content-center-safe gap-8 w-11/12 mx-auto">
                {
                    filteredData?.map(e => (
                        <div key={e._id} className="flex flex-col rounded-xl shadow-md/40 overflow-hidden">
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
        </main>
    )
}