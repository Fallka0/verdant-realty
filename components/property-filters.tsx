"use client";

import { useDeferredValue, useState } from "react";

import { PropertyCard } from "@/components/property-card";
import { propertyTypes, type PropertyRecord, type PropertyType } from "@/lib/property-shared";
import {
  getLocalizedPropertyTypeLabel,
  type PublicCopy,
  type PublicLocale,
} from "@/lib/public-copy";

type PropertyFiltersProps = {
  copy: PublicCopy;
  locale: PublicLocale;
  properties: PropertyRecord[];
};

export function PropertyFilters({ copy, locale, properties }: PropertyFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | PropertyType>("all");
  const [minimumBedrooms, setMinimumBedrooms] = useState("0");
  const [sort, setSort] = useState<"latest" | "price-asc" | "price-desc">("latest");

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();

  const filteredProperties = properties
    .filter((property) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        property.title.toLowerCase().includes(normalizedSearch) ||
        property.location.toLowerCase().includes(normalizedSearch) ||
        property.referenceCode.toLowerCase().includes(normalizedSearch);

      const matchesType = selectedType === "all" || property.type === selectedType;
      const matchesBedrooms = property.bedrooms >= Number(minimumBedrooms);

      return matchesSearch && matchesType && matchesBedrooms;
    })
    .sort((left, right) => {
      if (sort === "price-asc") {
        return left.priceEuro - right.priceEuro;
      }

      if (sort === "price-desc") {
        return right.priceEuro - left.priceEuro;
      }

      return right.updatedAt.localeCompare(left.updatedAt);
    });

  return (
    <div className="listing-layout">
      <aside className="filters-panel">
        <div className="section-heading compact">
          <p className="eyebrow">{copy.filters.heading}</p>
          <h2>{copy.filters.title}</h2>
        </div>

        <div className="filters-grid">
          <label>
            {copy.filters.search}
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.filters.searchPlaceholder}
            />
          </label>

          <label>
            {copy.filters.propertyType}
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value as "all" | PropertyType)}
            >
              <option value="all">{copy.filters.types.all}</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {getLocalizedPropertyTypeLabel(locale, type)}
                </option>
              ))}
            </select>
          </label>

          <label>
            {copy.filters.minimumBedrooms}
            <select value={minimumBedrooms} onChange={(event) => setMinimumBedrooms(event.target.value)}>
              <option value="0">{copy.filters.types.any}</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </label>

          <label>
            {copy.filters.sort}
            <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
              <option value="latest">{copy.filters.sortOptions.latest}</option>
              <option value="price-asc">{copy.filters.sortOptions.priceAsc}</option>
              <option value="price-desc">{copy.filters.sortOptions.priceDesc}</option>
            </select>
          </label>
        </div>
      </aside>

      <section className="listing-results">
        <div className="results-header">
          <div>
            <p className="eyebrow">{copy.filters.availableInventory}</p>
            <h2>
              {filteredProperties.length} {copy.filters.results}
            </h2>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="property-grid">
            {filteredProperties.map((property) => (
              <PropertyCard
                bathroomsLabel={copy.propertyMeta.bathroomsShort}
                bedroomsLabel={copy.propertyMeta.bedroomsShort}
                buttonLabel={copy.buttons.viewDetails}
                key={property.id}
                locale={locale}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>{copy.filters.emptyTitle}</h3>
            <p>{copy.filters.emptyBody}</p>
          </div>
        )}
      </section>
    </div>
  );
}
