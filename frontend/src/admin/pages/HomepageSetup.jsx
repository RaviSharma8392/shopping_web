import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tabs } from "../data/homepageSetupTabs";
import { useHomepage } from "../hooks/useHomepage";
import Notification from "../../shared/components/Notification";
import HomePageSetupSidebar from "../components/bars/HomePageSetupSidebar";
import HomePageSetUpHeader from "../components/header/HomePageSetUpHeader";
import SectionRenderer from "../components/section/homepage-sections/SectionRenderer";
import Error from "../../shared/pages/Error";
import LoadingState from "../components/states/LoadingState";

const HomepageSetup = () => {
  const navigate = useNavigate();
  const { config, loading, error, updateSection, toggleSection } =
    useHomepage();
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");

  const showNotification = (type, message, duration = 5000) => {
    setNotification({ type, message, duration });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const handleSave = async (section, data) => {
    try {
      await updateSection(section, data);
      showNotification(
        "success",
        `${section.replace(/([A-Z])/g, " $1")} updated successfully!`
      );
    } catch (err) {
      showNotification("error", err.message || "Failed to update section");
    }
  };

  const handleToggle = async (section, enabled) => {
    try {
      await toggleSection(section, enabled);
      showNotification(
        "success",
        `${section.replace(/([A-Z])/g, " $1")} ${
          enabled ? "enabled" : "disabled"
        }!`
      );
    } catch (err) {
      showNotification("error", err.message || "Failed to toggle section");
    }
  };

  if (loading && !config) {
    return <LoadingState message="Loading homepage configuration..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <HomePageSetUpHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <HomePageSetupSidebar
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Main Content */}
          <div className="lg:col-span-3">
            <SectionRenderer
              activeTab={activeTab}
              config={config}
              onSave={handleSave}
              onToggle={handleToggle}
            />
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={hideNotification}
        />
      )}
    </div>
  );
};

export default HomepageSetup;
