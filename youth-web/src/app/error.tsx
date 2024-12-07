"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  BadRequestPage,
  UnauthorizedPage,
  UnauthenticatedPage,
  InternalServerErrorPage,
  NotImplementedPage,
  ServiceUnavailablePage,
} from "@/components/common/error/error";
import { PageError } from "@/lib/exceptions";

interface ErrorProps {
  error: PageError;
}

export default function Error({ error }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    switch (error.name) {
      case "BadRequestError":
        router.replace("/400");
        break;
      /* case "UnauthorizedError":
        router.replace("/403");
        break;
      case "UnauthenticatedError":
        router.replace("/401");
        break; */
      case "InternalServerError":
        router.replace("/500");
        break;
      case "NotImplementedError":
        router.replace("/501");
        break;
      case "ServiceUnavailableError":
        router.replace("/503");
        break;
    }
  }, [error, router]);

  switch (error.name) {
    case "BadRequestError":
      return <BadRequestPage error={error} />;
    case "UnauthorizedError":
      return <UnauthorizedPage error={error} />;
    case "UnauthenticatedError":
      return <UnauthenticatedPage error={error} />;
    case "InternalServerError":
      return <InternalServerErrorPage error={error} />;
    case "NotImplementedError":
      return <NotImplementedPage error={error} />;
    case "ServiceUnavailableError":
      return <ServiceUnavailablePage error={error} />;
  }
}
