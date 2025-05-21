import {LoaderCircle} from "lucide-react";

export default function Loading(): JSX.Element {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex flex-1 h-screen items-center justify-center">
            <LoaderCircle className="animate-spin text-primary" size={30} />
        </div>
    );
}
