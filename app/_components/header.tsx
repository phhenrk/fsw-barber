import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/seach"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"




const Header = () => {
    return (
        <Card>
            {/* HEADER IMAGE E BOTÃO DE MENU */}
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Image alt="logo fsw barber" src="/logo.png" height={18} width={120} />

                {/* ABA DE MENU  */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                            {/* TEXTOS DE MENU E OS OUTROS */}
                        </Button>
                    </SheetTrigger>
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
                </Sheet>
            </CardContent>
        </Card>
    )
}

export default Header