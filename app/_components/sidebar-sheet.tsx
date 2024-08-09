import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/seach"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"


const SidebarSheet = () => {
    return ( 
        

        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="py-5 gap-3 border-b flex items-center border-solid">
                <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </Avatar>

                <div>
                    <p className="font-bold">Pedro Henrique</p>
                    <p className="text-xs">phhenrk3333@gmail.com</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">

               <SheetClose asChild>
               <Button className="justify-start gap-2" variant="ghost" asChild>
                    <Link href="/">
                        <HomeIcon size={18} />
                        Inicio
                    </Link>
                </Button>
               </SheetClose>

                <Button className="justify-start gap-2" variant="ghost">
                    <CalendarIcon size={18} />
                    Agendamento
                </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
                {quickSearchOptions.map(Option => (
                    <Button
                        key={Option.title}
                        className="justify-start gap-2"
                        variant="ghost"
                    >
                        <Image
                            alt={Option.title}
                            src={Option.imageUrl}
                            height={18} width={18}
                        />
                        {Option.title}
                    </Button>
                ))}

            </div>


            <div className="flex flex-col gap-2 py-5">
                <Button variant="ghost" className="justify-start gap-2">
                    <LogOutIcon size={18} />
                    Sair da conta
                </Button>
            </div>
        </SheetContent>

     );
}
 
export default SidebarSheet