"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ImageCarouselProps = {
  images: string[];
  title: string;
};

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const hasMultipleImages = images.length > 1;
  const activeImage = images[activeIndex];

  useEffect(() => {
    if (!isZoomed) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsZoomed(false);
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        setActiveIndex((current) => (current + 1) % images.length);
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasMultipleImages, images.length, isZoomed]);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  return (
    <>
      <section className="carousel-shell">
        <div className="carousel-stage">
          <button
            className="carousel-image-button"
            type="button"
            onClick={() => setIsZoomed(true)}
            aria-label={`Zoom image ${activeIndex + 1} of ${images.length}`}
          >
            <Image
              className="carousel-image"
              src={activeImage}
              alt={`${title} image ${activeIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              priority
            />
          </button>

          {hasMultipleImages ? (
            <>
              <button
                className="carousel-control carousel-control-left"
                type="button"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="carousel-control carousel-control-right"
                type="button"
                onClick={goToNext}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {hasMultipleImages ? (
          <div className="carousel-thumbnails" aria-label="Property gallery thumbnails">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className={`carousel-thumb ${index === activeIndex ? "active" : ""}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={index === activeIndex}
              >
                <Image
                  className="carousel-thumb-image"
                  src={image}
                  alt=""
                  fill
                  sizes="120px"
                />
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
                alt={`${title} image ${activeIndex + 1}`}
                fill
                sizes="100vw"
              />
            </div>

            {hasMultipleImages ? (
              <div className="zoom-actions">
                <button className="button button-secondary" type="button" onClick={goToPrevious}>
                  Previous
                </button>
                <span>
                  {activeIndex + 1} / {images.length}
                </span>
                <button className="button button-secondary" type="button" onClick={goToNext}>
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

