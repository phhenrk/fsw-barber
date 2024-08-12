import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"




const Header = () => {
    return (
        <Card>
            {/* HEADER IMAGE E BOTÃO DE MENU */}
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Link href="/">
                    <Image alt="logo fsw barber" src="/logo.png" height={18} width={120} />
                </Link>

                {/* ABA DE MENU  */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                            {/* TEXTOS DE MENU E OS OUTROS */}
                        </Button>
                    </SheetTrigger>
                    <SidebarSheet />
                </Sheet>
            </CardContent>
        </Card>
    )
}

export default Header