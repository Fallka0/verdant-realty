"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type ImageCarouselProps = {
  images: string[];
  title: string;
};

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const hasMultipleImages = images.length > 1;
  const activeImage = images[selectedIndex];

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!isZoomed) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsZoomed(false);
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        emblaApi?.scrollNext();
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        emblaApi?.scrollPrev();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaApi, hasMultipleImages, isZoomed]);

  function scrollTo(index: number) {
    emblaApi?.scrollTo(index);
  }

  return (
    <>
      <section className="carousel-shell">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {images.map((image, index) => (
                <div className="embla__slide" key={`${image}-${index}`}>
                  <button
                    className="carousel-image-button"
                    type="button"
                    onClick={() => setIsZoomed(true)}
                    aria-label={`Zoom image ${index + 1} of ${images.length}`}
                  >
                    <Image
                      className="carousel-image"
                      src={image}
                      alt={`${title} image ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      priority={index === 0}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {hasMultipleImages ? (
            <div className="carousel-toolbar">
              <div className="carousel-actions">
                <button
                  className="carousel-nav-button"
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  aria-label="Previous image"
                >
                  <span>Previous</span>
                </button>
                <button
                  className="carousel-nav-button"
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  aria-label="Next image"
                >
                  <span>Next</span>
                </button>
              </div>

              <div className="carousel-counter" aria-live="polite">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          ) : null}
        </div>

        {hasMultipleImages ? (
          <div className="carousel-thumbnails" aria-label="Property gallery thumbnails">
            {images.map((image, index) => (
              <button
                key={`${image}-thumb-${index}`}
                className={`carousel-thumb ${index === selectedIndex ? "active" : ""}`}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={index === selectedIndex}
              >
                <Image className="carousel-thumb-image" src={image} alt="" fill sizes="120px" />
              </button>
            ))}
          </div>
        ) : null}
      </section>

      {isZoomed ? (
        <div
          className="zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} enlarged image`}
          onClick={() => setIsZoomed(false)}
        >
          <div className="zoom-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="zoom-close"
              type="button"
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoom view"
            >
              ×
            </button>

            <div className="zoom-image-frame">
              <Image
                className="zoom-image"
                src={activeImage}
                alt={`${title} image ${selectedIndex + 1}`}
                fill
                sizes="100vw"
              />
            </div>

            {hasMultipleImages ? (
              <div className="zoom-actions">
                <button className="button button-secondary" type="button" onClick={() => emblaApi?.scrollPrev()}>
                  Previous
                </button>
                <span>
                  {selectedIndex + 1} / {images.length}
                </span>
                <button className="button button-secondary" type="button" onClick={() => emblaApi?.scrollNext()}>
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

