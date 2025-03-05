import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}): Promise<React.JSX.Element> {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                {children}
            </div>
            <Footer />
        </>
    );
}
