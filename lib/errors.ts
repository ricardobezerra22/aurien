export const HttpStatus = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	UNPROCESSABLE: 422,
	TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus];

export class AppError extends Error {
	constructor(
		message: string,
		public readonly statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
		public readonly code: string = "INTERNAL_ERROR",
	) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class NotFoundError extends AppError {
	constructor(resource = "Resource") {
		super(`${resource} not found`, HttpStatus.NOT_FOUND, "NOT_FOUND");
	}
}

export class UnauthorizedError extends AppError {
	constructor() {
		super("Unauthorized", HttpStatus.UNAUTHORIZED, "UNAUTHORIZED");
	}
}

export class ForbiddenError extends AppError {
	constructor() {
		super("Forbidden", HttpStatus.FORBIDDEN, "FORBIDDEN");
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, HttpStatus.BAD_REQUEST, "VALIDATION_ERROR");
	}
}

export class ConflictError extends AppError {
	constructor(resource = "Resource") {
		super(`${resource} already exists`, HttpStatus.CONFLICT, "CONFLICT");
	}
}

/** Converts any thrown value into a JSON Response. Use at API route boundaries. */
export function toErrorResponse(error: unknown): Response {
	if (error instanceof AppError) {
		return Response.json(
			{ error: error.message, code: error.code },
			{ status: error.statusCode },
		);
	}
	return Response.json(
		{ error: "Internal server error", code: "INTERNAL_ERROR" },
		{ status: HttpStatus.INTERNAL_SERVER_ERROR },
	);
}
