
import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

const Home = async () => {

    //CHAMA MEU BANCO DE DADOS
    const barbershops = await db.barbershop.findMany({})

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

                {/* IMAGEM */}
                <div className="relative mt-6 h-[150px] w-full">

                    <Image alt="banner capa principal" src="/banner-01.png" fill
                        className="rounded-xl object-cover" />

                </div>

                {/* AGENDAMENTO */}
                <h2 className="mt-6 mb-3 uppercase text-gray-400 font-bold text-xs">
                    Agendamentos
                </h2>

                <Card>
                    <CardContent className="flex justify-between p-0">
                        {/* div ESQUERDA */}
                        <div className="flex flex-col gap-2 py-5 pl-5 ">
                            <Badge className="w-fit">Confirmado</Badge>
                            <h3 className="font-semibold">Corte de cabelo</h3>

                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                                </Avatar>
                                <p className="text-sm">Barbearia FSW</p>
                            </div>

                        </div>
                        {/* div direita */}
                        <div className="flex flex-col items-center justify-center border-1-2 border-solid px-5">
                            <p className="text-sm">Agosto</p>
                            <p className="text-2xl">05</p>
                            <p className="text-sm">13:23</p>
                        </div>
                    </CardContent>
                </Card>


                <h2 className="mt-6 mb-3 uppercase text-gray-400 font-bold text-xs">
                    Recomendados
                </h2>
                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    
                {barbershops.map((barbershop) => (
                    <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
                </div>

            </div>
        </div>
    )
};


export default Home