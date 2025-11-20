import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreVertical,
  Folder,
  Image,
  Calendar,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch categories from Firebase
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesRef = collection(db, "categories");
      const q = query(categoriesRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const categoriesData = [];
      querySnapshot.forEach((doc) => {
        categoriesData.push({ id: doc.id, ...doc.data() });
      });

      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search and filters
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && category.isActive) ||
      (statusFilter === "inactive" && !category.isActive);

    return matchesSearch && matchesStatus;
  });

  // Toggle category status
  const handleToggleStatus = async (categoryId, currentStatus) => {
    try {
      setActionLoading(true);
      const categoryRef = doc(db, "categories", categoryId);
      await updateDoc(categoryRef, {
        isActive: !currentStatus,
        updatedAt: new Date(),
      });

      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId
            ? { ...category, isActive: !currentStatus }
            : category
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      setActionLoading(true);
      await deleteDoc(doc(db, "categories", selectedCategory.id));
      setCategories((prev) =>
        prev.filter((category) => category.id !== selectedCategory.id)
      );
      setShowDeleteModal(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Navigate to edit page
  const handleEditCategory = (categoryId) => {
    navigate(`/admin/categories/edit/${categoryId}`);
  };

  // Navigate to create page
  const handleCreateCategory = () => {
    navigate("/admin/categories/create");
  };

  // Stats calculation
  const stats = {
    total: categories.length,
    active: categories.filter((c) => c.isActive).length,
    inactive: categories.filter((c) => !c.isActive).length,
    featured: categories.filter((c) => c.isFeatured).length,
    hasProducts: categories.filter((c) => (c.productCount || 0) > 0).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Category Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage product categories and their organization
            </p>
          </div>
          <button
            onClick={handleCreateCategory}
            className="mt-4 lg:mt-0 flex items-center gap-2 px-6 py-3 bg-[#B4292F] text-white rounded-lg hover:bg-[#8f1f23] transition shadow-lg">
            <Plus className="w-5 h-5" />
            Add New Category
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Categories
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Folder className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Categories
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.active}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Featured Categories
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.featured}
                </p>
              </div>
              <Filter className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  With Products
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.hasProducts}
                </p>
              </div>
              <Image className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B4292F] focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B4292F] focus:border-transparent">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={fetchCategories}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition">
              {/* Category Image */}
              <div className="relative h-48 bg-gray-100">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <Folder className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      category.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Featured Badge */}
                {category.isFeatured && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Category Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
                  {category.description || "No description available"}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {category.createdAt?.toDate?.().toLocaleDateString() ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-900">
                      {category.productCount || 0}
                    </span>
                    <span className="text-gray-500"> products</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCategory(category.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleToggleStatus(category.id, category.isActive)
                    }
                    disabled={actionLoading}
                    className={`px-3 py-2 text-sm rounded-lg transition ${
                      category.isActive
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}>
                    {category.isActive ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowDeleteModal(true);
                    }}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Folder className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No categories found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try changing your search or filter criteria"
                : "Get started by creating your first category"}
            </p>
            <div className="mt-6">
              <button
                onClick={handleCreateCategory}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#B4292F] text-white rounded-lg hover:bg-[#8f1f23] transition">
                <Plus className="w-4 h-4" />
                Add New Category
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Category
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the category{" "}
              <strong>"{selectedCategory.name}"</strong>?
              {selectedCategory.productCount > 0 && (
                <span className="text-red-600 font-medium block mt-2">
                  Warning: This category contains{" "}
                  {selectedCategory.productCount} products that will be
                  affected.
                </span>
              )}
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                disabled={actionLoading}>
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                disabled={actionLoading}>
                {actionLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
