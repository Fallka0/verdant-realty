"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { type PublicCopy } from "@/lib/public-copy";

type ImageCarouselProps = {
  copy: PublicCopy;
  images: string[];
  title: string;
};

type CarouselMediaItem = {
  type: "image" | "video";
  url: string;
};

const videoExtensions = new Set(["m4v", "mov", "mp4", "ogg", "webm"]);

function getMediaType(url: string): CarouselMediaItem["type"] {
  try {
    const pathname = new URL(url).pathname;
    const extension = pathname.split(".").pop()?.toLowerCase();

    return extension && videoExtensions.has(extension) ? "video" : "image";
  } catch {
    const sanitizedUrl = url.split("?")[0] ?? "";
    const extension = sanitizedUrl.split(".").pop()?.toLowerCase();

    return extension && videoExtensions.has(extension) ? "video" : "image";
  }
}

export function ImageCarousel({ copy, images, title }: ImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const mediaItems: CarouselMediaItem[] = images.map((url) => ({
    type: getMediaType(url),
    url,
  }));
  const hasMultipleImages = mediaItems.length > 1;
  const activeMedia = mediaItems[selectedIndex] ?? mediaItems[0];
  const visibleThumbnailIndexes = hasMultipleImages
    ? Array.from({ length: Math.min(4, mediaItems.length - 1) }, (_, offset) => (selectedIndex + offset + 1) % mediaItems.length)
    : [];

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      const nextIndex = emblaApi.selectedScrollSnap();

      setSelectedIndex(nextIndex);
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());

      if (isZoomed && mediaItems[nextIndex]?.type === "video") {
        setIsZoomed(false);
      }
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, isZoomed, mediaItems]);

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
          <div className="embla-frame">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {mediaItems.map((mediaItem, index) => (
                  <div className="embla__slide" key={`${mediaItem.url}-${index}`}>
                    {mediaItem.type === "image" ? (
                      <button
                        className="carousel-image-button"
                        type="button"
                        onClick={() => setIsZoomed(true)}
                        aria-label={`${copy.carousel.enlargeImage} ${index + 1}`}
                      >
                        <Image
                          className="carousel-image"
                          src={mediaItem.url}
                          alt={`${title} image ${index + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 70vw"
                          priority={index === 0}
                        />
                      </button>
                    ) : (
                      <div className="carousel-video-shell">
                        <video
                          aria-label={`${title} video ${index + 1}`}
                          className="carousel-video"
                          controls
                          playsInline
                          preload="metadata"
                          src={mediaItem.url}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {hasMultipleImages ? (
              <>
                <button
                  className="carousel-side-button carousel-side-button-left"
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  aria-label={copy.carousel.previousImage}
                  disabled={!canScrollPrev}
                >
                  <span>‹</span>
                </button>
                <button
                  className="carousel-side-button carousel-side-button-right"
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  aria-label={copy.carousel.nextImage}
                  disabled={!canScrollNext}
                >
                  <span>›</span>
                </button>
              </>
            ) : null}
          </div>

          {hasMultipleImages ? (
            <div className="carousel-toolbar">
              <div className="carousel-counter" aria-live="polite">
                {selectedIndex + 1} / {images.length}
              </div>
              <p className="carousel-hint">{copy.carousel.galleryHint}</p>
            </div>
          ) : null}
        </div>

        {hasMultipleImages ? (
          <div className="carousel-thumbnails" aria-label={copy.carousel.thumbnailsLabel}>
            {visibleThumbnailIndexes.map((index) => {
              const mediaItem = mediaItems[index];

              return (
                <button
                  key={`${mediaItem.url}-thumb-${index}`}
                  className="carousel-thumb"
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`${copy.carousel.showImage} ${index + 1}`}
                >
                  {mediaItem.type === "image" ? (
                    <Image className="carousel-thumb-image" src={mediaItem.url} alt="" fill sizes="120px" />
                  ) : (
                    <>
                      <video
                        aria-hidden="true"
                        className="carousel-thumb-video"
                        muted
                        playsInline
                        preload="metadata"
                        src={mediaItem.url}
                      />
                      <span className="carousel-thumb-video-indicator" aria-hidden="true">
                        ▶
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ) : null}
      </section>

      {isZoomed && activeMedia?.type === "image" ? (
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
              aria-label={copy.carousel.closeZoom}
            >
              ×
            </button>

            <div className="zoom-image-frame">
              <Image
                className="zoom-image"
                src={activeMedia.url}
                alt={`${title} image ${selectedIndex + 1}`}
                fill
                sizes="100vw"
              />

              {hasMultipleImages ? (
                <>
                  <button
                    className="carousel-side-button zoom-side-button zoom-side-button-left"
                    type="button"
                    onClick={() => emblaApi?.scrollPrev()}
                    aria-label={copy.carousel.previousImage}
                    disabled={!canScrollPrev}
                  >
                    <span>‹</span>
                  </button>
                  <button
                    className="carousel-side-button zoom-side-button zoom-side-button-right"
                    type="button"
                    onClick={() => emblaApi?.scrollNext()}
                    aria-label={copy.carousel.nextImage}
                    disabled={!canScrollNext}
                  >
                    <span>›</span>
                  </button>
                </>
              ) : null}
            </div>

            {hasMultipleImages ? (
              <div className="zoom-actions">
                <span>
                  {selectedIndex + 1} / {images.length}
                </span>
                <p className="zoom-hint">{copy.carousel.zoomHint}</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
