import socketRequestModel0 from "../models/request/socket/0.json";
import socketCommonResponseModel0 from "../models/response/common/socket/0.json";

export interface Endpoint<
    APIRequest,
    APICommonResponse,
    APIErrorResponse = null
> {
    readonly model: {
        request?: APIRequest;
        response: {
            common: APICommonResponse;
            error?: APIErrorResponse;
        };
    };
    readonly path: string;
    readonly type: "http" | "socket";
    readonly method?: "get" | "post";
}

export { socketRequestModel0, socketCommonResponseModel0 };

const socket: Endpoint<
    typeof socketRequestModel0,
    typeof socketCommonResponseModel0
> = {
    path: "/api/socket",
    type: "socket",
    model: {
        request: { ...socketRequestModel0 },
        response: { common: { ...socketCommonResponseModel0 } },
    },
};

export const apiConfig = {
    backend:
        process.env.NODE_ENV === "production"
            ? `${window.location.host}`
            : `${process.env.REACT_APP_BACKEND}`,
    endpoints: { socket },
};
