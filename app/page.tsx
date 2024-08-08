
import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/seach";
import BookingItem from "./_constants/booking-item";




const Home = async () => {

    //CHAMA MEU BANCO DE DADOS
    const barbershops = await db.barbershop.findMany({})
    const popularBarbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        }
    })

    return (
        <div>

            <Header />

            <div className="p-8">
                {/* TEXTO */}

                <h2 className="text-xl font-bold">Olá, Felipe</h2>
                <p> segunda-feira, 05 de agosto</p>

                {/* BUSCA */}
                <div className="mt-6 flex items-center gap-2">
                    <Input placeholder="Faça sua busca..." />
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>
                {/* BUSCA RAPIDA */}

                <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    {quickSearchOptions.map((option) => (
                    <Button className="gap-2" variant="secondary" key={option.title}>
                        <Image src={option.imageUrl} width={16} height={16} alt={option.title} />
                        {option.title}

                    </Button>

                    ))}

                </div>


                {/* IMAGEM */}
                <div className="relative mt-6 h-[150px] w-full">

                    <Image alt="banner capa principal" src="/banner-01.png" fill
                        className="rounded-xl object-cover" />

                </div>

                <BookingItem/>

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

            <footer>

                {/* descrição final da pagina */}
                <Card>
                    <CardContent className="px-5 py-6">
                        <p className="text-sm text-gray-400 text-center">
                            © 2024 Copyright
                            <span className="font-bold">FSW Barber</span>
                        </p>
                    </CardContent>
                </Card>
            </footer>
        </div>
    )
};


export default Home