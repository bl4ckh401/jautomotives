import Link from "next/link"
import { AdminInitButton } from "@/components/adminInitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="bg-[#1a1f24] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">About JABA Automobiles</h4>
            <ul>
              <li>
                <Link href="/about" className="hover:text-blue-400">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-blue-400">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-blue-400">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul>
              <li>
                <Link href="/marketplace" className="hover:text-blue-400">
                  Buy Cars
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-blue-400">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/rental" className="hover:text-blue-400">
                  Car Rental
                </Link>
              </li>
              <li>
                <Link href="/services/towing" className="hover:text-blue-400">
                  Towing Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul>
              <li>
                <Link href="/blog" className="hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <p>Kiambu Road, opposite Walkabout</p>
            <p>Phone: 0726 692704 / 0733 692704</p>
            <p>Email: info@jabaautomobiles.com</p>
          </div>
        </div>
        <Card>
  <CardHeader>
    <CardTitle>Admin Setup</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Initialize admin access for your account.</p>
    <AdminInitButton />
  </CardContent>
</Card>
        <div className="mt-8 text-center">
          <p>&copy; 2023 JABA Automobiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

