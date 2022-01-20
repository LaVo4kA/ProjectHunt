import React from "react";
import ProjectsListPage from "./Pages/ProjectsListPage";
import ProjectPage from "./Pages/ProjectPage";
import MembersListPage from "./Pages/MembersListPage"
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NowEventsPage from "./Pages/NowEventsPage";
import LoginPage from "./Pages/LoginPage";
import MyProfilePage from "./Pages/MyProfilePage";
import NotFoundPage from "./Pages/NotFoundPage";
import UserProfilePage from "./Pages/UserProfilePage"
import CreateProjectPage from "./Pages/CreateProjectPage";
import ProfileSettingsPage from "./Pages/ProfileSettingsPage";
import JoinEventPage from "./Pages/JoinEventPage";
import OldEventsPage from "./Pages/OldEventsPage";
import EventsSettingsPage from "./Pages/EventsSettingsPage";
import RegistrationPage from "./Pages/RegistrationPage";
import CreateEventPage from "./Pages/CreateEventPage";

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/registration" element={<RegistrationPage/>}></Route>
            <Route path="/me" element={<MyProfilePage/>}></Route>
            <Route path="/settings/profile" element={<ProfileSettingsPage/>}></Route>
            <Route path="/settings/events" element={<EventsSettingsPage/>}></Route>
            <Route path="/profile/:userId" element={<UserProfilePage/>}></Route>
            <Route path="/create-event" element={<CreateEventPage/>}></Route>
            <Route path="/now-events" element={<NowEventsPage/>}></Route>
            <Route path="/old-events" element={<OldEventsPage/>}></Route>
            <Route path="/:eventId/join" element={<JoinEventPage/>}></Route>
            <Route path="/:eventId/create-project" element={<CreateProjectPage/>}></Route>
            <Route path="/:eventId/projects-list" element={<ProjectsListPage/>}></Route>
            <Route path="/:eventId/members-list" element={<MembersListPage/>}></Route>
            <Route path="/:eventId/:projectId" element={<ProjectPage/>}></Route>
            <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
