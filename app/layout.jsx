import './globals.css';

export const metadata = {
  title: 'TWR | Make room for the game',
  description: 'TWR Delver and Command Tower: tools for players and Dungeon Masters to keep the focus on the session.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
