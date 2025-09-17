import Link from "next/link"
import { AdminInitButton } from "@/components/adminInitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="bg-background text-pale_purple py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">About JABA Automobiles</h4>
            <ul>
              <li>
                <Link href="/about" className="hover:text-primary text-black dark:text-gray-100">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-primary text-black dark:text-gray-100">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary text-black dark:text-gray-100">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul>
              <li>
                <Link href="/marketplace" className="hover:text-primary text-black dark:text-gray-100">
                  Buy Cars Kenya
                </Link>
              </li>
              <li>
                <Link href="/second-hand" className="hover:text-primary text-black dark:text-gray-100">
                  Second Hand Cars
                </Link>
              </li>
              <li>
                <Link href="/direct-import" className="hover:text-primary text-black dark:text-gray-100">
                  Import Cars Kenya
                </Link>
              </li>
              <li>
                <Link href="/motorbikes" className="hover:text-primary text-black dark:text-gray-100">
                  Motorbikes Kenya
                </Link>
              </li>
              <li>
                <Link href="/rental" className="hover:text-primary text-black dark:text-gray-100">
                  Car Rental
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul>
              <li>
                <Link href="/blog" className="hover:text-primary text-black dark:text-gray-100">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary text-black dark:text-gray-100">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary text-black dark:text-gray-100">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary text-black dark:text-gray-100">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact JABA Automobiles Kenya</h4>
            <p className="text-black dark:text-gray-100">Kiambu Road, opposite Walkabout, Nairobi</p>
            <p className="text-black dark:text-gray-100">Phone: +254 795 684601 / +254 733 692704</p>
            <p className="text-black dark:text-gray-100">Email: jabaautos@gmail.com</p>
            <p className="text-black dark:text-gray-100 text-sm mt-2">Serving: Nairobi, Mombasa, Kisumu, Nakuru, Eldoret</p>
          </div>
        </div>
        {/* <Card>
  <CardHeader>
    <CardTitle>Admin Setup</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Initialize admin access for your account.</p>
    <AdminInitButton />
  </CardContent>
</Card> */}
        <div className="mt-8 text-center">
          <p className="text-black dark:text-gray-100">&copy; 2025 JABA Automobiles Kenya. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Kenya's #1 Car Dealer | Buy Cars, Motorbikes, Import Vehicles | Toyota, Nissan, Subaru, Mercedes, BMW
          </p>
        </div>
      </div>
    </footer>
  )
}

