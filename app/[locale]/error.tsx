"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  const t = useTranslations("errors");
  const tCommon = useTranslations("common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh items-center justify-center px-5">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-auren-error/10">
          <AlertCircle size={24} className="text-auren-error" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium tracking-[-0.03em] text-text-primary">
            {t("errorTitle")}
          </h1>
          <p className="text-sm leading-relaxed text-text-secondary">
            {t("errorDescription")}
          </p>
          {error.digest && (
            <p className="text-xs text-text-muted font-mono mt-1">
              {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-auren-border text-forest hover:bg-surface-muted rounded-[12px]"
            onClick={() => history.back()}
          >
            {tCommon("back")}
          </Button>
          <Button
            className="bg-forest text-white hover:bg-forest-light rounded-[12px]"
            onClick={reset}
          >
            {t("retry")}
          </Button>
        </div>
      </div>
    </div>
  );
}
