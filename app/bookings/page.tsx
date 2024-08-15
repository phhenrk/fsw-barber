import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";
import BookingItem from "../_constants/booking-item";


const Bookings = async () => {

    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return notFound()
    }
    const confirmedBookings = await db.booking.findMany({
        where: {
            date: {
                gte: new Date(),
            }
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

    const concludedBookings = await db.booking.findMany({
        where: {
            userId: (session?.user as any).id,
            date: {
                lt: new Date(),
            }
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


    return (
        <>
            <Header />

            <div className="p=5 space-y-3">
                <h1 className="text-xl font-bold">Agendamentos</h1>
                {confirmedBookings.length > 0 && (
                    <>
                        <h2 className="mt-6 mb-3 uppercase text-gray-400 font-bold text-xs">
                            Confirmados
                        </h2>
                        {confirmedBookings.map(booking => (
                            <BookingItem key={booking.id} booking={booking} />
                        ))}

                    </>
                )}
                {concludedBookings.length > 0 && (
                    <>
                        <h2 className="mt-6 mb-3 uppercase text-gray-400 font-bold text-xs">
                            Finalizados
                        </h2>
                        {concludedBookings.map(booking => (
                            <BookingItem key={booking.id} booking={booking} />
                        ))}
                    </>
                )}
            </div>

        </>
    );
}

export default Bookings;