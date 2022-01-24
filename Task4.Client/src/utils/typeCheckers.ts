import { ErrorMessage, ValidationError } from "../lib/ErrorMessage";

export function instanseOfErrorMessage(obj: any): obj is ErrorMessage {
    if (obj instanceof Object) {
        return 'description' in obj
    }

    return false;
}

export function instanceOfValidationError(obj: any): obj is ValidationError {
    if (obj instanceof Object) {
        return 'errors' in obj
    }

    return false
}
