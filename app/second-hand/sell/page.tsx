"use client"
import Link from "next/link";

// export const metadata = {
//   title: "Sell Second Hand Vehicle - JABA Motors",
//   description: "Create a listing to sell your second hand vehicle.",
// };

export default function SellSecondHandPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Sell Your Second Hand Vehicle</h1>
      <p className="mb-6 text-foreground/80">A simple form will go here for listing a vehicle.</p>

      <section>
        <p className="text-foreground/80">Placeholder form (to be implemented).</p>
        <div className="mt-6">
          <Link href="/second-hand" className="text-sm text-foreground/80 hover:text-jaba-gold">
            Back to Second Hand listings
          </Link>
        </div>
      </section>
    </main>
  );
}
