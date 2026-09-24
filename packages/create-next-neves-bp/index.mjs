#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// ── Update this once you push to GitHub ──────────────────────────────────────
const REPO = "https://github.com/YOUR_USERNAME/next-neves-bp";
// ─────────────────────────────────────────────────────────────────────────────

const rl = createInterface({ input, output });

async function ask(label, fallback) {
  const answer = await rl.question(`  ${label}${fallback ? ` (${fallback})` : ""}: `);
  return answer.trim() || fallback || "";
}

async function main() {
  const projectName = process.argv[2];

  if (!projectName || projectName.startsWith("-")) {
    console.error("Usage: npx create-next-neves-bp <project-name>");
    process.exit(1);
  }
  if (existsSync(projectName)) {
    console.error(`Error: directory "${projectName}" already exists.`);
    process.exit(1);
  }

  console.log("\n◎  next-neves-bp — configure your brand\n");

  const name        = await ask("Brand name",             "MyApp");
  const tagline     = await ask("Tagline",                "Your tagline here.");
  const description = await ask("Description",            "Your app description.");
  const fromEmail   = await ask("Sender email (Resend)",  "noreply@myapp.com");
  const primary     = await ask("Primary color (hex)",    "#173B36");
  const accent      = await ask("Accent color (hex)",     "#7E9B91");
  const bg          = await ask("Background color (hex)", "#F7F6F2");

  rl.close();

  const dest = join(process.cwd(), projectName);

  // Clone
  console.log(`\n  Cloning template into ./${projectName} …`);
  execFileSync("git", ["clone", "--depth", "1", REPO, projectName], { stdio: "inherit" });
  rmSync(join(dest, ".git"), { recursive: true, force: true });

  // Patch brand.config.json
  const configPath = join(dest, "brand.config.json");
  const config = JSON.parse(readFileSync(configPath, "utf8"));

  config.meta.name        = name;
  config.meta.tagline     = tagline;
  config.meta.description = description;
  config.meta.from_email  = fromEmail;
  config.colors.primary   = primary;
  config.colors.accent    = accent;
  config.colors.bg        = bg;

  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
  console.log("  ✓ brand.config.json patched");

  // Generate CSS tokens
  console.log("  Generating design tokens …");
  execFileSync("node", ["scripts/generate-tokens.mjs"], { cwd: dest, stdio: "inherit" });

  // Install
  console.log("  Installing dependencies …");
  execFileSync("yarn", ["install"], { cwd: dest, stdio: "inherit" });

  const bold = (s) => `\x1b[1m${s}\x1b[0m`;
  const dim  = (s) => `\x1b[2m${s}\x1b[0m`;

  console.log(`
  ${bold("Done!")} Your ${name} project is ready.

  ${dim("Next steps:")}

    cd ${projectName}
    cp .env.example .env       ${dim("# fill in DB, auth, Stripe, Resend")}
    yarn dev                   ${dim("# http://localhost:3000")}

  ${dim("To update the design system later:")}

    ${dim("1.")} Edit ${bold("brand.config.json")}
    ${dim("2.")} Run  ${bold("yarn tokens")}
`);
}

main().catch((err) => {
  console.error(`\n  Error: ${err.message}`);
  process.exit(1);
});
