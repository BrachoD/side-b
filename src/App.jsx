import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AlbumPage from "./pages/AlbumPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ExplorePage from "./pages/ExplorePage";


function App() {

  const { data: user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (

    <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />

          <Route
            path="/album/:id"
            element={
              <MainLayout>
                <AlbumPage />
              </MainLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />

          <Route
            path="/profile/:username"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />

          <Route
            path="/search"
            element={
              <MainLayout>
                <SearchPage />
              </MainLayout>
            }
          />

          <Route
            path="/explore"
            element={
              <MainLayout>
                <ExplorePage />
              </MainLayout>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>

  );
}

export default App;