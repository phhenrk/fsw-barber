import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemProps {
    barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {

    return <Card className="min-w-[157px] rounded-2xl">
        <CardContent className="p-0 px-2 pt-1">

            {/* IMAGEM DOS CARDS */}
            <div className="relative h-[159px] w-full">
                <Image alt="barbershop.name"
                    fill className="rounded-2xl objetct-cover"
                    src={barbershop.imageUrl} />

                <Badge className="absolute space-x-1
               left-2 top-2" variant="secondary">
                    <StarIcon size={12} className="fill-primary text-primary" />
                    <p className="text-xs font-semibold ">5,0</p>
                </Badge>
            </div>

            {/* TEXTOS DOS CARDS */}

            <div className="py-3 px-1">
                <h3 className="truncate font-semibold">{barbershop.name}</h3>
                <p className=" truncate text-sm text-gray-400 ">{barbershop.address}</p>
                <Button variant="secondary" className="mt-3 w-full" asChild>
                  <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
                </Button>
            </div>

        </CardContent>
    </Card>

}

export default BarbershopItem