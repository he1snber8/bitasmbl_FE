import React from "react";
import AuthenticatedLayout from "./AuthenticatedLayout";
export default function UserLayout() {
  return <AuthenticatedLayout isUserPage={true} />;
}
