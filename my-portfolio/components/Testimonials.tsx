import React from 'react';
import Image from 'next/image';

interface TestimonialProps {
  name: string;
  role: string;
  photo: string;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  role,
  photo,
  testimonial,
}) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <Image
          src={photo}
          alt={name}
          width={64}
          height={64}
          className="rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="text-base text-foreground leading-relaxed">"{testimonial}"</p>
    </div>
  );
};

interface TestimonialsProps {
  testimonials: TestimonialProps[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;