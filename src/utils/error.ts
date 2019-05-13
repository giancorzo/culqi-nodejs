export interface ErrorInfo {
  code: string;
  message: string;
}

/**
 * SDK error code structure. This extends Error.
 *
 * @param {ErrorInfo} errorInfo The error information (code and message).
 * @constructor
 */
export class SDKError extends Error {

  constructor(private errorInfo: ErrorInfo) {
    super(errorInfo.message);
    (this as any).__proto__ = SDKError.prototype;
  }

  /** @return {string} The error code. */
  public get code(): string {
    return this.errorInfo.code;
  }

  /** @return {string} The error message. */
  public get message(): string {
    return this.errorInfo.message;
  }

  /** @return {object} The object representation of the error. */
  public toJSON(): object {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export class AppErrorCodes {
  public static INTERNAL_ERROR = 'internal-error';
  public static INVALID_SDK_OPTIONS = 'invalid-sdk-options';
  public static NETWORK_ERROR = 'network-error';
  public static NETWORK_TIMEOUT = 'network-timeout';
  public static UNABLE_TO_PARSE_RESPONSE = 'unable-to-parse-response';
  public static INVALID_ARGUMENTS = 'invalid-arguments'
}