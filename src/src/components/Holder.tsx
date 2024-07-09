import { ReactNode, useState } from "react";
import collapseIcon from "../assets/icons/square-caret-up-solid.svg";

export interface HolderProps<T = ReactNode> {
    readonly label: string;
    readonly children?: T;
    readonly open?: boolean;
}

export const Holder = (props: HolderProps) => {
    const { label, open, children } = props;

    const [isOpened, setIsOpened] = useState(open);

    return (
        <div className="mb-4 flex flex-col rounded-xl text-gray-700 shadow-lg">
            <div className="p-4">
                <div
                    className="text-md font-bold text-gray-800 flex cursor-pointer select-none"
                    onClick={() => { setIsOpened(!isOpened); }}
                >
                    <img
                        className={`mx-1 ${isOpened ? "rotate-180" : ""}`}
                        src={collapseIcon}
                        alt=""
                    />
                    <span className="ml-2">
                        {label}
                    </span>
                </div>
                {!!children && (
                    <div className={isOpened ? "block" : "hidden"}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};
