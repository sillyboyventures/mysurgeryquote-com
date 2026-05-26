import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "It is awesome! We struggled with the limitations of our quote system in our EMR and it just never did what we wanted. This checks all my boxes and does EXACTLY what I need it to.",
    name: "Dr. James Koehler",
    title: "Cosmetic Surgeon",
    initials: "JK",
  },
  {
    quote:
      "This surgery quote software has taken our quoting system down to 1-2 minutes and it easily generates PDFs we can send patients home with. Love it!",
    name: "Dr. Vincent Gardner",
    title: "Cosmetic Surgeon",
    initials: "VG",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-2xl border border-border bg-white p-8"
            >
              <Quote className="h-8 w-8 text-primary" aria-hidden="true" />
              <blockquote className="mt-4 text-lg italic leading-relaxed text-text">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-poppins font-semibold text-white">
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block font-poppins font-semibold text-navy">
                    {testimonial.name}
                  </span>
                  <span className="block text-sm text-text-muted">
                    {testimonial.title}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
