import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../helpers";
import { useLayout } from "../../core";
import { MutableRefObject, useEffect, useRef } from "react";
import { ToggleComponent } from "../../../assets/ts/components";
import BurgerMenu from "../../../assets/media/burger-menu.svg";
import clsx from "clsx";

type PropsType = {
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
};

const SidebarLogo = (props: PropsType) => {
  const { config } = useLayout();
  const toggleRef = useRef<HTMLDivElement>(null);

  const appSidebarDefaultMinimizeDesktopEnabled = config?.app?.sidebar?.default?.minimize?.desktop?.enabled;
  const appSidebarDefaultCollapseDesktopEnabled = config?.app?.sidebar?.default?.collapse?.desktop?.enabled;
  const toggleType = appSidebarDefaultCollapseDesktopEnabled
    ? "collapse"
    : appSidebarDefaultMinimizeDesktopEnabled
      ? "minimize"
      : "";
  const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? "active" : "";
  const appSidebarDefaultMinimizeDefault = config.app?.sidebar?.default?.minimize?.desktop?.default;

  useEffect(() => {
    setTimeout(() => {
      const toggleObj = ToggleComponent.getInstance(toggleRef.current!) as ToggleComponent | null;

      if (toggleObj === null) {
        return;
      }

      // Add a class to prevent sidebar hover effect after toggle click
      toggleObj.on("kt.toggle.change", function () {
        // Set animation state
        props.sidebarRef.current!.classList.add("animating");

        // Wait till animation finishes
        setTimeout(function () {
          // Remove animation state
          props.sidebarRef.current!.classList.remove("animating");
        }, 300);
      });
    }, 600);
  }, [toggleRef, props.sidebarRef]);

  return (
    <div className="app-sidebar-logo py-3 px-3 d-flex align-items-center" id="kt_app_sidebar_logo">
      <Link to="/dashboard" className="d-flex align-items-center text-decoration-none">
        {config.layoutType === "dark-sidebar" ? (
          <>
            <img
              alt="Logo"
              src={toAbsoluteUrl("media/logos/FeedMyCycleLogo.png")}
              className="h-40px me-3 app-sidebar-logo-default"
            />
            <span className="text-white fw-bold fs-4 app-sidebar-logo-text">Feed My Cycle</span>
          </>
        ) : (
          <>
            <img
              alt="Logo"
              src={toAbsoluteUrl("media/logos/FeedMyCycleLogo.png")}
              className="h-40px me-3 app-sidebar-logo-default theme-light-show"
            />
            <img
              alt="Logo"
              src={toAbsoluteUrl("media/logos/FeedMyCycleLogo.png")}
              className="h-40px me-3 app-sidebar-logo-default theme-dark-show"
            />
            <span className="text-gray-800 fw-bold fs-4 app-sidebar-logo-text theme-light-show">Feed My Cycle</span>
            <span className="text-white fw-bold fs-4 app-sidebar-logo-text theme-dark-show">Feed My Cycle</span>
          </>
        )}

        {/* Minimized logo for collapsed sidebar */}
        <img
          alt="Logo"
          src={toAbsoluteUrl("media/logos/FeedMyCycleLogo.png")}
          className="h-30px app-sidebar-logo-minimize"
        />
      </Link>{" "}
      {(appSidebarDefaultMinimizeDesktopEnabled || appSidebarDefaultCollapseDesktopEnabled) && (
        <div
          id="kt_app_sidebar_toggle"
          className={clsx("app-sidebar-toggle btn btn-flush bg-transprant rotate", {
            active: appSidebarDefaultMinimizeDefault,
          })}
          data-kt-toggle="true"
          data-kt-toggle-state={toggleState}
          data-kt-toggle-target="body"
          data-kt-toggle-name={`app-sidebar-${toggleType}`}
        >
          <img src={BurgerMenu} className="h-34px w-34px rotate-180 d-none d-lg-flex" alt="" />
        </div>
      )}
      {/* {(appSidebarDefaultMinimizeDesktopEnabled || appSidebarDefaultCollapseDesktopEnabled) && (
        <div
          ref={toggleRef}
          id='kt_app_sidebar_toggle'
          className={clsx(
            'app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate',
            {active: appSidebarDefaultMinimizeDefault}
          )}
          data-kt-toggle='true'
          data-kt-toggle-state={toggleState}
          data-kt-toggle-target='body'
          data-kt-toggle-name={`app-sidebar-${toggleType}`}
        >
          <KTIcon iconName='black-left-line' className='fs-3 rotate-180 ms-1' />
        </div>
      )} */}
    </div>
  );
};

export { SidebarLogo };
