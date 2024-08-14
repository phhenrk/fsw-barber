import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "../_components/ui/avatar";
import { Badge } from "../_components/ui/badge";
import { Card, CardContent } from "../_components/ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";


interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: {
                include: {
                    barbershop: true
                }
            }
        }
    }>
}

// TODO: receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
    const isConfirmed = isFuture(booking.date)
    return (
        <>

            {/* AGENDAMENTO */}

            <Card className="min-w-[90%]">
                <CardContent className="flex justify-between p-0">
                    {/* div ESQUERDA */}
                    <div className="flex flex-col gap-2 py-5 pl-5 ">
                        <Badge
                            className="w-fit"
                            variant={isConfirmed ? "default" : "secondary"}
                        >
                            {isConfirmed ? 'Confirmado' : 'Finalizado'}
                        </Badge>
                        <h3 className="font-semibold">{booking.service.name}</h3>

                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                            </Avatar>
                            <p className="text-sm">{booking.service.barbershop.name}</p>
                        </div>

                    </div>
                    {/* div direita */}
                    <div className="flex flex-col items-center justify-center border-1-2 border-solid px-5">
                        <p className="text-sm capitalize">
                            {format(booking.date, "MMMM", { locale: ptBR })}
                        </p>
                        <p className="text-2xl">
                            {format(booking.date, "dd", { locale: ptBR })}
                        </p>
                        <p className="text-sm">
                            {format(booking.date, "HH:mm", { locale: ptBR })}
                        </p>
                    </div>
                </CardContent>
            </Card>

        </>
    );
}

export default BookingItem;