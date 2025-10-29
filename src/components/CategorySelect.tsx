import React from "react";

interface Category {
  key: string;
  label: string;
  icon: string;
}

interface CategorySelectProps {
  categories: Category[];
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export default function CategorySelect({
  categories,
  value,
  name,
  onChange,
  className = "",
  placeholder = "Catégorie",
  required = true,
}: CategorySelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={className}
      required={required}
      name={name}
    >
      <option value="">{placeholder}</option>
      {categories.map((cat) => (
        <option key={cat.key} value={cat.key}>
          {cat.icon} {cat.label}
        </option>
      ))}
    </select>
  );
}
