import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SidebarSheet from "@/app/_components/sidebar-sheet";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


interface barbershopPageProps {
    params: {
        id: string,
    },
}

const barbershopPage = async ({ params }: barbershopPageProps) => {

    // CHAMA BANCO DE DADOS
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true
        }
    })


    if (!barbershop) {
        return notFound()
    }


    {/* CODIGOS DA PAGÍNA 2 DO PROJETO _COMPONENTS/BARBERSHOP/ID */ }

    return <div>

        {/* IMAGE / imagem pagina 2 */}
        <div className="relative w-full h-[250px]">
            <Image alt={barbershop.name} src={barbershop?.imageUrl}
                fill className="object-cover" />

            <Button size="icon"
                variant="secondary"
                className="absolute left-4 top-4"
                asChild
            >
                <Link href="/">
                    <ChevronLeftIcon />
                </Link>
            </Button>

            <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="absolute  right-4 top-4">
                            <MenuIcon />
                            {/* TEXTOS DE MENU E OS OUTROS */}
                        </Button>
                    </SheetTrigger>
                   <SidebarSheet />
                </Sheet>
                
        </div>
        {/* TITULOS / endereço e avaliacões */}
        <div className="p-5 border-b border-solid">
            <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>

            <div className="flex mb-2 items-center gap-2">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{barbershop?.address}</p>
            </div>

            <div className="flex items-center gap-2">
                <StarIcon className="text-primary fill-primary" size={18} />
                <p className="text-sm">5,0 (499 avaliações)</p>
            </div>

        </div>

        {/* DESCRIÇÃO DA PAGINA 2 */}
        <div className="space-y-2 border-b border-solid p-5">
            <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
            <p className="text-justify text-sm">{barbershop?.description}</p>
        </div>

        {/* cards da pagina 2 serviços */}
        <div className="border-b border-solid p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
            <div className="space-y-3">
                {barbershop.services.map(service =>
                    <ServiceItem key={service.id}
                     barbershop={JSON.parse(JSON.stringify(barbershop))}
                     service={JSON.parse(JSON.stringify(service))}
                     />)}
            </div>
        </div>
        {/* CONTATOS / PAGINA 2 FINAL */}
        <div className="space-y-3 p-5">
         {barbershop.phones.map(phone => (
          <PhoneItem key={phone} phone={phone} />
         ))}
        </div>
    </div>

}

export default barbershopPage;