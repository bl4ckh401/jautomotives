import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1a1f24]">
      <SignUp />
    </div>
  )
}

