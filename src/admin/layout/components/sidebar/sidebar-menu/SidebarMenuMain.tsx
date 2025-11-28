import { useState } from "react";
import UserIcon from "../../../../../admin/assets/media/sidebaricons/admin.svg";
import MasterSVG from '../../../../../admin/assets/media/sidebaricons/settings.svg';
import CmsIcon from "../../../../../admin/assets/media/sidebaricons/cms.svg";
import DashboardIcon from "../../../../../admin/assets/media/sidebaricons/dashboard.svg";
import logoutIcon from "../../../../../admin/assets/media/sidebaricons/logout.svg";
import BlogIcon from '../../../../../admin/assets/media/sidebaricons/news.svg';
import SubscriptionIcon from '../../../../../admin/assets/media/sidebaricons/recipe.svg';
import LogoutModal from "../../../../../app/modals/LogoutModal";
import { SidebarTitle } from "../../../../../utils/string";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
const SidebarMenuMain = () => {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>
      <SidebarMenuItem to="/dashboard" icon={DashboardIcon} title={SidebarTitle.Dashboard} fontIcon="bi-app-indicator" />
      <SidebarMenuItem to="/user-management" icon={UserIcon} title={SidebarTitle.UserManagement} fontIcon="bi-people" />
      <SidebarMenuItem to="/subscription" icon={SubscriptionIcon} title={SidebarTitle.Subscription} fontIcon="bi-credit-card" />
      <SidebarMenuItem to="/blog" icon={BlogIcon} title={SidebarTitle.Blogs} fontIcon="bi-file-text" />
      <SidebarMenuItemWithSub to="#" icon={MasterSVG} title={SidebarTitle.Master} fontIcon="bi-app-indicator">
        <SidebarMenuItem to="/master/symptoms" title={SidebarTitle.Symptoms} hasBullet={true} />
        <SidebarMenuItem to="/master/hunger-or-cravings" title={SidebarTitle.HungerOrCravings} hasBullet={true} />
        <SidebarMenuItem to="/master/discharge" title={SidebarTitle.Discharge} hasBullet={true} />
        <SidebarMenuItem to="/master/cycle-stages" title={SidebarTitle.CycleStage} hasBullet={true} />
        <SidebarMenuItem to="/master/motivational-quotes" title={SidebarTitle.MotivationalQuotes} hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to="#" icon={CmsIcon} title={SidebarTitle.CMSManagement} fontIcon="bi-file-earmark-text">
        <SidebarMenuItem to="/cms-management/terms-and-conditions" title={SidebarTitle.TermsAndConditions} hasBullet={true} />
        <SidebarMenuItem to="/cms-management/privacy-policy" title={SidebarTitle.PrivacyPolicy} hasBullet={true} />
        <SidebarMenuItem to="/cms-management/about-us" title={SidebarTitle.AboutUs} hasBullet={true} />
        <SidebarMenuItem to="/cms-management/overview" title={SidebarTitle.Overview} hasBullet={true} />
        <SidebarMenuItem to="/cms-management/instructions" title={SidebarTitle.Instructions} hasBullet={true} />
        <SidebarMenuItem to="/cms-management/cycle-stages" title={SidebarTitle.CycleStages} hasBullet={true} />
        <SidebarMenuItem to="/cms-management/contact-us" title={SidebarTitle.ContactUs} hasBullet={true} />
        <SidebarMenuItem to="/cms-management/faqs" title={SidebarTitle.FAQs} hasBullet={true} />
      </SidebarMenuItemWithSub>
      {/* <SidebarMenuItem to="#" icon={logoutIcon} title={SidebarTitle.Logout} fontIcon="bi-app-indicator" onClick={() => setShowLogout(true)} />
      <LogoutModal show={showLogout} onHide={() => setShowLogout(false)} /> */}
    </>
  );
};
export { SidebarMenuMain };

