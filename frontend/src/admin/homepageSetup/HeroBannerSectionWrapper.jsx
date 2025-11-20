import React from "react";

const HeroBannerSectionWrapper = () => {
  return (
    <SectionWrapper
      title="Hero Banner"
      enabled={config?.heroBanner?.enabled}
      onToggle={(enabled) => handleToggle("heroBanner", enabled)}>
      <div className="space-y-6">
        <TextInput
          label="Title"
          value={config?.heroBanner?.title || ""}
          onChange={(value) => handleSave("heroBanner", { title: value })}
          placeholder="Enter hero banner title"
        />
        <TextInput
          label="Subtitle"
          value={config?.heroBanner?.subtitle || ""}
          onChange={(value) => handleSave("heroBanner", { subtitle: value })}
          placeholder="Enter hero banner subtitle"
        />
        <ImageInput
          label="Background Image URL"
          value={config?.heroBanner?.backgroundImage || ""}
          onChange={(value) =>
            handleSave("heroBanner", { backgroundImage: value })
          }
          placeholder="https://example.com/hero-image.jpg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="CTA Text"
            value={config?.heroBanner?.ctaText || ""}
            onChange={(value) => handleSave("heroBanner", { ctaText: value })}
            placeholder="Shop Now"
          />
          <TextInput
            label="CTA Link"
            value={config?.heroBanner?.ctaLink || ""}
            onChange={(value) => handleSave("heroBanner", { ctaLink: value })}
            placeholder="/collections/all"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HeroBannerSectionWrapper;
