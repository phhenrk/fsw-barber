"use client"


import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale"
import { useSession } from "next-auth/react";
import { createBooking } from "../_actions/create-booking";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
]

const getTimeList = (bookings: Booking[]) => {
    return TIME_LIST.filter(time => {

        const hour = Number(time.split(":")[0])
        const minutes = Number(time.split(":")[1])

        const hasBookingOnCurrentTime = bookings.some(
            (booking) =>
                booking.date.getHours() === hour &&
                booking.date.getMinutes() === minutes,
        )


        if (hasBookingOnCurrentTime) {
            return false
        }
        return true
    })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const { data } = useSession()
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const [SignInDialogIsOpen, setSignInDialogIsOpen] = useState(false)

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const [dayBookings, setDayBookings] = useState<Booking[]>([])
    const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            if (!selectedDay) return;
            const bookings = await getBookings({ date: selectedDay, serviceId: service.id })
            setDayBookings(bookings)
        }
        fetch()
    }, [selectedDay, service.id])


    const handleButtonClick = () => {
        if (data?.user){
         return   setBookingSheetIsOpen(true)
        }
        return setSignInDialogIsOpen(true)
    }

    const handleBookingSheetOpenChange = () => {
        setSelectedDay(undefined)
        setSelectedTime(undefined)
        setDayBookings([])
        setBookingSheetIsOpen(false)
    }


    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
    }

    const handleCreateBooking = async () => {
        try {
            if (!selectedDay || !selectedTime) return;

            const hour = Number(selectedTime.split(":")[0])
            const minute = Number(selectedTime.split(":")[1])
            const newDate = set(selectedDay, {
                minutes: minute,
                hours: hour
            })

            await createBooking({
                serviceId: service.id,
                date: newDate,
            })
            handleBookingSheetOpenChange()
            toast.success("Reserva feita com sucesso!")
        } catch (error) {
            toast.error("Erro ao criar reserva!")
        }
    }

    return (
      <>
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
                    <div className=" flex items-center space-x-48">
                        <p className=" text-sm font-bold text-primary">
                            {Intl.NumberFormat("pt-BR", {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(Number(service.price))}
                        </p>

                        <Sheet
                            open={bookingSheetIsOpen}
                            onOpenChange={handleBookingSheetOpenChange}>

                            <Button variant="secondary" size="sm" onClick={handleButtonClick}
                            >

                                Reservar
                            </Button>

                            <SheetContent className="px-0">
                                <SheetHeader>
                                    <SheetTitle>Fazer Reserva</SheetTitle>
                                </SheetHeader>

                                <div className="border-b border-solid py-5">
                                    <Calendar mode="single"
                                        locale={ptBR}
                                        selected={selectedDay}
                                        onSelect={handleDateSelect}
                                        fromDate={new Date()}
                                        styles={{
                                            head_cell: {
                                                width: "100%",
                                                textTransform: "capitalize",
                                            },
                                            cell: {
                                                width: "100%",
                                            },
                                            button: {
                                                width: "100%",
                                            },
                                            nav_button_previous: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            nav_button_next: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            caption: {
                                                textTransform: "capitalize",
                                            },
                                        }}
                                    />

                                </div>
                                {selectedDay && (
                                    <div className="flex gap-3 border-b border-solid overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
                                        {getTimeList(dayBookings).map(time => (
                                            <Button key={time} variant={selectedTime === time ? "default" : "outline"}
                                                className="rounded-full"
                                                onClick={() => handleTimeSelect(time)}
                                            >
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                )}

                                {selectedTime && selectedDay && (
                                    <div className="p-5">
                                        <Card>
                                            <CardContent className="space-y-3 p-3">
                                                <div className="flex justify-between items-center">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <p className=" text-sm font-bold">
                                                        {Intl.NumberFormat("pt-BR", {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        }).format(Number(service.price))}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-sm text-gray-400">Data</h2>
                                                    <p className=" text-sm ">
                                                        {format(selectedDay, "d 'de' MMMM", {
                                                            locale: ptBR,

                                                        })}

                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-sm text-gray-400">Hora</h2>
                                                    <p className=" text-sm "> {selectedTime}</p>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-sm text-gray-400">Barbearia</h2>
                                                    <p className=" text-sm "> {barbershop.name}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                                <SheetFooter className="mt-5 px-5">
                                    <SheetClose asChild>
                                        <Button onClick={handleCreateBooking}
                                            disabled={!selectedDay || !selectedTime}
                                        >
                                            Confirmar</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                    </div>

                </div>
            </CardContent>
        </Card>



        <Dialog open={SignInDialogIsOpen}
         onOpenChange={(open) => setSignInDialogIsOpen(open)}
         >
            <DialogContent className="w-[90%">
                <SignInDialog />
            </DialogContent>

        </Dialog>
      </>
    )
}

export default ServiceItem;


