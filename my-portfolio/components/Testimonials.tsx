"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-card p-8 rounded-xl border border-foreground/5 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative mb-6">
        <svg className="absolute text-accent-primary opacity-20 w-12 h-12 -top-4 -left-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-2.2 0-4 1.8-4 4v10c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4v-6.17c0-1.09-.43-2.13-1.2-2.9L16.9 7.03A4.01 4.01 0 0 0 14 6h-4zm7.5 4c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S17.5 13.38 17.5 12z"/>
        </svg>
        <p className="text-base text-foreground-secondary leading-relaxed italic relative z-10">"{testimonial}"</p>
      </div>
      
      <div className="flex items-center">
        <div className="relative mr-4">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full blur-sm opacity-50"></div>
          <Image
            src={photo}
            alt={name}
            width={56}
            height={56}
            className="rounded-full object-cover border-2 border-background relative z-10"
          />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-foreground-secondary">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface TestimonialsProps {
  testimonials: TestimonialProps[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-4">What People Say</h2>
          <p className="text-foreground-secondary max-w-2xl mx-auto">Feedback from clients and collaborators I've had the pleasure to work with on various projects.</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;