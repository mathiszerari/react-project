import { CommonError } from "../common/error.common";

export class BadRequestError extends CommonError {
  constructor(message: string) {
    super(400, 'BAD_REQUEST', message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
