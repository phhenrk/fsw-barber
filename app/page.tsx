
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/seach";
import BookingItem from "./_constants/booking-item";
import Search from "./_components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";





const Home = async () => {

    //CHAMA MEU BANCO DE DADOS
    const session = await getServerSession(authOptions)
    const barbershops = await db.barbershop.findMany({})
    const popularBarbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    })

    const confirmedBookings = session?.user ? 
    await db.booking.findMany({
        where: {
            userId: (session.user as any).id,
            date: {
                gte: new Date(),
            },
        },

        include: {
            service: {
                include: {
                    barbershop: true,
                },
            },
        },
       orderBy: {
        date: "desc",
       },

    })

    : []

    return (

        <div>

            <Header />

            <div className="p-8">
                {/* TEXTO */}

                <h2 className="text-xl font-bold">Olá, {session?.user ? session.user.name : "bem vindo"}! </h2>
                <p>
                    <span className="capitalize">{format(new Date(), "EEEE, dd", {locale: ptBR})}
                    </span>
                    <span>&nbsp;de&nbsp;</span>
                    <span className="capitalize">{format(new Date(), "MMMM", {locale: ptBR})}
                    </span>
                    </p>

                {/* BUSCA */}
                <div className="mt-6">
                    <Search />
                </div>
                {/* BUSCA RAPIDA */}

                <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    {quickSearchOptions.map((option) => (
                        <Button className="gap-2" variant="secondary"
                            key={option.title}
                            asChild
                        >
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image src={option.imageUrl}
                                    width={16}
                                    height={16}
                                    alt={option.title}
                                />
                                {option.title}
                            </Link>

                        </Button>

                    ))}

                </div>


                {/* IMAGEM */}
                <div className="relative mt-6 h-[150px] w-full">

                    <Image alt="banner capa principal" src="/banner-01.png" fill
                        className="rounded-xl object-cover" />

                </div>
                {/* AGENDAMENTO */}
                <h2 className="mt-6 mb-3 uppercase text-gray-400 font-bold text-xs">
                   Agendamentos
                </h2>

                <div className="flex overflow-x-auto  gap-3  [&::-webkit-scrollbar]:hidden">
                    {confirmedBookings.map((booking) => (
                        <BookingItem key={booking.id} booking={booking} />
                    ))}
                </div>


                {/* bloco de cards 1 */}
                <h2 className="mt-6 mb-3 uppercase text-gray-400 font-bold text-xs">
                    Recomendados
                </h2>
                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">

                    {barbershops.map((barbershop) => (
                        <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                    ))}
                </div>

                {/* bloco de cards 2 */}
                <h2 className="mt-6 mb-3 uppercase text-gray-400 font-bold text-xs">
                    Recomendados
                </h2>
                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">

                    {popularBarbershops.map((barbershop) => (
                        <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                    ))}
                </div>

            </div>

        </div>
    )
};


export default Home