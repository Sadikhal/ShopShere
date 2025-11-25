import Link from "next/link";
import { Button } from "@/components/ui";

/**
 * 404 Not Found Page
 * Displayed when user navigates to a non-existent route
 * Provides a button to return to home page
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-[#f1f5f9] mb-4">
        404
      </h2>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
        Oops! We couldn't find the page you're looking for.
      </p>
      <Link href="/">
        <Button size="lg">Return Home</Button>
      </Link>
    </div>
  );
}
