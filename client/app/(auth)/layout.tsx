"use client"

import useOneTapSignin from "@/hooks/useOneTapSignIn"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useOneTapSignin({
    parentContainerId: "oneTap",
  })
  return (
    <>
      {children}
      <div
        id="oneTap"
        style={{ position: "absolute", top: "20px", right: "20px" }}
      />
    </>
  )
}
