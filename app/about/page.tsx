import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  name: string
  title: string
  image: string
  bio: string
}

const TeamCard = ({ member }: { member: TeamMember }) => (
  <div className="flex w-[292px] flex-col justify-center items-center gap-6 rounded-lg overflow-hidden">
    {/* Image Section */}
    <div className="relative w-full h-64">
      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
    </div>

    {/* Text Content */}
    <div className="flex flex-col items-center gap-3 px-4 pb-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
        <p className="text-[#93F1AD] mb-3">{member.title}</p>
        <p className="text-zinc-400 text-sm">{member.bio}</p>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="#" aria-label={`${member.name}'s LinkedIn`} className="text-[#93F1AD] hover:text-white">
          <Linkedin className="h-5 w-5" />
        </Link>
        <Link href="#" aria-label={`${member.name}'s Twitter`} className="text-[#93F1AD] hover:text-white">
          <Twitter className="h-5 w-5" />
        </Link>
      </div>
    </div>
  </div>
)

const teamMembers = [
  { name: "John Benson", title: "Co-Founder & CEO", image: "/images/team-john.jpg", bio: "John's Bio" },
  { name: "Anna Benson", title: "Co-Founder & COO", image: "/images/team-anna.jpg", bio: "Anna's Bio" },
  { name: "Michael Chen", title: "Head of Sales", image: "/images/team-michael.jpg", bio: "Michael's Bio" },
  { name: "Sarah Johnson", title: "Customer Service Manager", image: "/images/team-sarah.jpg", bio: "Sarah's Bio" },
  { name: "David Thompson", title: "Chief Mechanic", image: "/images/team-david.jpg", bio: "David's Bio" },
  { name: "Emily Rodriguez", title: "Marketing Director", image: "/images/team-emily.jpg", bio: "Emily's Bio" },
  { name: "Robert Kim", title: "Finance Manager", image: "/images/team-robert.jpg", bio: "Robert's Bio" },
  { name: "Lisa Patel", title: "HR Manager", image: "/images/team-lisa.jpg", bio: "Lisa's Bio" },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">About JABA Automobiles</h1>

      {/* Hero Section */}
      <div className="relative h-[400px] mb-16 rounded-lg overflow-hidden">
        <Image src="/images/about-hero.jpg" alt="JABA Automobiles Showroom" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white text-2xl font-semibold max-w-2xl text-center px-4">
            Driving Excellence in Automotive Solutions Since 2010
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <Image
            src="/images/about-story.jpg"
            alt="JABA Automobiles Journey"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2010, JABA Automobiles began as a small, family-owned dealership with a vision to revolutionize
            the automotive industry. Our founders, John and Anna Benson, combined their passion for cars with a
            commitment to exceptional customer service, laying the foundation for what would become a leading name in
            the automotive world.
          </p>
          <p className="mb-4">
            In our early years, we focused on building strong relationships with both customers and manufacturers,
            earning a reputation for honesty, quality, and expertise. As word spread about our dedication to customer
            satisfaction, we quickly outgrew our original location and expanded to multiple showrooms across the region.
          </p>
          <p>
            Today, JABA Automobiles offers a comprehensive range of services, from new and pre-owned vehicle sales to
            rentals, financing, and 24/7 roadside assistance. Our growth is a testament to our unwavering commitment to
            our core values and our ability to adapt to the ever-changing needs of our customers.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <h2 className="text-3xl font-semibold mb-8 text-center">Our Values</h2>
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: "Quality",
            description:
              "We offer only the finest vehicles and services, ensuring your satisfaction and safety on every journey.",
          },
          {
            title: "Integrity",
            description:
              "Honesty and transparency are at the core of everything we do, building trust with our customers and partners.",
          },
          {
            title: "Innovation",
            description:
              "We continuously evolve, embracing new technologies and practices to meet the changing needs of our customers and the industry.",
          },
          {
            title: "Customer-Centric",
            description:
              "Your needs and satisfaction are our top priority. We go above and beyond to exceed your expectations.",
          },
          {
            title: "Sustainability",
            description:
              "We're committed to reducing our environmental impact and promoting eco-friendly automotive solutions.",
          },
          {
            title: "Community",
            description:
              "We believe in giving back to the communities we serve, actively participating in local initiatives and charities.",
          },
        ].map((value, index) => (
          <Card key={index} className="bg-gray-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p>{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Team Section */}
      <h2 className="text-3xl font-semibold mb-8 text-center">Meet Our Team</h2>
      <div className="w-full mb-16">
        <div className="text-center mb-8">
          <p className="text-white mb-2">Meet</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#93F1AD] mb-6">Our Team</h2>
          <p className="text-white text-lg max-w-2xl mx-auto">Meet the Team Behind Jaba Automotives</p>
        </div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center p-8 rounded-lg bg-[#1a1f24]">
        <h2 className="text-3xl font-semibold mb-4">Join Our Journey</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Whether you're looking for your dream car, need a reliable rental, or require assistance on the road, JABA
          Automobiles is here for you. Experience the difference of working with a team that truly cares about your
          automotive needs.
        </p>
        <Button size="lg">Contact Us Today</Button>
      </div>
    </div>
  )
}

