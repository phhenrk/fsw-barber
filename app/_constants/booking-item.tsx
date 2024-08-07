import { Avatar, AvatarImage } from "../_components/ui/avatar";
import { Badge } from "../_components/ui/badge";
import { Card, CardContent } from "../_components/ui/card";

// TODO: receber agendamento como prop
const BookingItem = () => {
    return ( 
          <>
          
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

          </>
     );
}
 
export default BookingItem;