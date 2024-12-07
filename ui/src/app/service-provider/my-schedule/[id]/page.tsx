"use client";

import UserForm from "../components/user-form/user-form";

export default function UserManagementDetails({
  params,
}: {
  params: { id: number };
}) {
  return <UserForm id={params.id} />;
}
