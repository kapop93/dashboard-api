export class HTTPError extends Error {
    stausCode: number;
    context?: string;

    constructor(statusCode: number, message: string, context?: string) {
        super(message);
        this.stausCode = statusCode;
        this.message = message;
        this.context = context;
    }
}
