import { Shield, ThumbsUp, Clock, Users } from "lucide-react"

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="w-12 h-12 mb-4" />,
      title: "Safe & Secure",
      description: "Every vehicle is thoroughly inspected and verified for your peace of mind",
    },
    {
      icon: <ThumbsUp className="w-12 h-12 mb-4" />,
      title: "Quality Guaranteed",
      description: "We ensure all vehicles meet our high standards of quality and performance",
    },
    {
      icon: <Clock className="w-12 h-12 mb-4" />,
      title: "Fast & Efficient",
      description: "Quick and hassle-free process for buying and selling vehicles",
    },
    {
      icon: <Users className="w-12 h-12 mb-4" />,
      title: "Expert Support",
      description: "Our team of automotive experts is here to help you every step of the way",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Why Choose JABA Automobiles?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-card hover:bg-accent/20 transition-colors"
            >
              <div className="flex justify-center text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

