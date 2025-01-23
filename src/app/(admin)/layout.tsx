import AdminNavbar from "@/components/admin/admin-navbar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}): Promise<React.JSX.Element> {
    return (
        <>
            <AdminNavbar />
            {children}
        </>
    );
}
