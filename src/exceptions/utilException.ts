class utilException extends Error {
    public status: number;
    public message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = `Util error: ${message}`;
    }
}

export default utilException;
