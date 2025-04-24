import { useEffect, useState } from "react";
import Select from "react-select";

export default function CategorySelect({
  categories,
  selectedCategories,
  setSelectedCategories,
  errors,
}) {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const customStyles = (isDarkMode) => ({
    control: (base, state) => ({
      ...base,
      backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
      borderColor: state.isFocused
        ? isDarkMode
          ? "#93C5FD"
          : "#3B82F6"
        : isDarkMode
        ? "#374151"
        : "#D1D5DB",
      color: isDarkMode ? "#F9FAFB" : "#111827",
      boxShadow: "none",
      "&:hover": {
        borderColor: isDarkMode ? "#93C5FD" : "#3B82F6",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#111827" : "#FFFFFF",
      color: isDarkMode ? "#F9FAFB" : "#111827",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDarkMode
          ? "#2563EB"
          : "#DBEAFE"
        : state.isFocused
        ? isDarkMode
          ? "#1E3A8A"
          : "#EFF6FF"
        : "transparent",
      color: isDarkMode ? "#F9FAFB" : "#111827",
      cursor: "pointer",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#374151" : "#E5E7EB",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDarkMode ? "#F9FAFB" : "#111827",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDarkMode ? "#F9FAFB" : "#111827",
      ":hover": {
        backgroundColor: isDarkMode ? "#6B7280" : "#D1D5DB",
        color: isDarkMode ? "#111827" : "#000000",
      },
    }),
  });

  return (
    <div className="mb-4">
      <Select
        isMulti
        options={categories}
        value={selectedCategories}
        onChange={setSelectedCategories}
        placeholder="Add categories..."
        className="text-sm"
        classNamePrefix="react-select"
        styles={customStyles(isDarkMode)}
      />
      {errors.categories && (
        <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
      )}
    </div>
  );
}
