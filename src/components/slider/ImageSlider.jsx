import Image from "next/image";
import styles from "./page.module.css";
const logos = [
  "/intel.png",
  "/asus_logo.png",
  "/amd-logo-vector.png",
  "/motorola-new.png",
  "/nvidia.png",
  "/samsung.png",
  "/intel.png",
  "/asus_logo.png",
  "/amd-logo-vector.png",
];

const ImageSlider = () => {
  return (
    <div className="pb-16">
      <h1 className="text-center font-bold text-4xl mb-16 text-indigo-800">
        Our Partners
      </h1>
      <div className="flex justify-center overflow-hidden w-full px-10">
        <div className={`${styles.logosSlide}`}>
          <div className="flex gap-12">
            {logos.map((l, key) => (
              <Image
                key={key}
                src={l}
                alt={`Logo`}
                width={150}
                height={100}
                className="h-16"
                unoptimized={l === "/amd-logo-vector.png"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;