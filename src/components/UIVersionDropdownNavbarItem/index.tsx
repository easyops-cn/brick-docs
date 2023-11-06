import React from "react";
import { translate } from "@docusaurus/Translate";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import type { Props } from "@theme/NavbarItem/DocsVersionDropdownNavbarItem";
import useExampleUIVersion from "@site/src/hooks/useExampleUIVersion";

const UIVersions = ["8.2", "8.0"] as const;

export default function UIVersionDropdownNavbarItem({
  mobile,
  dropdownActiveClassDisabled,
  ...props
}: Props): JSX.Element {
  const [uiVersion, changeUIVersion] = useExampleUIVersion();
  const items = UIVersions.map((version) => ({
    label: `UI ${version}`,
    to: "#",
    isActive: () => version === uiVersion,
    onClick: () => changeUIVersion(version),
  }));

  // Mobile dropdown is handled a bit differently
  const dropdownLabel = mobile
    ? translate({
        id: "theme.navbar.mobileUIVersionsDropdown.label",
        message: "UI Versions",
        description:
          "The label for the navbar UI versions dropdown on mobile view",
      })
    : `UI ${uiVersion}`;
  const dropdownTo = undefined;

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={dropdownLabel}
      to={dropdownTo}
      items={items}
      isActive={dropdownActiveClassDisabled ? () => false : undefined}
    />
  );
}
