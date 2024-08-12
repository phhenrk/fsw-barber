import BarbershopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
    searchParams: {
        search?: string
    }
}

const BarbershopPage = async ({ searchParams }: BarbershopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams?.search,
                mode: "insensitive",
            },
        },

    })

    return (
        <div>
            <Header />
            <div className="my-6 px-5">
            <Search />
            </div>

           <div className="px-5">
           <h2 className="mt-6 mb-3 uppercase text-gray-400 font-bold text-xs">
                Resultados para &quot;{searchParams.search}&quot;
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {barbershops.map(barbershop => (
                    <BarbershopItem key={barbershop.id} barbershop={barbershop} />

                ))}
            </div>
           </div>
        </div>

    )
}


export default BarbershopPage;