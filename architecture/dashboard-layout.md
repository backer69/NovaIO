# SOP: Dashboard Layout

## Structure
The dashboard uses a layout shell `app/admin/dashboard/layout.tsx`.

### Components
1. **Sidebar (Left)**
    - Fixed width (e.g., 64 or 250px).
    - Navigation Links:
        - Dashboard (Home)
        - Members
        - Analytics
        - Finance
        - Calendar
    - Logout Button (Bottom).

2. **Topbar (Header)**
    - Configurable Title (Update based on current route).
    - User Profile snippet (Admin Name).

3. **Main Content Area**
    - Scrollable viewport.
    - Renders `children`.

## Responsive Strategy
- **Mobile**: Sidebar becomes a hamburger menu or bottom nav.
- **Desktop**: Persistent Sidebar.
