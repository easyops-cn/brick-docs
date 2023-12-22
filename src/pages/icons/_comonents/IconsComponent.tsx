import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useHistory } from "@docusaurus/router";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { useColorMode } from "@docusaurus/theme-common";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Heading from "@theme/Heading";
import CodeBlock from "@theme/CodeBlock";
import { add, loadBricks } from "@next-core/loader/standalone";
import { unwrapProvider } from "./unwrapProvider";
import { wrapBrick } from "./wrapBrick";
// import { initializeIcon } from "./SvgCache";
import { SlDialogElement, WrappedSlDialog } from "./sl-dialog";
import { WrappedSlInput } from "./sl-input";
import styles from "./style.module.css";

const EoEasyopsIcon = "eo-easyops-icon" as any;
const EoAntdIcon = "eo-antd-icon" as any;
const EoFaIcon = "eo-fa-icon" as any;
const iconsGetLibs = "icons.get-libs";
const SlDialog = "sl-dialog";
const SlInput = "sl-input";

const WrappedEoEasyopsIcon = wrapBrick<
  HTMLElement,
  { category?: string; icon: string }
>(EoEasyopsIcon);
const WrappedEoAntdIcon = wrapBrick<
  HTMLElement,
  { theme?: string; icon: string }
>(EoAntdIcon);
const WrappedEoFaIcon = wrapBrick<
  HTMLElement,
  { prefix?: string; icon: string }
>(EoFaIcon);

let libs = [];

async function fetchBricksPackage(pkg: string) {
  const response = await fetch(`/preview/bricks/${pkg}/dist/bricks.json`);
  return await response.json();
}

interface IconsPageContextData {
  selectedIcon?: any;
  setSelectedIcon?: React.SetStateAction<any>;
}

const IconsPageContext = React.createContext<IconsPageContextData>({});

const LazyIconsComponent = React.lazy(async () => {
  const packages = await Promise.all([
    fetchBricksPackage("icons"),
    fetchBricksPackage("shoelace"),
  ]);
  add(packages, "/preview/");
  await loadBricks([
    EoEasyopsIcon,
    EoAntdIcon,
    EoFaIcon,
    iconsGetLibs,
    SlDialog,
    SlInput,
  ]);
  const getLibs = unwrapProvider(iconsGetLibs);
  const iconLibs = (await getLibs()) as {
    lib: string;
    icons: any[];
  }[];
  libs = iconLibs.map(({ lib, icons }) => ({
    label:
      lib === "easyops"
        ? "EasyOps Icons"
        : lib === "antd"
          ? "AntDesign Icons"
          : "FontAwesome Icons",
    lib,
    groups: Array.from(
      icons.reduce((acc, item) => {
        const group =
          lib === "easyops"
            ? item.icon.category
            : lib === "antd"
              ? item.icon.theme
              : item.icon.prefix;
        const list = acc.get(group);
        if (list) {
          list.push(item);
        } else {
          acc.set(group, [item]);
        }
        return acc;
      }, new Map<string, any[]>())
    ).map(([group, icons]) => ({ group, icons })),
  }));
  return {
    default: IconsComponent,
  };
});

export default LazyIconsComponent;

function IconsComponent(): JSX.Element {
  const history = useHistory();
  const isBrowser = useIsBrowser();

  const q = useMemo(
    () => {
      const params = isBrowser
        ? new URLSearchParams(history.location.search)
        : null;
      return params?.get("q") || "";
    },
    // Always return the initial query and hash.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [query, setQuery] = useState(q.toLowerCase());

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value.toLowerCase());
      const searchParams = new URLSearchParams(history.location.search);
      searchParams.set("q", value);
      history.replace({ ...history, search: searchParams.toString() });
    },
    [history]
  );

  const dialogRef = useRef<SlDialogElement>(null);

  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    const listener = () => {
      setSelectedIcon(false);
    };
    const listener2 = (e: Event) => {
      e.preventDefault();
    };
    dialog.addEventListener("sl-after-hide", listener);
    dialog.addEventListener("sl-initial-focus", listener2);
    return () => {
      dialog.removeEventListener("sl-after-hide", listener);
      dialog.removeEventListener("sl-initial-focus", listener2);
    };
  }, []);

  useEffect(() => {
    if (selectedIcon) {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.hide();
    }
  }, [selectedIcon]);

  return (
    <div className={`container ${styles.container}`}>
      <Search q={q} onSearch={handleSearch} />
      <IconsPageContext.Provider value={{ selectedIcon, setSelectedIcon }}>
        <Tabs defaultValue="easyops" lazy queryString="lib">
          {libs.map(({ lib, label, groups }) => (
            <TabItem key={lib} value={lib} label={label}>
              <Library groups={groups} query={query} />
            </TabItem>
          ))}
        </Tabs>
      </IconsPageContext.Provider>
      <WrappedSlDialog
        label={selectedIcon?.icon ?? ""}
        className={styles.dialog}
        ref={dialogRef}
      >
        <div className={styles.iconPreview}>
          {!selectedIcon ? null : selectedIcon.lib === "easyops" ? (
            <WrappedEoEasyopsIcon
              category={selectedIcon.category}
              icon={selectedIcon.icon}
            />
          ) : selectedIcon.lib === "antd" ? (
            <WrappedEoAntdIcon
              theme={selectedIcon.theme}
              icon={selectedIcon.icon}
            />
          ) : (
            <WrappedEoFaIcon
              prefix={selectedIcon.prefix}
              icon={selectedIcon.icon}
            />
          )}
        </div>
        <CodeBlock
          language="yaml"
          key={
            selectedIcon
              ? [
                  selectedIcon.lib,
                  selectedIcon.category,
                  selectedIcon.theme,
                  selectedIcon.prefix,
                  selectedIcon.icon,
                ].join(":")
              : undefined
          }
        >
          {selectedIcon
            ? [
                `lib: ${selectedIcon.lib}`,
                selectedIcon.lib === "antd"
                  ? `theme: ${selectedIcon.theme}`
                  : selectedIcon.lib === "fa"
                    ? `prefix: ${selectedIcon.prefix}`
                    : `category: ${selectedIcon.category}`,
                `icon: ${selectedIcon.icon}`,
              ].join("\n")
            : ""}
        </CodeBlock>
      </WrappedSlDialog>
    </div>
  );
}

function Search({
  q: _q,
  onSearch,
}: {
  q?: string;
  onSearch?: (query: string) => void;
}): JSX.Element {
  const { colorMode } = useColorMode();

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("theme.change", { detail: colorMode })
    );
  }, [colorMode]);
  // const [q, setQ] = useState(_q);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const input = ref.current;
    if (!input) {
      return;
    }
    const listener = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      onSearch?.(value);
    };
    input.addEventListener("sl-change", listener);

    return () => {
      input.removeEventListener("sl-change", listener);
    };
  }, [onSearch]);

  return (
    <div className={styles.searchContainer}>
      {/* <input
        placeholder="Search for icons..."
        className={styles.searchInput}
        defaultValue={q}
        onKeyDown={handleSearch}
      /> */}
      <WrappedSlInput
        type="search"
        placeholder="Search for icons..."
        clearable
        autofocus
        size="large"
        ref={ref}
        value={_q}
        // defaultValue={_q}
        // {...{"default-value": _q}}
      >
        <EoFaIcon icon="search" slot="prefix" />
      </WrappedSlInput>
    </div>
  );
}

function Library({
  query,
  groups,
}: {
  query?: string;
  groups: any[];
}): JSX.Element {
  const filteredGroups = useMemo(() => {
    if (!query) {
      return groups;
    }
    return groups
      .map(({ group, icons }) => ({
        group,
        icons: icons.filter((item) =>
          item.$searchTextPool.some((text) => text.includes(query))
        ),
      }))
      .filter((group) => group.icons.length > 0);
  }, [groups, query]);

  return (
    <>
      {filteredGroups.map(({ group, icons }) => (
        <React.Fragment key={group}>
          <Heading as="h3" className={styles.groupLabel}>
            {group}
          </Heading>
          <ul className={styles.iconList}>
            {icons.map(({ icon }) => (
              <Icon
                key={[icon.category, icon.theme, icon.prefix, icon.icon].join(
                  ":"
                )}
                icon={icon}
              />
            ))}
          </ul>
        </React.Fragment>
      ))}
    </>
  );
}

function Icon({ icon: _icon }: { icon: any }): JSX.Element {
  const { lib, category, theme, prefix, icon } = _icon;
  const ref = useRef<HTMLLIElement>(null);
  const [intersecting, setIntersecting] = useState(false);

  const { setSelectedIcon } = useContext(IconsPageContext);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIntersecting(true);
            observer.disconnect();
          }
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = useCallback(() => {
    setSelectedIcon(_icon);
  }, [_icon, setSelectedIcon]);

  const actualIcon = intersecting ? icon : null;

  return (
    <li title={icon} ref={ref} className={styles.item} onClick={handleClick}>
      {lib === "easyops" ? (
        // ? category.startsWith("colored-")
        <WrappedEoEasyopsIcon category={category} icon={actualIcon} />
      ) : // : <svg width="1em" height="1em" fill="currentColor"><use href={`#${category}--${icon}`}></use></svg>
      lib === "antd" ? (
        <WrappedEoAntdIcon theme={theme} icon={actualIcon} />
      ) : (
        <WrappedEoFaIcon prefix={prefix} icon={actualIcon} />
      )}
      <span className={styles.label}>{icon}</span>
    </li>
  );
}
