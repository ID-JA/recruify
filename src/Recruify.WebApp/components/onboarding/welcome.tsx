export function Welcome() {
  return (
    <>
      {/* <Image
        className="mx-auto object-contain"
        src="/hero-illustration.webp"
        alt="Hero Illustration"
        width={400}
        height={400}
      /> */}

      <div className="flex h-[200px] items-center justify-center bg-red-500">
        Image here
      </div>

      <h1 className="text-center text-lg font-bold">
        Welcome to FastRecruiter
      </h1>
      <p className="text-center text-sm text-gray-600">
        We're excited to have you onboard. Let's get you set up so you can hit
        the ground running.
      </p>
    </>
  )
}
