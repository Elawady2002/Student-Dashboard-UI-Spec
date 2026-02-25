import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
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

export const router = createBrowserRouter([
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
]);
