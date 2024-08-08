import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
    service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-3">


                {/* IMAGE CARDS PAGINA 2 */}
                <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] ">
                    <Image
                        src={service.imageUrl}
                        fill alt={service.name}
                        className="object-cover rounded-lg"
                    />
                </div>
                {/* textos do card ao lado da image */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-sm">{service.name}</h3>
                    <p className="text-sm text-gray-400">{service.description}</p>

                    {/* preço e botão de agendamento */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">
                            {Intl.NumberFormat("pt-BR", {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(Number(service.price))}
                        </p>

                        <Button variant="secondary" size="sm">
                            Reservar
                        </Button>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;