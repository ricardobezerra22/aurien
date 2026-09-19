import { describe, expect, it } from "vitest";
import {
	AppError,
	ConflictError,
	ForbiddenError,
	HttpStatus,
	NotFoundError,
	toErrorResponse,
	UnauthorizedError,
	ValidationError,
} from "@/lib/errors";

describe("HttpStatus", () => {
	it("exports standard codes", () => {
		expect(HttpStatus.OK).toBe(200);
		expect(HttpStatus.NOT_FOUND).toBe(404);
		expect(HttpStatus.INTERNAL_SERVER_ERROR).toBe(500);
	});
});

describe("AppError", () => {
	it("defaults to 500 INTERNAL_ERROR", () => {
		const err = new AppError("boom");
		expect(err.statusCode).toBe(500);
		expect(err.code).toBe("INTERNAL_ERROR");
		expect(err.message).toBe("boom");
		expect(err.name).toBe("AppError");
	});

	it("accepts custom status and code", () => {
		const err = new AppError("bad", HttpStatus.BAD_REQUEST, "CUSTOM");
		expect(err.statusCode).toBe(400);
		expect(err.code).toBe("CUSTOM");
	});

	it("is an instance of Error", () => {
		expect(new AppError("x")).toBeInstanceOf(Error);
	});
});

describe("domain error subclasses", () => {
	it("NotFoundError defaults resource to 'Resource'", () => {
		const err = new NotFoundError();
		expect(err.statusCode).toBe(404);
		expect(err.code).toBe("NOT_FOUND");
		expect(err.message).toBe("Resource not found");
	});

	it("NotFoundError accepts a resource name", () => {
		expect(new NotFoundError("User").message).toBe("User not found");
	});

	it("UnauthorizedError", () => {
		const err = new UnauthorizedError();
		expect(err.statusCode).toBe(401);
		expect(err.code).toBe("UNAUTHORIZED");
	});

	it("ForbiddenError", () => {
		const err = new ForbiddenError();
		expect(err.statusCode).toBe(403);
		expect(err.code).toBe("FORBIDDEN");
	});

	it("ValidationError", () => {
		const err = new ValidationError("email is required");
		expect(err.statusCode).toBe(400);
		expect(err.code).toBe("VALIDATION_ERROR");
		expect(err.message).toBe("email is required");
	});

	it("ConflictError defaults resource", () => {
		const err = new ConflictError();
		expect(err.statusCode).toBe(409);
		expect(err.message).toBe("Resource already exists");
	});

	it("ConflictError accepts a resource name", () => {
		expect(new ConflictError("Email").message).toBe("Email already exists");
	});
});

describe("toErrorResponse", () => {
	it("maps AppError to a JSON response", async () => {
		const res = toErrorResponse(new NotFoundError("Session"));
		expect(res.status).toBe(404);
		const body = await res.json();
		expect(body).toEqual({ error: "Session not found", code: "NOT_FOUND" });
	});

	it("maps unknown errors to 500", async () => {
		const res = toErrorResponse(new Error("unknown"));
		expect(res.status).toBe(500);
		const body = await res.json();
		expect(body.code).toBe("INTERNAL_ERROR");
	});

	it("maps non-Error throws to 500", async () => {
		const res = toErrorResponse("string error");
		expect(res.status).toBe(500);
	});
});
