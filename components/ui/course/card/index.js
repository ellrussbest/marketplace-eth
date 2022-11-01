import Image from "next/image";
import Link from "next/link";

export default function Card({ course, Footer, disabled }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex-1 h-full next-image-wrapper">
          <Image
            className={`object-cover ${disabled && "filter grayscale"}`}
            layout="responsive"
            width="150"
            height="170"
            src={course.coverImage}
            alt={course.title}
          />
        </div>
        <div className="flex-2 p-8 pb-4">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.type}
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className="h-12 block mt-1 text-sm sm:text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </a>
          </Link>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            {course.description.substring(0, 70)}...
          </p>

          {Footer && <Footer />}
        </div>
      </div>
    </div>
  );
}
