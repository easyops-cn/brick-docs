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
    to: "javascript:void",
    target: "_self",
    autoAddBaseUrl: false,
    className:
      // eslint-disable-next-line no-nested-ternary
      version === uiVersion
        ? // Similar idea as DefaultNavbarItem: select the right Infima active
          // class name. This cannot be substituted with isActive, because the
          // target URLs contain `pathname://` and therefore are not NavLinks!
          mobile
          ? "menu__link--active"
          : "dropdown__link--active"
        : "",
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
    : uiVersion
    ? `UI ${uiVersion}`
    : "";
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
