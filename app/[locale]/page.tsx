"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe } from "lucide-react";
import { routing } from "@/i18n/routing";const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: EASE },
  }),
};

const localeLabels: Record<string, string> = {
  en: "EN",
  "pt-BR": "PT",
  es: "ES",
};

export default function LandingPage() {
  const t = useTranslations("landing");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tAuth = useTranslations("auth");
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = useLocale();

  function switchLocale(locale: string) {
    router.replace(pathname, { locale });
  }

  return (
    <main className="flex flex-col min-h-svh">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-auren-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12 flex h-16 items-center justify-between">
          <span className="text-forest font-medium tracking-[-0.03em] text-lg">
            Auren
          </span>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-text-muted" />
            {routing.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                  locale === currentLocale
                    ? "bg-forest text-white"
                    : "text-text-secondary hover:text-forest"
                }`}
              >
                {localeLabels[locale]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-170 flex flex-col items-center text-center gap-8">
          {/* Abstract symbol */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative w-16 h-16"
          >
            <div className="absolute inset-0 rounded-full bg-sage opacity-40" />
            <div className="absolute inset-0 translate-x-4 translate-y-2 rounded-full bg-sage-light opacity-30" />
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Badge
              variant="secondary"
              className="bg-surface-muted text-forest-light border-none text-xs tracking-[0.04em] uppercase"
            >
              {tNav("screening")}
            </Badge>
          </motion.div>

          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[40px] leading-[1.05] tracking-[-0.04em] text-text-primary font-normal"
          >
            {t("tagline")}
          </motion.h1>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base leading-[1.55] text-text-secondary max-w-120"
          >
            {t("description")}
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="h-14 px-8 bg-forest text-white hover:bg-forest-light rounded-[12px] font-medium text-base gap-2"
            >
              {t("cta")}
              <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-8 bg-secondary text-forest hover:bg-mist rounded-[12px] font-medium text-base"
            >
              {t("ctaSecondary")}
            </Button>
          </motion.div>

          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xs text-text-muted leading-[1.4] tracking-[0.04em]"
          >
            {t("disclaimer")}
          </motion.p>
        </div>
      </section>

      {/* Sign in CTA */}
      <section className="border-t border-auren-border px-5 py-8 text-center">
        <p className="text-sm text-text-secondary mb-4">
          {tAuth("signInDescription")}
        </p>
        <Button
          variant="outline"
          className="border-auren-border text-forest hover:bg-surface-muted rounded-[12px]"
        >
          {tCommon("signIn")}
        </Button>
      </section>
    </main>
  );
}
