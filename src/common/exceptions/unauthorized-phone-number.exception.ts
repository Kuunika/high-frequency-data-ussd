

export class UnauthorizedPhoneNumberException extends Error {
    constructor(unauthorizedPhoneNumber: string) {
        super(`END The number ${unauthorizedPhoneNumber} is in not allowed to access the system`);
        Object.setPrototypeOf(this, UnauthorizedPhoneNumberException.prototype);
    }
}