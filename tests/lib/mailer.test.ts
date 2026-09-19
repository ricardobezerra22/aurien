import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockSend, MockResend } = vi.hoisted(() => {
	const mockSend = vi.fn();
	// Regular function so `new MockResend()` works
	function MockResend() {
		return { emails: { send: mockSend } };
	}
	return { mockSend, MockResend };
});

vi.mock("resend", () => ({ Resend: MockResend }));

import { getResend, sendEmail } from "@/lib/mailer";

const makeResend = () => ({ emails: { send: mockSend } }) as any;

// Tests run sequentially — singleton starts null:
// 1. null + no key → throws (singleton stays null)
// 2. null + key set → creates instance
// 3. instance exists → returns same ref (no new Resend call)
describe("getResend", () => {
	it("throws when RESEND_API_KEY is not set", () => {
		const saved = process.env.RESEND_API_KEY;
		delete process.env.RESEND_API_KEY;
		expect(() => getResend()).toThrow("RESEND_API_KEY is not set");
		if (saved) process.env.RESEND_API_KEY = saved;
	});

	it("returns a client when key is set", () => {
		process.env.RESEND_API_KEY = "re_test_key";
		const client = getResend();
		expect(client).toBeDefined();
		expect(client.emails).toBeDefined();
	});

	it("returns the same instance on repeated calls", () => {
		expect(getResend()).toBe(getResend());
	});
});

describe("sendEmail", () => {
	beforeEach(() => vi.clearAllMocks());

	it("resolves on success", async () => {
		mockSend.mockResolvedValue({ data: { id: "1" }, error: null });
		await expect(
			sendEmail(
				{ to: "a@b.com", subject: "Hi", html: "<p>Hi</p>" },
				makeResend(),
			),
		).resolves.toBeUndefined();
	});

	it("throws on Resend error", async () => {
		mockSend.mockResolvedValue({
			data: null,
			error: { message: "rate limited" },
		});
		await expect(
			sendEmail(
				{ to: "a@b.com", subject: "Hi", html: "<p>Hi</p>" },
				makeResend(),
			),
		).rejects.toThrow("Resend error: rate limited");
	});

	it("applies default from address", async () => {
		mockSend.mockResolvedValue({ data: { id: "2" }, error: null });
		await sendEmail(
			{ to: "a@b.com", subject: "Hi", html: "<p>Hi</p>" },
			makeResend(),
		);
		expect(mockSend).toHaveBeenCalledWith(
			expect.objectContaining({ from: "Auren <no-reply@tryauren.com>" }),
		);
	});

	it("uses custom from when provided", async () => {
		mockSend.mockResolvedValue({ data: { id: "3" }, error: null });
		await sendEmail(
			{
				to: "a@b.com",
				subject: "Hi",
				html: "<p>Hi</p>",
				from: "custom@test.com",
			},
			makeResend(),
		);
		expect(mockSend).toHaveBeenCalledWith(
			expect.objectContaining({ from: "custom@test.com" }),
		);
	});

	it("accepts array of recipients", async () => {
		mockSend.mockResolvedValue({ data: { id: "4" }, error: null });
		await sendEmail(
			{ to: ["a@b.com", "c@d.com"], subject: "Hi", html: "<p>Hi</p>" },
			makeResend(),
		);
		expect(mockSend).toHaveBeenCalledWith(
			expect.objectContaining({ to: ["a@b.com", "c@d.com"] }),
		);
	});
});
