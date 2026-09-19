import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockCreate } = vi.hoisted(() => ({ mockCreate: vi.fn() }));

vi.mock("@/lib/prisma", () => ({
	prisma: { waitlistEntry: { create: mockCreate } },
}));

vi.mock("@/lib/mailer", () => ({
	sendEmail: vi.fn().mockResolvedValue(undefined),
}));

import { joinWaitlist } from "@/lib/actions/waitlist";

function makeFormData(fields: Record<string, string>): FormData {
	const fd = new FormData();
	for (const [k, v] of Object.entries(fields)) fd.append(k, v);
	return fd;
}

const idle = { status: "idle" } as const;

describe("joinWaitlist", () => {
	beforeEach(() => vi.clearAllMocks());

	it("creates entry and returns success for valid email", async () => {
		mockCreate.mockResolvedValue({
			id: "1",
			email: "test@example.com",
			locale: "en",
			createdAt: new Date(),
		});
		const result = await joinWaitlist(
			idle,
			makeFormData({ email: "test@example.com", locale: "en" }),
		);
		expect(result).toEqual({ status: "success" });
		expect(mockCreate).toHaveBeenCalledWith({
			data: { email: "test@example.com", locale: "en" },
		});
	});

	it("returns error for invalid email (no @)", async () => {
		const result = await joinWaitlist(
			idle,
			makeFormData({ email: "notanemail", locale: "en" }),
		);
		expect(result.status).toBe("error");
		expect(mockCreate).not.toHaveBeenCalled();
	});

	it("returns error for email exceeding 254 characters", async () => {
		const longEmail = `${"a".repeat(250)}@b.com`;
		const result = await joinWaitlist(
			idle,
			makeFormData({ email: longEmail, locale: "en" }),
		);
		expect(result.status).toBe("error");
		expect(mockCreate).not.toHaveBeenCalled();
	});

	it("returns error for empty email", async () => {
		const result = await joinWaitlist(
			idle,
			makeFormData({ email: "", locale: "en" }),
		);
		expect(result.status).toBe("error");
		expect(mockCreate).not.toHaveBeenCalled();
	});

	it("silently deduplicates on P2002 unique constraint violation", async () => {
		mockCreate.mockRejectedValue({ code: "P2002" });
		const result = await joinWaitlist(
			idle,
			makeFormData({ email: "dupe@example.com", locale: "en" }),
		);
		expect(result).toEqual({ status: "success" });
	});

	it("rethrows unknown database errors", async () => {
		mockCreate.mockRejectedValue(new Error("connection refused"));
		await expect(
			joinWaitlist(
				idle,
				makeFormData({ email: "test@example.com", locale: "en" }),
			),
		).rejects.toThrow("connection refused");
	});

	it("defaults locale to en when not provided", async () => {
		mockCreate.mockResolvedValue({
			id: "2",
			email: "test@example.com",
			locale: "en",
			createdAt: new Date(),
		});
		const result = await joinWaitlist(
			idle,
			makeFormData({ email: "test@example.com" }),
		);
		expect(result).toEqual({ status: "success" });
		expect(mockCreate).toHaveBeenCalledWith({
			data: { email: "test@example.com", locale: "en" },
		});
	});
});
