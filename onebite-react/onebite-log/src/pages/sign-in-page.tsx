import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import { useState } from "react";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password.ts";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithOauth } from "@/hooks/mutations/use-sign-in-with-oauth.ts";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error.ts";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, { position: "top-center" });

        setPassword("");
      },
    });
  const { mutate: signInWithGitHub, isPending: isSignInWithOauthPending } =
    useSignInWithOauth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, { position: "top-center" });
      },
    });

  const handleSingInWithPasswordClick = () => {
    if (email.trim() === "" || password.trim() === "") return;
    signInWithPassword({ email, password });
  };

  const handleSignInWithGitHubClick = () => {
    signInWithGitHub("github");
  };

  const isPending = isSignInWithPasswordPending || isSignInWithOauthPending;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          type="email"
          placeholder="example@abc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <Input
          className="py-6"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={handleSingInWithPasswordClick}
          disabled={isPending}
        >
          로그인
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={handleSignInWithGitHubClick}
          disabled={isPending}
        >
          <img className="h-4 w-4" src={gitHubLogo} alt="" />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground hover:underline" to="/sign-up">
          계정이 없으시다면? 회원가입
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to="/forget-password"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
