import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../App.css";
import { AppStateProvider } from "../AppState";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppStateProvider>
      <Outlet />
    </AppStateProvider>
  );
}
