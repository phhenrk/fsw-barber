import { Card, CardContent } from "./ui/card";

const Footer = () => {
    return (
        
        <footer>

        {/* descrição final da pagina */}
        <Card>
            <CardContent className="px-5 py-6">
                <p className="text-sm text-gray-400 text-center">
                    © 2024 Copyright
                    <span className="font-bold">FSW Barber</span>
                </p>
            </CardContent>
        </Card>
    </footer>
      );
}
 
export default Footer;