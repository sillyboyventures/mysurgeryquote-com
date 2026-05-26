import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "It is awesome! We struggled with the limitations of our quote system in our EMR and it just never did what we wanted. This checks all my boxes and does EXACTLY what I need it to.",
    name: "Dr. James Koehler",
    title: "Cosmetic Surgeon",
  },
  {
    quote:
      "This surgery quote software has taken our quoting system down to 1-2 minutes and it easily generates PDFs we can send patients home with. Love it!",
    name: "Dr. Vincent Gardner",
    title: "Cosmetic Surgeon",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center"
            >
              <Image
                src="/icons/quote-icon.png"
                alt=""
                aria-hidden="true"
                width={80}
                height={59}
                className="h-auto w-20"
              />
              <blockquote className="mt-6 text-lg italic leading-relaxed text-text">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <span className="block font-poppins font-semibold text-navy">
                  {testimonial.name}
                </span>
                <span className="mt-1 block text-sm text-text-muted">
                  {testimonial.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
