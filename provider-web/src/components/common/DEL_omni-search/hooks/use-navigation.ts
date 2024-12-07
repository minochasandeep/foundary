import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { type SearchResult, SearchType } from "../types";

export function useNavigation(setOpen: (open: boolean) => void) {
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null,
  );
  const [siteId, setSiteId] = useState<number | null>(null);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [organizationId, setOrganizationId] = useState<number | null>(null);
  const router = useRouter();

  const { data: site } = useSWR(
    () => (siteId ? `/searchinator/site/${siteId}/parents` : null),
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (!selectedResult) return;
    let items: string[] = [];
    if (site.orgId && site.orgName) {
      items.push(`${site.orgId};${site.orgName};organization`);
    }
    if (site.groupId && site.groupName) {
      items.push(`${site.groupId};${site.groupName};group`);
    }
    router.push(
      "/admin/organization-management/index?items=" + items.join("||"),
    );
    setSelectedResult(null);
    setOpen(false);
  }, [site]);

  useEffect(() => {
    if (selectedResult?.type === SearchType.SITE) {
      setSiteId(selectedResult.id);
      return;
    }
    setSiteId(null);
  }, [selectedResult]);

  const { data: group } = useSWR(
    () => (groupId ? `/groups/${groupId}` : null),
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (selectedResult?.type === SearchType.GROUP) {
      setGroupId(selectedResult.id);
      return;
    }
    setGroupId(null);
  }, [selectedResult]);

  const { data: organization } = useSWR(
    () => {
      if (group) {
        return `/organizations/${group.organizationId}`;
      }
      return organizationId ? `/organizations/${organizationId}` : null;
    },
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (!selectedResult) return;
    let items: string[] = [];
    organization
      ? items.push(`${organization.id};${organization.name};organization`)
      : null;
    group ? items.push(`${group.id};${group.groupName};group`) : null;
    router.push(
      "/admin/organization-management/index?items=" + items.join("||"),
    );
    setSelectedResult(null);
    setOpen(false);
  }, [organization, group]);

  useEffect(() => {
    switch (selectedResult?.type) {
      case SearchType.GROUP:
        setGroupId(selectedResult.id);
        break;
      case SearchType.ORGANIZATION:
        setOrganizationId(selectedResult.id);
        break;
      case SearchType.SITE:
        setSiteId(selectedResult.id);
        break;
      default:
        setSiteId(null);
        setGroupId(null);
        setOrganizationId(null);
        break;
    }
  }, [selectedResult]);

  return {
    setSelectedResult,
  };
}
