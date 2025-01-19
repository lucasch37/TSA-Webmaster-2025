import Navbar from "@/components/navbar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {getMenu} from "@/lib/actions/getMenu";
import {ShoppingBag} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Menu(): Promise<React.JSX.Element> {
    const menuRes = await getMenu();
    const menu = menuRes.data;
    return (
        <>
            <Navbar />
            <div className="mt-8 container mx-auto">
                <div className="text-primary font-bold text-6xl">MENU</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-12">
                    {menu?.map((menuItem) => (
                        <Card key={menuItem.id}>
                            <CardContent>
                                <div className="h-[15rem] flex items-center justify-center">
                                    <Image
                                        src={"/landing/jalapeno-poppers.png"}
                                        width={500}
                                        height={500}
                                        alt={menuItem.name}
                                        className="mt-4 w-[15rem] mx-auto h-fit"
                                    />
                                </div>

                                <div className="h-[15rem]">
                                    <div className="text-primary font-bold text-3xl mt-3 line-clamp-2 ">
                                        {menuItem.name.toUpperCase()}
                                    </div>
                                    <div className="text-primary text-base mt-3 line-clamp-5">
                                        {menuItem.description}
                                    </div>
                                </div>

                                <Link
                                    href={`menu/${encodeURIComponent(menuItem.name)}`}
                                    className="bg-primary hover:bg-green-800 transition ease-in-out duraiton-300 text-white py-4 px-8 rounded-full flex gap-3 items-center w-full mt-3 justify-between"
                                >
                                    <div>${menuItem.price}</div>
                                    <div className="flex gap-2 items-center">
                                        ADD TO CART
                                        <ShoppingBag />
                                    </div>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
