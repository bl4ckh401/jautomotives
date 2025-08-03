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
                  Buy Cars
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-primary text-black dark:text-gray-100">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/rental" className="hover:text-primary text-black dark:text-gray-100">
                  Car Rental
                </Link>
              </li>
              <li>
                <Link href="/services/towing" className="hover:text-primary text-black dark:text-gray-100">
                  Towing Services
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
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <p className="text-black dark:text-gray-100">Kiambu Road, opposite Walkabout</p>
            <p className="text-black dark:text-gray-100">Phone: 0726 692704 / 0733 692704</p>
            <p className="text-black dark:text-gray-100">Email: info@jabaautomobiles.com</p>
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
          <p className="text-black dark:text-gray-100">&copy; 2023 JABA Automobiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

