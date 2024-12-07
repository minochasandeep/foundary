"use client";
import Image from "next/image";
import Box from "@mui/material/Box";
import { signIn, useSession } from "next-auth/react";
import styles from "../app/page.module.css";
import { Button, Typography } from "@mui/material";
import { SWRConfig } from "swr";
import useFetcher from "@/hooks/use-fetcher";

export default function SecureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  const { fetcher } = useFetcher();

  if (session.status === "loading") {
    return <></>;
  }
  if (session.status === "authenticated") {
    return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
  }
  return (
    <Box className={styles.main}>
      <Box flexDirection={"column"} className={styles.center}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ p: 2, bgcolor: "common.black" }}
        >
          <Image
            src="/images/logo.png"
            alt="Foundary"
            width={140}
            height={15}
          />
        </Box>
        <Typography variant="body1" sx={{ py: 2 }}>
          Please signin to continue
        </Typography>
        <Button onClick={() => signIn("okta", { callbackUrl: "/" })}>
          Sign In Okta
        </Button>
        <Button onClick={() => signIn("azureb2c", { callbackUrl: "/" })}>
          Sign In Azure B2C
        </Button>
      </Box>
    </Box>
  );
}
