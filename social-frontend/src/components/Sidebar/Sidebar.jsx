export default function Sidebar({ user }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-logo">(logo)</h3>
      
      <nav className="menu-sidebar">
        <a href="/">home</a>
        <a href="/messages">messages</a>
        <a href="/notifications">notifications</a>
        <a href="/settings">settings</a>
      </nav>

      <div className="profile-sidebar">
        
        {/* Card de música dinâmico */}
        <div className="music-profile">
          {user?.isListening ? (
            <p>🎵 {user.currentSongTitle}</p>
          ) : (
            <p>sem musica no momento</p>
          )}
        </div>

        {/* Card do usuário dinâmico */}
        <div className="profile-user">
          <img 
            src={user?.profilePicture || "https://loyolaphoenix.com/wp-content/uploads/2025/03/Courtesy-of-YZY.jpeg"} 
            alt="Avatar" 
            className="user-avatar"
          />
          <span className="name-user">@{user?.username || "juniormelansia"}</span>
          <span className="change-profile">...</span>
        </div>

      </div>
    </aside>
  );
}