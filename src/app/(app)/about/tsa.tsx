import {
    MorphingDialog,
    MorphingDialogImage,
    MorphingDialogTitle,
    MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import {PlusIcon} from "lucide-react";
import React from "react";

const Tsa = (): React.ReactNode => {
    return (
        <MorphingDialog>
            <div className="flex flex-col">
                <a href={"/references"} target="_blank" rel="noopener noreferrer">
                    <MorphingDialogTrigger
                        style={{
                            borderRadius: "12px",
                        }}
                        className="flex flex-col overflow-hidden border"
                    >
                        <MorphingDialogImage
                            src="/about/tsa.jpg"
                            alt="our story"
                            className="h-56 w-full object-cover"
                        />
                        <div className="flex grow flex-row items-center justify-between px-3 py-3 border-t">
                            <div>
                                <MorphingDialogTitle className="text-xl font-semibold text-primary">
                                    REFERENCES
                                </MorphingDialogTitle>
                            </div>
                            <button
                                type="button"
                                className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border text-primary hover:bg-primary/10 transition-all"
                                aria-label="Open dialog"
                            >
                                <PlusIcon size={12} />
                            </button>
                        </div>
                    </MorphingDialogTrigger>
                </a>
            </div>
        </MorphingDialog>
    );
};

export default Tsa;
