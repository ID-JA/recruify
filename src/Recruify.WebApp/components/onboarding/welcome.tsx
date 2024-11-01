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

      <div className="flex justify-center items-center bg-red-500 h-[200px]">
        Image here
      </div>

      <h1 className="text-lg font-bold text-center">
        Welcome to FastRecruiter
      </h1>
      <p className="text-gray-600 text-sm  text-center">
        We're excited to have you onboard. Let's get you set up so you can hit
        the ground running.
      </p>
    </>
  )
}
