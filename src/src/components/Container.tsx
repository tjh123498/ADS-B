import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ContainerProps<T = ReactNode> {
    readonly className?: string;
    readonly toaster?: boolean;
    readonly children: T;
}

export const Container = (props: ContainerProps) => {
    const { className, children, toaster } = props;
    return (
        <div className={className}>
            {children}
            {toaster && <Toaster />}
        </div>
    );
};
