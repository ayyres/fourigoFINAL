"use client";
import React, { useState, useEffect } from "react";
import {fetchKategoriById, createKategori, updateKategori, deleteKategori } from "@/service/kategori.api";
import DataTable from "./DataTable";
import { Kategori } from "@/types/kategori.type"; // Update import to use Kategori
import { useRouter } from "next/navigation";
import { number } from "yup";

const Page = () => {
  const [categories, setCategories] = useState<Kategori[]>([]); // Use Kategori instead of Category
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Kategori | null>(null); // Update to Kategori

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategoryById = async () => {
      const categoryId = 1; // Replace with dynamic ID as necessary
      try {
        const categoryData = await fetchKategoriById(categoryId);
        setCategories([categoryData]); // Example, if you're fetching a specific category
      } catch (error) {
        console.error(error);
      }
    };
    loadCategoryById();
  }, []);
  
  

  const router = useRouter();

  const handleAddCategoryClick = () => {
    router.push("/dashboard/admin/data-kategori/add"); // Adjust the path for categories
  };

  // Handle create or update category
  const handleSubmit = async (category: Omit<Kategori, "kategori_id"> | Kategori) => { // Change to Kategori
    if ("kategori_id" in category) {
      // Update existing category
      const updatedCategory = await updateKategori(category); // Update category
      setCategories((prev) =>
        prev.map((c) => (c.kategori_id === updatedCategory.kategori_id ? updatedCategory : c)) // Map categories
      );
    } else {
      // Create new category
      const newCategory = await createKategori(category); // Create category
      setCategories((prev) => [...prev, newCategory]); // Add to category list
    }
    setShowForm(false);
    setSelectedCategory(null); // Reset selected category
  };

  // Handle delete category
  const handleDelete = async (id: number) => {
    await deleteKategori(id); // Delete category
    setCategories((prev) => prev.filter((category) => category.kategori_id !== id)); // Remove deleted category
  };

  return (
    <div className="p-6">
      <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl text-center mb-8">
        <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500
 transition duration-300"
        >
          Category
        </span>{" "}
        Data
      </h3>

      <button
        onClick={handleAddCategoryClick}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
      >
        Add Category
      </button>
      <DataTable
        data={categories}  // Pass categories data to DataTable
        onEdit={(kategori: Kategori) => { // Fix implicit 'any' type error
          setSelectedCategory(kategori);
          setShowForm(true);
        }}
        onDelete={handleDelete}  // Handle category delete
      />
    </div>
  );
};

export default Page;
