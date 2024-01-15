import { Wrapper } from "./wrapper";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Navigation, NavigationSkeleton } from "./navigation";

export const Sidebar = async () => {
  
  // await new Promise(res => setTimeout(res , 5000));

  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border border-[#2D2E35] z-50 gap-4">
      <ToggleSkeleton />
      <NavigationSkeleton />
    </aside>
  );
};
