"use client";
import { useCallback, useEffect, useState } from "react";
import {
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth, provider } from "../../../firebaseConfig";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const saveTokenAndContinue = useCallback(
    async (user) => {
      const token = await user.getIdToken();
      const isHttps = window.location.protocol === "https:";
      document.cookie = `firebaseAuthToken=${token}; Path=/; Max-Age=3600; SameSite=Lax${isHttps ? "; Secure" : ""}`;
      router.push("/");
    },
    [router],
  );

  useEffect(() => {
    const completeRedirectLogin = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          await saveTokenAndContinue(result.user);
        }
      } catch (error) {
        console.error("Redirect sign-in failed:", error);
      }
    };

    completeRedirectLogin();
  }, [saveTokenAndContinue]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      await saveTokenAndContinue(result.user);
    } catch (error) {
      if (error?.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, provider);
        return;
      }
      console.error("Google sign-in failed:", error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex items-center justify-center">
      <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/90 backdrop-blur w-full max-w-5xl mx-auto">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[#0F52BA]/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-14 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-neutral-800">
            <p className="text-xs tracking-[0.25em] uppercase text-neutral-400">
              PromptResume
            </p>
            <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold leading-tight">
              Build job-winning resumes with AI precision.
            </h1>
            <p className="mt-5 text-neutral-300 leading-relaxed max-w-md">
              Save your progress, get stronger role-aligned suggestions, and
              export polished resumes ready for recruiters.
            </p>

            <div className="space-y-3 text-sm text-neutral-300 mt-8">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#0F52BA]" />
                ATS-aware improvement suggestions
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Live preview with clean PDF export
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Step-by-step resume builder workflow
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 flex items-center">
            <div className="w-full max-w-md mx-auto flex flex-col items-center ">
              <h2 className="text-3xl font-bold">Sign in or sign up</h2>
              <p className="mt-2 text-sm text-neutral-400">
                Continue with Google to access your resume workspace.
              </p>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className=" select-none cursor-pointer mt-8 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-semibold hover:border-[#0F52BA] transition flex items-center justify-center gap-3"
              >
                <Image
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                {loading ? "Please wait..." : "Continue with Google"}
              </button>

              <p className="mt-4 text-center text-xs text-neutral-500">
                By continuing, you agree to our terms and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
