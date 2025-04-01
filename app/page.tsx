import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Google Planning System</h1>
          <p className="text-gray-600">Camera deployment and optimization</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

