"use client";

import { useDeferredValue, useState } from "react";

import { PropertyCard } from "@/components/property-card";
import { listingModes, propertyTypes, type ListingMode, type PropertyRecord, type PropertyType } from "@/lib/property-shared";
import {
  areaNames,
  getLocalizedResultsLabel,
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
  const [selectedListingMode, setSelectedListingMode] = useState<"all" | ListingMode>("all");
  const [selectedRegion, setSelectedRegion] = useState<"all" | (typeof areaNames)[number]>("all");
  const [selectedType, setSelectedType] = useState<"all" | PropertyType>("all");
  const [availabilityFrom, setAvailabilityFrom] = useState("");
  const [availabilityTo, setAvailabilityTo] = useState("");
  const [minimumBedrooms, setMinimumBedrooms] = useState("0");
  const [sort, setSort] = useState<"latest" | "price-asc" | "price-desc">("latest");

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();
  const availableRegions = areaNames.filter((region) =>
    properties.some((property) => property.location.toLowerCase().includes(region.toLowerCase())),
  );
  const getSortablePrice = (property: PropertyRecord) =>
    selectedListingMode === "rent" ? property.rentPriceEuro ?? property.priceEuro : property.priceEuro;

  const filteredProperties = properties
    .filter((property) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        property.title.toLowerCase().includes(normalizedSearch) ||
        property.referenceCode.toLowerCase().includes(normalizedSearch);

      const matchesRegion =
        selectedRegion === "all" || property.location.toLowerCase().includes(selectedRegion.toLowerCase());
      const matchesListingMode =
        selectedListingMode === "all" ||
        property.listingMode === selectedListingMode ||
        property.listingMode === "both";
      const matchesType = selectedType === "all" || property.type === selectedType;
      const matchesBedrooms = property.bedrooms >= Number(minimumBedrooms);
      const matchesAvailability =
        selectedListingMode !== "rent" ||
        ((!availabilityFrom && !availabilityTo) ||
          (property.availabilityStart &&
            property.availabilityEnd &&
            (!availabilityFrom || property.availabilityStart <= availabilityFrom) &&
            (!availabilityTo || property.availabilityEnd >= availabilityTo)));

      return matchesSearch && matchesRegion && matchesListingMode && matchesType && matchesBedrooms && matchesAvailability;
    })
    .sort((left, right) => {
      if (sort === "price-asc") {
        return getSortablePrice(left) - getSortablePrice(right);
      }

      if (sort === "price-desc") {
        return getSortablePrice(right) - getSortablePrice(left);
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
            {copy.filters.region}
            <select value={selectedRegion} onChange={(event) => setSelectedRegion(event.target.value as "all" | (typeof areaNames)[number])}>
              <option value="all">{copy.filters.types.all}</option>
              {availableRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>

          <label>
            {copy.filters.listingMode}
            <select
              value={selectedListingMode}
              onChange={(event) => setSelectedListingMode(event.target.value as "all" | ListingMode)}
            >
              <option value="all">{copy.filters.types.all}</option>
              {listingModes.map((mode) => (
                <option key={mode} value={mode}>
                  {copy.filters.listingModeOptions[mode]}
                </option>
              ))}
            </select>
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

          {selectedListingMode === "rent" ? (
            <>
              <label>
                {copy.filters.availabilityFrom}
                <input type="date" value={availabilityFrom} onChange={(event) => setAvailabilityFrom(event.target.value)} />
              </label>

              <label>
                {copy.filters.availabilityTo}
                <input type="date" value={availabilityTo} onChange={(event) => setAvailabilityTo(event.target.value)} />
              </label>
            </>
          ) : null}

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
            <h2>{getLocalizedResultsLabel(locale, filteredProperties.length)}</h2>
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
