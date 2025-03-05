import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1a1f24]">
      <SignIn />
    </div>
  )
}

