import { useEffect, useState } from "react"
import axios from "axios"

interface OneTapSigninOptions {
  parentContainerId?: string
}

const useOneTapSignin = (opt?: OneTapSigninOptions) => {
  const { parentContainerId } = opt || {}
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      const { google } = window as any
      if (google) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          cancel_on_tap_outside: false,
          callback: async (response: any) => {
            setIsLoading(true)
            try {
              const res = await axios.post(
                `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/auth/google-ontap-signin`,
                {
                  credential: response.credential,
                }
              )
              // store the token
            } catch (error) {
              console.error(error)
            }
            setIsLoading(false)
          },
          prompt_parent_id: parentContainerId,
          style:
            "position: absolute; top: 100px; right: 30px;width: 0; height: 0; z-index: 1001;",
        })
        google.accounts.id.prompt()
      }
    }
  }, [isLoading, parentContainerId])

  return { isLoading }
}

export default useOneTapSignin
