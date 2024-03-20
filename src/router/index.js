import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import AboutView from "../views/LandingPages/AboutUs/AboutView.vue";
import ContactView from "../views/LandingPages/ContactUs/ContactView.vue";
import AuthorView from "../views/LandingPages/Author/AuthorView.vue";
import SignInBasicView from "../views/SignIn/BasicView.vue";
import PageHeaders from "../layouts/sections/page-sections/page-headers/HeadersView.vue";
import PageFeatures from "../layouts/sections/page-sections/features/FeaturesView.vue";
import NavigationNavbars from "../layouts/sections/navigation/navbars/NavbarsView.vue";
import NavigationNavTabs from "../layouts/sections/navigation/nav-tabs/NavTabsView.vue";
import NavigationPagination from "../layouts/sections/navigation/pagination/PaginationView.vue";
import InputAreasInputs from "../layouts/sections/input-areas/inputs/InputsView.vue";
import InputAreasForms from "../layouts/sections/input-areas/forms/FormsView.vue";
import ACAlerts from "../layouts/sections/attention-catchers/alerts/AlertsView.vue";
import ACModals from "../layouts/sections/attention-catchers/modals/ModalsView.vue";
import ACTooltipsPopovers from "../layouts/sections/attention-catchers/tooltips-popovers/TooltipsPopoversView.vue";
import ElAvatars from "../layouts/sections/elements/avatars/AvatarsView.vue";
import ElBadges from "../layouts/sections/elements/badges/BadgesView.vue";
import ElBreadcrumbs from "../layouts/sections/elements/breadcrumbs/BreadcrumbsView.vue";
import ElButtons from "../layouts/sections/elements/buttons/ButtonsView.vue";
import ElButtonGroups from "../layouts/sections/elements/button-groups/ButtonGroupsView.vue";
import ElDropdowns from "../layouts/sections/elements/dropdowns/DropdownsView.vue";
import ElProgressBars from "../layouts/sections/elements/progress-bars/ProgressBarsView.vue";
import ElToggles from "../layouts/sections/elements/toggles/TogglesView.vue";
import ElTypography from "../layouts/sections/elements/typography/TypographyView.vue";
import SearchMovie from "@/views/LandingPages/CreateReview/SearchMovie.vue";
import ReviewForm from "@/views/LandingPages/CreateReview/Sections/ReviewForm.vue";
import CreateReview from "@/views/LandingPages/CreateReview/CreateReview.vue";
import DetailView from "@/views/LandingPages/AboutUs/DetailView.vue";
import UpdateReview from "@/views/LandingPages/CreateReview/UpdateReview.vue";
import MemberInfo from "@/views/Member/MemberInfo.vue";
import UpdateMemberInfo from "@/views/Member/UpdateMemberInfo.vue";
import ReviewView from "@/views/LandingPages/Review/ReviewView.vue";
import ChatRoom from "@/views/LandingPages/Community/ChatRoom.vue";
import CommunityView from "@/views/LandingPages/Community/CommunityView.vue";
import DetailCommunityView from "@/views/LandingPages/Community/DetailCommunityView.vue";
import CommunitySearchMovie from "@/views/LandingPages/Community/CommunitySearchMovie.vue";
import CreateCommunity from "@/views/LandingPages/Community/CreateCommunity.vue";
import CommunityForm from "@/views/LandingPages/Community/Sections/CommunityForm.vue";
import MyMeeting from "@/views/LandingPages/Community/MyMeeting.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "presentation",
      component: PresentationView,
    },
    // 나중에 교체 : AboutView -> ReviewView
    {
      path: "/pages/landing-pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/landing-pages/review",
      name: "review",
      component: ReviewView,
    },
    // chatroom
    {
      path: "/pages/landing-pages/chatroom",
      name: "chatroom",
      component: ChatRoom,
    },
    // Community
    {
      path: "/pages/landing-pages/community",
      name: "community",
      component: CommunityView,
    },
    // Community Detail
    {
      path: "/pages/landing-pages/community/detail",
      name: "community-detail",
      component: DetailCommunityView,
    },
    // Community SearchMovie
    {
      path: "/pages/landing-pages/community/search-movie",
      name: "community-search-movie",
      component: CommunitySearchMovie,
    },
    // Create Community
    {
      path: "/pages/landing-pages/community/create-community",
      name: "create-community",
      component: CreateCommunity,
    },
    // Community Form
    {
      path: "/pages/landing-pages/community/community-form",
      name: "community-form",
      component: CommunityForm,
    },
    // MyMeeting
    {
      path: "/pages/landing-pages/community/my-meeting",
      name: "my-meeting",
      component: MyMeeting,
    },
    {
      path: "/pages/landing-pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/landing-pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/pages/landing-pages/member-info",
      name: "member-info",
      component: MemberInfo,
    },
    {
      path: "/pages/landing-pages/member-info/update",
      name: "member-update",
      component: UpdateMemberInfo,
    },
    {
      path: "/pages/landing-pages/author/search-movie",
      name: "search-movie",
      component: SearchMovie,
    },

    {
      path: "/pages/landing-pages/author/create-review",
      name: "create-review",
      component: CreateReview,
    },
    {
      path: "/pages/landing-pages/author/update-review",
      name: "update-review",
      component: UpdateReview,
    },
    {
      path: "/pages/landing-pages/basic",
      name: "signin-basic",
      component: SignInBasicView,
    },
    {
      path: "/pages/landing-pages/author/detail-view",
      name: "detail-view",
      component: DetailView,
    },
    {
      path: "/sections/page-sections/page-headers",
      name: "page-headers",
      component: PageHeaders,
    },
    {
      path: "/sections/page-sections/features",
      name: "page-features",
      component: PageFeatures,
    },
    {
      path: "/sections/navigation/navbars",
      name: "navigation-navbars",
      component: NavigationNavbars,
    },
    {
      path: "/sections/navigation/nav-tabs",
      name: "navigation-navtabs",
      component: NavigationNavTabs,
    },
    {
      path: "/sections/navigation/pagination",
      name: "navigation-pagination",
      component: NavigationPagination,
    },
    {
      path: "/sections/input-areas/inputs",
      name: "inputareas-inputs",
      component: InputAreasInputs,
    },
    {
      path: "/sections/input-areas/forms",
      name: "inputareas-forms",
      component: InputAreasForms,
    },
    {
      path: "/sections/attention-catchers/alerts",
      name: "ac-alerts",
      component: ACAlerts,
    },
    {
      path: "/sections/attention-catchers/modals",
      name: "ac-modals",
      component: ACModals,
    },
    {
      path: "/sections/attention-catchers/tooltips-popovers",
      name: "ac-tooltips-popovers",
      component: ACTooltipsPopovers,
    },
    {
      path: "/sections/elements/avatars",
      name: "el-avatars",
      component: ElAvatars,
    },
    {
      path: "/sections/elements/badges",
      name: "el-badges",
      component: ElBadges,
    },
    {
      path: "/sections/elements/breadcrumbs",
      name: "el-breadcrumbs",
      component: ElBreadcrumbs,
    },
    {
      path: "/sections/elements/buttons",
      name: "el-buttons",
      component: ElButtons,
    },
    {
      path: "/sections/elements/button-groups",
      name: "el-button-groups",
      component: ElButtonGroups,
    },
    {
      path: "/sections/elements/dropdowns",
      name: "el-dropdowns",
      component: ElDropdowns,
    },
    {
      path: "/sections/elements/progress-bars",
      name: "el-progress-bars",
      component: ElProgressBars,
    },
    {
      path: "/sections/elements/toggles",
      name: "el-toggles",
      component: ElToggles,
    },
    {
      path: "/sections/elements/typography",
      name: "el-typography",
      component: ElTypography,
    },
  ],
});

export default router;
