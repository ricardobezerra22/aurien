import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockUpdate, mockConstructEvent } = vi.hoisted(() => ({
  mockUpdate: vi.fn(),
  mockConstructEvent: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: { user: { update: mockUpdate } },
}));

vi.mock("@/lib/stripe", () => ({
  getStripe: () => ({ webhooks: { constructEvent: mockConstructEvent } }),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

import { POST } from "@/app/api/stripe/webhook/route";
import { headers } from "next/headers";

function makeRequest(body = "{}") {
  return new Request("http://localhost/api/stripe/webhook", { method: "POST", body });
}

beforeEach(() => vi.clearAllMocks());

describe("POST /api/stripe/webhook", () => {
  it("returns 400 when stripe-signature is missing", async () => {
    vi.mocked(headers).mockResolvedValue(new Headers() as any);
    const res = await POST(makeRequest());
    expect(res.status).toBe(400);
  });

  it("returns 400 when signature verification fails", async () => {
    vi.mocked(headers).mockResolvedValue(
      new Headers({ "stripe-signature": "bad" }) as any
    );
    mockConstructEvent.mockImplementation(() => {
      throw new Error("Invalid signature");
    });
    const res = await POST(makeRequest());
    expect(res.status).toBe(400);
  });

  it("updates stripeCustomerId on checkout.session.completed", async () => {
    vi.mocked(headers).mockResolvedValue(
      new Headers({ "stripe-signature": "sig_test" }) as any
    );
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: { customer: "cus_123", client_reference_id: "user_abc" } },
    });

    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "user_abc" },
      data: { stripeCustomerId: "cus_123" },
    });
  });
});
