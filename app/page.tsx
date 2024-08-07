
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
                    <Button className="gap-2" variant="secondary">
                        <Image src="/cabelo.svg" width={16} height={16} alt="cabelo" />
                        Cabelo
                    </Button>

                    <Button className="gap-2" variant="secondary">
                        <Image src="/barba.svg" width={16} height={16} alt="Barba" />
                        Barba
                    </Button>

                    <Button className="gap-2" variant="secondary">
                        <Image src="/acabamento.svg" width={16} height={16} alt="Acabamento" />
                        Acabamento
                    </Button>

                    <Button className="gap-2" variant="secondary">
                        <Image src="/hidratacao.svg" width={16} height={16} alt="Hidratação" />
                        Hidratação
                    </Button>

                    <Button className="gap-2" variant="secondary">
                        <Image src="/massagem.svg" width={16} height={16} alt="Massagem" />
                        Massagem
                    </Button>

                    <Button className="gap-2" variant="secondary">
                        <Image src="/sobrancelha.svg" width={16} height={16} alt="Sobrancelha" />
                        Sobrancelha
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
                        <p className="text-sm text-gray-400">© 2024 Copyright
                            <span className="font-bold">FSW Barber</span>
                        </p>
                    </CardContent>
                </Card>
            </footer>
        </div>
    )
};


export default Home