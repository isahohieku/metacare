
interface APIResponseI {
    code: string;
    statusCode: number;
    message: string;
    data?: any[] | {} | undefined | null;
}

class APIResponse implements APIResponseI {
    public code: string;
    public statusCode: number;
    public message: string;
    public data: any;
    public pagination: any;

    public constructor(
        code: string,
        statusCode: number,
        message: string,
        data = undefined,
        pagination = undefined
    ) {
        this.code = code;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.pagination = pagination;
    }
}

export default APIResponse;