import React from "react";

import { IdCardIcon, ShieldCheckIcon, MessageSquareWarning } from "lucide-react";

import PersonalInfoForm from "@/components/userDashboard/ProfileSettings/personalInfoForm";
import ChangePassword from "@/components/userDashboard/ProfileSettings/chnagePassword";
import DeleteAccount from "@/components/userDashboard/ProfileSettings/deleteAccount";

function ProfileSettings() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
        <h5 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
          <ShieldCheckIcon className="w-4 h-4 inline-block mr-2" />
          Account Preferences
        </h5>
        <h2 className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Profile Settings
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Manage your profile settings and preferences to customize your
          experience. Update your personal information, change your password,
          and configure other account-related settings to ensure your account is
          secure and tailored to your needs.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
        <h4 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          <IdCardIcon className="w-4 h-4 inline-block mr-2" />
          Personal Information
        </h4>
        <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
          Update your personal information to keep your profile up to date.
        </p>
        <PersonalInfoForm />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
        <h4 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          <ShieldCheckIcon className="w-4 h-4 inline-block mr-2" />
          Security & Password
        </h4>
          <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
             Ensure your account is secure by updating your password regularly. Use a strong and unique password to protect your personal information.
          </p>
          <ChangePassword />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
        <h4 className="text-xl md:text-2xl font-semibold text-red-500 dark:text-red-400 mb-4">
          <MessageSquareWarning className="w-4 h-4 inline-block mr-2" />
            Delete Account
        </h4>
        <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
          Deleting your account is a permanent action and cannot be undone. Please ensure you have backed up any important data before proceeding. If you are sure, you can delete your account below.
        </p>
        <DeleteAccount />
      </div>
    </main>
  );
}

export default ProfileSettings;
