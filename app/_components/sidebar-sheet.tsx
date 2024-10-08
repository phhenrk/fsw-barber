"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/seach"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SignInDialog from "./sign-in-dialog"



const SidebarSheet = () => {

    const { data } = useSession()
    const handleLogoutClick = () => signOut()

    

    return (


        <SheetContent className="overflow-y-auto">
            {/*sistema de configuração quando esta logado*/}
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="py-5 gap-3 border-b flex items-center justify-between border-solid">

                {data?.user ? (
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={data?.user.image ?? ''} />
                        </Avatar>

                        <div>
                            <p className="font-bold">{data.user.name}</p>
                            <p className="text-xs">{data.user.email}</p>
                        </div>

                    </div>

                ) : (


                    <>
                        {/*sistema de login quando não tem usuario logado */}
                        <h2 className=" font-bold">Olá, faça seu login</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <SignInDialog />
                            </DialogContent>
                        </Dialog>

                    </>
                )}

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

                <Button className="justify-start gap-2" variant="ghost" asChild>
                <Link href="/bookings">
                <CalendarIcon size={18} />
                Agendamento
                </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
                {quickSearchOptions.map(Option => (
                    <SheetClose key={Option.title} asChild>
                        <Button
                            className="justify-start gap-2"
                            variant="ghost"
                            asChild
                        >
                            <Link href={`/barbershops?service=${Option.title}`}>
                                <Image
                                    alt={Option.title}
                                    src={Option.imageUrl}
                                    height={18} width={18}
                                />
                                {Option.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}

            </div>

            {/* condição para sair da conta logado */}

            {data?.user && (
                
                <div className="flex flex-col gap-2 py-5" >
                    <Button variant="ghost"
                        className="justify-start gap-2"
                        onClick={handleLogoutClick}
                    >
                        <LogOutIcon size={18} />
                        Sair da conta
                    </Button>
                </div>
            )}

            

        </SheetContent>

    );
}

export default SidebarSheet