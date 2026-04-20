"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { PropertyCard } from "@/components/property-card";
import { propertyTypes, type PropertyRecord, type PropertyType } from "@/lib/property-shared";

type PropertyFiltersProps = {
  properties: PropertyRecord[];
};

export function PropertyFilters({ properties }: PropertyFiltersProps) {
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
          <p className="eyebrow">Property Search</p>
          <h2>Find the right listing faster.</h2>
        </div>

        <div className="filters-grid">
          <label>
            Search
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Area, reference, or title"
            />
          </label>

          <label>
            Property Type
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value as "all" | PropertyType)}
            >
              <option value="all">All types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type[0].toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Minimum Bedrooms
            <select value={minimumBedrooms} onChange={(event) => setMinimumBedrooms(event.target.value)}>
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </label>

          <label>
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
              <option value="latest">Latest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>

        <Link className="button button-secondary full-width-button" href="/admin">
          Open Admin Panel
        </Link>
      </aside>

      <section className="listing-results">
        <div className="results-header">
          <div>
            <p className="eyebrow">Available Inventory</p>
            <h2>{filteredProperties.length} properties currently match.</h2>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="property-grid">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No properties match those filters yet.</h3>
            <p>Try broadening the search or lowering the bedroom minimum.</p>
          </div>
        )}
      </section>
    </div>
  );
}
