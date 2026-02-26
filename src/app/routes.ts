import { createBrowserRouter } from "react-router";

// Layouts
import { Layout } from "./components/layout/Layout";
import { TeacherLayout } from "./components/layout/TeacherLayout";
import { OrgLayout } from "./components/layout/OrgLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

// Student pages (Root /)
import { HomePage } from "./pages/HomePage";
import { MyCoursesPage } from "./pages/MyCoursesPage";
import { CoursePlayerPage } from "./pages/CoursePlayerPage";
import { CertificatesPage } from "./pages/CertificatesPage";
import { GoalsPage } from "./pages/GoalsPage";
import { CommunityPage } from "./pages/CommunityPage";
import { ChatPage } from "./pages/ChatPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ExplorePage } from "./pages/ExplorePage";
import { BooksPage } from "./pages/BooksPage";

// Teacher pages (/teacher)
import { TeacherHomePage } from "./pages/teacher/TeacherHomePage";
import { CourseManagementPage } from "./pages/teacher/CourseManagementPage";
import { TeacherCourseContentPage } from "./pages/teacher/TeacherCourseContentPage";
import { BookManagementPage } from "./pages/teacher/BookManagementPage";
import { QACommentsPage } from "./pages/teacher/QACommentsPage";
import { FinancialHubPage } from "./pages/teacher/FinancialHubPage";
import { AnalyticsPage } from "./pages/teacher/AnalyticsPage";

// Org Pages (/org)
import { OrgHomePage } from "./pages/org/OrgHomePage";
import { TeamManagementPage } from "./pages/org/TeamManagementPage";
import { StudentsSeatsPage } from "./pages/org/StudentsSeatsPage";
import { RevenuePage } from "./pages/org/RevenuePage";

// Admin Pages (/admin)
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { FinancialSubscriptionPage } from "./pages/admin/FinancialSubscriptionPage";
import { UserContentOversightPage } from "./pages/admin/UserContentOversightPage";
import { SystemArchitecturePage } from "./pages/admin/SystemArchitecturePage";
import { SecurityModerationPage } from "./pages/admin/SecurityModerationPage";
import { SupportSystemPage } from "./pages/admin/SupportSystemPage";

export const router = createBrowserRouter([
  // Note: All student page functionality stays protected in their exact previous state 
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "courses", Component: MyCoursesPage },
      { path: "course/:id", Component: CoursePlayerPage },
      { path: "books", Component: BooksPage },
      { path: "certificates", Component: CertificatesPage },
      { path: "goals", Component: GoalsPage },
      { path: "chat", Component: ChatPage },
      { path: "community", Component: CommunityPage },
      { path: "favorites", Component: FavoritesPage },
      { path: "leaderboard", Component: LeaderboardPage },
      { path: "explore", Component: ExplorePage },
      { path: "settings", Component: SettingsPage },
      { path: "notifications", Component: HomePage },
    ],
  },

  // Teacher/Instructor namespace
  {
    path: "/teacher",
    Component: TeacherLayout,
    children: [
      { index: true, Component: TeacherHomePage },
      { path: "courses", Component: CourseManagementPage },
      { path: "courses/:id", Component: TeacherCourseContentPage },
      { path: "books", Component: BookManagementPage },
      { path: "qa", Component: QACommentsPage },
      { path: "financial", Component: FinancialHubPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "settings", Component: SettingsPage }, // re-using student settings UI for now 
    ]
  },

  // Corporate/Organization namespace
  {
    path: "/org",
    Component: OrgLayout,
    children: [
      { index: true, Component: OrgHomePage },
      { path: "team", Component: TeamManagementPage },
      { path: "seats", Component: StudentsSeatsPage },
      { path: "revenue", Component: RevenuePage },
      { path: "settings", Component: SettingsPage },
    ]
  },

  // Master Admin command center
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminHomePage },
      { path: "finance", Component: FinancialSubscriptionPage },
      { path: "users", Component: UserContentOversightPage },
      { path: "system", Component: SystemArchitecturePage },
      { path: "security", Component: SecurityModerationPage },
      { path: "support", Component: SupportSystemPage },
    ]
  }
]);
